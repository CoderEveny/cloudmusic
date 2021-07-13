import axios from 'axios'

export function request(config) {

  const instance = axios.create({
    baseURL: 'http://localhost:3000/',
  })

  instance.interceptors.request.use(config => {
    return config
  }, err => {

  })

  instance.interceptors.response.use(res => {
    return res
  }, err => {

  })

  return instance(config)
}