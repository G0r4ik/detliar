import { io } from 'socket.io-client'
const socket = io('http://localhost:30000', { auth: { serverOffset: 0 } })
// const socket = io('https://api.detliar.com', { auth: { serverOffset: 0 } })

export default socket
