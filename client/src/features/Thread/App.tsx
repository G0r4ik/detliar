import api from '../../config/API.ts'
import { useState } from 'react'

function Comments() {
  const [threads, setThreads] = useState([])

  async function load() {
    const resThreads = await api.get('/getThreads')
    setThreads(resThreads.data)
    console.log(threads, 1)
  }
  load()
}

export default Comments
