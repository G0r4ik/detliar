const nv = process.env.NODE_ENV
const devServer = 'https://api.detliar.com'
const prodServer = 'http://localhost:30000'
const serverURL = nv === 'production' ? devServer : prodServer
