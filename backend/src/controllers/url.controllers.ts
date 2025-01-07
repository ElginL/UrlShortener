const { BASE_URL, APPLICATION_PORT } = require("../constants");
const urlService: { 
  generateShortUrl: (longUrl : string ) => Promise<string>,
  addToDb: (longUrl: string, shortUrl: string) => Promise<void>,
  longUrlExists: (longUrl: string) => Promise<boolean>,
  getShortUrlByLongUrl: (longUrl: string) => Promise<string>,
  getLongUrlByShortUrl: (shortUrl: string) => Promise<string>
} = require("../services/url.services");

const shortenUrl = async (ctx) => {
  const body = ctx.request.body;
  const longUrl = body.longUrl;

  if (await urlService.longUrlExists(longUrl)) {
    ctx.body = (await urlService.getShortUrlByLongUrl(longUrl));
    ctx.status = 201;

    return;
  }

  // TODO: Error handling
  const shortUrl = await urlService.generateShortUrl(longUrl);
  await urlService.addToDb(longUrl, shortUrl);

  ctx.body = shortUrl;
  ctx.status = 201;
}

const redirectUrl = async (ctx) => {
  const identifier = ctx.params.id;

  const longUrl = await urlService.getLongUrlByShortUrl(`${BASE_URL}:${APPLICATION_PORT}/${identifier}`);

  ctx.redirect(longUrl);
}

module.exports = {
  shortenUrl,
  redirectUrl
};
