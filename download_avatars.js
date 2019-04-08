var request = require("request");
var secrets = require("./secrets");
var contList = [];

console.log("Welcome to the GitHub Avatar Downloader!");

function cb(err, contributors) {
  if (err) {
    console.log("Error detected: " + err);
    return;
  }
  for (cont of contributors) {
    console.log(cont.avatar_url);
    contList.push(cont.avatar_url);
  }
}

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url:
      "https://api.github.com/repos/" +
      repoOwner +
      "/" +
      repoName +
      "/contributors",
    headers: {
      "User-Agent": "ferrazf",
      Authorization: secrets.Authorization
    }
  };

  request(options, function(err, res, body) {
    if (res.statusCode == 200) {
      var jsonBody = JSON.parse(body);
      return cb(err, jsonBody);
    }
  });
}

getRepoContributors("jquery", "jquery", cb);
