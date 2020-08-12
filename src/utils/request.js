import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { getToken } from './tokne'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    store.getters.token && (config.headers['Authorization'] = getToken())
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
    const res = response.data
    const errMsg = res.msg || '请求失败！'
    if(res.code !== 0) {
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
    Message({
      message: error || '请求失败',
      duration: 1000,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default service
