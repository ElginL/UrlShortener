const Koa = require("koa");
const parser = require("koa-bodyparser");
const cors = require("@koa/cors");
const router = require("./router");
const dataSrc = require("./db/dataSource");
const constants = require("./constants");
require("reflect-metadata");
const errorHandler = require("./middleware/errorHandler");

const App = new Koa();

dataSrc.initialize()
    .then(() => console.log("Connected to database successfully"))
    .catch(err => console.error("Error during Data source initialization", err));

App.use(parser())
    .use(cors())
    .use(router.routes())
    .use(errorHandler)
    .listen(constants.APPLICATION_PORT, () => {
        console.log(`🚀 Server listening ${constants.BASE_URL}:${constants.APPLICATION_PORT}/ 🚀`);
    });