import React, { useState } from 'react';
import { auth } from './firebase/config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import Chat from './components/Chat';
import './App.css';

const App: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [showChat, setShowChat] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError('');
    
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setShowChat(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const joinRoom = (): void => {
    if (username !== '' && room !== '') {
      setShowChat(true);
    }
  };

  if (!user) {
    return (
      <div className="App">
        <div className="joinChatContainer">
          <h3>{isRegistering ? 'Register' : 'Login'}</h3>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleAuth}>
            <input
              type="email"
              placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
            />
            {isRegistering && (
              <input
                type="text"
                placeholder="Username..."
                onChange={(e) => setUsername(e.target.value)}
              />
            )}
            <input
              type="password"
              placeholder="Password..."
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </form>
          <button 
            className="switch-auth"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering 
              ? 'Already have an account? Login' 
              : 'Need an account? Register'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Username..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      ) : (
        <Chat username={username} room={room} />
      )}
    </div>
  );
};

export default App;