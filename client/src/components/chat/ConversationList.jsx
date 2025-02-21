import { Link } from 'react-router-dom'
import { apiGet } from '../../hooks/useApi'
import UserAvatar from '../ui/UserAvatar'
import { useEffect } from 'react'

export default function ConversationList() {
  const { data: conversations, loading } = apiGet('/api/conversations')
  return (
    <div className="space-y-2">
      {loading ? (
        <span className="loading loading-infinity loading-xl text-primary"></span>
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
              <p className="text-sm text-gray-400">
                {convo.messages[0].content}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  )
}
