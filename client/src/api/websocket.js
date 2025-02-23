import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
window.Pusher = Pusher

const apiKey = localStorage.getItem('auth_type') + ' ' + localStorage.getItem('auth_token')
console.log(import.meta.env.VITE_ECHO_HTTPS)
const echo = new Echo({
  broadcaster: import.meta.env.VITE_ECHO_BROADCASTER,
  key: import.meta.env.VITE_ECHO_KEY,
  wsHost: import.meta.env.VITE_ECHO_HOST,
  wsPort: import.meta.env.VITE_ECHO_PORT,
  wssPort: import.meta.env.VITE_ECHO_PORT,
  forceTLS: !(import.meta.env.VITE_ECHO_SSL=='http'),
  withCredentials: true,
  authEndpoint: import.meta.env.VITE_LARAVEL_BASE_URL + import.meta.env.VITE_LARAVEL_BROADCAST_AUTH_URL,
  auth:{
    headers: {
      Authorization: apiKey,
    }
  },
  enabledTransports: ['ws', 'wss'],
})

export { echo }