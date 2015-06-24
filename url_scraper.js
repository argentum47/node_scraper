'use strict';

var phantom = require('node-phantom-async'),
    Promise = require('bluebird'),
    req     = require('request'),
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

  makeSelector(data) {
    let selector = data.name;
    if(data.type === 'id')
      selector = '#' + selector;
    else if(data.type === 'className')
      selector = '.' + start.name;;

    return selector;
  }

  inBetween( dom, limits, selector, prop ) {
    var el, start, end, matched = [];
    if( limits.start ) {
      start = this.makeSelector( limits.start );
    }
    end = limits.end;

    if( dom instanceof NodeList && start && end ) {
      el = document.querySelector( start );
      while( el ) {
        if( end && el[limits.end.type] != el[limits.end.name])
          break;
        if( el.nodeType === 1 ){
          matched.push( [].slice.call( querySelectorAll( selector ) ).map(function( node ) {
            return node[prop];
          }) );

        }
        el = el.nextSibling;
      }
    }
    return matched;
  }

  scrapeContent( url, rootSelector ) {
    var that = this;
    var request = Promise.promisify(req);

    return request(url).then(function(contents) {
      contents = contents[0].body;

      let $ = cheerio.load(contents);
      let html = $(rootSelector);

      if(that.htmlEscapeBefore) {
        html.find(that.htmlEscapeBefore).prevAll().remove();
      }

      if(that.htmlEscapeAfter) {
        html.find(that.htmlEscapeAfter).nextAll().addBack().remove();
      }
      return $.html();
    });
  }
}

module.exports = UrlScraper;
