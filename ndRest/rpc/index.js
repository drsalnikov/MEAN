const express = require('express');
const app = module.exports = express();

app.post("/", function(req, res) {
    /*{
	    "jsonrpc": "2.0", 
        "method": "createUser", 
        "params": {
                    "id": "77",
                    "name": "Barakka",
                    "score": 99
                   },
        "id":1
    }*/

    let action = req.body.method;
    let params = req.body.params;
    let users = req.users
    let id = req.body.id;
    let reply = {};

    switch (action) {
      case 'createUser':
          reply = createUser(params, users);
        break;
      case 'showUser':
          reply = showUser(params.id, users);
        break;
      case 'showUsers':
          reply.result = req.users;
        break;
      case 'updateUser':
          reply = updateUser(params.id, params.name, params.score, users);
        break;
      case 'deleteUser':
          reply = deleteUser(params.id, users);
        break;
      default:
          reply.result = null;
          reply.error = 'method not found. Please choose from createUser, showUser, showUsers, updateUser, deleteUser';
        break;
    }

    res.json({
      "jsonrpc": "2.0", 
      "result": reply.result,
      "error": reply.error,
      "id": id
    });

});

function createUser(params, data) {
  let response = {};
  response.result = null;
  response.error = null;

  if (params.id && params.name && params.score) {
    let newUser = {
      "id": params.id,
      "name": params.name,
      "score": params.score
    };
    data.push(newUser);
    response.result = 'Добавлен новый пользователь ' + params.name;
  } else {
    response.error = 'Неверно введены параметры';
  }

  return response;
}

function showUser(userID, data) {
  let response = {};
  response.result = data.filter((user)=>{
    return Number(user.id) === Number(userID);
  })[0];

  if (typeof response.result === 'undefined') {
    response.result = null;
    response.error = `Пользователь с id ${userID} не найден`;
  }

  return response;
}

function updateUser(userID, name, score, data) {
  let response = {};
  response.result = null;
  response.error = `Пользователь с id ${userID} не найден`;

  data.forEach((user, i)=>{
    if (Number(user.id) === Number(userID)){
      user.name = name;
      user.score = score;
      response.result = `Данные пользователя id ${user.id} изменены`;
      response.error = null;
    }
  });

  return response;
}

function deleteUser(userID, data) {
  let response = {};
  response.result = null;
  response.error = `Пользователь с id ${userID} не найден`;

  data.forEach((user, i)=>{
    if (Number(user.id) === Number(userID)){
      data.splice(i, 1);
      response.result = `Пользователь с id ${userID} удален`;
      response.error = null;
    }
  });

  return response;
}
