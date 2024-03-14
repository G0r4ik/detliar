import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// open the database file
const db = await open({
  filename: './chat.db',
  driver: sqlite3.Database,
})

// create our 'messages' table (you can ignore the 'client_offset' column for now)
await db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_offset TEXT UNIQUE,
      textM TEXT,
      userM TEXT,
      dateM TEXT,
      imgs TEXT
  );
`)

export default db
