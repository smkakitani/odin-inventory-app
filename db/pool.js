const { Pool } = require("pg");

// Connection with local database
module.exports = new Pool({
  connectionString: process.env.CONNECTION_STRING_LOCAL_DB
});