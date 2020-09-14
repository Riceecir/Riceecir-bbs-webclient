import axios from '@/plugins/request/index'

/**
 * 登录
 * @param {String} data.user_name 用户名
 * @param {String} data.password 密码
 * @param {String} data.code 验证码
 */
export const login = function (data = {}) {
  return axios.post('/login/login', {
    data
  })
}

/**
 * 账号注册
 * @param {String} data.user_name 用户名
 * @param {String} data.email 邮箱
 * @param {String} data.password 密码
 * @param {String} data.code 验证码
 */
export const register = function (data = {}) {
  return axios.post('/login/register', {
    data
  })
}

/**
 * 发送邮件或手机号找回密码
 * @param {string} data.type: 查找方式类型： 'phone'：手机号、'email'：邮箱
 * @param {string} body.email:  邮箱
 * @param {string} body.phone:  手机号码
 */
export const sendForgetMsg = function (data = {}) {
  return axios.post('/login/sendForgetMsg', {
    data
  })
}
