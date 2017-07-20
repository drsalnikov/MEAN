'use strict';

const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/phonebook';

mongoClient.connect(url, (err, db) => {
  if (err) {
    console.log('testData connection unavailable. Error:', err);
  } else {
    console.log('testData connect success for', url);
    db.collection('phonebook').count({name: {$exists:true}}, function(err, count) {
      if (err) {
        console.log(err);
      } else if (count == 0) {
        let o = {w:1};
        o.multi = true
        db.collection('phonebook').insertMany(
          [
            {'name':'Bulbasaur', 'phonenumber':'8-800-2000-600', 'appendix':''}, 
            {'name':'Ivysaur', 'phonenumber':'8-800-2000-601', 'appendix':''},
            {'name':'Venusaur', 'phonenumber':'8-800-2000-602', 'appendix':''},
            {'name':'Charmander', 'phonenumber':'8-800-2000-603', 'appendix':''},
            {'name':'Squirtle', 'phonenumber':'8-800-2000-604', 'appendix':''},
            {'name':'Wartortle', 'phonenumber':'8-800-2000-605', 'appendix':''},
            {'name':'Blastoise', 'phonenumber':'8-800-2000-606', 'appendix':''},
            {'name':'Caterpie', 'phonenumber':'8-800-2000-607', 'appendix':''},
            {'name':'Butterfree', 'phonenumber':'8-800-2000-608', 'appendix':''},
            {'name':'Pikachu', 'phonenumber':'8-800-2000-609', 'appendix':''}
          ], o, (err, result)=>{
          if (err) { console.log(err);} 
        });
        console.log('Тестовые данные загружены');
      }
      db.close();
    });
  }
});
