const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/elements';

mongoClient.connect(url, (err, db) => {
  if (err) {
    console.log('testData Connection unavailable. Error:', err);
  } else {
    //console.log('testData Connect success for', url);
    db.collection('users').count({name: {$exists:true}}, function(err, count) {
      if (err) {
        console.log(err);
      } else if (count == 0) {
        let o = {w:1};
        o.multi = true
        db.collection('users').insertMany(
          [{'name':'Bulbasaur'}, 
          {'name':'Ivysaur'},
          {'name':'Venusaur'},
          {'name':'Charmander'},
          {'name':'Squirtle'},
          {'name':'Wartortle'},
          {'name':'Blastoise'},
          {'name':'Caterpie'},
          {'name':'Butterfree'},
          {'name':'Pikachu'},], o, (err, result)=>{
          if (err) { console.log(err);} 
        });
        console.log('Тестовые данные загружены');
      }
      db.close();
    });
  }
});