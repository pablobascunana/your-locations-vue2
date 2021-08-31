import axios from 'axios'

export default { 
  register(body) {
    return axios.post(`${process.env.VUE_APP_BASE_URL}user`, body)
  }
}