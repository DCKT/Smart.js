var Path = require('path'),
fs       = require('fs');

var Assets = function(res) {
	this.path         = '';
	this.extensionJS  = '';
	this.extensionCSS = '';
	this.url          = '';
	this.res          = res;
};

Assets.prototype.check = function(url) {
	this.url = url;
	this.extension = Path.extname(url);

	return this.extension ? true : false;
};

Assets.prototype.getPath = function() {
	var _this    = this,
	urlRequested = _this.url,
	path         = 'app/assets/';

	path += _this.extension == ".css" ? "stylesheets" : "";
	path += _this.extension == ".js" ? "scripts" : "";

	if (_this.extension == ".png" ||
		  _this.extension == ".jpg" ||
		  _this.extension == ".ico") {
		path += "images";
	}

	_this.path = path;

	return path;
};

Assets.prototype.isCSS = function() {
	return this.extension === '.css' ? true : false;
};

Assets.prototype.readImage = function() {
	var _this = this,
	path      = _this.path;
	path      += _this.url;

	fs.readFile(path, function(err, data) {
		if (err) { console.log("ERROR LOADING FILE WITH " + _this.url + " URL"); }
    	_this.res.end(data);
	});
};


Assets.prototype.read = function() {
  var _this = this,
  filePath  = this.path + this.url,
  file      = "";

  fs.createReadStream(filePath, { encoding: 'utf8' })
    .on('error', function (err) {
      console.error(err);
      _this.res.writeHead(500);
      _this.res.end('Error reading file '+ filePath);
    })
    .on('data', function(chunk) {
      file += chunk;
    })
    .on('end', function() {
      _this.res.end(file);
    });


}
module.exports = Assets;