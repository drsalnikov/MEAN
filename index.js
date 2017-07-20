'use strict';

const http = require('http');
const queryString = require('querystring');

const port = 80;
const httpServer = http.createServer();


// 1. Get data from user
// 2. Request to netology.tomilomark.ru API like client
// 3. Return json data by http.createServer localhost
// data ex.{"firstName": "Mark",   "lastName": "Tomilo",   "secretKey": "w45wdgwe5r235rqwefdsg" }

/*
 *
 */
const serverHandler = (req, res) => {
  let data = '';
  let user = {};

  req.on('data', chunk => {
    data += chunk;
  });

  req.on('end', () => {
    let parseData = parse(data, req.headers['content-type']);
    user.firstName = parseData.firstName || 'mark';
    user.lastName = parseData.lastName || 'tomilo';
    let postData = JSON.stringify(user);
    clientResponse(postData, user)
      .then(
        response => {
          res.writeHead(200, 'OK', {'Content-Type': 'application/json'});
          res.write(JSON.stringify(response));
          res.end();
        }
      )
      .catch(
        err => {
          console.dir(err);
        }
      );
  });
};

/*
 *
 */
const clientResponse = (postData, user) => {
  return new Promise(function(resolve, reject) {
    let options = {
      hostname: 'netology.tomilomark.ru',
      port: 80,
      path: '/api/v1/hash',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Firstname': user.firstName
      }
    };
    let request = http.request(options, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        user.secretKey = JSON.parse(data).hash;
        resolve(user);
      });
      response.on('error', (e) => {
        reject(`problem with request: ${e.message}`);
      });
    });
    request.write(postData);
    request.end();
  });
};

/*
 *
 */
const parse = (data, contentType) => {
  let result;
  switch (contentType) {
    case 'application/json':
      result = JSON.parse(data);
      break;
    case 'application/x-www-form-urlencoded':
      result = queryString.parse(data);
      break;
  }
  return result;
};

//------------------

httpServer.on('error', err => console.error(err));
httpServer.on('request', serverHandler);
httpServer.on('listening', () => {
  console.log('Start HTTP on port %d', port);
});

httpServer.listen(port);
