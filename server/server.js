require('./config/config.js');

//const _ = require('lodash');
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message.js');
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

  // socket.emit('newMessage', {
  //   from: 'testA@gmail.com',
  //   text: 'Server to client message.',
  //   createdAt: 123
  // });

  // socket.emit('newMessage', {
  //   from: 'Admin',
  //   text: 'Welcome to the chat app.',
  //   createdAt: new Date().getTime()
  // });
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));

  // socket.broadcast.emit('newMessage', {
  //   from: 'Admin',
  //   text: 'New user joined chat.',
  //   createdAt: new Date().getTime()
  // });
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined chat.'));

  //socket.on listens for event.
  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
    //sends to everyone but this socket.
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
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
