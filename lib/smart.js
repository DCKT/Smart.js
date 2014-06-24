var Router = require('./Router');
var Controller = require('./Controller');

var Smart = function() {
	this.Router = new Router();
	this.Controller = new Controller();
};

module.exports = Smart;