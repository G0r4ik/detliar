// import Header from './Header.tsx'
// import Sidebar from './SidebarThemes/Sidebar.tsx'
// import Thread from './Theme.tsx'

import api from '../config/API.ts'
import { useEffect, useState } from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
  },
])

function Comments() {
  //
  const [threads, setThreads] = useState([])

  async function load() {
    const resThreads = await api.get('/getThreads')
    setThreads(resThreads.data)
    console.log(threads, 1)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <>
      {/* <Header />
      <main>
        <Sidebar threads={threads} />
        <Thread />
      </main> */}

      <RouterProvider router={router} />
    </>
  )
}

export default Comments
