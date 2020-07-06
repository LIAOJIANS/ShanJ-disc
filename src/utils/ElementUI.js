
import {
  Message
} from 'element-ui'

const element = {
  install(Vue) {
    Vue.prototype.$message = Message
  }
}

export default element
