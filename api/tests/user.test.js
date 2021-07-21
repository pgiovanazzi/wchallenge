const app = require("../app");

const supertest = require('supertest')

describe('POST /api/user', function() {
  it('responds with json "The username already exist" when the user exists.', done => {
    const data = {
        nombre: "Paulo",
        apellido: "Giovanazzi",
        username:"pgiovanazzi",
        password:"pgiovanazzi9",
        favorite_coin: "USD"
    };
    supertest('http://localhost:3000/')
      .post('/api/user')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', "text/html; charset=utf-8")
      .expect(404)
      .expect((res) => {
        res.body.message = "The username already exist."
       })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});