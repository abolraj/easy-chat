import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
window.Pusher = Pusher

const apiKey = localStorage.getItem('auth_type') + ' ' + localStorage.getItem('auth_token')

const echo = new Echo({
  broadcaster: 'reverb',
  key: 'dvhvfvv6flktjqkasiqx',
  wsHost: '127.0.0.1',
  wsPort: 9000,
  wssPort: 9000,
  forceTLS: false,
  withCredentials: true,
  authEndpoint: 'http://easy-change.localhost:8080/broadcasting/auth',
  auth:{
    headers: {
      Authorization: apiKey,
    }
  },
  enabledTransports: ['ws', 'wss'],
})

export { echo }