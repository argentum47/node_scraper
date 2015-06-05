'use strict';

var UrlScraper = require('../url_scraper');

var url = 'https://code.angularjs.org/1.3.15/docs/api';

Angular.prototype = new UrlScraper();
function Angular(url) {
  this.url = url;
}

Angular.prototype.scrape = function(domEl) {
  this.run(function() {
    this.links = document.querySelectorAll(domEl);
    return [].map.call(links, function(e) {
      return [e.text, e.href]
    });
  });
  return Promise.resolve(this.links);
}

module.exports.getLinks = new Angular(url).scrape('.side-navigation a');