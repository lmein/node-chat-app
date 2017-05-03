require('./config/config.js');

const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
//to convert server to use socket.io.
var io = socketIO(server);
var users = new Users();

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
  // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));

  // socket.broadcast.emit('newMessage', {
  //   from: 'Admin',
  //   text: 'New user joined chat.',
  //   createdAt: new Date().getTime()
  // });
  // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined chat.'));

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and group name are required.');
    }

    socket.join(params.room);
    //socket.leave(params.room);
    //io.emit - everyone on the server
    //socket.broadcast.emit - to everyone connected except current user
    //socket.emit - to a specific user
    //specific room:
    //io.to(params.room).emit
    //socket.broadcast.to(params.room).emit
    //socket.to(params.room).emit
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the chat.`));

    callback();
  });

  //socket.on listens for event.
  socket.on('createMessage', (message, callback) => {
    //console.log('createMessage', message);
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
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

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(`${user.name}'s location is: `, coords.latitude, coords.longitude))
    }
    //io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`))
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the chat.`));
    }
    // console.log('User disconnected.');
  });
});

//to covert to use http
//app.listen(port, () => {
server.listen(port, () => {
  console.log(`Started on port ${port}.`);
});
