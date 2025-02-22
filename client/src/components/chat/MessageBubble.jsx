import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../../contexts/AuthContext'
import FilePreview from './FilePreview'

export default function MessageBubble({ message, isOwn, onDelete, deleteMessageLoading }) {
  const { user } = useAuth()

  return (
    <div className={`chat ${isOwn ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full bg-neutral">
          <img src={"https://ui-avatars.com/api/?background=151515&color=fff&name=" + message.user.name} alt={message.user.name} />
        </div>
      </div>
      <div className="chat-header">
        {message.user.name}
      </div>
      <div className={`chat-bubble ${isOwn ? 'chat-bubble-primary' : ''}`}>
        {message.content}

        {message?.attachments[0] &&
          <div className="files flex flex-wrap gap-2">
            <hr className="w-full" />
            {message.attachments?.map((url, index) => (
              <FilePreview key={index} url={url} />
            ))}
          </div>
        }


        {message.edited_at && (
          <span className="text-xs opacity-50 flex items-center gap-1 ml-2">
            <ArrowPathIcon className="w-3 h-3" />
            edited
          </span>
        )}
      </div>

      <div className="chat-footer opacity-50 text-xs mt-1">
        {new Date(message.created_at).toLocaleTimeString()}
        {isOwn && (
          <span className="ml-2 text-accent">
            {message.read_at ? '✓✓ Seen' : '✓ Delivered'}
          </span>
        )}
      </div>

      {isOwn && (
        <div className="mt-1 flex gap-1 text-error">
          {deleteMessageLoading ?
            <span className="loading loading-spinner"></span>
            :
            <button className="btn btn-xs btn-ghost" onClick={(event) => onDelete(message, event)}>
              <TrashIcon className="w-4 h-4" />
            </button>
          }
        </div>
      )}
    </div>
  )
}