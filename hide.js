'use strict';

const debug = false;
const fs = require('fs');
const p = require('./pokemon');
const f = require('./functions');
const pokemonTxt = 'pokemon.txt';

//------------------------------------------------------------------------//

/*
 * return Promise
 */
const createDir = (path) => {
  return new Promise(function(resolve, reject) {
    fs.mkdir(`${path}`, err => {
      if (err) {
        if (err.code === 'EEXIST') {
          // EEXIST папка уже создана
          f.test(debug, `createDir папка была создана ${path}`);
          resolve(path);
        } else {
          reject(`Ошибка createDir ${path} ${err}`);
        }
      } else {
        f.test(debug, `createDir папка создана ${path}`);
        resolve(path);
      }
    });
  });
};

/*
 * return Promise
 */
const choosePokemon = (folders, pokemonlist) => {
  return new Promise(function(resolve) {
    let result = [];
    let check = pokemonlist instanceof p.PokemonList;
    f.test(debug, `choosePokemon получил всего ${pokemonlist.length} PokemonList, instanceof PokemonList ${check}`);
    // Выбираем не больше 3-х случайных покемонов из pokemonlist
    for (let i = 0; i < f.random(3) + 1; i++) {
      let rand = f.random(pokemonlist.length - i);
      result[i] = {};
      result[i].pokemon = pokemonlist.splice(rand, 1)[0];
      result[i].folder = folders[f.random(10)];
    }
    f.test(debug, `choosePokemon отобрал ${result.length}`);
    resolve(result);
  });
};

/*
 * return Promise
 */
const toPoketball = (poketdata) => {
  // создаем файл pokemon.txt формата 'Name|lvl'
  return new Promise(function(resolve, reject) {
    f.test(debug, `toPoketball получил ${poketdata.pokemon.name} ${poketdata.pokemon.lvl} ${poketdata.folder}`);

    const fname = `${poketdata.folder}/${pokemonTxt}`;
    const text = `${poketdata.pokemon.name}|${poketdata.pokemon.lvl}` + '\r\n';

    fs.writeFile(fname, text, {flag: 'a+'}, (err) => {
      if (err) {
        reject(err);
      }
      resolve(poketdata.pokemon, poketdata.folder);
      f.test(debug, `toPoketball спрятал ${poketdata.pokemon.name} в ${poketdata.folder}`);
    });
  });
};

module.exports = {
  createDir,
  choosePokemon,
  toPoketball
};

