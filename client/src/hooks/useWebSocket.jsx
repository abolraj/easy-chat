import { useEffect } from 'react'
import { echo } from '../api/websocket'

export default function useWebSocket(conversationId, handlers) {
  useEffect(() => {
    if (!conversationId) return

    const channel = echo.join(`chat.conversation.${conversationId}`)
      .listen('MessageSent', handlers.handleNewMessage)
      .listen('MessageUpdated', handlers.handleMessageUpdate)
      .listen('MessageDeleted', handlers.handleMessageDelete)
      .listen('UserTyping', handlers.handleTyping)
      .listen('ConversationRead', handlers.handleReadReceipt)

    return () => {
      channel.leave()
    }
  }, [conversationId])
}
