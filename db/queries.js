const pool = require("./pool");



// Queries for Games
async function getAllGames() {
  try {
    const { rows } = await pool.query("SELECT * FROM game");

    return rows;
  } catch (error) {
    console.error(`Query error: `, error);
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

async function searchGames(str) {
  try {
    const { rows } = await pool.query("SELECT * FROM game WHERE title ILIKE '%'||$1||'%'", [str]);
    // console.log(rows);

  return rows;
  } catch (error) {
    console.error('Search games error: ', error);
  }
  
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
  await pool.query("INSERT INTO lists_game (list_id) VALUES ($1)");
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

async function getGamesFromList(listId) {
  // lists_game 
  // const { rows } = await pool.query("SELECT * FROM lists_game WHERE list_id = $1", [listId]);
  // console.log(rows);

  // Query that display name of list and game title
  const { rows } = await pool.query("SELECT lists.name AS list_name, game.title AS game_title FROM lists_game JOIN lists ON lists_game.list_id = lists.id JOIN game ON lists_game.game_id = game.id WHERE lists_game.list_id = $1 ", [listId]);

  // const { rows } = await pool.query("SELECT game.title AS game_title FROM lists_game JOIN lists ON lists_game.list_id = lists.id JOIN game ON lists_game.game_id = game.id;");
  // console.log(rows);
  return rows;
}

async function addGameToList(listId, gameId) {
  // await pool.query("INSERT INTO lists_game (list_id, game_id) VALUES ($1, $2)", [listId, gameId]);
  console.log(listId, gameId);
}






module.exports = {
  getAllGames,
  addGame,
  getGame,
  editGame,
  deleteGame,
  searchGames,
// //////
  getAllLists,
  addList,
  getList,
  editList,
  deleteList,
// /////
  getGamesFromList,
  addGameToList,
};