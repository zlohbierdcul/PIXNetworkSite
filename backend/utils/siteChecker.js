var http = require('http');
var https = require('https');

const checkWebsite = (url) => {
    return new Promise((resolve, reject) => {
      https
        .get(url, function(res) {
          resolve(!(res.statusCode.toString().startsWith("4")));
        })
        .on("error", function(e) {
          resolve(false);
        });     
    })
}

module.exports = checkWebsite;