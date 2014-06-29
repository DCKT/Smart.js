var controller = require('../../lib/smart').Controller;

module.exports = controller.extend(function(req, res) {
	res.send({
		name: req.query.name
	});
});
