var fs = require('fs'),
Handlebars = require('handlebars'),
sass = require('node-sass');

var Router = function() {
	this.routes = [];
	this.routes.push("/");
};

Router.prototype.map = function(routes) {
	for (route in routes) {
		this.routes.push(routes[route]);
	}
};

Router.prototype.validRoute = function(route) {
	var res = false;
	route = route == "" ? "/" : route;
	this.routes.forEach(function(element, index) {
		if (element == route) {
			res = true;
		}
	});

	return res;
};

Router.prototype.manage = function(req, res) {
	var method = req.method;
	var urlRequested = req.url;


	// Loading a JS or CSS library
	var path = "";
	var extension = false;
	for (var i = 0; i < urlRequested.length; i++) {
		if (urlRequested[i] == ".") {
			extension = true;
		}
	};

	if (extension) {
		var extensionJS = urlRequested.slice(urlRequested.length - 3, urlRequested.length);
		var extensionCSS = urlRequested.slice(urlRequested.length - 4, urlRequested.length);

		path += "app/assets/";
		path += extensionCSS == ".css" ? "stylesheets" : "";
		path += extensionJS == ".js" ? "scripts" : "";

		if (extensionCSS == ".png" || extensionCSS == ".jpg" || extensionCSS == ".ico") {
			path += "images/";
		}

		if (extensionCSS == ".css") {
			var point = urlRequested.indexOf(".") + 1;
			path += [urlRequested.slice(0, point), "s", urlRequested.slice(point)].join('');;
			sass.render({
			    file: path,
			    success: function(css){
			        res.end(css);
			    },
			    error: function(error) {
			        console.log(error);
			    },
			    outputStyle: 'compressed'
			});
		}
		else {
			path += urlRequested;
			fs.readFile(path, function(err, data) {
				if (err) { console.log("ERROR LOADING FILE WITH " + urlRequested + " URL"); }
		    	res.end(data);
			});
		}
	}
	else {
		var questionMark = urlRequested.indexOf("?");

		if (questionMark != -1) {
			var parameters = urlRequested.slice(questionMark + 1, urlRequested.length);
			urlRequested = urlRequested.slice(0, questionMark);
		}
		
		var validRoute = this.validRoute(urlRequested);

		if (!validRoute) {
			path += "app/views/global/404.html";
		}
		else {
			var controllerPath = "./app/controllers";
			controllerPath +=  urlRequested.length > 1 ? urlRequested : "/index";
			controllerPath += ".js";

			var Controller = require(controllerPath);
			var controller = new Controller(req, parameters);

			path += "app/views/";
			path += urlRequested.length > 1 ? urlRequested : "index";
			path += ".hbs";


			controller.execute(function(data) {
				var template = fs.readFileSync(path, "utf8");

		        var pageBuilder = Handlebars.compile(template);
		        var pageText = pageBuilder(data);
		        res.writeHead(200, {"Context-Type": "text/html"});
		        res.write(pageText);
		        res.end();
			});

		}
	}
};

module.exports = Router;