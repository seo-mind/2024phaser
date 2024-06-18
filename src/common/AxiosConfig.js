import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
  withCredentials: false
})

instance.interceptors.request.use(
  function (request) {
    return request
  },
  function (error) {
    alert(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    alert(error)
  }
)

export { instance }
