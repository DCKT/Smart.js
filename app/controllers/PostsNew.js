var controller = require('../../lib/smart').Controller;

controller.extend(function(req, res) {
	var data = {
		posts: [{
			title: "Bonjour",
			content: "ekfoekfoekfoekfoevepvevi"
		}, {
			title: "Hello world",
			content: "azertyuvvbfeeivkviek,fef"
		}]
	};

	res.send(data);
});

module.exports = controller;