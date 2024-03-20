import { createBrowserRouter } from 'react-router-dom'
import ThreadPage from '../pages/Threads'
import ThreadCreate from '../pages/ThreadCreate'
import LandingPage from '../pages/Landing'
import ErrorPage from '../pages/ErrorPage'
import ThreadStart from '../pages/ThreadStart'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/threads/',
    element: <ThreadStart />,
  },
  {
    path: '/threads/create',
    element: <ThreadCreate />,
  },
  {
    path: '/threads/:idThread',
    loader: async ({ params }) => {
      const idThread = params.idThread
      return { idThread }
    },
    element: <ThreadPage />,
  },
])

export default router
