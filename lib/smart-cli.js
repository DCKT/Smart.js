var exec = require('child_process').exec;

exports.new = function (folderName) {
	exec('mkdir -p '+ folderName +'/app/{controllers}{helpers}/views/assets}');
	exec('mkdir -p '+ folderName +'/app/assets/{images/stylesheets}');
};