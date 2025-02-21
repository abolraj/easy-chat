export default function TypingIndicator({ users }) {
    if (!users.length) return null
  
    return (
      <div className="flex items-center gap-2 ml-14 text-gray-400 text-sm">
        <span>{users.join(', ')} {users.length > 1 ? 'are' : 'is'} typing</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    )
  }