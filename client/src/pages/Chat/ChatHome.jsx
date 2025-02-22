import { Link } from 'react-router-dom'
import ConversationList from '../../components/chat/ConversationList'
import { useAuth } from '../../contexts/AuthContext'
import { useRef } from 'react'
import ConversationNewForm from '../../components/chat/ConversationNewForm'

export default function ChatHome() {
  const { user } = useAuth()
  const conversationModalRef = useRef()

  const showMakeConversationModal = () => {
    conversationModalRef.current.showModal()
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-base-100">
        <h2 className="text-2xl font-bold">Welcome, {user?.name}</h2>
        <button className="btn btn-primary btn-sm mt-2" onClick={() => showMakeConversationModal()}>
          New Conversation
        </button>

        <dialog className="modal" ref={conversationModalRef}>
          <div className="modal-box">
            <ConversationNewForm />
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
          </div>
        </dialog>
      </div>
      <ConversationList />
    </div>
  )
}