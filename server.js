var http = require('http'),
Router = require('./router.js');

var router = new Router();

router.map("/hello");

http.createServer(function(request, response) {
	router.manage(request, response);
}).listen(3000);

console.log("Server launched on localhost:3000 ...");