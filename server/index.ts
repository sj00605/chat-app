import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

// Define type for a message
interface IMessage {
  room: string;
  author: string;
  message: string;
  time: string;
}

// Set up Express app
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  socket.on('join_room', (roomId: string) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });
  
  socket.on('send_message', (data: IMessage) => {
    socket.to(data.room).emit('receive_message', data);
  });
  
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});