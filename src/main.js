import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './permission'
import '@/assets/reset.css'
import '@/assets/font/iconfont.css'
import Element from '@/utils/ElementUI'

import store from '@/store'


import 'element-ui/lib/theme-chalk/base.css'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
