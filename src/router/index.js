import Router from 'vue-router'
import Vue from 'vue'


const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export default new Router ({
  routes: [
    {
      path: '/',
      name: 'index',
      component: _import('Index/Index')
    }
  ]
})

