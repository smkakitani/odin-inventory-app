const db = require("../db/queries");
const { body, query, validationResult, matchedData } = require("express-validator");



// Logic for routers
async function gamesListGet(req, res) {
  const games = await db.getAllGames();
  console.log("Game list: ", games);
  res.end();
}



module.exports = {
  gamesListGet,
};