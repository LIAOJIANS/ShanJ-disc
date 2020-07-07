
import {
  Message,
  Button,
  Input,
  Form,
  FormItem,
  Step,
  Steps
} from 'element-ui'

const element = {
  install(Vue) {
    Vue.use(Button)
    Vue.use(Input)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Step)
    Vue.use(Steps)
    Vue.prototype.$message = Message
  }
}

export default element
