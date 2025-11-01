const { Router } = require("express");
const listsController = require("../controllers/listsController");
const listsRouter = Router();



// Router to display lists
listsRouter.get("/", listsController.listsGet);



module.exports = listsRouter;