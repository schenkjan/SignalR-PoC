# SignalRChat - React Client
This project contains a React-based client for the *SignalRChat*. It uses *SignalR* to send and receive messages to and from other chat clients.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running the Application
1. Make sure the *SignalRChat* backend application is already running.
2. Execute `yarn start`
    1. Runs the app in the development mode.
    2. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Developer Notes
## Reproduction Steps
1. Create new React app from typescript template (which results in the current folder structure and also this *README.md* file):
    ``` bash
    npx create-react-app chat-client --template typescript
    ```
2. Update the UI to resemble the chat app.
    1. Create *Chat* component.
    2. Create *ChatMessage* component and use it in the *Chat* component.
    3. Use of the *Chat* component in *App.tsx*.
3. Add SignalR to the React app:
    ``` bash
    yarn add @microsoft/signalr
    ```
4. Create the connection to the *SignalRChat* backend (according to [Integrating SignalR with React TypeScript and ASP.NET Core](https://www.roundthecode.com/dotnet/signalr/integrating-signalr-with-react-typescript-and-asp-net-core)):
    1. Create a connection to the SignalR hub in the constuctor of the *Chat* component.
    2. Register the *ReceiveMessage" event of the SignalR hub connection as soon as the component is mounted, i.e. in the *componentDidMount()* method.
    3. Start the SignalR connection in the *componentDidMount()* method.
    4. Implement the *sendMessage()* method and register it in the *onClick* event handler of the *Send Message* button.
        1. Invoke a *SendMessage* event to send the message via the SignalR connection.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
