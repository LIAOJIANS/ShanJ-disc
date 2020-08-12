import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from "./router";
import { getToken } from "./utils/tokne"
import store from './store'


let whiteList = ['/login', '/app-account']
router.beforeEach(async (to, form, next) => {
  const token = getToken()
  NProgress.start()
  console.log(token)
  if(token) {
    if(to.path == '/login') { return next({ path: '/' }) }
    if(JSON.stringify(store.getters.userInfo) !== '{}') { return next() }
    try {
      await store.dispatch('getInfo')
      next()
    } catch (e) {
      await store.dispatch('resetToken')
      this.$message({
        type: 'error',
        message: 'token失效'
      })
      next(`/login?redirect=${ to.path }`)
    }
  } else {
    whiteList.indexOf(to.path) !== -1 ? next() : next(`/login?redirect=${to.path}`)
  }
  NProgress.done()
})

router.afterEach(() => {
  NProgress.done()
})
