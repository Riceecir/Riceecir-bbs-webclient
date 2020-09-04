import axios from '@/plugins/request/index'

/**
 * 检查用户名是否可用
 */
export const checkUserName = params => {
  return axios.get('user/checkUserName', {
    params: params
  })
}
