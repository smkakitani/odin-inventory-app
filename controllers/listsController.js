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
  // console.log(lists);

  res.render("lists/lists", {
    title: "Lists",
    links: links,
    lists: lists,
  });
  // res.send("rendering lists...");
}

async function listsShowGet(req, res, next) {
  const listInfo = await db.getList(req.params.id); // display list's information
  const listName = req.params.name;
  
  // should return all games from specified list ID/name
  const gamesList = await db.getGamesFromList(req.params.id); 
  const query = req.query.query;
  // console.log("from listsshow: ", req.query, query?.length);
  // console.log(gamesList);

  if (query?.length) {
    const resultSearch = await db.searchGames(query);
    // console.log(resultSearch);

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
    // query: null,
  });
  // next();
  // res.send("displaying list...");
}

async function listsAddGameToListPost(req, res, next) {
  const gameId = req.params;
  console.log('Game ID to add: ', gameId.id);
  console.log('path: ', req.url, 'params: ', req.params, 'originalUrl: ', req.originalUrl);

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
    // console.log('List ID: ', listId);
    await db.deleteList(listId);
  
    res.redirect("/lists");
}


module.exports = {
  listsGet,
  // 
  listsShowGet,
  listsAddGameToListPost,
  // 
  listsCreateGet,
  listsCreatePost,
  listsEditGet,
  listsEditPost,
  listsDeleteListPost,
};