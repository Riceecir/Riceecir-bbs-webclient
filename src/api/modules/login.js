import request from '@/plugins/request/index'
/**
 * 获取图像验证码
 */
export const getCaptcha = async function () {
  return request({
    url: '/getCaptcha',
    method: 'GET'
  })
}

/**
 * 登录
 * @param {String} data.user_name 用户名
 * @param {String} data.password 密码
 * @param {String} data.code 验证码
 */
export const login = async function (data = {}) {
  return request({
    url: '/login',
    method: 'POST',
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
export const register = async function (data = {}) {
  return request({
    url: '/register',
    method: 'POST',
    data
  })
}
