const { Pool } = require("pg");

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
module.exports = new Pool({
  connectionString: process.env.CONNECTION_STRING_LOCAL_DB
});