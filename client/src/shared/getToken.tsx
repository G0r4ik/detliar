import { useAuthToken } from './useAuthToken'

export async function getToken() {
  const { token } = useAuthToken()
  return token
}
