
var request = require('supertest');
var should = require('should');

describe('ConfUserController', function() {

  describe('#login()', function() {
    it('Wrong login', function (done) {
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
  });

});