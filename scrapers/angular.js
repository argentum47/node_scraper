'use strict';

var UrlScraper = require('../url_scraper');
var Cache = require('../cache.js')('angularz');

var base_url = 'https://code.angularjs.org/1.3.15/docs/partials/api/';
var url = 'https://code.angularjs.org/1.3.15/docs/api';
var skip = 'ng';

function Angular() {
  this.base_url = base_url;
  this.links = [];
}

Angular.prototype = new UrlScraper( base_url );

Angular.prototype.getLinks = function () {
  var cache = Cache.get('sidebar');
   if(cache) {
     console.log(cache)
     return Promise.resolve(cache)
   } else {
    return this.scrapeUrl(url).then(function( page ) {
      return page.evaluate(function() {
        return [].map.call(document.querySelectorAll('.side-navigation a'), function( e ) {
          var href = e.href,
              text = e.text;

          href = href.replace(/docs\/api/, 'docs/partials/api');
          href = href.replace(/\/partials\/api\/(.+?)(?!\.html)$/, '/partials/api/$1.html')
          href = href.match(/\/partials.*/);
          href = '/angular' + href;

          return [ text, href ];
        });
        //return document.querySelector('.side-navigation').innerHTML
      });
    }).then(function( result ) {
      console.log("ping", result[0])
      Cache.set( 'sidebar',  result )
      return result
    })
  }
};

Angular.prototype.scrapeContent = function( url ) {
  return this.scrapeUrl(base_url + url).then(function( page ) {
    return page.evaluate(function() {
      return document.querySelector('body').innerHTML
    })
  })
}

//new Angular(base_url).getLinks().then(function(p) { console.log(p)});
module.exports = new Angular( base_url );
