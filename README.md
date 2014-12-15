Documentation in construction.

![Smart.js](https://raw.githubusercontent.com/DCKT/Smart.js/master/doc/logo.png)

[![Build Status](https://travis-ci.org/DCKT/Smart.js.svg)](https://travis-ci.org/DCKT/Smart.js)
## A clever Node.js web framework

The main purpose of this framework is **Convention Over Configuration**, it's inspired from Ember.js or Ruby On Rails. It follows the
MVC design pattern.

**No more dependencies**
I don't like projects with thousand dependencies, that's why Smart doesn't use another library except the Node.js API.
All is based on the http module, no express or connect here.

## Structure
Your application must follow some convention for working correctly. Here is how you should present your folder / files :

![Structure of an application](https://raw.githubusercontent.com/DCKT/Smart.js/master/doc/structure.png)

## Concepts
You can create somes routes, each routes own a controller and a view associated, a route named __hello__ will looking for a hello file in
the **controllers** folder and hello.html in views folder.

**Index or '/'**
Because every application have an index page, you must not create an index controller execpt if you realy need to perform some actions.


### Setup
`npm install -g smart`

With this package come a command line named `smart`.

### Usage
```javascript
var http = require('http'),
Smart    = require('smart');

Smart.Router.map("/hello");

http.createServer(function(req, res) {
  Smart.Router.manage(req, res);
}).listen(3000);

console.log("Server launched on localhost:3000 ...");
```

## Command line API

**smart new [projectName]**

Generate a project with all folders needed, an index.html and server.js files.


## General API

**Smart.Router**
Router is an object who will register and manage your routes.

&nbsp;&nbsp;&nbsp;&nbsp;**Router.map([string list])**

&nbsp;&nbsp;&nbsp;&nbsp;You will pass here all of your routes. You can create nested routes like /posts/new, the controller will be named **PostsNew**

&nbsp;&nbsp;&nbsp;&nbsp;**Router.manage(request, response)**

&nbsp;&nbsp;&nbsp;&nbsp;This method will use the request and response object given by the http module.

**Smart.Controller**

Controller is an object who will be used to deserved your data to your view. The idea is to extend the controller for adding
your logic. It looks like there :

```javascript
var controller = require('smart').Controller;

module.exports = controller.extend(function(req, res) {
  var data = getSomeData();
  res.send({
    data: data
  });
});
```

The data are passed through the controller and will be send to the view if you use a template engine.

#### Template engine

By default, there is no template engine. Actually Smart support these one :

- Handlebars
- Jade

For using them, you have to use the `Smart.use` function.
This function needs an object as argument, and at the moment just look for a **template** attribute. Here is an exemple :

```javascript
Smart.use({
  template: 'jade'
});
```

Next, don't forget to change your views extension !

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
