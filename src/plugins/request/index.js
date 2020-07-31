import axios from 'axios'
import API_HOST_CONFIG from '@/config/api.host.js'
/* 消息弹窗 */
// import { Message } from 'element-ui'
import * as snackbar from '@/components/Snackbar/index'

axios.defaults.baseURL = API_HOST_CONFIG.BASE_API_HOST
axios.defaults.headers.common['Content-Type'] = API_HOST_CONFIG.HEADER['Content-Type']

/* 请求拦截 */
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    snackbar.error({
      top: true,
      msg: `发起请求出错${error.message}`
    })
    return Promise.reject(error)
  }
)

/* 响应拦截 */
axios.interceptors.response.use(
  res => {
    /* 根据API约定。只有 code === 'success' 才算请求完成 */
    const { data } = res
    const { code, msg } = data

    if (code === 'success') {
      return data
    } else if (code === 'fail') {
      if (msg) {
        snackbar.warn({
          top: true,
          msg: `${data.msg}`
        })
      }
      return Promise.reject(data)
    } else return data
  },

  error => {
    snackbar.error({
      top: true,
      msg: `发起请求出错${error.message}`
    })
    return Promise.reject(error)
  }
)

export default axios
