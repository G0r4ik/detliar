import axios from 'axios'
// import { SERVER_LOCAL, isProduction } from '@/shared/consts.js'
// import { SERVER_API_PROD } from '../shared/consts.js'

// const server = isProduction ? SERVER_API_PROD : SERVER_LOCAL

const instance = axios.create({
  baseURL: 'http://localhost:30000',
  headers: {},
  timeout: 0,
  withCredentials: true,
})

// instance.interceptors.request.use(config => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//   return config
// })

// instance.interceptors.response.use(
//   config => config,
//   async error => {
//     const originalRequest = error.config
//     if (
//       error.response.status === 401 &&
//       error.config &&
//       !error.config._isRetry
//     ) {
//       originalRequest._isRetry = true
//       const token1 = await instance.get('refresh_token')
//       const token = token1.data.accessToken
//       localStorage.setItem('token', token)
//       return instance.request(originalRequest)
//     }
//     throw error
//   }
// )

export default instance
