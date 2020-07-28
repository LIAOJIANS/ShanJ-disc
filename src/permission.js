import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from "./router";
// import store from './store'

// let whiteList = ['/login', '/app-account']
router.beforeEach((to, form, next) => {

  // to.path && whiteList.indexOf(to.path) === -1 && store.dispatch('addRouter', to)

  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
