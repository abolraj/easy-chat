import { XMarkIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

export default function FilePreview({ url, onRemove , file }) {
  const [isImage, setIsImage] = useState(false)
  const [isFile, setIsFile] = useState(!!file)
  useEffect(() => {
    if (!isFile) {
      const imageFormats = [
        'png',
        'jpg',
        'jpeg',
        'gif',
      ]

      for (const format of imageFormats) {
        
        const fileUrl = url.slice(0, url.indexOf('?') == -1 ? undefined : url.indexOf('?'))
        if (fileUrl.endsWith(format)) {
          setIsImage(true)
          break
        }
      }
    }
  }, [url])

  useEffect(()=>{
    if(isFile){
      setIsImage(file.type.startsWith('image/'))
    }
  },[file])

  return (
    <div className={`relative group grow ${isFile ? 'max-h-20':''} `}>
      {isImage ? (
        <img
          src={isFile ? URL.createObjectURL(file) : url}
          alt={isFile ? file.name : url}
          className={`rounded-lg ${isFile ? '':'w-full'} h-full object-cover`}
        />
      ) : (
        <div className="p-2 bg-base-100 rounded-lg">
          <span className="text-sm">{isFile ? file.name : url}</span>
        </div>
      )}

      {onRemove && (
        <button
          onClick={() => onRemove(isFile ? file : url)}
          className="absolute -top-2 -right-2 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}