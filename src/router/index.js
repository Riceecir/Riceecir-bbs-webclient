import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import routes from './routes'
import { Throttle } from '@/utils/utils.js'
import { routerMode } from '@/config'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: routerMode,
  base: process.env.BASE_URL,
  routes
})

/* 前置钩子函数 */
router.beforeEach((to, from, next) => {
  store.commit('publics/setTopLineear', true)
  document.title = to.meta.title
  next()
})

/* 后置钩子函数 */
const throttle = new Throttle()
router.afterEach(() => {
  // 延迟关闭
  throttle(() => {
    store.commit('publics/setTopLineear', false)
  }, 1000)
})

export default router
