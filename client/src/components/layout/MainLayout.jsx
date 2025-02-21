import { Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Loader from '../ui/Loader'
import Navbar from './Navbar'

export default function MainLayout() {
  const { user, loading } = useAuth()

  if (loading) return <Loader className="h-screen" />

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar user={user} />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  )
}