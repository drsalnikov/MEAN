const expect = require('chai').expect;
const assert = require('chai').assert;

const Pokemon = require('../ndUnit/Pokemon.js');
const PokemonList = require('../ndUnit/PokemonList.js');


describe('Unit test', () => {

  describe('Pokemon', () => {
    let pokemonA;
    let pokemonB;
    before(() => {
      pokemonA = new Pokemon('Pikachu', 1);
      pokemonB = new Pokemon('Bulbasaur', 2);
      expect(pokemonA).to.be.an.instanceof(Pokemon);
    });

    it('1.1 тест на метод show класса Pokemon', () => {      
      assert.deepEqual(pokemonA.show(), `Name: Pikachu. Level: 1`);
    });

    it('1.2 тест на метод valueOf класса Pokemon', () => {
      assert.deepEqual(pokemonA + 0, 1);
      assert.deepEqual(pokemonB + 0, 2);
    });

  });

  describe('PokemonList', () => {
    var i = 0;
    pikachu = new Pokemon('Pikachu', 10);
    bulbasaur = new Pokemon('Bulbasaur', 20);
    charmander = new Pokemon('Charmander', 30);
    list = new PokemonList();
    list.push(pikachu, bulbasaur, charmander);

    before(() => {
      testList = new PokemonList();
      expect(testList).to.be.an.instanceof(Array);
    });

    beforeEach (() => {
      //console.log(i, list);
      //i = 1 + i;
      //console.log(list.max());
    });

    it('2.1 тест на метод add класса PokemonList', () => {
      const testName = 'Chukazavr';
      const testLvl = 5;
      list.add(testName, testLvl);
      let testPokemon = list.findByName('Chukazavr');
      expect(testPokemon).to.be.an.instanceof(Pokemon);
      assert.deepEqual(testPokemon.name, testName);
      assert.deepEqual(testPokemon.lvl, testLvl);
    });

    it('2.2 тест на метод show класса PokemonList', () => {
      assert.include(list.show(), 'Pikachu. Level: 1');
      assert.include(list.show(), 'Bulbasaur. Level: 2');
      assert.include(list.show(), 'Pokemons in list: ' + list.length);
    });

    it('2.3 тест на метод max класса PokemonList', () => {
      assert.deepEqual(list.max(), charmander);
    });

  });

});
