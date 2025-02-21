import { createContext, useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../hooks/useApi'
import { echo } from '../api/websocket'
import api from '../api/config'

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
  const { conversationId } = useParams()
  const [messages, setMessages] = useState([])
  const [typingUsers, setTypingUsers] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  
  const { data, apiRefresh } = apiGet(`/api/conversations/${conversationId ?? 1}`)

  // WebSocket Handlers
  useEffect(() => {
    if (!conversationId) return
    apiRefresh()
  }, [conversationId])

  useEffect(()=>{
    console.log('api data changed:', data)
    if(data?.messages)
      setMessages(data.messages)
    const channel = echo.join(`chat.conversation.${conversationId}`)
      .here(users => setOnlineUsers(users))
      .joining(user => setOnlineUsers(prev => [...prev, user]))
      .leaving(user => setOnlineUsers(prev => prev.filter(u => u.id !== user.id)))
      .listen('MessageSent', message => {console.log('Mesage Sent event;');setMessages(prev => [message, ...prev])})
      .listen('MessageUpdated', message => 
        setMessages(prev => prev.map(m => m.id === message.id ? message : m))
      )
      .listen('MessageDeleted', message => 
        setMessages(prev => prev.filter(m => m.id !== message.id))
      )
      .listen('UserTyping', ({ userId, isTyping }) => {
        setTypingUsers(prev => isTyping 
          ? [...new Set([...prev, userId])]
          : prev.filter(id => id !== userId)
        )
      })

    // return () => channel.unsubscribe()
  },[data])

  const value = {
    conversation: data,
    messages,
    typingUsers,
    onlineUsers,
    sendMessage: async (content, files) => {
      const formData = new FormData()
      formData.append('content', content)
      Array.from(files).forEach(file => formData.append('attachments[]', file))
      
      const response = await api.post(
        `/api/conversations/${conversationId}/messages`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      return response.data
    }
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export const useChat = () => useContext(ChatContext)