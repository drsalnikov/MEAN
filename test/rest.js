const supertest = require('supertest');
const expect = require('chai').expect;
const should  = require('chai').should();
const assert = require('chai').assert;

describe('REST API', () => {
  let server;

  before((done) => {
    require('../ndRest/index.js');

    setTimeout(() => {
      server = supertest.agent('http://localhost:3000');
      done();
    }, 1000);
  });

  describe('Create', () => {
    it('Тест на создание пользователя по REST протоколу', (done) => {
      server
        .post('/api/users/001')
        .query({ name: 'Manny'})
        .query({ score: '1' })
        .end((err, res) => {
          if (err) {
            throw err;
          }
          res.status.should.equal(200);
          res.body.id.should.equal('001');
          res.body.name.should.equal('Manny');
          res.body.score.should.equal('1');

          done();
        });

    });

    it('Тест на ошибку при создании пользователя по REST протоколу', (done) => {
      server
        .post('/api/users/001')
        .end((err, res) => {
          if (err) {
            throw err;
          }
          assert.include(res.text, 'PARAMS_ERROR');
          res.status.should.equal(400);

          done();
        });

    });
  });

  describe('Delete', () => {
    it('Тест на удаление пользователя по id по REST протоколу', (done) => {
      server
        .delete('/api/users/001')
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res.status).to.equal(200);

          done();
        });

    });

    it('Тест на ошибку при удалении пользователя по REST протоколу', (done) => {
      server
        .delete('/api/users/smth')
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res.status).to.equal(400);

          done();
        });

    });

    it('Тест на удаление всех пользователей по REST протоколу', (done) => {
      server
        .delete('/api/users')
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res.status).to.equal(200);

          done();
        });
    });   
 
  });

});
