import axios from 'axios'
import API_HOST_CONFIG from '@/config/request.js'
/* 消息弹窗 */
import * as snackbar from '@/components/Snackbar/index'

// 包装一下snackbar组件
class Snackbar {
  constructor () {
    this.close = null
    for (const i in snackbar) {
      this[i] = options => {
        typeof this.close === 'function' && this.close()
        this.close = snackbar[i](options)
      }
    }

    return this
  }
}
const $snackbar = new Snackbar()

class HttpRequest {
  constructor () {
    return this
  }

  /* 获取默认axios配置 */
  getInstanceConfig () {
    return {
      baseURL: API_HOST_CONFIG.BASE_API_HOST,
      headers: {
        'Content-Type': API_HOST_CONFIG.HEADER['Content-Type']
      },
      timeout: 5000
    }
  }

  /* 拦截器设定 */
  setInterceptors (instance) {
    /* 请求拦截 */
    instance.interceptors.request.use(
      config => {
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
    instance.interceptors.response.use(
      res => {
        /* 根据API约定。只有 code === 200 才算请求完成 */
        const { data } = res
        const { code, msg } = data
        /* 提示信息 */
        if ([500].includes(code)) {
          $snackbar.error({
            top: true,
            msg: msg || `error: ${code}`
          })
        } else if ([401, 404].includes(code)) {
          $snackbar.warn({
            top: true,
            msg: msg || `error: ${code}`
          })
        }
        return data
      },

      error => {
        $snackbar.error({
          top: true,
          msg: `发起请求出错${error.message}`
        })
        return Promise.reject(error)
      }
    )
  }

  /* 发起请求 */
  async request (options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInstanceConfig(), options)
    this.setInterceptors(instance)
    try {
      return await instance(newOptions)
    } catch (err) {
      return false
    }
  }

  /* get请求 */
  get (url, data = {}) {
    return this.request({
      method: 'get',
      url,
      ...data
    })
  }

  /* post请求 */
  post (url, data = {}) {
    return this.request({
      method: 'post',
      url,
      ...data
    })
  }
}

export default new HttpRequest()
