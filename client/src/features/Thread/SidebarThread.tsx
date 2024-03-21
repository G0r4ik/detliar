import { useEffect, useMemo, useRef, useState } from 'react'
import threadsStore from '../../config/store.ts'
import { Link } from 'react-router-dom'
import socket from '../../config/socket.ts'
import { useAuth } from '@clerk/clerk-react'
import ChangeTheme from '../../shared/ChangeTheme.tsx'

let load = false

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

  const sidebar = useRef<HTMLDivElement>(null)

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

  function showSidebar() {
    sidebar.current.classList.toggle('sidebar_hide')
  }
  return (
    <div className='sidebar sidebar_hide' ref={sidebar}>
      <button className='sidebar__burger' onClick={showSidebar}></button>
      <div className='sidebar__inner'>
        <div className='sidebar__top'>
          <strong className='sidebar__theme-title'>Topics</strong>
          <input
            className='sidebar__search'
            placeholder='Search'
            ref={searchThreadInput}
            onChange={handleSearchChange}
          />
        </div>
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

        <div className='sidebar__bottom'>
          <ChangeTheme />
          <div className='sidebar__create-thread'>
            {isSignedIn && (
              <Link
                to='/threads/create'
                className='sidebar__create-thread-button'>
                Create
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
