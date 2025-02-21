import { useState, useEffect } from 'react'
import api from '../api/config'

export function apiGet(endpoint, initialData = null) {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const request = async () => {
    try {
      setLoading(true)
      const response = await api.get(endpoint, initialData)
      setData(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const apiRefresh = () => request()

  useEffect(()=>{
    apiRefresh()
  },[endpoint, initialData])

  // return { data, loading, error, apiRefresh, apiSucceed, apiFailed}
  return { data, loading, error, apiRefresh}
}

export function apiPut(endpoint, initialData = null) {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const request = async () => {
    try {
      setLoading(true)
      const response = await api.put(endpoint, initialData)
      setData(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const apiRefresh = () => request()

  useEffect(()=>{
    apiRefresh()
  },[endpoint, initialData])

  return { data, loading, error, apiRefresh}
}

export function apiPost(endpoint, initialData = null) {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const request = async () => {
    try {
      setLoading(true)
      const response = await api.post(endpoint, initialData)
      setData(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const apiRefresh = () => request()

  useEffect(()=>{
    apiRefresh()
  },[endpoint, initialData])

  return { data, loading, error, apiRefresh}
}

export function apiDelete(endpoint, initialData = null) {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const request = async () => {
    try {
      setLoading(true)
      const response = await api.delete(endpoint, initialData)
      setData(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const apiRefresh = () => request()

  useEffect(()=>{
    apiRefresh()
  },[endpoint, initialData])

  return { data, loading, error, apiRefresh}
}

export function hasApiKey(){
  return localStorage.getItem('auth_token') && localStorage.getItem('auth_type')
}