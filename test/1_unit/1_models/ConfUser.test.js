
describe.only('ConfUser', function() {

  describe('#create()', function() {

    it('create empty user', function (done) {
      ConfUser.create().exec(function(err, created) {
        if ( err )
          done();
        else
          done(new Error('Should not be created'));
      });
    });

    it('create user only with mail', function (done) {
      ConfUser.create({
        mail: 'test@test.fr'
      }).exec(function(err, created) {
        if ( err )
          done();
        else
          done(new Error('Should not be created'));
      });
    });

    it('create user only with wrong mail', function (done) {
      ConfUser.create({
        mail: 'testtest.fr',
        password: 'password'
      }).exec(function(err, created) {
        if ( err )
          done();
        else
          done(new Error('Should not be created'));
      });
    });

    it('create user only with password', function (done) {
      ConfUser.create({
        password: 'password'
      }).exec(function(err, created) {
        if ( err )
          done();
        else
          done(new Error('Should not be created'));
      });
    });

    it('create minimalist user', function (done) {
      ConfUser.create({
        mail: 'test@test.fr',
        password: 'password'
      }).exec(function(err, created) {
        if ( err )
          done( err );
        else {

          (created).should.be.an.instanceOf(Object);
          (created).should.have.properties({
            'mail': 'test@test.fr',
            'password': 'password'
          });

          done();
        }
      }); 
    });


  });


  describe('#find()', function() {

    it('find by mail test@test.fr', function (done) {
      ConfUser.findOneByMail('test@test.fr')
        .exec(function(err, user) {
          if( err ) done(err);

          (user).should.be.an.instanceOf(Object);
          (user).should.have.properties({
            'mail': 'test@test.fr',
            'password': 'password'
          });

          done();
        });
    });


  });
});