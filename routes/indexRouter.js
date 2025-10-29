const { Router } = require("express");
const indexRouter = Router();

indexRouter.get("/", (req, res) => res.send('index rouuute'));



module.exports = indexRouter;