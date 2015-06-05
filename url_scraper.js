var q = require('q'),
    phantom = require('phantom');

function UrlScaper (base_url) {
    this.base_url = base_url;
    this.links = [];
    this.phantom  = phantom;  
}

UrlScaper.prototype = {
  createPhantom: function() {
    var defer = q.defer();
    this.phantom.create(function(ph) {
      defer.resolve(ph);
    });
    return defer.promise;
  },
  createPage: function( ph ) {
    var defer = q.defer();
    ph.createPage(function(page, err) {
      if(err)  defer.reject(err);
      else     defer.resolve(page)
      });
    return defer.promise;
  },
  openPage: function( page, url ) {
    var defer = q.defer();
    page.open(url, function(status) {
      defer.resolve({page: page, status: status});
    })
    return defer.promise;
  },
  getLinks: function( url, elem ) {
    var usr = this;
    this.createPhantom()
      .then(function(ph) {
        usr.ph = ph;
        return usr.createPage(ph);        
      })
    .then(function(page) {
      return usr.openPage(page, url); 
    })
    .then(function(page) {
      console.log(3);
      page = page.page;
      page.evaluate(function() {
        return [].map.call(document.querySelectorAll(".side-navigation a"), function(e) {
          return [e.text, e.href]
        })
      }, function(result) {
          console.log(result);
          usr.ph.exit();
        
      });

      function getAllLinks(elem) {
        console.log(elem)
        return function(elem) {
          return [].map.call(document.querySelectorAll(elem), function(e) {
            return [e.text, e.href];
          });
        }
      }

      function exitPhantom(result) {
        usr.links = result;
        console.log(usr, result);
        usr.ph.exit();
      }
    })
  }
}

module.exports = UrlScaper;
