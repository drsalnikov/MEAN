const express = require('express');
const app = module.exports = express();

app.get("/", (req, res) => {
  res.send(`
  1. Для отображение всех пользователей get : /api/users. Можно использовать limit offset fields 
  2. Для поиска пользователя по имени get : /api/users/userName
  3. Для добавление пользователя post : /api/users/userId?name=userName&score=userScore. 
  4. Для редактирования userName и userScore пользователя с userId put : /api/users/userId?name=userName&score=userScore
  5. Для удаления пользователя по userId  delete : /api/users/userId
  6. Для удаления всех пользователей delete : /api/users/all`);
});

app.get("/users/", (req, res) => {
  let result = [];
  let users = req.users;
  let limit = req.query.limit;
  let offset = req.query.offset;
  let fields = req.query.fields;

  if (fields) {
    fields = req.query.fields.split(',');
  } else {
    fields = Object.getOwnPropertyNames(users[0]);
  }

  if (limit) {
    limit = Number(req.query.limit);
  } else {
    limit = users.length;
  }

  if (offset) {
    offset = Number(req.query.offset);
  } else {
    offset = 0;
  }

  // результрующий перебор
  let newUser = {};
  for (let i = offset; i < offset + limit; i++) {
    if (req.users[i]) {
      newUser = {};
      for (let field of fields) {
        newUser[field] = req.users[i][field];
      }
      result.push(newUser);
    }
  }

  res.json(result);
});

app.get("/users/:name", (req, res) => {
  // Поиск пользователя по имени
  let result = req.users.filter((arg)=>{
    return arg.name.toLowerCase() === req.params.name.toLowerCase();
  })[0];

  if (result) {
    res.json(result);
  } else {
    res.send('Пользователь по имени не найден');
  }
});

app.post("/users/:userId", function(req, res) {
  let newUser = {
    "id": req.params.userId,
    "name": req.query.name,
    "score": req.query.score
  };

  if (req.query.name && req.query.score) {
    req.users.push(newUser);
    res.json(newUser);
  } else {
    res.send('Не верно введены параметры для добавления. /api/users/userId?name=userName&score=userScore')
  }
});

app.put("/users/:userId", function(req, res) {
  let id = Number(req.params.userId);
  let result = req.users.filter((arg)=>{
    return Number(arg.id) === id;
  })[0];

  if (result) {
    if (req.params.userId && req.query.name && req.query.score) {
      result.name = req.query.name;
      result.score = req.query.score;
      res.json(result);
    } else { 
      res.send('Не верно введены параметры для редактирования пользователя. Формат /api/users/userId?name=userName&score=userScore')
    }
  } else {
    res.send('Пользователь для редактирования не найден. Для просмотра всех пользователей сформируйте запрос методом get по формату /api/users ')
  }
});

app.delete("/users/:userId", function(req, res) {
  //удаляет пользователя по id, если /users/all удаляет всех
  let result = null;
  if (req.params.userId === 'all') {
    req.users.splice(0, req.users.length);
    result = `Удалены все пользователи`;
  } else {
    let id = Number(req.params.userId);
    req.users.forEach((user, i) => {
      if (Number(user.id) === id) {
        req.users.splice(i, 1);
        result = `Пользователь id:${user.id}, name:${user.name}, score:${user.score} удален.`;
      }
    });
    if (!result) {
      result = `Пользователь c id:${id}  для удаления не найден.`;
    }
  }
  res.send(result);
});

app.all("/users/", function(req, res) {
  res.send('wrong request. Please choose from get, post, update, delete');
});
