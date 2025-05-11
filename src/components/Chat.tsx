import React, { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { IMessage } from '../types';
import './Chat.css';

interface ChatProps {
  username: string;
  room: string;
}

const socket: Socket = io('http://localhost:3001');

const Chat: React.FC<ChatProps> = ({ username, room }) => {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    socket.emit('join_room', room);
  }, [room]);

  useEffect(() => {
    socket.on('receive_message', (data: IMessage) => {
      setMessageList((list) => [...list, data]);
    });
    
    return () => {
      socket.off('receive_message');
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const sendMessage = async (): Promise<void> => {
    if (currentMessage !== '') {
      const messageData: IMessage = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).toLocaleTimeString(),
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat - Room: {room}</p>
      </div>
      <div className="chat-body">
        {messageList.map((messageContent, index) => (
          <div
            key={index}
            className="message"
            id={username === messageContent.author ? 'you' : 'other'}
          >
            <div>
              <div className="message-content">
                <p>{messageContent.message}</p>
              </div>
              <div className="message-meta">
                <p id="time">{messageContent.time}</p>
                <p id="author">{messageContent.author}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Type a message..."
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;