import api from './config'

export const loginUser = async (credentials) => {
  await api.get('/sanctum/csrf-cookie')
  const { data } = await api.post('/api/login', credentials)
  return data
}

export const registerUser = async (userData) => {
  await api.get('/sanctum/csrf-cookie')
  const { data } = await api.post('/api/register', userData)
  return data
}

export const logoutUser = async () => {
  await api.post('/api/logout')
}

export const fetchUser = async () => {
  const { data } = await api.get('/api/user')
  return data
}
