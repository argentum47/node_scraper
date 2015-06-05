var phantom = require('node-phantom-async');
var http    = require('http');
var cheerio = require('cheerio');

function UrlScraper ( base_url ) {
    this.base_url = base_url;
    this.links = [];
}

UrlScraper.prototype = {
    scrapeUrl: function( url ) {
        var that = this;
        return phantom.create()
            .bind({})
            .then(function(ph) {
                this.ph = ph;
                return ph.createPage();
            })
            .then(function(page) {
                this.page = page;
                return page.open(url)
            })
            .then(function(status) {
                console.log("status", status)
                return this.page
            })
    },

    download: function(url) {
      return new Promise(function(resolve, reject) {
            http.get(url, function(res) {
                var data = "";
                res.on('data', function(chunk) {
                    data += chunk;
                });

                res.on('end', function() {
                    return resolve(data);
                });
            }).on('error', function(err) {
                return reject(err);
            });
      });
    },

    scrapeContent: function(url) {
      this.download(url).then(function(data) {
        var $ = cheerio.load(data);
        console.log(data)
      }).catch(function(err) {
        console.log(err)
      })
    }
}

module.exports = UrlScraper;
