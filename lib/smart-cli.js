var exec = require('child_process').exec;

exports.new = function () {
	exec('mkdir -p app/{controllers/helpers/views/assets}');
	exec('mkdir -p assets/{images/stylesheets}');
};