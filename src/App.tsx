import React, { useState } from 'react';
import Chat from './components/Chat';
import './App.css';

const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [showChat, setShowChat] = useState<boolean>(false);

  const joinRoom = (): void => {
    if (username !== '' && room !== '') {
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Name..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <Chat username={username} room={room} />
      )}
    </div>
  );
};

export default App;