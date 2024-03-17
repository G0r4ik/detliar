import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'

export function useAuthToken() {
  const { getToken } = useAuth()
  const [token, setToken] = useState(null)

  useEffect(() => {
    async function fetchToken() {
      try {
        const newToken = await getToken()
        setToken(newToken)
      } catch (err) {
        console.error(err)
      }
    }

    fetchToken()
  }, [])

  return { token }
}
