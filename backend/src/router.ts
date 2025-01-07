const Router = require("koa-router");
const koaRouter = new Router();
const urlController = require("./controllers/url.controllers");

koaRouter.post("/shorten", urlController.shortenUrl);

koaRouter.get("/:id", urlController.redirectUrl);

module.exports = koaRouter;