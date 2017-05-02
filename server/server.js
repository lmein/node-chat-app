require('./config/config.js');

//const _ = require('lodash');
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
//to convert server to use socket.io.
var io = socketIO(server);

app.use(express.static(publicPath));

//registers an event listener
io.on('connection', (socket) => {
  console.log('New user connected.');

  socket.emit('newMessage', {
    from: 'testA@gmail.com',
    text: 'Server to client message.',
    createdAt: 123
  });

  //socket.on listens for event.
  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected.');
  });
});

//to covert to use http
//app.listen(port, () => {
server.listen(port, () => {
  console.log(`Started on port ${port}.`);
});
