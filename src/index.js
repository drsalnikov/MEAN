'use strict';

class Calculator {

  constructor(){
    this.args = '';
    this.defaultSeparator = /[\n,]/;
    this.activeSeparator = /[\n,]/;
    this.patternSeparator = /\/\/<(.*)>\n.*/;
    this.patternValue = /\/\/<.*>\n(.*)/;
    this.result;
  }

  setArguments(args) {
    this.args = args;
  }

  getArguments() {
    return this.args;
  }

  add (args) {
    this.initialization(args);

    return this.checkNegativeNumbers(this.args.split(this.activeSeparator)
                                              .map(this.toNumber))
                                                  .reduce(this.sum,0);;
  }

  checkNegativeNumbers(arr) {
    let msg;
    arr = arr.map((elem) => {
      if(elem < 0) {
        if(!msg) {
          msg = elem.toString();
        } else {
          msg = `${msg},${elem}`;
        }
      }

      if (elem > 1000) {
        elem = 0;
      }
      return elem;
    });

    if (msg) {
      throw new Error(`Отрицательные числа не допустимы. ${msg}`);
    }

    return arr;
  }

  sum(sum, number) {
    return sum + number;
  }

  toNumber(elem) {
    return Number(elem);
  }

  getErrorMsg(){
    return this.errorMsg;
  }

  validateElements(resultArray) {
    for (var elem in resultArray) {
      console.log(elem);
    }
  }

  validateArgument(args) {

  }

  getSeparator(){
    return this.activeSeparator;
  }

  setSeparator(separator){
    this.activeSeparator = separator;
  }

  initialization(args) {
    if (args.search(/,\n/) > 0 || args.search(/\n,/) > 0) {
      throw new Error('bad arguments');
    };    

    if (this.patternSeparator.test(args)){
      this.setSeparator(args.replace(this.patternSeparator, '$1'));
      this.setArguments(args.replace(this.patternValue, '$1'));
    } else {
      this.setArguments(args);
      this.setSeparator(this.defaultSeparator);
    }

  }

}

module.exports = Calculator;
