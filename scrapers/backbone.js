'use strict';
// root = ".container";

var cheerio = require('cheerio'),
    UrlScraper = require('../url_scraper'),
    Cache = require('../cache.js')('backbonejz');

var base_url = 'http://backbonejs.org/',
    except = { before: '#Events', after: "#faq" };

class Backbone extends UrlScraper {
  constructor( base_url ) {
    super( base_url );
  }

  getLinks( element ) {
    var cache = Cache.get( 'backbone.sidebar' );
    if( cache )
      return Promise.resolve( cache );
    else {
      return this.scrapeUrl( base_url )
        .then(function() {
          return this.page.evaluate(function() {
            $("#Events").prevAll().remove();
            $("#faq").nextAll().addBack().remove();

            var container = $(".container"),
                headers = container.find('h2').map(function(i, e) { return e.innerText.replace(/Backbone\./i, '') }).toArray(),
                sidebar = {};
            var cur, nxt;

            for(var i = 0, len = headers.length; i< len; i++) {
              cur = $('#' + headers[i]);
              nxt = cur.nextUntil('#' + headers[i+1]);
              sidebar[headers[i]] = nxt.find('.header').map(function(i, v) { return v.innerText; }).toArray()
            }
            return sidebar;
          });
        }).then(function(result) {
          Cache.set( 'backbone.sidebar', result );
          return result;
        });
    }
  }

  getContent( rootElement ) {
    var cache = Cache.get( 'backbone.content' );
    if( cache ) {
      return Promise.resolve( cache );
    } else {
      let sidelinks = this.getLinks().then(function() {
        //this.page.evaluate();
        // oh fuck.
      });
      if( )
    }
  }
}

// bb.getContent( '.container' ).then(function(data) { console.log(data); }).finally(function() { this.ph.exit() })

module.exports = new Backbone(base_url);;
