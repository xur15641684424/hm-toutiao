import axios from 'axios'
import store from '@/store'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }
axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response.use((res) => {
  return res
}, (err) => {
  if (err.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(err)
})
export default axios
