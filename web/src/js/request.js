import axios from 'axios'
import { Message, Loading } from 'element-ui'
const ConfigBaseURL =
  process.env.NODE_ENV === 'production'
    // ? 'http://127.0.0.1:3000'
    ? 'http://47.93.213.104:3000'
    : 'http://127.0.0.1:3000'
let loadingInstance = null
export const Service = axios.create({
  timeout: 7000,
  baseURL: ConfigBaseURL,
  method: 'post',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
// 添加请求拦截器
Service.interceptors.request.use(
  config => {
    loadingInstance = Loading.service({
      lock: true,
      text: 'loading...'
    })
    // const token = store.state.token
    // token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.error(error)
  }
)
// 添加响应拦截器
Service.interceptors.response.use(
  response => {
    loadingInstance.close()
    if (response.status === 200) {
      if (response.data.msg) {
        Message({
          message: response.data.msg,
          type: response.data.code === 0 ? 'success' : 'error',
          duration: 3 * 1000
        })
      }
    } else {
      Message({
        message: response.data.msg || '',
        type: 'warning',
        duration: 3 * 1000
      })
    }
    return Promise.resolve(response.data)
  },
  // 请求失败
  error => {
    loadingInstance.close()
    return Promise.reject(error)
  }
)
