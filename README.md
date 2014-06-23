Smart.js
=========

## What is Smart.js ?

Smart is a clever web framework for building web application quickly. He is inspired on the Ember.js conventions, pass some routes to the application and Smart will search the Controller and the view associated.
Smart use Handlebars as template engine and can handle SCSS.


## Example
Actually, this is not a NPM package but it will be soon...

```javascript
var http = require('http'),
Smart    = require('./smart');

Smart.Router.map("/hello");

http.createServer(function(request, response) {
  Smart.Router.manage(request, response);
}).listen(3000);

console.log("Server launched on localhost:3000 ...");
```

Here, we create a route **/hello**, Smart will look in **./app/controllers/hello.js** and render **./app/views/hello.hbs**

Actually, a controller looks like this :

```javascript
var HelloController = function(request, parameters) {
  this.request = request;
  this.parameters = parameters;
}

HelloController.prototype.execute = function (callback) {
  callback();
}


module.exports = HelloController;
```

On the future, this should take less rows to declare and use a controller.


If we enter a nonexistent URL, Smart will send a 404 error page (in **./app/views/global/404.hbs**).
