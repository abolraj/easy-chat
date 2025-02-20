import { Link } from 'react-router-dom'
import ConversationList from '../../components/chat/ConversationList'
import { useAuth } from '../../contexts/AuthContext'

export default function ChatHome() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-base-100">
        <h2 className="text-2xl font-bold">Welcome, {user?.name}</h2>
        <Link to="/chat/new" className="btn btn-primary btn-sm mt-2">
          New Conversation
        </Link>
      </div>
      <ConversationList />
    </div>
  )
}