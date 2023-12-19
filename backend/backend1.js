const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const { chatLogic } = require('./app'); 
const app = express();
app.use(cors()); 
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
let userSessions = {}; 

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    
    userSessions[socket.id] = {
        currentState: 'waitingToStart', 
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


app.use(express.static('public'));


const port = 5000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
