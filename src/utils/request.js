import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { getToken } from './tokne'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000000
})

service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    store.getters.token && (config.headers['Authorization'] = `Bearer ${getToken()}`)
    return config
  },
  error => {
    Message({
      message: error || '网络错误',
      duration: 1000,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data || response
    const errMsg = res.msg || '请求失败！'
    if ((res.code && res.code !== 200) || (res.status && res.status !== 200)) {
      Message({
        message: errMsg || '请求失败',
        duration: 1000,
        type: 'error'
      })
      return Promise.reject('error')
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    if (error.request.status === 401) { store.dispatch('resetToken') }
    Message({
      message: error || '请求失败',
      duration: 1000,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default service
