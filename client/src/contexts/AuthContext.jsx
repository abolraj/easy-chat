import { createContext, useContext, useState, useEffect } from 'react'
import { fetchUser, loginUser, registerUser, logoutUser } from '../api/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        authUser()
      } catch (error) {
        setUser(null)
      }
      setLoading(false)
    }
    initAuth()
  }, [])

  const authUser = async () => {
    const userData = await fetchUser()
    setUser(userData)
    return userData
  }

  const login = async (credentials) => {
    setLoading(true)
    const response = await loginUser(credentials).finally(()=>setLoading(false))
    localStorage.setItem('auth_token', response.access_token)
    localStorage.setItem('auth_type', response.token_type)
    return await authUser()
  }

  const register = async (userInfo) => {
    setLoading(true)
    const response = await registerUser(userInfo).finally(()=>setLoading(false))
    localStorage.setItem('auth_token', response.access_token)
    localStorage.setItem('auth_type', response.token_type)
    return await authUser()
  }

  const logout = async () => {
    await logoutUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
