'use strict';

const f = require('./functions');
const h = require('./hide');
const seekPokemon = require('./seek');
const p = require('./pokemon');

//------------------------------------------------------------------------//

function hide(path, pokemonlist) {
  let output = Promise.resolve();
  output = output.then(
    // 1 Создаем корневую директорию path
    () => h.createDir(path)
  )
  .then(
    // 2 Создаем комнаты в директории
    (newPath) => Promise.all(f.generateRooms(newPath).map(h.createDir))
  )
  .then(
    // 3 Отбираем случайных, не больше 3-х
    (folders) => h.choosePokemon(folders, pokemonlist)
  )
  .then(
    // 4 Прячем случайных покемонов, не больше 3-х
    (result) => Promise.all(result.map(h.toPoketball))
  )
  .then(
    // 4
    response => {
      for (let pokemon of response) {
        pokemon.show('Спрятан ');
      }
      return response;
    }
  )
  .catch(
    err => {
      console.dir(err);
    }
  );
  return output;
}

function seek(path) {
  //let chain = Promise.resolve();
  let rooms = f.generateRooms(path);
  let output = Promise.all(rooms.map(seekPokemon))
    .then(response => {
      let result = new p.PokemonList();
      response.map( function(elem) {
        result = result.concat(elem);
      });
      result.show('Найдено покемонов');
      return result;
    })
    .catch(
      err => {
        console.log(err);
      }
    );
  return output;
}

module.exports = {
  hide,
  seek
};
