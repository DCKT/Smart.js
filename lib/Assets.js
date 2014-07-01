var sass = require('node-sass'),
Path     = require('path'),
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
		path += "images/";
	}

	_this.path = path;

	return path;
};

Assets.prototype.isCSS = function() {
	return this.extension === '.css' ? true : false;
};

Assets.prototype.compileSCSS = function() {
	var _this = this;
	var path = _this.path + _this.url.slice(0, _this.url.length - 3);
	path += "scss";

	sass.render({
    file: path,
    success: function(css){
        _this.res.end(css);
    },
    error: function(error) {
        console.log(error);
    },
    outputStyle: 'compressed'
	});
};

Assets.prototype.readImage = function() {
	var _this = this,
	path      = _this.path;
	path      += _this.url;

	fs.readFile(path, function(err, data) {
		if (err) { console.log("ERROR LOADING FILE WITH " + _this.url + " URL"); }
    	_this.res.end(data);
	});
}
module.exports = Assets;