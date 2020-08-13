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
      path: '/complete-transfer',
      component: Index,
      children: [
        {
          path: '/complete-transfer',
          component: _import('CompleteTransfer/CompleteTransfer'),
          name: 'CompleteTransfer',
          meta: {
            title: '完成传输'
          }
        }
      ]
    },

    {
      path: '/search',
      component: Index,
      children: [
        {
          path: '/search',
          component: _import('Search/Search'),
          name: 'Search',
          meta: {
            title: '找资源'
          }
        }
      ]
    },

    {
      path: '/hide',
      component: Index,
      children: [
        {
          path: '/hide',
          component: _import('Hide/Hide'),
          name: 'Hide',
          meta: {
            title: '隐藏空间'
          }
        }
      ]
    },

    {
      path: '/share',
      component: Index,
      children: [
        {
          path: '/share',
          component: _import('Share/Share'),
          name: 'Share',
          meta: {
            title: '分享空间'
          }
        }
      ]
    },

    {
      path: '/recycle',
      component: Index,
      children: [
        {
          path: '/recycle',
          component: _import('RecycleBin/RecycleBin'),
          name: 'RecycleBin',
          meta: {
            title: '回收站'
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

