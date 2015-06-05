'use strict';

var phantom = require('phantom');

phantom.create(function(ph) {
  ph.createPage(function(page) {
    page.open("https://code.angularjs.org/1.3.15/docs/api", function(status) {
      console.log(status);
      page.evaluate(function() {
        return [].map.call(document.querySelectorAll('.side-navigation a'), function(e) {
          return [e.text, e.href];
        })
      }, function (result) { 
        console.log(result); 
        ph.exit(); })
    })
  })
})
