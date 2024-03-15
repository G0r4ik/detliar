import { createBrowserRouter } from 'react-router-dom'
import ThreadPage from '../pages/Threads'
import ThreadCreate from '../pages/ThreadCreate'
import LandingPage from '../pages/Landing'
import ErrorPage from '../pages/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
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
