var Controller = function() {
	this.data       = [];
}

Controller.prototype.setup = function(request, response) {
	this.request    = request;
	this.response   = response;
};

Controller.prototype.extend = function(callback) {
	callback(this.request, this.response);
};

Controller.prototype.send = function(data) {
	this.data.push(data)
};

Controller.prototype.execute = function(Handlebars, fs, path) {
	var template = fs.readFileSync(path, "utf8");
  var pageBuilder = Handlebars.compile(template);
  var pageText = pageBuilder(this.data);
  res.writeHead(200, {"Context-Type": "text/html"});
  this.response.write(pageText);
  this.response.end();
};

module.exports = Controller;

