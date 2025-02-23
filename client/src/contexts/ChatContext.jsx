import { createContext, useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet, apiDelete } from '../hooks/useApi'
import { echo } from '../api/websocket'
import api from '../api/config'

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
  const { conversationId } = useParams()
  const [messages, setMessages] = useState([])
  const [typingUsers, setTypingUsers] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  
  const { data, apiRefresh } = apiGet(`/api/conversations/${conversationId ?? 1}`)

  // Delete messages API
  const [apiDeleteMessageId, setApiDeleteMessageId] = useState(null)
  const {data: apiDeleteMsgData, loading: apiDeleteMsgLoading, apiRefresh: apiDeleteMsgRefresh} = apiDelete(`/api/conversations/${conversationId}/messages/${apiDeleteMessageId}`, null, true)

  // Send Message
  const [apiSendMsgLoading, setApiSendMsgLoading] = useState(false)


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
      .listen('MessageSent', newMessage => {
        console.log('Message Sent:')
        setMessages((prevMessages)=>{
          if(!prevMessages.some((msg)=>msg.id === newMessage.id)){
            const updatedMessages = [...prevMessages, newMessage]
            const scroller = document.querySelector('html');
            if (scroller.offsetHeight - scroller.clientHeight <= scroller.scrollTop + 15) {
              setTimeout(()=>{
                scroller.scrollTop = scroller.offsetHeight - scroller.clientHeight + 90000
              },0)
            }
            return updatedMessages
          }
          return prevMessages
        })
      })
      .listen('ConversationRead', participant => {
        console.log('Conversation Readed:')
        setMessages((prevMessages)=>{
          console.log('messaages',prevMessages)
          console.log('participant', participant)
          return [...prevMessages].map(msg=>{
            if(!msg?.read_at && participant.user_id ){
              const is_participant_after_created = new Date(participant.last_read_at + ".000000Z") > new Date(msg.created_at)
              if(is_participant_after_created)
                msg.read_at = participant.last_read_at
            }
            console.log('message :', msg)
            return msg
          })
        })
      })
      .listen('MessageUpdated', message => 
        setMessages(prev => prev.map(m => m.id === message.id ? message : m))
      )
      .listen('MessageDeleted', data => {
        console.log('event: message deletion', data)
        setMessages(prev => prev.filter(m => m.id !== data.message.id))
      }
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
    deleteMessageLoading: apiDeleteMsgLoading,
    deleteMessage: async (message_id) => {
      console.log('delete message',message_id)
      setApiDeleteMessageId(message_id)
    },
    sendMessageLoading: apiSendMsgLoading,
    sendMessage: async (content, files) => {
      setApiSendMsgLoading(true)
      const formData = new FormData()
      formData.append('content', content)
      Array.from(files).forEach(file => formData.append('attachments[]', file))
      
      console.log('sent request to new message '+`/api/conversations/${conversationId}/messages`)
      const response = await api.post(
        `/api/conversations/${conversationId}/messages`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      console.log('received the response:' + `/api/conversations/${conversationId}/messages`, response)
      setApiSendMsgLoading(false)
      return response.data
    }
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export const useChat = () => useContext(ChatContext)