var Smart = require('../lib/smart'),
assert = require("assert");

describe('Router', function(){
  describe('map', function(){
    it('should have the index route by default', function() {
      assert.equal(1, Smart.Router.routes.length);
      assert.equal('/', Smart.Router.routes[0]);
    });

    it('should accept a list of string', function(){
      Smart.Router.map('/hello', '/toto');
      assert.equal(3, Smart.Router.routes.length);
    });
  });
});