import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// open the database file
const db = await open({
  filename: 'chat.db',
  driver: sqlite3.Database,
})

// create our 'messages' table (you can ignore the 'client_offset' column for now)
await db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_offset TEXT UNIQUE,
      textM TEXT,
      userM TEXT,
      dateM TEXT
  );
`)

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
  connectionStateRecovery: {},
})

io.on('connection', async socket => {
  socket.on('chat message', async msg => {
    const dateD = new Intl.DateTimeFormat('ru', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date())

    let result = await db.run(
      'INSERT INTO messages (textM, dateM, userM) VALUES (?, ?, ?)',
      msg.text,
      dateD,
      msg.user
    )
    io.emit('chat message', { ...msg, dateD }, result.lastID)
  })

  if (!socket.recovered) {
    try {
      await db.each(
        'SELECT id, textM, userM, dateM FROM messages WHERE id > ?',
        [socket.handshake.auth.serverOffset || 0],
        (_err, row) => {
          socket.emit(
            'chat message',
            { text: row.textM, user: row.userM, date: row.dateM },
            row.id
          )
        }
      )
    } catch (e) {
      console.log(e)
    }
  }
})

server.listen(30000, () => {
  console.log('server running at http://localhost:30000')
})
