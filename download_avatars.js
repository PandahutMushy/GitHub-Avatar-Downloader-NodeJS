var request = require("request");
var fs = require("fs");
var secrets = require("./secrets");

console.log("Welcome to the GitHub Avatar Downloader!");

function cb(err, contributors) {
  if (err) {
    console.log("Error detected: " + err);
    return;
  }
  for (cont of contributors) {
    var sysPath = process.cwd().toString() + "/w2d1/github-avatar-downloader/downloads/" + cont.login + ".jpg";
    downloadImageByURL(cont.avatar_url, sysPath);
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

  request(options, function (err, res, body) {
    if (res.statusCode == 200) {
      var jsonBody = JSON.parse(body);
      return cb(err, jsonBody);
    }
  });
}

function downloadImageByURL(imgUrl, sysPath) {
  request.get(imgUrl).on("error", function (err) {
    console.log("There was an error: " + err);
    return;
  }).on("response", function (response) {
    if (response.statusCode != 200) {
      console.log("Error fetching image!");
      console.log("Response Status Code: ", response.statusCode);
      console.log("Response Status Message: ", response.statusMessage);
    }
    console.log("Image download complete!");
  }).pipe(fs.createWriteStream(sysPath));
}

getRepoContributors("jquery", "jquery", cb);

// downloadImageByURL(
//   "https://avatars2.githubusercontent.com/u/2741?v=3&s=466",
//   process.cwd().toString() +
//   "/w2d1/github-avatar-downloader/downloads/" +
//   "kvirani.jpg"
// );
