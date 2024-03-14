import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './config/router'
// import { Helmet } from 'react-helmet'
// import Head from './components/shared/MyHead'
import { ClerkProvider } from '@clerk/clerk-react'
import './styles/style.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    {/* <Head></Head> */}

    <link rel='stylesheet' href='./src/styles/style.css' />
    <RouterProvider router={router} />
  </ClerkProvider>
  // </React.StrictMode>
)
