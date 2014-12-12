var Router = require('./Router');
var Controller = require('./Controller');
var Tools = require('./tools');

var Smart = function() {
	this.Router = new Router();
	this.Controller = new Controller();
  this.Tools = Tools;
  global.template = 'html';
};

Smart.prototype.use = function(options) {
  global.template = options.template ? options.template : 'html';
}

module.exports = new Smart();