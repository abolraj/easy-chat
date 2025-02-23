import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { AtSymbolIcon, KeyIcon, UserIcon } from '@heroicons/react/24/solid'
import { KeyIcon as KeyIconOutline } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const { register, loading } = useAuth()
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(await register(formData))
      console.log('Registered Successfully !')
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMsg(error.response.data.message);
    }

  }

  return (
    <>
      <h2 className="-mt-17 mb-7 pt-2 text-3xl ">Register - Let's Collaborate</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="input validator w-full pl-1" htmlFor="name">
          <UserIcon height={"90%"} />

          <input
            type="text"
            className="w-full"
            id="name"
            placeholder="Abolfazl"
            max={255}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </label>
        <div class="validator-hint hidden">Enter valid name</div>

        <label className="input validator w-full pl-1" htmlFor="email">
          <AtSymbolIcon height={"90%"} />

          <input
            type="email"
            className="w-full"
            id="email"
            placeholder="Mail@gmail.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </label>
        <div class="validator-hint hidden">Enter valid email address</div>

        <label className="input validator w-full pl-1" htmlFor="password">
          <KeyIcon height={"90%"} />

          <input
            type="password"
            className="w-full"
            id="password"
            placeholder="12@#$678"
            min={8}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </label>
        <div class="validator-hint hidden">Enter valid password</div>

        <label className="input validator w-full pl-1" htmlFor="password">
          <KeyIconOutline height={"90%"} />

          <input
            type="password"
            className="w-full"
            id="password"
            placeholder="Confirm the password"
            min={8}
            value={formData.password_confirmation}
            onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
            required
          />
        </label>
        <div class="validator-hint hidden">Enter valid password</div>

        {errorMsg && <div className="text-error">{errorMsg}</div>}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ?
            <spin class="loading loading-infinity loading-xl text-primary"></spin>
            :
            'Login'
          }
        </button>
      </form>

      <div className="text-center mt-4">
        <Link to="/login" className="link link-primary text-sm">
          Already registered ? login
        </Link>
      </div>
    </>

  )
}