import { useState } from 'react'
import socket from '../config/socket.ts'

export default function UsersCount() {
  const [countOfUsers, setCountOfUsers] = useState(0)

  socket.on('changeUserCount', msg => {
    console.log('Пользователей на сайте: ' + msg)
    setCountOfUsers(msg)
    return () => {
      socket.close()
    }
  })

  return (
    <p className='users-count'>
      Online users:
      <span className='users-count__count'> {countOfUsers ?? 0}</span>
    </p>
  )
}
