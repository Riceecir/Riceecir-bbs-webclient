import axios from 'axios'
import API_HOST_CONFIG from '@/config/request.js'
/* 消息弹窗 */
import * as snackbar from '@/components/Snackbar/index'

axios.defaults.baseURL = API_HOST_CONFIG.BASE_API_HOST
axios.defaults.headers.common['Content-Type'] = API_HOST_CONFIG.HEADER['Content-Type']

// 包装一下
let close = null
const $snackbar = {}
for (const i in snackbar) {
  $snackbar[i] = options => {
    typeof close === 'function' && close()
    close = snackbar[i](options)
  }
}

/* 请求拦截 */
axios.interceptors.request.use(
  config => {
    /* get 请求将参数添加至 url */
    if (config.method.toLocaleLowerCase() === 'get') {
      const arr = []
      const { data } = config
      for (const i in data) arr.push(`${i}=${data[i]}`)
      if (arr.length > 0) config.url += `?${arr.join('&')}`
    }
    return config
  },
  error => {
    $snackbar.error({
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

    if (code === 200) {
      return data
    } else if (code === 500) {
      if (msg) {
        $snackbar.warn({
          top: true,
          msg: `${data.msg}`
        })
      }
      return Promise.resolve(data)
    } else return data
  },

  error => {
    $snackbar.error({
      top: true,
      msg: `发起请求出错${error.message}`
    })
    return Promise.reject(error)
  }
)

export default async options => {
  try {
    return await axios(options)
  } catch (err) {
    return new Error(err)
  }
}
