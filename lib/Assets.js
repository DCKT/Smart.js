var sass = require('node-sass'),
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
	// Loading a JS or CSS library
	var extension = false;
	for (var i = 0; i < url.length; i++) {
		if (url[i] == ".") {
			extension = true;
		}
	};

	return extension;
};

Assets.prototype.getPath = function() {
	var _this    = this,
	urlRequested = _this.url,
	path         = '';
	_this.extensionJS = urlRequested.slice(urlRequested.length - 3, urlRequested.length);
	_this.extensionCSS = urlRequested.slice(urlRequested.length - 4, urlRequested.length);

	path += "app/assets/";
	path += _this.extensionCSS == ".css" ? "stylesheets" : "";
	path += _this.extensionJS == ".js" ? "scripts" : "";

	if (_this.extensionCSS == ".png" || 
		  _this.extensionCSS == ".jpg" || 
		  _this.extensionCSS == ".ico") {
		path += "images/";
	}

	_this.path = path;

	return path;
};

Assets.prototype.isCSS = function() {
	return this.extensionCSS === '.css' ? true : false;
};

Assets.prototype.compileSCSS = function() {
	var _this = this,
	point     = _this.url.indexOf(".") + 1,
	path      = _this.path;
	path      += [_this.url.slice(0, point), "s", _this.url.slice(point)].join('');

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