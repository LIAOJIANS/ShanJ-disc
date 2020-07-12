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
    },
    {
      path: '/login',
      name: 'login',
      component: _import('Login/Login')
    },
    {
      path: '/app-account',
      name: 'applicationAccount',
      component: _import('applicationAccount/applicationAccount')
    },
    {
      path: '*',
      component: _import('404/404')
    }
  ]
})

