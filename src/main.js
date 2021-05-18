import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './permission'
import '@/assets/reset.css'
import '@/assets/font/iconfont.css'
import Element from '@/utils/ElementUI'
import store from '@/store'

import { getTime, byte, getImgCollection, updImgCollection, getDownFiles, getDownDoneFiles, updDownFiles, updDownDoneFiles } from '@/utils/util'
import { downFile, updateDownState, initPath } from '@/utils/FileTool'

import 'core-js/stable'
import 'regenerator-runtime/runtime'

import 'element-ui/lib/theme-chalk/base.css'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)

Vue.filter('byte', byte)

Vue.config.productionTip = false

initPath()

new Vue({
  data() {
    return {
      // 收藏
      collections: getImgCollection(),
      // 下载列表
      downFiles: getDownFiles(),
      downDoneFiles: getDownDoneFiles()
    }
  },
  watch: {
    collections: {
      deep: true,
      handler(val) {
        updImgCollection(val)
      }
    },
    downFiles: {
      deep: true,
      handler(val) {
        updDownFiles(val)
      }
    },
    downDoneFiles: {
      deep: true,
      handler(val) {
        updDownDoneFiles(val)
      }
    }
  },
  created() {
    updateDownState(this.updateDownState)
  },
  methods: {
    // 添加收藏
    AddCollection(obj) {
      if (obj) this.collections.splice(0, 0, obj)
    },
    // 移除收藏
    removeCollection(obj) {
      const index = this.collections.findIndex(item => item.id === obj.id)
      if (index > -1) {
        this.collections.splice(index, 1)
      }
    },
    // 下载文件
    addDownFile(obj) {
      const index = this.downFiles.findIndex(item => item.id === obj.id)
      if (index === -1) {
        obj.progress = 0
        obj.speedBytes = 0
        obj.state = 'wait'
        obj.done = 'downing'
        this.downFiles.splice(0, 0, obj)
        downFile(obj)
      }
    },
    // 更新状态
    updateDownState(data) {
      this.$nextTick(() => {
        const { id, done, progress } = data
        const index = this.downFiles.findIndex(item => item.id === id)
        if (done === 'end') {
          if (progress === 100) {
            const { id, path, resolution, size, small, url } = data
            this.downDoneFiles.splice(0, 0, { id, path, resolution, size, small, url, downloadtime: getTime() })
            if (index > -1) this.downFiles.splice(index, 1)
          }
        } else {
          if (index > -1) this.$set(this.downFiles, index, data)
        }
      })
    },
    // 删除下载列表
    removeDownFile(id, downing) {
      if (downing) {
        const index = this.downFiles.findIndex(item => item.id === id)
        if (index > -1) {
          this.downFiles.splice(index, 1)
        }
      } else {
        const index = this.downDoneFiles.findIndex(item => item.id === id)
        if (index > -1) {
          this.downDoneFiles.splice(index, 1)
        }
      }
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
