const pool = require("./pool");



async function getAllGames() {
  try {
    const { rows } = await pool.query("SELECT * FROM game");

    return rows;
  } catch (error) {
    console.error(`Error: `, error);
  }
  
}

async function addGame({ title, release_date, publisher, developer, genre }) {
  await pool.query(`INSERT INTO game (title, release_date, publisher, developer, genre) VALUES($1, $2, $3, $4, $5)`, [title, release_date, publisher, developer, genre]);
  /* const result = { title, release_date, publisher, developer, genre };
  console.log(result); */
}

async function getGame(gameId) {
  const { rows } = await pool.query("SELECT * FROM game WHERE id = $1", [gameId]);
  // const { release_date } = rows.release_date.
  return rows[0];
}

async function editGame(gameId, { title, release_date, publisher, developer, genre }) {
  await pool.query("UPDATE game SET title = $2, release_date = $3, publisher = $4, developer = $5, genre = $6 WHERE id = $1", [gameId, title, release_date, publisher, developer, genre]);
  // console.log(gameId, title);
}

async function deleteGame(gameId) {
  await pool.query("DELETE FROM game WHERE id = $1", [gameId]);
  // const {rows} = await pool.query("SELECT * FROM game WHERE id = $1", [gameId]);
  console.log('deleting game ;-;');
  // return rows;
}



module.exports = {
  getAllGames,
  addGame,
  getGame,
  editGame,
  deleteGame,
};