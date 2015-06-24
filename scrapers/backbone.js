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
      let html = Cache.get( 'backbone.html' ),
          promise = cache ? Promise.resolve( html ) : this.getContent( '.container');

      return promise.then(function( data ) {
        //console.log(data, "geltLinks");

        var that = this,
            dom = cheerio.load(data).html();
        var links = {};
        var headers = [].slice.call( dom.querySelectorAll( "h2" ) )
                        .map(function( node ) {
                          return node;
                        });

        for(let i = 0, len = headers.length; i < len; i++) {
          links[headers[i].id] = this.inBetween(dom,
                                                {
                                                  start: { type: 'id', name: headers[i].id },
                                                  end: { type: 'id', name: (headers[i+1] && headers[i+1].id) }
                                                },
                                                '.header',
                                                'innerText'
                                               );
        }
        Cache.set( 'backbone.sidebar', links);
        return links;
      });
    }
  }

  getContent( rootElement ) {
    var cache = Cache.get( 'backbone.html' );
    if( cache ) {
     return Promise.resolve( cache );
    } else {
      return this.scrapeContent( this.base_url, rootElement ).then(function(data) {
        //console.log(data, "getContent");
        //Cache.set( 'backbone.html', JSON.stringify(data) );
        return data;
      });
    }
  }
}

var backBone = new Backbone(base_url);
backBone.escapeBefore(except.before).escapeAfter(except.after);

backBone.getLinks('.header').then(function(data) {
  console.log(data);
})

//module.exports = backBone;
