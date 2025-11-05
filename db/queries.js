const pool = require("./pool");



// Queries for Games
async function getAllGames() {
  try {
    const { rows } = await pool.query("SELECT * FROM game");

    return rows;
  } catch (error) {
    console.error('Query getAllGames error: ', error);
  }  
}

async function addGame({ title, release_date, publisher, developer, genre }) {
  try {
    await pool.query(`INSERT INTO game (title, release_date, publisher, developer, genre) VALUES($1, $2, $3, $4, $5)`, [title, release_date, publisher, developer, genre]);
  } catch (error) {
    console.error('Query addGame error: ', error);
  }  
}

async function getGame(gameId) {
  try {
    const { rows } = await pool.query("SELECT * FROM game WHERE id = $1", [gameId]);

    return rows[0];
  } catch (error) {
    console.error('Query getGame error: ', error);
  }  
}

async function editGame(gameId, { title, release_date, publisher, developer, genre }) {
  try {
    await pool.query("UPDATE game SET title = $2, release_date = $3, publisher = $4, developer = $5, genre = $6 WHERE id = $1", [gameId, title, release_date, publisher, developer, genre]);
  } catch (error) {
    console.error('Query editGame error: ', error);
  }  
}

async function deleteGame(gameId) {
  try {
    await pool.query("DELETE FROM game WHERE id = $1", [gameId]);
  } catch (error) {
    console.error('Query deleteGame error: ', error);
  }  
}

async function searchGames(str) {
  try {
    const { rows } = await pool.query("SELECT * FROM game WHERE title ILIKE '%'||$1||'%'", [str]);

  return rows;
  } catch (error) {
    console.error('Query searchGames error: ', error);
  }  
}



// Queries for Lists
async function getAllLists() {
  try {
    const { rows } = await pool.query("SELECT * FROM lists");

    return rows;
  } catch (error) {
    console.error('Query getAllLists error: ', error);
  }
}

async function addList({ name, description }) {
  try {
    await pool.query("INSERT INTO lists (name, description) VALUES ($1, $2)", [name, description]);
  } catch (error) {
    console.error('Query addList error: ', error);
  }  
}

async function getList(listId) {
  try {
    const { rows } = await pool.query("SELECT * FROM lists WHERE id = $1", [listId]);

    return rows[0];
  } catch (error) {
    console.error('Query getList error: ', error);
  }
}

async function editList(listId, { name, description }) {
  try {
    await pool.query("UPDATE lists SET name = $2, description = $3 WHERE id = $1", [listId, name, description]);
  } catch (error) {
    console.error('Query editList error: ', error);
  }  
}

async function deleteList(listId) {
  // Delete list from lists_game table, THEN delete list from lists table
  // BEGIN, COMMIT and ROLLBACK to use multiple statements in a single query
  try {
    await pool.query("BEGIN")
    await pool.query("DELETE FROM lists_game WHERE list_id = $1", [listId])
    await pool.query("DELETE FROM lists WHERE id = $1", [listId])
    await pool.query("COMMIT")
  } catch (error) {
    await pool.query("ROLLBACK")
    throw error
  }
}



// Queries for list and games relation
async function getGamesFromList(listId) {
  // lists_game 
  // Query that display name of list and game title
  try {
    const { rows } = await pool.query("SELECT game.* FROM lists_game JOIN lists ON lists_game.list_id = lists.id JOIN game ON lists_game.game_id = game.id WHERE lists_game.list_id = $1 ", [listId]);

    return rows;
  } catch (error) {
    console.error('Query getGamesFromList error: ', error);
  }  
}

async function addGameToList(listId, gameId) {
  // lists_game: list_id | game_id
  try {
    await pool.query("INSERT INTO lists_game (list_id, game_id) VALUES ($1, $2)", [listId, gameId]);
  } catch (error) {
    console.error('Query addGameToList error: ', error);
  }  
}

async function searchGameIdOnList(listId, gameId) {
  // lists_game 
  try {
    const { rows } = await pool.query("SELECT * FROM lists_game WHERE list_id = $1 AND game_id = $2", [listId, gameId]);

    return rows;
  } catch (error) {
    console.error('Query searchGameIdOnList error: ', error);
  }  
}

async function removeGameFromList(gameId, listId) {
  try {
    await pool.query("DELETE FROM lists_game WHERE game_id = $1 AND list_id = $2", [gameId, listId]);
  } catch (error) {
    console.error('Query removeGameFromList error: ', error);
  }  
}



module.exports = {
  getAllGames,
  addGame,
  getGame,
  editGame,
  deleteGame,
  searchGames,
////////
  getAllLists,
  addList,
  getList,
  editList,
  deleteList,
////////
  getGamesFromList,
  addGameToList,
  removeGameFromList,
  searchGameIdOnList,
};