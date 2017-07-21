'use strict';

const Pokemon = require('./Pokemon.js');

module.exports =  class PokemonList extends Array {

  add(name, lvl) {
    let pokemon = new Pokemon(name, lvl);
    this.push(pokemon);
  }

  show() {
    let str = '';
    str = `Pokemons in list: ${this.length} \n`;
    for (let elem of this) {
      str = str + elem.show()+'\n';
    }
    return str;
  }

  max() {
    return this.find( (elem) => {
      return elem.lvl === Math.max(...this);
    });
  }

  findByName(pokemonName) {
    return this.find((pokemon)=>{
      return pokemon.name == pokemonName;
    });
  }
}
