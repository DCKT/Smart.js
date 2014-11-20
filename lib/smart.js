var Router = require('./Router');
var Controller = require('./Controller');

var Smart = function() {
	this.Router = new Router();
	this.Controller = new Controller();

  global.template = 'html';
  global.cssPreproc = false;
};

Smart.prototype.use = function(options) {
  global.template = options.template ? options.template : 'html';
  global.cssPreproc = options.css ? options.css : false;
}

module.exports = new Smart();