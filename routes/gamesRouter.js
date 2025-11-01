const { Router } = require("express");
const gamesController = require("../controllers/gamesController");
const gamesRouter = Router();



// Route to display games content
gamesRouter.get("/", gamesController.gamesListGet);

// Route for creating a game
gamesRouter.get("/new", gamesController.gamesCreateGet);
gamesRouter.post("/new", gamesController.gamesCreatePost);

// Route for editing game
gamesRouter.get("/:id/edit", gamesController.gamesEditGet);
gamesRouter.post("/:id/edit", gamesController.gamesEditPost);

// delete
gamesRouter.post("/:id/delete", gamesController.gamesDeleteGamePost);


module.exports = gamesRouter;