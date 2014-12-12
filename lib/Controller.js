var Tools = require('./tools');

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

	this.request.query = Tools.getURLParameters(request.url);
	this.request.params = params;

	return this;
};

Controller.prototype.extend = function(callback) {
	var _this = this;
	return function() {
		callback(_this.request, _this.response);
	};
};

Controller.prototype.execute = function(fs, path) {
	var template = '',
  _this        = this;

  fs.createReadStream(path, { encoding: 'utf8' })
    .on('error', function(err) {
      if (err.code == 'ENOENT') {
        _this.response.writeHead(500);
        _this.response.write('Template not found');
        _this.response.end();
      }
    })
    .on('data', function(chunk) {
      template += chunk;
    })
    .on('end', function() {
      _this.handleTemplate(template);
    });
};

Controller.prototype.set = function(element, value) {
  this[element] = value;
}

Controller.prototype.handleTemplate = function(template) {
  var _this = this;

  if (global.template != 'html') {
    var engine = require(global.template);

    try {
      var compiled = engine.compile(template);
      pageCompiled = compiled(_this.data);

      httpCode = _this.httpCode ? _this.httpCode : 200;
      headers = _this.headers ? _this.headers : {"context-type": "text/html"};

      _this.response.writeHead(httpCode, headers);
      _this.response.write(pageCompiled);
      _this.response.end();
    }
    catch(e) {
      _this.response.writeHead(500);
      _this.response.write('Something went wrong..');
      _this.response.end();
    }
  }
  else {
    _this.response.write(template);
    _this.response.end();
  }
}
module.exports = Controller;

