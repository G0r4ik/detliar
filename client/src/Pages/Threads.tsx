import Header from '../shared/Header'
import MyHead from '../shared/MyHead'
import Sidebar from '../features/Thread/SidebarThread'
import Thread from '../features/Thread/Thread'

export default function ThreadPage() {
  // console.log(useUser())

  return (
    <>
      <MyHead styleLinks={['/threads/thread.css']}></MyHead>
      <Header />
      <main className='thread-page'>
        <Sidebar />
        <Thread />
      </main>
    </>
  )
}
