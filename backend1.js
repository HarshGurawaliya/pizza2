const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const path = require('path');
const { chatLogic } = require('./app'); 

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // Update for production
  methods: ["GET", "POST"]
}));

// Serve static files from the frontend app
app.use(express.static(path.join(__dirname, 'frontend/build')));

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Update for production
    methods: ["GET", "POST"]
  }
});

let userSessions = {}; 

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);
    userSessions[socket.id] = {
        currentState: 'wStart', 
        orderInfo: {} 
    };

    socket.emit('botmes', "Welcome to Laurin Pasta and Pizza restaurant. Type 'yes' to start ordering your pizza.");
    socket.on('human', (data) => {
        chatLogic(socket, userSessions, data); 
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
        delete userSessions[socket.id]; 
    });
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
