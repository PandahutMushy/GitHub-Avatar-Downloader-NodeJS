var https = require("https");

module.exports = function getHTML(options, action) {
  var buffer = [];
  https.get(options, function(response) {
    response.setEncoding("utf8");

    response.on("data", function(data) {
      buffer.push(data);
      return action(data);
    });
  });
};
