import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { hasApiKey } from '../hooks/useApi'
import Footer from '../components/layout/Footer'

export default function HomePage() {
  const { user, loading } = useAuth()
  const isApiKey = hasApiKey()

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <img src="/easy-chat.svg" alt="easy-chat" className="h-20 w-20 text-primary mx-auto" />

          {loading ?
            <span className="loading loading-infinity text-info w-20"></span>
            :

            isApiKey && user ?
              <>
                <h1 className="text-5xl font-bold">Hi <span className="text-pink-400">{user.name}</span> !, Welcome back to EasyChat</h1>
                <p className="py-6">Secure real-time messaging platform</p>
                <div className="flex gap-4 justify-center">
                  <Link to="/chat" className="btn btn-primary">My Chats</Link>
                </div>
              </>
              :
              <>
                <h1 className="text-5xl font-bold">Hi!, Welcome to EasyChat</h1>
                <p className="py-6">Secure real-time messaging platform</p>
                <div className="flex gap-4 justify-center">
                  <Link to="/login" className="btn btn-primary">Get Started</Link>
                  <Link to="/register" className="btn btn-outline">Register</Link>
                </div>
              </>
          }

        </div>
      </div>

      <Footer/>
    </div>
  )
}
