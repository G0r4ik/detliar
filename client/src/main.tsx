import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './config/router'
import { ClerkProvider } from '@clerk/clerk-react'
import './styles/style.css'
import { Provider } from 'react-redux'
import { store } from './config/store'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </Provider>
  // </React.StrictMode>
)
