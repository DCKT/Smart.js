var Controller = function() {
	this.data = {};
}

Controller.prototype.setup = function(request, response, params) {
	this.request  = request;
	this.response = response;
	var _this     = this;
	
	this.response.send = function(data) {
		var keyNames = Object.keys(data);

		keyNames.forEach(function (el) {
			_this.data[el] = data[el];
		});
	};
	this.request.query = Controller.getURLParameters(request.url);
	this.request.params = params;
	return this;
};

Controller.prototype.extend = function(callback) {
	var _this = this;
	return function() {
		callback(_this.request, _this.response);
	};
};

Controller.prototype.execute = function(Handlebars, fs, path) {
	var template = fs.readFileSync(path, "utf8"),
	pageBuilder  = Handlebars.compile(template),
	pageText     = pageBuilder(this.data);

  this.response.writeHead(200, {"Context-Type": "text/html"});
  this.response.write(pageText);
  this.response.end();
};

Controller.getURLParameters = function(url) {
  if (url.indexOf("?") == -1) return false;
  var parameters   = url.slice(url.indexOf("?") + 1, url.length).split("&");
  var paramsObject = {};
  
  parameters.forEach(function(el) {
    var attribute = el.slice(0, el.indexOf("=")); 
    var value     = el.slice(el.indexOf("=") + 1, el.length);

    if (!isNaN(parseInt(value))) {
      value = parseInt(value);
    }

    paramsObject[attribute] = value;        
  });
  
  return paramsObject;
};
module.exports = Controller;

