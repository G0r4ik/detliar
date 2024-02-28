const nv = process.env.NODE_ENV
const serverURL =
  nv === 'production' ? 'https://api.detliar.com' : 'http://localhost:30000'
