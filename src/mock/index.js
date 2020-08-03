import API_HOST_CONFIG from '@/config/request.js'
const Mock = require('mockjs')

// 生成api对应的正则验证规则
const getRegUrl = name => new RegExp(`(.*)${API_HOST_CONFIG.BASE_API_HOST}/${name}`)
Mock.setup({
  timeout: 1000
})

// 登录api
Mock.mock(getRegUrl('login'), 'post', options => {
  console.log(options)
  // 模板
  const template = [
    {
      code: 'fail',
      msg: '登录失败,请检查密码或用户名',
      data: {
        type: 'error'
      }
    },
    {
      code: 'fail',
      msg: '登录失败,用户不存在',
      data: {
        type: 'not user'
      }
    },
    {
      code: 'success',
      msg: '登录成功',
      data: {
        user_name: 'Riceecir',
        nickname: '昵称',
        session: ''
      }
    }
  ]
  return Mock.mock({ 'data|1': template }).data
})
