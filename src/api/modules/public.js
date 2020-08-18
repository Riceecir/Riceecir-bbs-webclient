import axios from '@/plugins/request/index'

/**
 * 获取图像验证码
 * @param {string} params.sid: 本地生成的uuid
 */
export const getCaptcha = function (params = {}) {
  return axios.get('getCaptcha', {
    params: params
  })
}

/**
 * 发送验证消息
 */
export const sendForgetMsg = function (options = {}) {
  return axios.get('/sendForgetMsg', options)
}
