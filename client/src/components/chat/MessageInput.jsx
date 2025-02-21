import { useState, useEffect } from 'react'
import { PaperClipIcon, FaceSmileIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { useChat } from '../../contexts/ChatContext'
import FilePreview from './FilePreview'

export default function MessageInput() {
  const { sendMessage } = useChat()
  const [input, setInput] = useState('')
  const [files, setFiles] = useState([])
  const [isTyping, setIsTyping] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input && files.length === 0) return

    await sendMessage(input, files)
    setInput('')
    setFiles([])
    setIsTyping(false)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false)
      }
    }, 2000)

    return () => clearTimeout(timeout)
  }, [input, isTyping])

  return (
    <div className="p-4 bg-base-300 border-t border-base-100">
      {files.length > 0 && (
        <div className="flex gap-2 mb-2 flex-wrap">
          {files.map((file, index) => (
            <FilePreview
              key={index}
              file={file}
              onRemove={() => setFiles(prev => prev.filter((_, i) => i !== index))}
            />
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="file"
          multiple
          onChange={(e) => setFiles([...e.target.files])}
          className="hidden"
          id="file-upload"
        />

        <div className="join grow flex h-7">
          <PaperClipIcon className="h-full join-item me-3" />
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              if (!isTyping) setIsTyping(true)
            }}
            placeholder="Type a message..."
            className="join-item input input-ghost focus:outline-none focus:border-b-2 focus:border-b-accent max-h-full !border-b-2 border-b-info grow"
          />

          <button type="button" className="btn max-h-full btn-ghost join-item">
            <FaceSmileIcon className="h-full" />
          </button>
          <button type="submit" className="btn max-h-full btn-primary btn-ghost btn-circle join-item">
            <PaperAirplaneIcon  className="h-full" />
          </button>
        </div>
      </form>
    </div>
  )
}