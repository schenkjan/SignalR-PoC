# SignalRChat
This application is based on [Tutorial: Get started with ASP.NET Core SignalR](https://docs.microsoft.com/en-us/aspnet/core/tutorials/signalr?view=aspnetcore-5.0&tabs=visual-studio-code).

The following steps have been executed using Visual Studio Code:

1. Create a web app project and open the project in Visual Studio Code using PowerShell or a command shell:
``` bash
dotnet new webapp -o SignalRChat
cd SignalRChat
code -r .
```
2. Add the SignalR client library:
    1. Install LibMan tool using the following command in Visual Studio Code's integrated terminal:
    ``` bash
    dotnet tool install -g Microsoft.Web.LibraryManager.Cli
    ```
    2. Install SignalR client library with LibMan using the following command in Visual Studio Code's integrated terminal:
    ``` bash
    libman install @microsoft/signalr@latest -p unpkg -d wwwroot/js/signalr --files dist/browser/signalr.js --files dist/browser/signalr.min.js
    ```
3. Create a SignalR hub:
    - In the *SignalRChat* project folder, create a *Hubs* folder.
    - In the *Hubs* folder, create a *ChatHub.cs* file with the following code:
    ``` csharp
    using Microsoft.AspNetCore.SignalR;
    using System.Threading.Tasks;

    namespace SignalRChat.Hubs
    {
        public class ChatHub : Hub
        {
            public async Task SendMessage(string user, string message)
            {
                await Clients.All.SendAsync("ReceiveMessage", user, message);
            }
        }
    }
    ```
4. Configure SignalR in *Startup.cs* file:
    1. Add using statement for *SignalRChat.Hubs*:
    ``` csharp
    using SignalRChat.Hubs;
    ```
    2. Add SignalR to services in *ConfigureServices()*-method:
    ``` csharp
    services.AddSignalR();
    ```
    3. Configure additional endpoint for *ChatHub* in *Configure()*-method:
    ``` csharp
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapRazorPages();
        endpoints.MapHub<ChatHub>("/chathub");
    });
    ```
5. Add SignalR client code:
    1. Replace the content in *Pages\Index.cshtml* with the following code:
    ``` asp
    @page
        <div class="container">
            <div class="row">&nbsp;</div>
            <div class="row">
                <div class="col-2">User</div>
                <div class="col-4"><input type="text" id="userInput" /></div>
            </div>
            <div class="row">
                <div class="col-2">Message</div>
                <div class="col-4"><input type="text" id="messageInput" /></div>
            </div>
            <div class="row">&nbsp;</div>
            <div class="row">
                <div class="col-6">
                    <input type="button" id="sendButton" value="Send Message" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <hr />
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <ul id="messagesList"></ul>
            </div>
        </div>
    <script src="~/js/signalr/dist/browser/signalr.js"></script>
    <script src="~/js/chat.js"></script>
    ```
    2. In the *wwwroot/js* folder, create a *chat.js* file with the following code:
    ``` javascript
    "use strict";

    var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

    //Disable send button until connection is established
    document.getElementById("sendButton").disabled = true;

    connection.on("ReceiveMessage", function (user, message) {
        var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var encodedMsg = user + " says " + msg;
        var li = document.createElement("li");
        li.textContent = encodedMsg;
        document.getElementById("messagesList").appendChild(li);
    });

    connection.start().then(function () {
        document.getElementById("sendButton").disabled = false;
    }).catch(function (err) {
        return console.error(err.toString());
    });

    document.getElementById("sendButton").addEventListener("click", function (event) {
        var user = document.getElementById("userInput").value;
        var message = document.getElementById("messageInput").value;
        connection.invoke("SendMessage", user, message).catch(function (err) {
            return console.error(err.toString());
        });
        event.preventDefault();
    });
    ```
6. Run the app:
``` bash
dotnet watch run -p SignalRChat.csproj
```
7. Open app in at least 2 separate browser tabs/instances by executing the following command in Visual Studio Code's integrated terminal:
``` bash
Start https://localhost:5001
```
8. Added some explanatory comments to the added/modified code of the project.