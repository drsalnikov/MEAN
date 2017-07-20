'use strict';

const mongo = require('mongodb');
const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/phonebook';

const getPhonelist = (request = {}) => {
  return new Promise(function(resolve, reject) {
    mongoClient.connect(url, (err, db) => {
      if (err) {
        console.log('getPhonelist Connection unavailable. Error:', err);
      } else {
        //console.log('getPhonelist Connect success for', url);
        resolve(db.collection('phonebook').find(request).toArray());
      }
    });
  });
};

const getPerson = (id='') => {
  return new Promise(function(resolve, reject) {
    mongoClient.connect(url, (err, db) => {
      if (err) {
        console.log('getPerson Connection unavailable. Error:', err);
      } else {
        //console.log('getPerson Connect success for', url);
        let o_id = new mongo.ObjectID(id);
        db.collection('phonebook').findOne({"_id": o_id}, (err, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(err);
          }
        });
      }
    });
  });
};

const updatePerson = (request) => {
  return new Promise(function(resolve, reject) {
    mongoClient.connect(url, (err, db) => {
      if (err) {
        console.log('setPerson Connection unavailable. Error:', err);
      } else {
        //console.log('getPerson Connect success for', url);
        let o_id = new mongo.ObjectID(request.id);
        db.collection('phonebook').updateOne({"_id": o_id}, 
          {$set: {name: request.name, phonenumber: request.phonenumber, appendix: request.appendix}},
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      }
    });
  });
};

const addPerson = (person) => {
  return new Promise(function(resolve, reject) {
    mongoClient.connect(url, (err, db) => {
      if (err) {
        console.log('addPerson Connection unavailable. Error:', err);
      } else {
        //console.log('getPerson Connect success for', url);
        db.collection('phonebook').insert({"name": person.name, "phonenumber": person.phonenumber, "appendix": person.appendix}, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      }
    });
  });
};

const deletePerson = (id) => {
  return new Promise(function(resolve, reject) {
    mongoClient.connect(url, (err, db) => {
      if (err) {
        console.log('deletePerson сonnection unavailable. Error:', err);
      } else {
        let o_id = new mongo.ObjectID(id);
        //console.log('getPerson Connect success for', url);
        db.collection('phonebook').deleteOne({ '_id': o_id }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      }
    });
  });
};

module.exports = {
  getPhonelist,
  getPerson,
  updatePerson,
  addPerson,
  deletePerson
}
