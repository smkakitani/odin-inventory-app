const db = require("../db/queries");
const { body, query, validationResult, matchedData } = require("express-validator");
const { links } = require("./indexController");



// Game validation
const lengthErr = "must be between 1 and 255 characters.";
const validateGame = [
  body("title").trim()
    .isLength({ min: 1, max: 255 }).withMessage(`Game title ${lengthErr}`),
  body("release_date").trim()
    .isDate().withMessage(`Release date must be yyyy-mm-dd.`),
  body("publisher").trim()
    .isLength({ min: 1, max: 60 }).withMessage(`Publisher must be between 1 and 60 characters.`),
  body("developer").trim()
    .isLength({ min: 1, max: 255 }).withMessage(`Developer ${lengthErr}`),
  body("genre").trim()
    .isLength({ min: 1, max: 255 }).withMessage(`Genre ${lengthErr}`),
];


// Logic for routers
async function gamesListGet(req, res) {
  const games = await db.getAllGames();
  // console.log("Game list: ", games);

  res.render("games/games", {
    title: "Games",
    links: links,
    games: games,
  });
}

const gamesCreateGet = (req, res) => {
  res.render("games/createGame", {
    title: "Create game",
  });
};

const gamesCreatePost = [
  validateGame,
  async (req, res) => {
    // console.log("Creating games!!!");
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("games/createGame", {
        title: "Create game",
        errors: errors.array(),
      });
    }

    const { title, release_date, publisher, developer, genre } = matchedData(req);
    await db.addGame({ title, release_date, publisher, developer, genre });

    res.redirect("/games");
  }
];

async function gamesEditGet(req, res) {
  const game = await db.getGame(req.params.id);
  // console.log(game.release_date, game.release_date.toISOString().substring(0, 10));

  res.render("games/editGame", {
    title: "Edit game",
    game: game,
  });
}

const gamesEditPost = [
  validateGame,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("games/createGame", {
        title: "Create game",
        errors: errors.array(),
      });
    }

    const { title, release_date, publisher, developer, genre } = matchedData(req);
    db.editGame(req.params.id, { title, release_date, publisher, developer, genre });
    // console.log(req.params.id);

    res.redirect("/games");
  },
];

async function gamesDeleteGamePost(req, res) {
  const gameId = req.params.id;
  // console.log('Game title ID: ', gameId);
  await db.deleteGame(gameId);

  res.redirect("/games");
};



module.exports = {
  gamesListGet,
  gamesCreateGet,
  gamesCreatePost,
  gamesEditGet,
  gamesEditPost,
  gamesDeleteGamePost,
};