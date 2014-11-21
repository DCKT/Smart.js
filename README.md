DOC in construction !

![Smart.js](https://github.com/DCKT/Smart.js/blob/master/doc/logo.png)

## A clever Node.js web framework

The main purpose of this framework is **Convention Over Configuration**, it's inspired from Ember.js or Ruby On Rails. It follows the
MVC design pattern.

**No more dependencies**
I don't like projects with thousand dependencies, that's why Smart doesn't use another library except the Node.js API.
All is based on the http module, no express or connect here.

## Structure
Your application must follow some convention for working correctly. Here is how you should present your folder / files :

![Structure of an application](https://github.com/DCKT/Smart.js/blob/master/doc/structure.png)

## Concepts
You can create somes routes, each routes own a controller and a view associated, a route named __hello__ will looking for a hello file in
the **controllers** folder and hello.html in views folder.

**Index or '/'**
Because every application have an index page, you must not create an index controller execpt if you realy need to perform some actions.


### Setup
`npm install -g smartjs`

With this package come a command line named `smart`.

Here is a basic server configuration :
```javascript
var http = require('http'),
Smart    = require('smartjs');

Smart.Router.map("/hello");

http.createServer(function(req, res) {
  Smart.Router.manage(req, res);
}).listen(3000);

console.log("Server launched on localhost:3000 ...");
```

#### Command line API

`smart new **[name]**`
Generate an empty project with an index.html and server.js files.


#### General API

**Smart.Router**
Router is an object who will register and manage your routes.

  **Router.map([string list])**
  You will pass here all of your routes. You can create nested routes like /posts/new, the controller will be named **PostsNew**

  **Router.manage(request, response)**
  This method will use the request and response object given by the http module.

**Smart.Controller**
Controller is an object who will be used to deserved your data to your view.


### LICENCE
The MIT License (MIT)

Copyright (c) 2014 Thomas Deconinck

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
