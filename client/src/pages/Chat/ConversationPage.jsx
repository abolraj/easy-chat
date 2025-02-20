import { useParams } from 'react-router-dom'
import { useChat } from '../../contexts/ChatContext'
import MessageInput from '../../components/chat/MessageInput'
import MessageBubble from '../../components/chat/MessageBubble'
import TypingIndicator from '../../components/chat/TypingIndicator'

export default function ConversationPage() {
  const { conversationId } = useParams()
  const { messages, typingUsers } = useChat()

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <MessageBubble 
            key={message.id} 
            message={message}
            isOwn={message.user.id === currentUser?.id}
          />
        ))}
        <TypingIndicator users={typingUsers} />
      </div>
      <MessageInput conversationId={conversationId} />
    </div>
  )
}
