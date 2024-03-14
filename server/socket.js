import { Server } from 'socket.io'

import db from './db/sqlite.js'

export default function initSockets(server) {
  const io = new Server(server, {
    cors: { origin: '*' },
    connectionStateRecovery: {},
    maxHttpBufferSize: 1e8,
  })

  io.on('connection', async socket => {
    console.log('Польозватель вошел')
    socket.on('chat message', async msg => {
      const ms = new Date().toUTCString()
      let result = await db.run(
        'INSERT INTO messages (textM, dateM, userM, imgs) VALUES (?, ?, ?, ?)',
        msg.text,
        ms,
        msg.user,
        JSON.stringify(msg.imgs)
      )
      console.log('quety')
      io.emit(
        'chat message',
        { ...msg, date: ms, id: result.lastID },
        result.lastID
      )
    })

    if (!socket.recovered) {
      try {
        await db.each(
          'SELECT id, textM, userM, dateM, imgs FROM messages WHERE id > ?',
          [socket.handshake.auth.serverOffset || 0],
          (_err, row) => {
            console.log('querry')

            socket.emit(
              'chat message',
              {
                text: row.textM,
                user: row.userM,
                date: row.dateM,
                imgs: JSON.parse(row.imgs),
                id: row.id,
              },
              row.id
            )
          }
        )
      } catch (e) {
        console.log(e)
      }
    }

    io.emit('changeUserCount', io.engine.clientsCount)

    socket.on('disconnect', () => {
      io.emit('changeUserCount', io.engine.clientsCount)
      console.log('Пользоваетль вышел')
    })
  })
}
