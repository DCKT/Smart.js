var Controller = require('../../libs/Controller.js');
IndexController.prototype = new Controller();
IndexController.prototype.constructor = IndexController;

function IndexController(request, parameters) {
	this.request = request;
	this.parameters = parameters;
}

IndexController.prototype.execute = function (callback) {
	var data = {
		name: "DCK"
	};

	//this.getParameters();

	callback(data);
}

module.exports = IndexController;