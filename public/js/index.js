var socket = io();

socket.on('connect', function () {
  console.log('Connected to the server.');

  socket.emit('createMessage', {
    to: 'testA@gmail.com',
    text: 'Client to server test message.',
    createdAt: 124
  })
});

socket.on('disconnect', function () {
  console.log('Disconnected from the server.');
});

socket.on('newMessage', function (Message) {
  console.log('New message.', Message);
});
