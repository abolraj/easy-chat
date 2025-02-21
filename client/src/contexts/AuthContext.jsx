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
        setLoading(false)
      }
    }
    initAuth()
  }, [])

  const authUser = async () => {
    const userData = await fetchUser().finally(()=>setLoading(false))
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
      {loading && 
      <div className="fixed bg-base-100 z-50 left-0 top-0 w-screen h-screen flex flex-col items-center justify-center">
        <span className="loading loading-infinity text-info w-20"></span>
      </div>
      }
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
