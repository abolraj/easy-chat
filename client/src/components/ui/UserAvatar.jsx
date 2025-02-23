import { UserCircleIcon } from '@heroicons/react/24/solid'

export default function UserAvatar({ user, size = 'md' }) {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  }

  return (
    <div className={`avatar placeholder ${sizes[size]}`}>
      {user?.name ? (
        <img 
          src={"https://ui-avatars.com/api/?background=151515&color=fff&name=" + user.name} 
          alt={user.name} 
          className="rounded-full"
        />
      ) : (
        <div className="bg-neutral text-neutral-content rounded-full">
          <UserCircleIcon className="" />
        </div>
      )}
    </div>
  )
}