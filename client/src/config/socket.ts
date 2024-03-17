import { io } from 'socket.io-client'
import { serverURL } from '../config/config'

const socket = io(serverURL, { auth: { serverOffset: 0 } })

export default socket
