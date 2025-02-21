import { XMarkIcon } from '@heroicons/react/24/solid'

export default function FilePreview({ file, onRemove }) {

  return (
    <div className="relative group mt-2">
      {isImage ? (
        <img
          src={file}
          alt={file}
          className="rounded-lg max-h-48 object-cover"
        />
      ) : (
        <div className="p-2 bg-base-100 rounded-lg">
          <span className="text-sm">{file.name}</span>
        </div>
      )}
      
      {onRemove && (
        <button
          onClick={() => onRemove(file)}
          className="absolute -top-2 -right-2 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}