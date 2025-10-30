const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();



// Route for displaying home
indexRouter.get("/", indexController.indexHomeGet);



module.exports = indexRouter;