import { useState, useEffect } from 'react'
import { PaperClipIcon, FaceSmileIcon } from '@heroicons/react/24/outline'
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
        <label htmlFor="file-upload" className="btn btn-circle btn-sm btn-ghost">
          <PaperClipIcon className="w-5 h-5" />
        </label>
        
        <div className="flex-1 relative">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              if (!isTyping) setIsTyping(true)
            }}
            placeholder="Type a message..."
            className="input input-bordered w-full pr-16"
          />
          
          <div className="absolute right-2 top-2 flex gap-1">
            <button type="button" className="btn btn-sm btn-ghost">
              <FaceSmileIcon className="w-5 h-5" />
            </button>
            <button type="submit" className="btn btn-sm btn-primary">
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}