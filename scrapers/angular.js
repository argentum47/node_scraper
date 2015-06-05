'use strict';

var UrlScraper = require('../url_scraper');
var base_url = 'https://code.angularjs.org/1.3.15/docs/partials/api/'
var url = 'https://code.angularjs.org/1.3.15/docs/api';


var angular = new UrlScaper(base_url);
Angular.getLinks(url)
  .then(function(resp) {
      page = resp.page;
      page.evaluate(getAllLinks, onComplete);

      function getAllLinks() {
        return [].map.call(document.querySelectorAll(elem), function(e) {
          return [e.text, e.href];
        }); 
      }

      function onComplete(result) {
        angular.links = result;
      }
    })
  .done(function() {
    anguar.ph.exit();
  });
 
module.exports = angular;
