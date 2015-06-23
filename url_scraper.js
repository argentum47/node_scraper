'use strict';

var phantom = require('node-phantom-async'),
    Promise = require('bluebird'),
    request = require('request'),
    cheerio = require('cheerio');

class UrlScraper {
  constructor( base_url ) {
    this.base_url = base_url;
    this.links = [];
  }

  scrapeUrl( url ) {
    return phantom.create().bind({})
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
  }

  escapeAfter( selector ) {
    this.htmlEscapeAfter = selector;
    return this;
  }

  escapeBefore( selector ) {
    this.htmlEscapeBefore = selector;
    return this;
  }

  scrapeContent( url ) {
    var that = this;
    Promise.promisifyAll(request);

    return request(url).then(function(err, resp, body) {
      let $ = cheerio(body);
      let html = $(rootSelector);

      if(that.htmlEscapeBefore) {
        html.find(that.htmlEscapeBefore).prevAll().remove();
      }

      if(that.htmlEscapeAfter) {
        html.find(that.htmlEscapeAfter).nextAll().addBack().remove();
      }

      return html;
    });
  }
}

module.exports = UrlScraper;
