# SignalR-PoC
A proof-of-concept with SignalR for the CAS HTML5.
It aims to proof that SignalR can be used to satisfy the requirements for the group project **Marble Collector** that is part of the CAS HTML5.

It consists of the following components:
- An ASP.NET Core based backend that provides a SignalR hub to send and receive chat messages.
- An ASP.NET Core based client to send and receive chat messages over the SignalR hub of the backend.
- A React based client to send and receive chat messages over the SignalR hub of the backend.


## Starting the Application(s)
1. Start the *SignalRChat* backend application (see [README.md](/SignalRChat/README.md) for details).
2. Start the *SignalRChat* client application  (see [README.md](/SignalRChat/README.md) for details).
3. Start the *SignalRChat - React Client* application  (see [README.md](/chat-client/README.md) for details).
4. Send messages from one client to the other and back.

# Reproduction Steps
1. Creation of the ASP.NET Core backend and ASP.NET Core client according to [Tutorial: Get started with ASP.NET Core SignalR](https://docs.microsoft.com/en-us/aspnet/core/tutorials/signalr?view=aspnetcore-5.0&tabs=visual-studio-code). See [README.md](/SignalRChat/README.md) for details.
2. Creation of a React client application. See [README.md](/chat-client/README.md) for details.
3. Enabling CORS in the *SignalRChat* backend application to be able to connect from the React based client application which is hosted on another origin as the backend. See [README.md](/SignalRChat/README.md) for details.

# Resources
- [Introduction to ASP.NET Core SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-5.0)
- [Tutorial: Get started with ASP.NET Core SignalR](https://docs.microsoft.com/en-us/aspnet/core/tutorials/signalr?view=aspnetcore-5.0&tabs=visual-studio-code)
- [ASP.NET Core SignalR JavaScript client](https://docs.microsoft.com/en-us/aspnet/core/signalr/javascript-client?view=aspnetcore-5.0)
- [Integrating SignalR with React TypeScript and ASP.NET Core](https://www.roundthecode.com/dotnet/signalr/integrating-signalr-with-react-typescript-and-asp-net-core)
