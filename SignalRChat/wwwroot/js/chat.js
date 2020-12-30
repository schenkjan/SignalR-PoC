"use strict";

// Create a new connection to endpoint /chatHub using SignalR
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

// Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

// Register an event listener for new received messages
connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says: " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

// Start the connection to the SignalR hub
connection.start()
    .then(function () {
        console.log('Connection established.');
        document.getElementById("sendButton").disabled = false; // enable send button when connection is established
    })
    .catch(function (err) {
        return console.error(err.toString());
    }
);

// Add an event listener for clicks on the sendButton
document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    // Send a new message to the SignalR hub containing the entered message text
    connection.invoke("SendMessage", user, message)
        .then(() => console.log(`Message sent: ${message}`))
        .catch(function (err) {
            return console.error(err.toString());
        }
    );

    event.preventDefault(); // avoid bubbling up of event to parent elements
});