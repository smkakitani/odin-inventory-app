const pool = require("./pool");



// Queries for Games
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
}



// Queries for Lists
async function getAllLists() {
  try {
    const { rows } = await pool.query("SELECT * FROM lists");

    return rows;
  } catch (error) {
    console.error(`Query error: `, error);
  }
}

async function addList({ name, description }) {
  await pool.query("INSERT INTO lists (name, description) VALUES ($1, $2)", [name, description]);
  // console.log(name, description);
}

async function getList(listId) {
  try {
    const { rows } = await pool.query("SELECT * FROM lists WHERE id = $1", [listId]);

    return rows[0];
  } catch (error) {
    console.error("Query error: ", error);
  }
}

async function editList(listId, { name, description }) {
  await pool.query("UPDATE lists SET name = $2, description = $3 WHERE id = $1", [listId, name, description]);
}

async function deleteList(listId) {
  // const {rows} = await pool.query("SELECT * FROM lists WHERE id = $1", [listId]);
  // console.log(rows);
  await pool.query("DELETE FROM lists WHERE id = $1", [listId]);
  console.log('deleting list D:');
}






module.exports = {
  getAllGames,
  addGame,
  getGame,
  editGame,
  deleteGame,
// //////
  getAllLists,
  addList,
  getList,
  editList,
  deleteList,
};