import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/scss/global.scss'
import '@/assets/scss/variables.scss'
import '@/assets/style/global.css'
import '@/assets/style/reset.css'
import vuetify from '@/plugins/vuetify'
import directive from '@/tools/directive/index'
import * as snackbar from '@/components/Snackbar/index'

/* Mock数据 */
if (process.env.NODE_ENV === 'development') require('./mock/index')

Vue.prototype.$snackbar = snackbar
Vue.config.productionTip = false
Vue.use(directive)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
