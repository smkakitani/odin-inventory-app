const db = require("../db/queries");
const { body, query, validationResult, matchedData } = require("express-validator");
const { links } = require("./indexController");



// Validation
const validateList = [
  body("name").trim()
    .isLength({ min: 1, max: 255 }).withMessage("Name must be between 1 and 255 characters."),
  body("description").trim(),
  query("query").trim(),
];



// 
async function listsGet(req, res) {
  const lists = await db.getAllLists();

  res.render("lists/lists", {
    title: "Lists",
    links: links,
    lists: lists,
  });
}

async function listsShowGet(req, res) {
  const listInfo = await db.getList(req.params.id); // display list's information
  const listName = req.params.name;
  
  // Should return all games from specified list ID/name
  const gamesList = await db.getGamesFromList(req.params.id); 
  const query = req.query.query;

  if (query?.length) {
    const resultSearch = await db.searchGames(query);

    return res.render("lists/showList", {
      title: listName,
      list: listInfo,
      games: gamesList,
      result: resultSearch,
    });
  }

  res.render("lists/showList", {
    title: listName,
    list: listInfo,
    games: gamesList,
  });
}

async function listsAddGameToListPost(req, res) {
  const { gameId, listId } = req.params;

  // Search current list for current game
  const gamesId = await db.searchGameIdOnList(listId, gameId);
  if (gamesId.length === 0) {
    // Current game ID isn't on list! Add it to the list
    await db.addGameToList(listId, gameId);
  }

  res.redirect(".."); // redirecting to path before current one
}

async function listsRemoveGameFromListPost(req, res) {
  const { gameId, listId } = req.params;

  await db.removeGameFromList(gameId, listId);

  res.redirect(".."); // redirecting to path before current one
}

function listsCreateGet(req, res) {
  res.render("lists/createList", {
    title: "Create list",
    // links: links,
  });
}

const listsCreatePost = [
  validateList,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("lists/createList", {
        title: "Create list",
        errors: errors.array(),
      });
    }

    const { name, description } = matchedData(req);
    await db.addList({ name, description });

    res.redirect("/lists");
  }
];

async function listsEditGet(req, res) {
  const list = await db.getList(req.params.id);

  res.render("lists/editList", {
    title: "Editing list",
    list: list,
  });
}

const listsEditPost = [
  validateList,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("lists/createList", {
        title: "Create list",
        errors: errors.array(),
      });
    }

    const { name, description } = matchedData(req);
    await db.editList(req.params.id, { name, description });

    res.redirect("/lists");
  },
];

async function listsDeleteListPost(req, res) {
  const listId = req.params.id;
    await db.deleteList(listId);
  
    res.redirect("/lists");
}


module.exports = {
  listsGet,
  // 
  listsShowGet,
  listsAddGameToListPost,
  listsRemoveGameFromListPost,
  // 
  listsCreateGet,
  listsCreatePost,
  listsEditGet,
  listsEditPost,
  listsDeleteListPost,
};