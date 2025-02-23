import { useParams } from 'react-router-dom'
import { useChat } from '../../contexts/ChatContext'
import MessageInput from '../../components/chat/MessageInput'
import MessageBubble from '../../components/chat/MessageBubble'
import TypingIndicator from '../../components/chat/TypingIndicator'
import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

export default function ConversationPage() {
  const { conversationId } = useParams()
  const { messages, conversation, deleteMessage, deleteMessageLoading, typingUsers, apiRefresh } = useChat()
  const { user:currentUser } = useAuth()
  const [ deleteMsg, setDeleteMsg] = useState(null)

  const onDeleteMsg = (msg) => {
    setDeleteMsg(prev => {
      deleteMessage(msg.id)
      return msg
    })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 pb-20 space-y-4">
        {messages.map(message => (
          <MessageBubble 
            key={message.id} 
            message={message}
            isOwn={message.user.id === currentUser?.id}
            onDelete={(msg)=>onDeleteMsg(msg)}
            deleteMessageLoading={deleteMessageLoading && message.id == deleteMsg?.id}
          />
        ))}
        <TypingIndicator users={typingUsers} />
      </div>
      <MessageInput conversationId={conversationId} />
    </div>
  )
}
