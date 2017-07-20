const express = require('express');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());

// extra
app.use((req, res, next) => {
  // header = key
  if(req.get('header') === 'key'){
    next();
  } else {
    res.status(401).end();
  }
});

// 1
app.get("/", (req, res) => {
  res.status(200).send(`Hello, Express.js`);
});

// 2
app.get("/hello", (req, res) => {
  res.status(200).send(`Hello stranger!`);
});

// 3
app.get("/hello/:name*", (req, res) => {
  let name = req.params.name;
  if (name) {
    res.status(200).send(`Hello, ${name}!`);
  }
});

// 4
app.all("/sub/*", (req, res) => {
  res.status(200).send(`You requested URI: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
});

// 5
app.post("/post", (req, res) => {
  if (JSON.stringify(req.body) !== '{}') {
    res.status(200).json(req.body);
  } else {
   res.status(404).send('NOT FOUND'); 
  }
});

app.all('*', (req, res) => {
  res.send(`Wrong request!`);
});

app.use(function(err, req, res, next) {
  res.status(500).send('Something broke!');
});

app.listen(3000, () =>{
  console.log('Server start');
});