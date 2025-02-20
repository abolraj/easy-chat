import { Link } from 'react-router-dom'
import useApi from '../../hooks/useApi'
import UserAvatar from '../ui/UserAvatar'

export default function ConversationList() {
  const { data: conversations, loading } = useApi('/api/conversations')
  
  return (
    <div className="space-y-2">
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton h-16 w-full"></div>
          ))}
        </div>
      ) : (
        conversations?.map(convo => (
          <Link 
            key={convo.id} 
            to={`/chat/${convo.id}`}
            className="flex items-center gap-3 p-3 hover:bg-base-200 rounded-lg transition-colors"
          >
            <UserAvatar user={convo.participants[0].user} />
            <div className="flex-1">
              <h3 className="font-semibold">{convo.name}</h3>
              <p className="text-sm text-gray-400 truncate">
                {convo.last_message?.content}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  )
}
