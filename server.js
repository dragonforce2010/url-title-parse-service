const Koa = require('koa');
const cors = require('@koa/cors');
const Router = require('@koa/router');
const error = require('koa-error');
const cheerio = require('cheerio');

const app = new Koa();
const router = new Router();

router.get('/', async ctx => {
  ctx.response.body = 'Hello, you hit the url title parse service!'
})

router.get('/parseWebsiteTitleFromUrl', async (ctx) => {
  const url = ctx.request.query.url;
  if (!url) {
    ctx.throw(400);
    return;
  }

  const resp = await fetch(url);
  const htmlText = await resp.text()
  const $ = cheerio.load(htmlText);
  const websiteTitle = $('head > title').text();
  ctx.response.body = {
    websiteTitle: websiteTitle,
  };
});

app.use(error());
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
