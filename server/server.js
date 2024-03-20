import express, { json } from 'express'
import initSockets from './socket.js'
import { createServer } from 'node:http'
import router from './express/routes.js'
import cors from 'cors'
const app = express()
const server = createServer(app)
import dotenv from 'dotenv'
import { errorHandler } from './shared/errorHandler.js'
dotenv.config()
initSockets(server)

app.use(json())
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(router)
app.use(errorHandler)

server.listen(30000, () => {
  console.log('server running at http://localhost:30000')
})
