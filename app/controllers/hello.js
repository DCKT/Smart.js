var request = require('request');

var HelloController = function(request, parameters) {
	this.request = request;
	this.parameters = parameters;
}

HelloController.prototype.execute = function (callback) {
	var url = "https://prod.api.pvp.net/api/lol/euw/v1.1/champion?api_key=7d0fccc1-6213-411e-b723-b99d689d700d";
	var data;

	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			data = JSON.parse(body);
			callback(data);
		}
	});
}


module.exports = HelloController;