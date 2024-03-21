import { Server } from 'socket.io'
import db from './db/sqlite.js'
import services from './express/services.js'
export let io

export default function initSockets(server) {
  io = new Server(server, {
    cors: { origin: '*' },
    connectionStateRecovery: {},
    maxHttpBufferSize: 1e8,
  })

  const rooms = {}

  function displayRoomStatus() {
    console.log(rooms)
  }

  async function handleChatMessage(socket, msg) {
    const ms = new Date().toUTCString()
    let result = await db.run(
      'INSERT INTO messages (textM, dateM, userM, imgs) VALUES (?, ?, ?, ?)',
      msg.text,
      ms,
      msg.user,
      JSON.stringify(msg.imgs)
    )
    io.emit(
      'chat message',
      { ...msg, date: ms, id: result.lastID },
      result.lastID
    )
  }

  function handleGoThread(socket, threadId) {
    if (!rooms[threadId]) rooms[threadId] = new Set()
    rooms[threadId].add(socket.id)
    socket.join(threadId)
  }

  function handleLeaveThread(socket, threadId) {
    if (rooms[threadId]) {
      rooms[threadId].delete(socket.id)
      if (rooms[threadId].size === 0) {
        delete rooms[threadId]
      }
    }
    socket.leave(threadId)
  }

  async function handleMessage(socket, threadId, message) {
    const { content, authorId, anonName } = message
    const post = await services.createPost(
      threadId,
      content,
      authorId,
      anonName
    )
    if (rooms[threadId]) io.to(threadId).emit('message', post)
  }

  function handleDisconnect(socket) {
    io.emit('changeUserCount', io.engine.clientsCount)
    for (const room of Object.keys(rooms)) {
      rooms[room].delete(socket.id)
      if (rooms[room].size === 0) {
        delete rooms[room]
      }
    }
  }

  io.on('connection', async socket => {
    socket.on('chat message', async msg => {
      await handleChatMessage(socket, msg)
    })

    socket.on('go_thread', async threadId => {
      handleGoThread(socket, threadId)
    })

    socket.on('leave_thread', threadId => {
      handleLeaveThread(socket, threadId)
    })

    socket.on('message', async (threadId, message) => {
      handleMessage(socket, threadId, message)
    })

    socket.on('disconnect', () => {
      handleDisconnect(socket)
    })

    io.emit('changeUserCount', io.engine.clientsCount)
  })

  // setInterval(() => {
  //   displayRoomStatus()
  // }, 5000)
}
