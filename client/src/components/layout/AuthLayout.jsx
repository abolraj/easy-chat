import { Outlet, Link } from 'react-router-dom'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col justify-center items-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mt-2 flex flex-wrap items-center">
          <img src="/easy-chat.svg" alt="easy-chat" className="h-20 w-20 text-primary mx-auto" />
          EasyChat
        </h1>
        <p className="text-gray-500 mt-2">Connect with your community</p>
      </div>

      <div className="card mx-auto w-full max-w-md shadow-2xl bg-base-100">

        <div className="card-body relative">
          <Outlet />
        </div>
      </div>
    </div>
  )
}