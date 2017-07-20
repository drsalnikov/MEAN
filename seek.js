'use strict';

const debug = false;
const fs = require('fs');
const p = require('./pokemon');
const f = require('./functions');
const pokemonTxt = 'pokemon.txt';

//------------------------------------------------------------------------//

module.exports = (path) => {
  const conf = { encoding: 'utf8' };
  return new Promise(function(resolve) {
    let fullpath = `${path}/${pokemonTxt}`;
    fs.access(fullpath, fs.constants.R_OK, (err) => {
      //console.log(err);
      if (!err) {
        fs.readFile(fullpath, conf, (err, data) => {
          let results = new p.PokemonList();
          if (!err) {
            let pokemons = data.split("\r\n");
            for (let pokemon of pokemons){
              if (pokemon !== ''){
                results.add(pokemon.split('|')[0], pokemon.split("|")[1])
              }
            }
            resolve(results);
          }
        });
      } else {
        resolve(new p.PokemonList());
      }
    });
  });
};
