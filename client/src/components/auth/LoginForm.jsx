import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

export default function LoginForm() {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const { login, loading } = useAuth()
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(await login(credentials))
      console.log('Logined Successfully !')
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMsg(error.response.data.message);
    }
  }

  return (
    <>
      <h2 className="-mt-17 mb-7 pt-2 text-3xl ">Login - Welcome back !</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="input validator w-full pl-1" htmlFor="email">
          <AtSymbolIcon height={"90%"} />

          <input
            type="email"
            className="w-full"
            id="email"
            placeholder="Mail@gmail.com"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
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
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
        <Link to="/register" className="link link-primary text-sm">
          Already not registered ? Signup
        </Link>
      </div>
    </>
  )
}
