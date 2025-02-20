import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome to EasyChat</h1>
          <p className="py-6">Secure real-time messaging platform</p>
          <div className="flex gap-4 justify-center">
            <Link to="/login" className="btn btn-primary">Get Started</Link>
            <Link to="/register" className="btn btn-outline">Register</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
