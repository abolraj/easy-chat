import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function ErrorMessage({ message, onRetry, className = '' }) {
  return (
    <div className={`alert alert-error ${className}`}>
      <ExclamationTriangleIcon className="h-6 w-6" />
      <div className="flex-1">
        <span>{message}</span>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="btn btn-xs btn-ghost ml-2"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  )
}