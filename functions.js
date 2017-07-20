'use strict';

const random = (rand) => {
  rand = Math.floor(Math.random() * rand);
  return rand;
};

const randomFoldier = () => {
  const maxFoldier = 10;
  let rand;
  rand = Math.floor(Math.random() * maxFoldier) + 1;
  rand = (rand >= 10) ? 10 : '0' + rand;
  return rand;
};

/*
 * return array [{path}01,{path}02,{path}03 ... {path}10]
 */
const generateRooms = (path) => {
  let result = [];
  for (let i=1; i<=10; i++) {
    // fn - номерация папки
    let fn = (i===10) ? 10 : '0' + i;
    result.push(`${path}${fn}`);
  }
  return result;
};

/*
 * boolean,
 * string
 */
const test = (power, text) => {
  if (power) {
    console.dir(text);
  }
};

module.exports = {
  random,
  randomFoldier,
  generateRooms,
  test
};
