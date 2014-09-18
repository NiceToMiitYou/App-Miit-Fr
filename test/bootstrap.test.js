var Sails = require('sails');

before(function(done) {
  Sails.lift({
    
	environment: 'testing'

  }, function(err, sails) {
    if (err) return done(err);

    done(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});
