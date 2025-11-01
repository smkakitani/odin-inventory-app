const db = require("../db/queries");
const { body, query, validationResult, matchedData } = require("express-validator");
const { links } = require("./indexController");



// 
async function listsGet(req, res) {
  res.render("lists/lists", {
    title: "Lists",
    links: links,
  });
  // res.send("rendering lists...");
}



module.exports = {
  listsGet,
};