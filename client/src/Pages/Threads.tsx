import Header from '../shared/Header'
// import '../styles/threads/thread.css'
import MyHead from '../shared/MyHead'
import Sidebar from '../features/SidebarThemes/Sidebar'
import Thread from '../features/Thread/Thread'

export default function ThreadPage() {
  // console.log(useUser())

  return (
    <>
      <MyHead styleLinks={['src/styles/threads/thread.css']}></MyHead>
      <Header />
      <main>
        <Sidebar threads={[]} />
        <Thread />
      </main>
    </>
  )
}
