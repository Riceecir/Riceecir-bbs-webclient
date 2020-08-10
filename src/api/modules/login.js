import axios from '@/plugins/request/index'

/**
 * 登录
 * @param {String} data.user_name 用户名
 * @param {String} data.password 密码
 * @param {String} data.code 验证码
 */
export const login = function (data = {}) {
  return axios.post('/login', data)
}

/**
 * 账号注册
 * @param {String} data.user_name 用户名
 * @param {String} data.email 邮箱
 * @param {String} data.password 密码
 * @param {String} data.code 验证码
 */
export const register = function (data = {}) {
  return axios.post('/register', data)
}
