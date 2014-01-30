var Controller = function(request, parameters) {
	this.request = request;
	this.parameters = parameters;
}

Controller.prototype.getParameters = function() {
	console.log(this.parameters);
};

module.exports = Controller;

