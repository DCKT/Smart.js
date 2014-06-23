var HelloController = function(request, parameters) {
	this.request = request;
	this.parameters = parameters;
}

HelloController.prototype.execute = function (callback) {
	callback();
}


module.exports = HelloController;