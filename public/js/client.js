'use strict';

var loginPage = document.getElementById('login-page');
var userName = document.getElementById('usernameInput');
var roomName = document.getElementById('roomnameInput');
var loginForm = document.getElementById('login-form');
var chatPage = document.getElementById('chat-page');

var currentUser;

function getCurrentUser() {
  return currentUser;
}

function setCurrentUser(user) {
  currentUser = user;
}

function showOwnMessage(username, text) {
  var message = document.createElement('li');
  message.classList.add('self');
  message.innerHTML = `
    <div class="msg">
      <p class="username">${username}:</p>
      <p>${text}:</p>
      <time>${(new Date).toLocaleTimeString('ru-RU')}</time>
    </div>`;
  var list = document.getElementById('messageList');
  list.appendChild(message);
  message.scrollIntoView();
}

function showMessage(user) {
  var message = document.createElement('li');
  message.classList.add('other');
  message.innerHTML = `
    <div class="msg">
      <p class="username">${user.username}:</p>
      <p>${user.text}:</p>
      <time>${(new Date).toLocaleTimeString('ru-RU')}</time>
    </div>`;
  var list = document.getElementById('messageList');
  list.appendChild(message);
  message.scrollIntoView();
}

function showNewUser(user) {
  var message = document.createElement('li');
  message.classList.add('info');
  message.innerHTML = `<p>${user.name} вошел в чат в комнату ${user.room} …</p>`;
  var list = document.getElementById('messageList');
  list.appendChild(message);
  message.scrollIntoView();
}



/* S E R V E R   `http:://${location.host}`*/

var server = io();
server.on('login', user => {
  currentUser = user;
  document.getElementById('userName').innerHTML = currentUser.name;
  document.getElementById('roomName').innerHTML = currentUser.room;
});

server.on('message', (data) => showMessage(data));

server.on('lastMessages', function (messages) {
  messages
  .filter(message => message.room === currentUser.room)
  .forEach(message => showMessage(message));
});

server.on('newUser', function (user) {
  showNewUser(user);
});

/* E V E N T S */

document.getElementById('messageForm').addEventListener('submit', function (event) {
  event.preventDefault();
  if (this.message.value != ''){
    showOwnMessage(currentUser.name, this.message.value);
    server.emit('message', {username: currentUser.name, room: currentUser.room, text: this.message.value});  
  }
  this.reset();
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();
  loginPage.style.display = 'none';
  chatPage.style.display = 'block';
  server.emit('login', {
    name: userName.value || "Анонимус", 
    room: roomName.value || "Общая",
    color: '#'+Math.floor(Math.random()*16777215).toString(16)
  });
});
