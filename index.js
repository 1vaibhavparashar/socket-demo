require('dotenv').config(); // npm i dotenv
const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app); // app is request listener
const io = socketio(server);

let users = {}; // Store user data

// Handle socket connection
io.on('connection', (socket) => {
    console.log("Connection established");

    // Handle user login
    socket.on('login', (data) => {
        users[socket.id] = data.username;
        console.log(`${data.username} logged in`);
    });

    // Handle message sending
    socket.on('send-msg', (data) => {
        io.emit('receive-msg', { msg: data.msg, username: users[socket.id] });
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log(`${users[socket.id]} disconnected`);
        delete users[socket.id];
    });
});

// Serve static files from the "public" directory
app.use('/', express.static(path.join(__dirname, 'public')));

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
