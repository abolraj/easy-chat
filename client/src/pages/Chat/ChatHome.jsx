import { Link } from 'react-router-dom'
import ConversationList from '../../components/chat/ConversationList'
import { useAuth } from '../../contexts/AuthContext'
import { useRef } from 'react'
import ConversationNewForm from '../../components/chat/ConversationNewForm'
import { PlusIcon } from '@heroicons/react/24/solid'

export default function ChatHome() {
  const { user } = useAuth()
  const conversationModalRef = useRef()

  const showMakeConversationModal = () => {
    conversationModalRef.current.showModal()
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-base-100">
        <button className="btn btn-primary btn-circle fixed right-3 bottom-3 shadow " onClick={() => showMakeConversationModal()}>
          <PlusIcon className="h-full"/>
        </button>

        <dialog className="modal" ref={conversationModalRef}>
          <div className="modal-box h-full">
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