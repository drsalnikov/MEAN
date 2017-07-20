'use strict';

class Pokemon {
  constructor(name, lvl) {
    this.name = name;
    this.lvl = lvl;
  }

  show(text = '') {
    console.log(`${text} Name: ${this.name}. Level: ${this.lvl}`);
  }

  valueOf() {
    return this.lvl;
  }
}

class PokemonList extends Array {

  add(name, lvl) {
    let pokemon = new Pokemon(name, lvl);
    this.push(pokemon);
  }

  show(text = '') {
    console.log(`${text}: ${this.length}`);
    console.log('-------------');
    for (let elem of this) {
      elem.show();
    }
    console.log('-------------');
  }

  max() {
    return this.find((elem) => {
      return elem.lvl === Math.max(...this);
    });
  }
}

module.exports = {
  Pokemon,
  PokemonList
};
