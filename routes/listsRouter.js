const { Router } = require("express");
const listsController = require("../controllers/listsController");
const listsRouter = Router();



// Router to display lists
listsRouter.get("/", listsController.listsGet);

// Router for selecting a list
listsRouter.get("/:id/:name/info/", listsController.listsShowGet);

// Router for adding game to list
listsRouter.post("/{:listId}/{:listName}/info/:gameId/add", listsController.listsAddGameToListPost);

// Router for removing game from list
listsRouter.post("/{:listId}/{:listName}/info/:gameId/remove", listsController.listsRemoveGameFromListPost);

// Router for creating a new list
listsRouter.get("/new", listsController.listsCreateGet);
listsRouter.post("/new", listsController.listsCreatePost);

// Router for editing a list
listsRouter.get("/:id/edit", listsController.listsEditGet);
listsRouter.post("/:id/edit", listsController.listsEditPost);

// Router for deleting a list
listsRouter.post("/:id/delete", listsController.listsDeleteListPost);



module.exports = listsRouter;