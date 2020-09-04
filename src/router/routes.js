import { getDataType } from '@/utils/utils.js'

const routes = []
const context = require.context('./modules', false, /\.js$/)
context.keys().forEach(item => {
  const route = context(item).default
  /* 根据不同的路由列表正确的添加 */
  if (getDataType(route) === 'array') {
    routes.push(...route)
  } else {
    routes.push(route)
  }
})

export default routes
