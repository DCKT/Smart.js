var controller = require('../../lib/smart').Controller;

module.exports = controller.extend(function(req, res) {
	var name = req.query.name;
	var data = {
		name: name
	};

	res.send(data);
});
