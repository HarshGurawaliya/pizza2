const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const path = require('path');
const { chatLogic } = require('./app'); 

const app = express();
app.use(cors()); 

app.use(express.static(path.join(__dirname, 'public')));

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


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
