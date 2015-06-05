'use strict';
var koa = require('koa'),
    route = require('koa-route'),
    hbs = require('koa-hbs'),
    ng = require('scrapers/angular');

var app = koa();

app.use(hbs.middleware({
  viewPath: __dirname + '/views'
}));

app.use(function *(next) {
  if(this.path !== '/') { 
    return yield next
  }
  yield this.render('index', { title: "Scraper" })
});

app.use(function *(next) {
  if(this.path !== '/angular') {
    return yield next
  }
  ng.then(function(data) {
    yield this.render('angular', { })
  })
});

app.listen(9000)