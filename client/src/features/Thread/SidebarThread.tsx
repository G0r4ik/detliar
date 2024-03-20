import { useEffect, useMemo, useRef, useState } from 'react'
import threadsStore from '../../config/store.ts'
import { Link } from 'react-router-dom'
import socket from '../../config/socket.ts'
import { useAuth } from '@clerk/clerk-react'

let load = false
const countOfSocket = 0

export default function Sidebar() {
  const { isSignedIn } = useAuth()
  const { threads, getThreads, setThreads } = threadsStore()
  const searchThreadInput = useRef<HTMLInputElement>(null)
  const [searchTerm, setSearchTerm] = useState('')

  function searchThread(event) {
    console.log(event.target.value)
    console.log(searchThreadInput.current.value)
  }

  // const filteredThreads = useMemo(() => {
  //   console.log('change')
  //   return threads.filter(thread =>
  //     thread.shortName.includes(searchThreadInput.current.value)
  //   )
  // }, [
  //   threads,
  //   searchThreadInput,
  //   searchThreadInput.current,
  //   searchThreadInput?.current?.value,
  // ])

  const filteredThreads = useMemo(() => {
    if (!threads || !searchTerm) return threads // Handle empty threads or search term

    return threads.filter(thread =>
      thread.shortName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [threads, searchTerm])

  function handleSearchChange(event) {
    setSearchTerm(event.target.value.toLowerCase())
  }

  useEffect(() => {
    if (!load) {
      getThreads()
      load = true
    }
    socket.on(`create_thread`, msg => {
      setThreads(msg)
    })

    return () => {
      socket.off('create_thread')
    }
  }, [getThreads, setThreads])

  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <strong className='sidebar__theme-title'>Темы</strong>
        <strong className='sidebar__theme-count'>({threads.length})</strong>
      </div>
      <input
        className='sidebar__search'
        placeholder='поиск'
        ref={searchThreadInput}
        onChange={handleSearchChange}
      />
      <div className='themes'>
        {filteredThreads.map(thread => (
          <Link
            className='sidebar__theme-name'
            key={thread._id}
            to={`/threads${thread.shortName}`}>
            {thread.shortName}
          </Link>
        ))}
      </div>

      <div style={{ marginTop: ' auto' }}>
        {isSignedIn && (
          <Link to='/threads/create' className='create-theme'>
            Создать тему
          </Link>
        )}
        <Link to='/' className='go-main'>
          Обратно
        </Link>
      </div>
    </div>
  )
}
