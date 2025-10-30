// dotenv
require("dotenv").config();

// Server
const path = require("node:path");
const express = require("express");
const app = express();

// Import routers
const indexRouter = require("./routes/indexRouter");
const gamesRouter = require("./routes/gamesRouter");



// Enables EJS for views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Enables query parser
app.set("query parser");

// Enable req.body to parse client's output
app.use(express.urlencoded({ extended: true }));

// Using imported routes
app.use("/games", gamesRouter);
app.use("/", indexRouter);



// Handling errors
app.use((err, req, res, next) => {
  console.error(err);
  // res.status(500).send(err);
});



// 
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Inventory App - listening on port ${PORT}!`);
});