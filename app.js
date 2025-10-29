// dotenv
require("dotenv").config();

// Server
const path = require("node:path");
const express = require("express");
const app = express();

// Import routers
const indexRouter = require("./routes/indexRouter");



// Enables EJS for views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Enables query parser
app.set("query parser");

// Enable req.body to parse client's output
app.use(express.urlencoded({ extended: true }));

// 
app.use("/", indexRouter);



// 
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Inventory App - listening on port ${PORT}!`);
});