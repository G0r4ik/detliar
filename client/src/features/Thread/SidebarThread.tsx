import { useEffect } from 'react'
import threadsStore from '../../config/store.ts'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const { threads, getThreads } = threadsStore()

  useEffect(() => {
    getThreads()
  }, [getThreads])

  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <strong className='sidebar__theme-title'>Темы</strong>
        <strong className='sidebar__theme-count'>({threads.length})</strong>
      </div>
      {/* <input className='sidebar__search' placeholder='поиск' /> */}
      <div className='themes'>
        {threads.map(thread => (
          <Link
            className='sidebar__theme-name'
            key={thread._id}
            to={`/threads${thread.shortName}`}>
            {thread.shortName}
          </Link>
        ))}
      </div>

      <div style={{ marginTop: ' auto' }}>
        <Link to='/threads/create' className='create-theme'>
          Создать тему
        </Link>
        <Link to='/' className='go-main'>
          Обратно
        </Link>
      </div>
    </div>
  )
}
