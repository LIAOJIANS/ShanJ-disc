import Vue from 'vue'
import App from './App.vue'
import router from './router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import '@/assets/reset.css'
import Element from '@/utils/ElementUI'

router.beforeEach((to, form, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

import 'element-ui/lib/theme-chalk/base.css'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
