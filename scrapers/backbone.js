'use strict';
// root = ".container";

var UrlScraper = require('../url_scraper'),
    Cache = require('../cache.js')('backbonejz');

var base_url = 'http://backbonejs.org/',
    except = { before: '#Events', after: "#faq" };

class Backbone extends UrlScraper {
  constructor( base_url ) {
    super( base_url );
  }

  getContent( rootElement ) {
    if( Cache ) {
      Promise.resolve(cache);
    } else {
      return this.scrapeContent( this.base_url, rootElement ).then(function(data) {
        console.log(data);
        Cache.set('backbone.html', data);
        return data;
      })
    }
  }
}

var backBone = new Backbone(base_url);
backBone.escapeBefore(except.before).escapeAfter(except.after);

module.exports = backBone;
