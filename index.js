'use strict';
var koa = require('koa'),
    router = require('koa-router')(),
    hbs = require('koa-hbs'),
    ng = require('./scrapers/angular');

var app = koa();

app
  .use(hbs.middleware({
    viewPath: __dirname + '/views'
  }))
  .use(router.routes());

router.get('/', function *(next) {
  yield this.render('index', { title: 'Scraper' })
})

router.get('/angular/partials/*', function *(next) {
  var href = this.request.url.replace(/^\/angular\/partials\/api\//, '');
  var links = yield ng.getLinks()
  var content = yield ng.scrapeContent(href).finally(function() { this.ph.exit(); });
  yield this.render('angular', { sidebar: links, container: content })
})

router.get('/angular', function *(next) {
  var links = yield ng.getLinks().finally(function() { this.ph.exit()});
  yield this.render('angular', { sidebar: links})
});


app.listen(9000)
