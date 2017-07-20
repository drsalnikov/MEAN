'use strict';

//----------------------------------------------------

const crypto = require('crypto');
const hash = crypto.createHash('md5');
const fs = require('fs');

const Readable = require('stream').Readable;
const Writable = require('stream').Writable;
const Transform = require('stream').Transform;

let iFilename = 'input.txt';
let oFilename = 'output.txt';
let textToCrypt = '123';

const input = fs.createReadStream(iFilename, {
  flags: 'a+',
  encoding: 'utf8',
  fd: null,
  mode: 0o666,
  autoClose: true
});
const output = fs.createWriteStream(oFilename, {
  flags: 'w',
  defaultEncoding: 'utf8',
  fd: null,
  mode: 0o666,
  autoClose: true
});




class MyTransform extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    this.push(hash.update(chunk).digest('hex'));
    callback();
  }
}

// prepare
fs.writeFileSync(iFilename, textToCrypt);



// 1
//input.pipe(hash).pipe(output);
//hash.pipe(process.stdout);

// 2
let mt = new MyTransform();
//input.pipe(mt).pipe(output);
//mt.pipe(process.stdout);


// appendix -----------------------------------------

class ApdxReadable extends Readable {
  constructor(options = {}) {
    options.objectMode = true;
    super(options);
  }

  _read(size) {
    setTimeout( () => {
      let data = Math.floor(Math.random() * 10);
      this.push(data);
    }, 100);
  }
}

class ApdxWritable extends Writable {
  constructor(options = {}) {
    options.objectMode = true;
    super(options);
  }

  _write(chunk, encoding, done) {
    console.log(chunk);
    done();
  }
}

class ApdxTransform extends Transform {
  constructor(options ={}) {
    options.objectMode = true;
    super(options);
  }

  _transform(chunk, encoding, callback) {
    switch(chunk) {
      case 0 :
        chunk = 'zero';
        break;
      case 1 :
        chunk = 'ichi';
        break;
      case 2 :
        chunk = 'ni';
        break;
      case 3 :
        chunk = 'san';
        break;
      case 4 :
        chunk = 'shi';
        break;
      case 5 :
        chunk = 'go';
        break;
      case 6 :
        chunk = 'rok';
        break;
      case 7 :
        chunk = 'nana';
        break;
      case 8 :
        chunk = 'achi';
        break;
      case 9 :
        chunk = 'kyuu';
        break;
      case 10 :
        chunk = 'juu';
        break;
    }
    this.push(chunk);
    setTimeout(() => {
      callback();
      }, 1000);
  }
}


let ar = new ApdxReadable();
let aw = new ApdxWritable();
let at = new ApdxTransform();

ar.pipe(at).pipe(aw);
