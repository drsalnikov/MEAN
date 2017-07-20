const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/elements';

const addName = (names) => {
  mongoClient.connect(url, (err, db) => {
    if (err) {
      console.log('addName Connection unavailable. Error:', err);
    } else {
      //console.log('addName Connect success for', url);
      names.forEach((name, i)=>{
        // 1 - имя функции, поэтому пропускаем
        if (i>0) {
          db.collection('users').insert({name: name}, (err, result)=>{
            if (err) {
              console.log(err,name,i);
            } else {
              console.log('Добавлено имя ', name);
            }
          });    
        }
      });
      db.close();
    }
  });
};

const showNames = (names) => {
  mongoClient.connect(url, (err, db) => {
    if (err) {
      console.log('showNames Connection unavailable. Error:', err);
    } else {
      //console.log('showNames Connect success for', url);
      if (names[1]) {
        db.collection('users').find({name:{$in:names}},{name:true,_id:false}).forEach((doc)=>{
          console.log('Найдено:',doc.name);
          db.close();
        });
      } else {
        db.collection('users').find({},{name:true,_id:false}).forEach((doc)=>{
          console.log('Найдено:',doc.name);
          db.close();
        });
      }
    }
  });
};

const changeNames = (names, changedNames) => {
  mongoClient.connect(url, (err, db) => {
    if (err) {
      console.log('changeNames Connection unavailable. Error:', err);
    } else {
      //console.log('changeNames Connect success for', url);
      if(names[1] && names[2]) {
        let o = {};
        o.multi = true
        db.collection('users').updateMany({name:names[1]}, {$set:{name:names[2]},$push:{oldnames:names[1]}}, o, (err, r)=>{
          if (err) {
            console.log('changeNames Error:', err);
          } else if (r.result.n > 0) {
            console.dir(`Изменено ${r.result.n} значение`);
          } else {
            console.log('Имена для изменения не найдены.');
          }
          db.close();
        });        
      }
    }
  });
};

const showChangedNames = (names) => {
  mongoClient.connect(url, (err, db) => {
    if (err) {
      console.log('showChangedNames Connection unavailable. Error:', err);
    } else {
      //console.log('showChangedNames Connect success for', url);
      if (names[1]) {
        db.collection('users').find(
            {oldnames:{$in:names}},
            {name:true, oldnames:true, _id:false}
          ).forEach((doc)=>{
          console.log('У ',doc.name,' были имена ' ,doc.oldnames);
          db.close();
        });
      } else {
        db.collection('users').find({oldnames:{$exists:true}},{name:true, oldnames:true, _id:false}).forEach((doc)=>{
          console.log('У ',doc.name,' были имена ' ,doc.oldnames);
          db.close();
        });
      }
    }
  });
};

const resetNames = (names) => {
  mongoClient.connect(url, (err, db) => {
    if (err) {
      console.log('resetNames Connection unavailable. Error:', err);
    } else {
      //console.log('resetNames Connect success for', url);
      let o = {};
      o.multi = true
      db.collection('users').deleteMany({oldnames:{$exists:true}}, o, (err, r)=>{
        if (err) {
          console.log('resetNames Error:', err);
        } else {
          console.log('Удалено', r.deletedCount, 'документов');
        }
        db.close();
      });
    }
  });
};

module.exports = {
  addName,
  showNames,
  changeNames,
  showChangedNames,
  resetNames
}