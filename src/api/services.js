import axios from 'axios'

export default {
  login(user) {
    return axios.post(`${process.env.VUE_APP_BASE_URL}login`, user);
  },
  register(user) {
    return axios.post(`${process.env.VUE_APP_BASE_URL}user`, user);
  },
  getLocations(userUuid) {
    return axios.get(`${process.env.VUE_APP_BASE_URL}location/${userUuid}`);
  },
  saveLocation(userUuid, marker) {
    return axios.post(`${process.env.VUE_APP_BASE_URL}location/${userUuid}`, marker);
  },
  deleteLocation(userUuid, marker) {
    return axios.delete(`${process.env.VUE_APP_BASE_URL}location/${userUuid}`, { data: marker });
  }
}