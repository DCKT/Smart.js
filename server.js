var http = require('http'),
Smart    = require('./smart');

var App = new Smart();

App.Router.map("/hello");

http.createServer(function(request, response) {
	App.Router.manage(request, response);
}).listen(3000);

console.log("Server launched on localhost:3000 ...");