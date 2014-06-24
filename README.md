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

Smart.Router.map("/hello", "/posts/new");

http.createServer(function(request, response) {
  Smart.Router.manage(request, response);
}).listen(3000);

console.log("Server launched on localhost:3000 ...");
```

Here, we create a route **/hello**, Smart will look in **./app/controllers/Hello.js** and render **./app/views/Hello.hbs**
#### Nested routes
When you need to register routes like **/posts/new** or something like this, Smart will look for **PostsNew** file.

Notice, we not defined an index route, indeed, this is a common case for all web application so it implicitly add to your current routes, and it will look for the index.hbs template.

Actually, a controller looks like this :
```javascript
var controller = require('../../lib/smart').Controller;

controller.extend(function(req, res) {
  var data = {
    name: "DCK"
  };

  res.send(data);
});

module.exports = controller;
```
The data passed with the **send** method only accept objects. ASAP you will be able to set a custom HTTP code and headers.

If we enter a nonexistent URL, Smart will send a 404 error page (in **./app/views/global/404.hbs**).



