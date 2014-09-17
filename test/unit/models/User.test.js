
describe.only('ConfUserModel', function() {

  describe('#find()', function() {
    it('should check find function', function (done) {
      ConfUser.find()
        .then(function(results) {
          // some tests
          done();
        })
        .catch(done);
    });
  });
});