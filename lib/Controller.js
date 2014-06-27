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
 var template = '';
 var _this = this;

 fs.createReadStream(path, {encoding:"utf8"})
  .on("error", function(err){
    if(err.code == 'ENOENT') {
    	fs.readFile('app/views/global/error.hbs', function (err, data) {
    		var compiled = Handlebars.compile(data + '');
	      var test = compiled({
	      	httpCode: 404,
	      	message: 'Template not found'
	      });
    		_this.response.writeHead(404, {"context-type": "text/html"});
    		_this.response.write(test);
      	_this.response.end();
    	});
    }
  })
  .on("data", function(chunk){
    template += chunk
  })
  .on("end", function(){
    var compiled = null;
    try {
      compiled = Handlebars.compile(template)
      var test = compiled(_this.data);
      _this.response.writeHead(200, {"context-type": "text/html"})
      _this.response.write(test)
    } catch(e) {
    	fs.readFile('app/views/global/error.hbs', function (err, data) {
    		var compiled = Handlebars.compile(data + '');
	      var test = compiled({
	      	httpCode: 500,
	      	message: 'Something went wrong'
	      });
    		_this.response.writeHead(500, {"context-type": "text/html"});
    		_this.response.write(test);
      	_this.response.end();
    	});
    }
    _this.response.end()
  })
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

