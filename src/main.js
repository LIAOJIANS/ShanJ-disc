import Vue from 'vue'
import App from './App.vue'
import router from './router'

import element from './utils/ElementUI'
Vue.use(element)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
