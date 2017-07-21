'use strict';

module.exports = class Pokemon {
  constructor(name, lvl) {
    this.name = name;
    this.lvl = lvl;
  }

  show() {
    return `Name: ${this.name}. Level: ${this.lvl}`;
  }

  valueOf() {
    return this.lvl;
  }
}
