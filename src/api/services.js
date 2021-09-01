import axios from 'axios'

export default {
  login(body) {
    return axios.post(`${process.env.VUE_APP_BASE_URL}login`, body)
  },
  register(body) {
    return axios.post(`${process.env.VUE_APP_BASE_URL}user`, body)
  }
}