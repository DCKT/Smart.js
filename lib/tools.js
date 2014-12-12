module.exports = {
  getURLParameters: function(url) {
    if (url.indexOf("?") == -1) return false;

    var parameters   = url.slice(url.indexOf("?") + 1, url.length).split("&");
    var paramsObject = {};

    parameters.forEach(function(el) {
      var attribute = el.slice(0, el.indexOf("=")),
      value         = el.slice(el.indexOf("=") + 1, el.length);

      if (!isNaN(parseInt(value))) {
        value = parseInt(value);
      }

      paramsObject[attribute] = value;
    });

    return paramsObject;
  },
  form: {
    handle: function(req, cb) {
      var body = "";

      req.on('data', function(chunk) {
        body += chunk;
      });

      req.on('end', function() {
        cb(body);
      });
    }
  }
};