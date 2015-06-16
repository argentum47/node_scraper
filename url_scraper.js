var phantom = require('node-phantom-async');
var http    = require('http');

function UrlScraper ( base_url ) {
  this.base_url = base_url;
  this.links = [];
}

UrlScraper.prototype = {
  scrapeUrl: function( url ) {
    var that = this;
    return phantom.create()
      .bind({})
      .then(function( ph ) {
        this.ph = ph;
        return ph.createPage();
      })
      .then(function( page ) {
        this.page = page;
        return page.open(url)
      })
      .then(function( status ) {
        console.log("status", status)
        return this.page
      })
  },

  scrapeContent: function(url) {
  }
}

module.exports = UrlScraper;
