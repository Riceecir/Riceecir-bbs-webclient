import request from '@/plugins/request/index'
/**
 * 发送验证消息
 */
export const sendForgetMsg = async function (options = {}) {
  return request({
    url: '/sendForgetMsg',
    method: 'POST',
    data: options
  })
}
