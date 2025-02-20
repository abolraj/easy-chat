import { Link } from 'react-router-dom'
import UserAvatar from '../ui/UserAvatar'

export default function Navbar({ user }) {
  return (
    <div className="navbar bg-base-100 shadow-lg px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">EasyChat</Link>
      </div>
      <div className="flex-none gap-4">
        {user ? (
          <div className="dropdown dropdown-end">
            <UserAvatar user={user} size="sm" />
            <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><button>Profile</button></li>
              <li><button>Settings</button></li>
              <li><button>Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">Login</Link>
        )}
      </div>
    </div>
  )
}