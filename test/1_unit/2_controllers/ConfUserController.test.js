
var request = require('supertest');
var should = require('should');

describe('ConfUserController', function() {

  describe('#login()', function() {

    it('wrong login', function (done) {
      request(sails.hooks.http.app)
        .post('/api/public/user/login')
        .send({ mail: 'test', password: 'test' })
        .expect(200)
        .end(function(err, res) {
        	if(err) done(err);

        	(res.body).should.be.an.instanceOf(Object);
        	(res.body).should.have.properties({
        		'done': true,
        		'exist': false
        	});

        	done();
        });
    });

    it('login with test@test.fr and wrong password', function (done) {
      request(sails.hooks.http.app)
        .post('/api/public/user/login')
        .send({ mail: 'test@test.fr', password: 'test' })
        .expect(200)
        .end(function(err, res) {
            if(err) done(err);

            (res.body).should.be.an.instanceOf(Object);
            (res.body).should.have.properties({
                'done': true,
                'exist': true,
                'connected': false
            });

            done();
        });
    });

    it('login with test@test.fr and right password', function (done) {
      request(sails.hooks.http.app)
        .post('/api/public/user/login')
        .send({ mail: 'test@test.fr', password: 'password' })
        .expect(200)
        .end(function(err, res) {
            if(err) done(err);

            (res.body).should.be.an.instanceOf(Object);
            (res.body).should.have.properties({
                'done': true,
                'exist': true,
                'connected': true
            });
            
            done();
        });
    });

  });

});