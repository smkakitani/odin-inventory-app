const { Router } = require("express");
const listsController = require("../controllers/listsController");
const listsRouter = Router();



// Router to display lists
listsRouter.get("/", listsController.listsGet);

// Router for creating a new list
listsRouter.get("/new", listsController.listsCreateGet);
listsRouter.post("/new", listsController.listsCreatePost);

// Router for editing a list
listsRouter.get("/:id/edit", listsController.listsEditGet);
listsRouter.post("/:id/edit", listsController.listsEditPost);

// Router for deleting a list
listsRouter.post("/:id/delete", listsController.listsDeleteListPost);



module.exports = listsRouter;