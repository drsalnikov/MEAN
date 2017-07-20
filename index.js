'use strict';

const hidenseek = require('./hidenseek');
const p = require('./pokemon');
const path = require('path');

//const destination = './field/';

switch (process.argv[2]) {
  case 'hide':
    let destination = process.argv[3];
    try {
      require(process.argv[4]);
      let data = require(process.argv[4]);
      let list = new p.PokemonList();
      for (let pokemon of data) {
        list.add(pokemon.name, pokemon.lvl);
      }
      let resultHide = hidenseek.hide(destination, list);
      //setTimeout(()=>{console.log(resultHide);}, 500);
    } catch (e) {
      if (e.code === 'MODULE_NOT_FOUND') {
        console.log('Не найден json. Формат: ./file.json');
      } else if (path.extname(process.argv[4]) !== '.json') {
        console.log('Файл не .json. Формат: ./file.json');
      } else {
        console.log(e);
      }
      break;
    }
    break;
  case 'seek':
      let resultSeek = hidenseek.seek(process.argv[3]);
      //setTimeout(()=>{console.dir(resultSeek);}, 500);
     // setTimeout(()=>{resultSeek.show();}, 1000);
    break;
  default:
    console.log(`command:
      for hide: 'hide path json'
      for seek: 'seek path'

      example:
      node index hide ./field/ ./pokemons.json
      node index seek ./field/
      `);
}
