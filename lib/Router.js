var fs     = require('fs'),
Assets     = require('./Assets'),
Path       = require('path');

var Router = function() {
	this.routes = ['/'];
};

Router.prototype.map = function() {
	var _this = this;
	[].forEach.call(arguments, function (el) {
		_this.routes.push(el);
	});
};

Router.prototype.validRoute = function(route) {
	var found     = false,
	paramsValue    = {},
	originalRoute = null;

	route = route == "" ? "/" : route;

	this.routes.forEach(function(element, index) {
		if (!found) {
			originalRoute = element;
		}

		if (element === route) {
			found = true;
		}
		else if (element.indexOf(':') != -1) {
			var t1 = element.match(/\//g);
			var t2 = route.match(/\//g);

			if (t1.length === t2.length) {
				var originalRouteSplited = element.split("/");
				var routeSplited = route.split("/");

				originalRouteSplited.forEach(function (el, i) {
					if (el.indexOf(':') != -1) {
						var tmp = el.slice(1, el.length);
						paramsValue[tmp] = routeSplited[i];
					}
				});
				found = true;
			}
		}
	});

	return {
    found: found,
    originalRoute: originalRoute,
    paramsValue: paramsValue
	};
};



Router.prototype.manage = function(req, res) {
	var method = req.method;
	var urlRequested = req.url;
	var assets = new Assets(res);
	var path = '';

	if (assets.check(urlRequested)) {
		assets.getPath();

		if (assets.isCSS()) {
			assets.read();
		}
		else {
			assets.readImage();
		}
	}
	else {
		var questionMark = urlRequested.indexOf("?");

		if (questionMark != -1) {
			var parameters = urlRequested.slice(questionMark + 1, urlRequested.length);
			urlRequested = urlRequested.slice(0, questionMark);
		}

		var validRoute = this.validRoute(urlRequested);

		if (!validRoute.found) {
			path += "app/views/global/404.html";
			fs.readFile(path, function(err, data) {
				if (err) { console.log("ERROR LOADING FILE WITH " + this.url + " URL"); }
		    res.end(data);
			});
		}
		else {
			var controllerPath = "/app/controllers/";
			controllerPath +=  urlRequested.length > 1 ? Router.getFileName(validRoute.originalRoute) : "index";
			controllerPath += ".js";

			var controller = require('./smart').Controller.setup(req, res, validRoute.paramsValue);

			var folder = Path.dirname(require.main.filename);

			fs.exists( Path.join(folder, controllerPath), function(exist) {
				if (exist) {
					require(Path.join(folder, controllerPath))();
				}
			});

			path += "app/views/";
			path += urlRequested.length > 1 ? Router.getFileName(validRoute.originalRoute) : "index";
			path += this.manageTemplateExtension();

			controller.execute(fs, path);
		}
	}
};

Router.parseURL = function(url) {
	var colon = url.indexOf(':');

	if (colon != -1) {
		var tmp = url.slice(colon, url.length);
		var tmp2 = tmp.slice(0, tmp.indexOf('/') != -1 ? tmp.indexOf('/') : tmp.length );

		if (url.indexOf(tmp2) + tmp2.length == url.length) {
			url = url.replace(tmp2, 'Show');
		}
		else {
			url = url.replace("/"+ tmp2, '');
		}
	}

	return url;
};

Router.getFileName = function(urlRequested) {
	var urlParsed = Router.parseURL(urlRequested);
	return urlParsed.toLowerCase().replace(/\/(.)/g, function(match, group1) {
  	return group1.toUpperCase();
	});
};

Router.prototype.manageTemplateExtension = function() {
	var extension = null;

	switch(global.template) {
		case 'handlebars':
			extension = '.hbs';
			break;
		case 'jade':
			extension = '.jade';
			break;
		default:
			extension = '.html';
			break;
	}

	return extension;
}

module.exports = Router;