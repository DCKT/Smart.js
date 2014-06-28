Smart.js
=========

## What is Smart.js ?

Smart is a clever lightweight web framework for building web application quickly. He is inspired from the Ember.js conventions, you just need to pass some routes to the application and Smart will search the Controller (if it exists) and the view associated.
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
If the controller is not found, Smart will handle the case and render the template normaly.

#### Nested routes
When you need to register routes like **/posts/new** or something like this, Smart will look for **PostsNew** file.

Notice, we don't defined an index route, indeed, this is a common case for all web application so it implicitly add to your current routes, and it will look for the index.hbs template.

Actually, a controller looks like this :
```javascript
var controller = require('../../lib/smart').Controller;

module.exports = controller.extend(function(req, res) {
  res.send({id: req.params.id});
});

```
The data passed with the **send** method only accept objects. 

#### GET parameters
If the URL requested has some parameters, you can use **req.query** followed by the name of the parameters. Example :
```javascript
// http://localhost:3000?name=DCK&id=1
req.query.name; // 'DCK'
req.query.id; // 1
```

If you enter a nonexistent URL, Smart will send a 404 error page (in **./app/views/global/404.hbs**).

#### URL parameters
You can register a route by specifing an identifier with a colon like : `/posts/:id`. 
Then you will find in the controller the variable **req.params** who contained an object, here **req.params.id**.
```javascript
// URL registered: http://localhost:3000/posts/:id
// http://localhost:3000/posts/1
req.params.id; // 1
```

## ASAP
- NPM module
- Set custom headers and HTTP Code for controller
- HTTP method for controller (GET / POST / PUT / DELETE)
- smart-cli (generate smart project)
