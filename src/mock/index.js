import API_HOST_CONFIG from '@/config/request.js'
const Mock = require('mockjs')

// 生成api对应的正则验证规则
const getRegUrl = name => new RegExp(`(.*)${API_HOST_CONFIG.BASE_API_HOST}/${name}`)
Mock.setup({
  timeout: 1000
})

// 登录api
Mock.mock(getRegUrl('login2'), 'post', options => {
  // 模板
  const template = [
    {
      code: 404,
      msg: '登录失败,请检查密码或用户名',
      error_code: 1000,
      data: {
      }
    },
    {
      code: 404,
      msg: '登录失败,用户不存在',
      error_code: 1000,
      data: {
      }
    },
    {
      code: 'success',
      msg: '登录成功',
      error_code: null,
      data: {
        user_name: 'Riceecir',
        nickname: '昵称',
        session: ''
      }
    }
  ]
  return Mock.mock({ 'data|1': template }).data
})
// 注册api
Mock.mock(getRegUrl('register'), 'post', options => {
  // 模板
  const template = [
    {
      code: 500,
      msg: '该用户名已存在',
      error_code: 1000,
      data: {}
    },
    {
      code: 200,
      msg: '注册成功',
      error_code: null,
      data: {}
    }
  ]
  return Mock.mock({ 'data|1': template }).data
})
// 检查用户名是否可用
Mock.mock(getRegUrl('checkUserName'), 'get', options => {
  const template = [
    {
      code: 200,
      data: true,
      error_code: null,
      msg: '用户名可用'
    },
    {
      code: 200,
      data: false,
      error_code: null,
      msg: '用户名已存在'
    }
  ]
  return Mock.mock({ 'data|1': template }).data
})
