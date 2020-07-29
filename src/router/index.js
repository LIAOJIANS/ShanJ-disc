import Router from 'vue-router'
import Vue from 'vue'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

import Index from '@/pages/Index/Index'

export default new Router ({
  routes: [
    {
      path: '/redirect',
      component: Index,
      children: [
        {
          path: '/redirect/:path(.*)',
          component: _import('Redirect/index')
        }
      ]
    },

    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/',
          component: _import('Home/Home'),
          name: 'Index',
          meta: {
            title: '我的网盘'
          }
        }
      ]
    },

    {
      path: '/transfer',
      component: Index,
      children: [
        {
          path: '/transfer',
          component: _import('TransferList/TransferList'),
          name: 'TransferList',
          meta: {
            title: '传输列表'
          }
        }
      ]
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

