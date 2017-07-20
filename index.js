'use strict';

// Setup basic express server
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Data
const testData = require('./testdata');
const db = require('./db');

// Routing
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/phonebook', function (req, res) {
  if (req.query.fio) {
    let fio = req.query.fio.toString().replace(/[^A-Za-zА-Яа-яЁё0-9]/g, '');
    let exp = new RegExp(fio, 'i');
    let requests = [
      {name: {$regex: exp}},
      {phonenumber: {$regex: exp}},
      {appendix: {$regex: exp}}
    ];
    Promise.all(requests.map(db.getPhonelist))
        .then(responses => {
          let results = [];
          let phonelist = [];
          // Собираем все ответы
          responses.forEach((response) => {
            response.forEach((res, i) => {
              results.push(res);
            });
          });
          res.render('phonebook', {phonelists: results, search: fio});
        }).catch(
          err => {
            console.log('Ошибка при поиске ', err);
          }
        );
  } else {
    db.getPhonelist().then(
      phonelist => {
        if (phonelist) {
          res.render('phonebook', {phonelists: phonelist});
        }
      },
      err => {
        console.log('Ошибка при получении общего списка ', err);
      }
    );    
  }
});

app.get('/person', function (req, res) {
  let id = req.query.id;
  if (id.length == 24) {
    db.getPerson(id).then(
      data => {
        if (data) {
          res.render('person', {person: data});
        }
      },
      err => {
        console.log('Ошибка получении данных о пользователе', err);
        res.redirect('/phonebook');
      }      
    );
  } else {
    res.redirect('/phonebook');
  }
});

app.post('/person', function (req, res) {
  let personData = req.body;
  db.updatePerson(personData).then(
    response => {
        if (response.result.ok == 1) {
          return db.getPerson(personData.id);
        }
      }
    ).then(
      data => {
        res.render('person', {person: data});
      },
      err => {
        console.log('Ошибка изменении данных ', err);
      }
    );
});

app.get('/person/add', function (req, res) {
  res.render('add');
});

app.post('/person/add', function (req, res) {
  let personData = req.body;
  db.addPerson(personData).then(
    data => {
      console.log('data', data);
      if (data.result.ok == 1) {
        res.redirect('/phonebook');
      }
    },
    err => {
      console.log('Ошибка при добавлении ', err);
    }
  );
});

app.get('/person/delete', function (req, res) {
  let id = req.query.id;
  if (id){
    db.deletePerson(id).then(
      data => {
        if (data.result.ok == 1) {
          res.redirect('/phonebook');
        }
      },
      err => {
        console.log('Ошибка при удалении', err);
      }
    );
  }
});

// Start server
server.listen(port, function () {
  console.log('Server listening at port %d', port);
});
