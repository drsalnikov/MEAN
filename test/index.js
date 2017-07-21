'use strict';

let assert = require('chai').assert;
let expect = require('chai').expect;
let should = require('chai').should();


let Calculator = require('../src');
let calc = new Calculator();

describe('Calculator', () => {
  it('0 by default', () => {
    calc.add('').should.equal(0);
  });

  it('arg: ( , 1) ', () => {
    calc.add(' ,1').should.equal(1);
  });

  it('1 return 1', () => {
    calc.add('1').should.equal(1);
  });

  it('2 return 2', () => {
    calc.add('2').should.equal(2);
  });

  it('1 + 2  = 3', () => {
    calc.add(' 1, 2').should.equal(3);
  });

  it('1 + 2 + 5  = 8', () => {
    calc.add('1,2,5').should.equal(8);
  });

  it('1\\n2,3 = 6', () => {
    calc.add('1\n2,3').should.equal(6);
  });

  it('1,\\n', () => {
    let catched = false;
    try {
      calc.add('1\n,');
    } catch (error) {
      error.message.should.equal('bad arguments');
      catched = true;
    }
    assert.equal(catched, true);
  });

  it('//<;>\\n1;2 = 3', () => {
    calc.add('//<;>\n1;2').should.equal(3);
  });

  it('Отрицательные числа 1,-2,-3', () => {
    expect(function(){
        calc.add('-1,-2,-3');
    }).to.throw('Отрицательные числа не допустимы. -1,-2,-3');
  });

  it('Числа больше 1000 игнорируются. Выражение 2 + 1001 будет равно 2.', () => {
    calc.add('2,1001').should.equal(2);
  });

  it('Проверка длинного разделителя //<***>\\n1***2***3 должно вернуть 6', () => {
    calc.add('//<***>\n1***2***3').should.equal(6);
  });

  it('Использование нескольких разделителей //<*><%>\\n1*2%3 должно вернуть 6', () => {
    calc.add('//<*><%>\n1*2%3').should.equal(6);
  });

});
