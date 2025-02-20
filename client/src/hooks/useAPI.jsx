import { useState, useEffect } from 'react'
import api from '../api/config'

export default function useApi(endpoint, initialData = null) {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      const response = await api.get(endpoint)
      setData(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const postData = async (payload) => {
    try {
      const response = await api.post(endpoint, payload)
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred')
      throw err
    }
  }

  useEffect(() => {
    if (endpoint) fetchData()
  }, [endpoint])

  return { data, loading, error, refresh: fetchData, postData }
}