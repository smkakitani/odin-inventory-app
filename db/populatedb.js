#! /usr/bin/env node

// dotenv
require("dotenv").config();

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS game (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ),
  release_date DATE,
  publisher VARCHAR ( 60 ),
  developer VARCHAR ( 255 ),
  genre VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS lists (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ),
  description VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS lists_game (
  list_id INTEGER REFERENCES lists,
  game_id INTEGER REFERENCES game  
);

INSERT INTO game (title, release_date, publisher, developer, genre)
  VALUES 
  ('Silent Hill f', '2025-09-25', 'Konami', 'NeoBards', 'Action-Adventure'),
  ('No More Heroes', '2007-12-06', 'Marvelous Entertainment', 'Grasshopper Manufacture', 'Action-Adventure'),
  ('Final Fantasy Tactics', '1997-06-20', 'Square Enix', 'Square Enix', 'Strategy');
`;



// Connect to local database
async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString: process.env.CONNECTION_STRING_LOCAL_DB
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  
  console.log("done");
}

main();