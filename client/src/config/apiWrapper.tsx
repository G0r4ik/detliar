import { useState, useEffect } from 'react'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:30000',
  timeout: 0,
  withCredentials: true,
  // headers: {
  //   Authorization: `Bearer ${await getToken()}}`,
  // },
})

// Хук для выполнения GET запроса и получения данных
export const useGetData = url => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await instance.get(url)
      setData(response.data)
    }

    fetchData()

    return () => setData(null)
  }, [url])

  return data
}

// Хук для выполнения POST запроса
export const usePostData = (url, postData) => {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const postDataToServer = async () => {
    try {
      setLoading(true)
      const response = await instance.post(url, postData)
      setResponse(response.data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return { response, loading, error, postDataToServer }
}
