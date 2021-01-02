import React from 'react';
import './App.css';
import { Chat } from './components/Chat';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <div>SignalRChat - React Client</div>
        </nav>
      </header>
      <main className="App-main">
        <Chat></Chat>
      </main>
    </div>
  );
}

export default App;
