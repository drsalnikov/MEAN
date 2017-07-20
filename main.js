'use strict';

class Pokemon {
  constructor(name, lvl) {
    this.name = name;
    this.lvl = lvl;
  }

  show() {
    console.log(`Name: ${this.name}. Level: ${this.lvl}`);
  }

  valueOf() {
    return this.lvl;
  }
}

class PokemonList extends Array {

  add(name, lvl) {
    let pokemon = new Pokemon(name, lvl);
    this.push(pokemon);
    console.log(`to list added: ${name}`);
  }

  show() {
    console.log(`Length of list is ${this.length}`);
    for (let elem of this) {
      elem.show();
    }
    console.log('-------------');
  }

  max() {
    return this.find( (elem) => {
      return elem.lvl === Math.max(...this);
    });
  }
}

var Bulbasaur = new Pokemon('Bulbasaur', 1);
var Charmander = new Pokemon('Charmander', 2);
var Pikachu = new Pokemon('Pikachu', 3);
var Nidorino = new Pokemon('Nidorino', 4);
var Vulpix = new Pokemon('Vulpix', 5);
var Jynx = new Pokemon('Jynx', 6);

var lost = new PokemonList(Bulbasaur, Charmander, Pikachu);
var found = new PokemonList(Nidorino, Vulpix, Jynx);

lost.add('Snorlax', 2);
found.add('Torchic', 1);


/*
lost.show();
found.show();

found.push(lost.shift());

lost.show();
found.show();
*/
console.log('----------------------------------------');
console.log(found.max());
console.log(lost.max());
