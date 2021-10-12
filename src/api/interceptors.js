import axios from 'axios'
import store from '@/store/index'

axios.interceptors.request.use((config) => {
  if (!config.url.includes('login') && !config.url.includes('user')) {
    config.headers.Authorization = store.state.application.accessToken
  }
  return config
}, (error) => {
  return Promise.reject(error)
});
