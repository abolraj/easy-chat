import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/solid'
import SearchableSelect from '../ui/SearchableSelect'
import { apiGet, apiPost } from '../../hooks/useApi'

export default function ConversationNewForm() {
  const [data, setData] = useState({
    type: '',
    name: '',
    users: null,
  })

  const [errorMsg, setErrorMsg] = useState('')
  const [apiAbort, setApiAbort] = useState(new AbortController())

  const [apiData, setApiData] = useState({
    params: {
      q: null,
    },
    signal: apiAbort.signal,
  })
  const { data: users, loading: loadingUsers } = apiGet('/api/users', apiData)
  const { data: conversation, loading, apiRefresh } = apiPost('/api/conversations', data, false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      apiRefresh()
      console.log('Created Successfully !')
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMsg(error.response.data.message);
    }
  }

  const onSearchUser = (filter) => {
    if (filter != apiData.params.q) {
      let newAborter = apiAbort
      if (loadingUsers) {
        apiAbort.abort()
        newAborter = new AbortController()
        setApiAbort(newAborter)
      }
      setApiData(prev => {
        const newData = {
          params: {
            q: filter,
          },
          signal: newAborter.signal,
        }

        // apiRefresh()
        return newData
      })
    }
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-3xl mb-2 border-b border-b-accent">Make new Conversation</h2>
      <form onSubmit={handleSubmit} className="space-y-2 grow">
        <label className="input validator w-full pl-1" htmlFor="type">
          <AtSymbolIcon height={"90%"} />

          <input
            type="text"
            className="w-full"
            id="name"
            placeholder="Give your conversation name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />
        </label>
        <div class="validator-hint hidden">Enter valid name</div>

        <div className="validator pl-1" htmlFor="type">
          <label htmlFor="type_group">
            <span className="mx-2 label"> Group </span>
            <input
              type="radio"
              className="radio radio-primary"
              name="type"
              id="type_group"
              value="group"
              onChange={(e) => setData({ ...data, type: e.target.value })}
              required
            />
          </label>

          <label htmlFor="type_private">
            <span className="mx-2 label"> / Or Private</span>
            <input
              type="radio"
              className="radio radio-primary"
              name="type"
              id="type_private"
              value="private"
              onChange={(e) => setData({ ...data, type: e.target.value })}
              required
            />
          </label>
        </div>
        <div class="validator-hint hidden">Enter valid type</div>

        <label className="input w-full">
          <span className="label !me-0">Participants </span>
          <SearchableSelect
            inputName='users'
            options={users}
            onSearch={(q) => onSearchUser(q)}
            onChange={(users) => setData({ ...data, users: [users.id] })}
            loading={loadingUsers}
            getShowInfo={(user) =>{ return {title: user.name, value: user.id} } }
            className="w-full"
          />
        </label>

        {errorMsg && <div className="text-error">{errorMsg}</div>}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ?
            <spin class="loading loading-infinity loading-xl text-primary"></spin>
            :
            'Make'
          }
        </button>
      </form>
    </div>
  )
}
