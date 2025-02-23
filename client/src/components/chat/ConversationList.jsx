import { Link } from 'react-router-dom'
import { apiGet } from '../../hooks/useApi'
import UserAvatar from '../ui/UserAvatar'
import { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import moment from 'jalali-moment'

export default function ConversationList() {
  const { data: conversations, loading } = apiGet('/api/conversations')
  const { user } = useAuth()
  const getUnreadMsgs = (conversation) => {
    const participants = conversation.participants
    const msgs_participant = conversation
      .messages
      .filter(msg =>
        participants.some(ptcp => ptcp.user_id != user.id && ptcp.user_id == msg.user_id && new Date(ptcp.last_read_at + '.000000Z') < new Date(msg.created_at)))
      .map(msg => {
        msg.last_read = participants.find(ptcp => ptcp.user_id == msg.user_id).last_read_at
        return msg
      })

    return msgs_participant
  }

  return (
    <div className="space-y-2">
      {loading ? (
        <span className="loading loading-infinity w-20 fixed top-0 left-1/2 -translate-x-1/2 h-screen text-primary"></span>
      ) : (
        conversations?.map(convo => (
          <Link
            key={convo.id}
            to={`/chat/${convo.id}`}
            className="flex items-center gap-3 p-3 hover:bg-base-200 rounded-lg transition-colors"
          >
            <UserAvatar user={convo.messages[0].user} />
            <div className="flex-1 flex">
              <div className="grow">
                <h3 className="font-semibold">{convo.name}</h3>
                <p className="text-sm text-gray-400">
                  {!convo.messages[0] ?
                    <span className="opacity-50">No Messages !</span>
                    :
                    <div>
                      <span className="text-base-content">
                        {convo.messages[0].user.name}
                      </span>
                      &nbsp;:&nbsp;
                      {convo.messages[0].content}
                    </div>
                  }
                </p>
              </div>
              <div className="flex flex-col justify-around">
                {convo.messages[0] &&
                  <>
                    <div>{moment(convo.messages[0].created_at).format('HH:mm')}</div>
                    {!!getUnreadMsgs(convo).length &&
                      <div className="badge badge-info">
                        {getUnreadMsgs(convo).length}
                      </div>
                    }
                  </>
                }
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  )
}
