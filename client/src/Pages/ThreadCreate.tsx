import Sidebar from '../features/Thread/SidebarThread'
import ThreadCreate from '../features/Thread/ThreadCreate'
import Header from '../shared/Header'

export default function ThreadCreatePage() {
  return (
    <>
      <Header />
      <main className='thread-page'>
        <Sidebar />
        <ThreadCreate />
      </main>
    </>
  )
}
