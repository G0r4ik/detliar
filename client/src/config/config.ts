const isDev = process.env.NODE_ENV === 'development'

export const serverURL = isDev
  ? 'http://localhost:30000'
  : 'https://api.detliar.com'
