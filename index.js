'use strict';

// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

// Chatroom
var messages = [];

io.on('connection', (client) => {
  var addedUser = false;
  var user = {name: 'Анонимус', room: 'Общая' };

  client.on('login', user => {
    if (addedUser) return;
    client.join(user.room);
    client.emit('login', user);
    client.emit('lastMessages', messages);
    client.emit('newUser', user);
    client.broadcast.to(user.room).emit('newUser', user);
    addedUser = true;
  });

  client.on('message', message => {
    client.broadcast.to(message.room).emit('message', message);
    messages.push(message);
  });

});