import Header from '../shared/Header'
import MyHead from '../shared/MyHead'
import Sidebar from '../features/Thread/SidebarThread'
import Thread from '../features/Thread/Thread'

export default function ThreadPage() {
  return (
    <>
      <MyHead styleLinks={[]}></MyHead>
      <Header />
      <main className='thread-page'>
        <Sidebar />
        <Thread />
      </main>
    </>
  )
}
