var Controller = function() {
	this.data = {};
}

Controller.prototype.setup = function(request, response) {
	this.request    = request;
	this.response   = response;

	var _this = this;
	this.response.send = function(data) {
		var keyNames = Object.keys(data);

		keyNames.forEach(function (el) {
			_this.data[el] = data[el];
		});
	}
};

Controller.prototype.extend = function(callback) {
	callback(this.request, this.response);
};

Controller.prototype.execute = function(Handlebars, fs, path) {
	var template = fs.readFileSync(path, "utf8");
  var pageBuilder = Handlebars.compile(template);
  var pageText = pageBuilder(this.data);

  this.response.writeHead(200, {"Context-Type": "text/html"});
  this.response.write(pageText);
  this.response.end();
};

module.exports = Controller;

