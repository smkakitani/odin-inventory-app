const pool = require("./pool");



async function getAllGames() {
  const { rows } = await pool.query("SELECT * FROM game");
}

// async function addGame({ title, release_date, publisher, developer, genre }) {
  
// }



module.exports = {
  getAllGames,
};