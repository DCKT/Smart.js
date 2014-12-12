var exec = require('child_process').exec,
path = require('path'),
fs = require('fs');


exports.new = function (folderName) {
  console.log("Processing ...");
	exec('mkdir -p '+ folderName +'/app/controllers');
  exec('mkdir '+ folderName +'/app/views');
  exec('mkdir '+ folderName +'/app/assets');
	exec('mkdir -p '+ folderName +'/app/assets/images');
  exec('mkdir '+ folderName +'/app/assets/stylesheets');
  exec('cd '+ folderName +' && npm install smartjs');

  var controllerPath = path.join(path.dirname(fs.realpathSync(__filename)), '../../lib/boilerplate') + '/basicServer.js';
  var viewPath = path.join(path.dirname(fs.realpathSync(__filename)), '../../lib/boilerplate') + '/basicView.html';

  fs.readFile(controllerPath, function(err, data) {
    if (!err) {
      fs.writeFile(folderName +'/server.js', data, function(error) {
        if (error) {
          console.error(error);
        }
      });
    }
    else {
      console.error(err);
    }
  });
  fs.readFile(viewPath, function(err, data) {
    if (!err) {
      fs.writeFile(folderName +'/app/views/index.html', data, function(error) {
        if (error) {
          console.error(error);
        }
      });
    }
    else {
      console.error(err);
    }
  });
};