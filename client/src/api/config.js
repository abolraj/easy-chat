import axios from 'axios';

const api = axios.create({
  baseURL: 'http://easy-change.localhost:8080/',
  withCredentials: true,
});

await api.get('/sanctum/csrf-cookie')


api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  const token_type = localStorage.getItem('auth_type');
  if (token) {
    config.headers.Authorization = `${token_type} ${token}`;
  }
  return config;
});

export default api;
