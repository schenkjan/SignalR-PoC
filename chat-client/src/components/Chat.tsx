import { ChatMessage } from "./ChatMessage";

import './Chat.css';
import { Component } from "react";
import * as signalR from "@microsoft/signalr";

type ChatState = {
    connectionEstablished: boolean,
    connection: signalR.HubConnection,
    messages: string[],
    user: string,
    message: string
}

export class Chat extends Component<{}, ChatState>  {
    constructor(props: any) {
        super(props);

        // Create a new connection to endpoint /chatHub using SignalR
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:5001/chatHub")
            .configureLogging(signalR.LogLevel.Information)
            .build();
    
        this.state = {
            connectionEstablished: false,
            connection: connection,
            messages: [],
            user: "",
            message: ""
        };

        this.updateUser = this.updateUser.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        // Register an event listener for new received messages
        this.state.connection.on("ReceiveMessage", (user: string, message: string) => {
            var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            var encodedMsg = user + " says: " + msg;
            console.log(`Received message: ${encodedMsg}`);
            this.state.messages.unshift(encodedMsg);
            this.setState({ messages: this.state.messages }); // trigger rendering of new message
        });

        // Start the connection to the SignalR hub
        this.state.connection.start()
            .then(() =>  {
                console.log('Connection established.');
                this.setState({ connectionEstablished: true }); // enable send button when connection is established
            })
            .catch(function (err) {
                return console.error(err.toString());
            }
        );
    }

    updateUser(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ user: event.target.value });
    }

    updateMessage(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ message: event.target.value });
    }

    sendMessage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        // Send a new message to the SignalR hub containing the entered message text
        this.state.connection.invoke("SendMessage", this.state.user, this.state.message)
            .then(() => console.log(`Message sent: ${this.state.message}`))
            .catch(function (err) {
                return console.error(err.toString());
            }
        );
    }

    render(): JSX.Element {
        return (
            <article className="chat">
                <div className="user">
                    <label>User
                        <input id="user" value={this.state.user} onChange={this.updateUser}></input>
                    </label>
                </div>
                <div className="message">
                <label>Message
                    <input id="message" value={this.state.message} onChange={this.updateMessage}></input>
                </label>
                </div>
                <button disabled={!this.state.connectionEstablished || !this.state.user || !this.state.message} onClick={this.sendMessage}>Send Message</button>
                <div className="messages">
                    Messages:
                    {this.state.messages.map((message, index) => <ChatMessage key={index} message={message}></ChatMessage> )}
                </div>
            </article>
        );
    }    
}