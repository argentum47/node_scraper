'use strict';
var koa = require('koa'),
    route = require('koa-route'),
    hbs = require('koa-hbs'),
    ng = require('./scrapers/angular');

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
  if(this.path !== '/angular/partials/*')
    return yield next
  var links = ng.scrapeContent(url)
  yield this.render('angular', { body: links })
})

app.use(function *(next) {
  if(this.path !== '/angular') {
    return yield next
  }
  var links = yield ng.getLinks("ng").finally(function() { this.ph.exit()});
  yield this.render('angular', { body: links})
});

app.listen(9000)
