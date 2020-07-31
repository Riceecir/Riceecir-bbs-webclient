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
