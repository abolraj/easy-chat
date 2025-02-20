import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
window.Pusher = Pusher

const echo = new Echo({
  broadcaster: 'reverb',
  key: 'dvhvfvv6flktjqkasiqx',
  wsHost: '127.0.0.1',
  wsPort: 9000,
  wssPort: 9000,
  forceTLS: false,
  withCredentials: true,
  enabledTransports: ['ws', 'wss'],
})

export { echo }