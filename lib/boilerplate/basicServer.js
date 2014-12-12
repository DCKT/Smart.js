var http = require('http'),
Smart    = require('smartjs');

/*
* - Register your routes before creating server
* Smart.Router.map("/hello");
***/

http.createServer(function(request, response) {
  /*
  * - Let's Smart handle request and response for us
  ***/
  Smart.Router.manage(request, response);
}).listen(3000);

console.log("Server launched on localhost:3000 ...");