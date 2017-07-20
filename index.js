const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
const rpc = require('./rpc');

let data = require('./users');
let app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.users = data;
  next();
});

app.use('/api', api);
app.use('/rpc', rpc);

app.all('*', (req, res) => {
  res.send(`
  1. /api/users
  2. /rpc`);
});

app.use(function(err, req, res, next) {
  //console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () =>{
  console.log('Server start');
});
