var controller = require('../../lib/smart').Controller;

controller.extend(function(req, res) {
	var data = {
		name: "DCK"
	};

	res.send(data);
});

module.exports = controller;