import Sidebar from '../features/Thread/SidebarThread'
import ThreadStart from '../features/Thread/ThreadStart'
import Header from '../shared/Header'

export default function ThreadStartPage() {
  return (
    <>
      <Header />
      <main className='thread-page'>
        <Sidebar />
        <ThreadStart />
      </main>
    </>
  )
}
