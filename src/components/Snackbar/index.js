import Vue from 'vue'
import Snackbar from './index.vue'
import router from '@/router'
import vuetify from '@/plugins/vuetify'
const SnackbarEl = Vue.extend(Snackbar)

/* 创建元素并插入 v-application 元素内 */
const createSnackbarToApp = function (fnName = 'info', options = {}) {
  const snackbar = new SnackbarEl({ vuetify, router }).$mount()
  const p = snackbar[fnName](options)
  Vue.nextTick(() => document.querySelector('.v-application').appendChild(snackbar.$el))
  return p
}

/** 暴露的方法
 * @param 包含 vuetify snackbar props熟悉，参考：https://vuetifyjs.com/zh-Hans/components/snackbars/
 * 在此基础上增加属性：
 * @param {string} options.msg: 显示的消息
 * @param {string || vue render} options.closeBtn: 关闭按钮文字或者vue render函数
 *
 * @returns {Promise Object<action: 'close'>} Object.action: 用户行为,
 */
export const info = function (options) {
  return createSnackbarToApp('info', options)
}
export const warn = function (options) {
  return createSnackbarToApp('warn', options)
}
export const success = function (options) {
  return createSnackbarToApp('success', options)
}
export const error = function (options) {
  return createSnackbarToApp('error', options)
}
