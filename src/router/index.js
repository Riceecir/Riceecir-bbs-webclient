import Vue from 'vue'
import VueRouter from 'vue-router'
import { getDataType } from '@/utils/utils.js'
import { routerMode } from '@/config'
Vue.use(VueRouter)

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

const router = new VueRouter({
  mode: routerMode,
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
