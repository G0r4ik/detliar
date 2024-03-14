import { createBrowserRouter } from 'react-router-dom'
import ThreadPage from '../Pages/Threads'
import ThreadCreate from '../Pages/ThreadCreate'
import LandingPage from '../Pages/Landing'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/threads/',
    element: <ThreadPage />,
  },
  {
    path: '/threads/create',
    element: <ThreadCreate />,
  },
  {
    path: '/threads/:idPost',
    element: <div>Hello world!</div>,
  },
])

export default router
