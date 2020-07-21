
import {
  Message,
  Button,
  Input,
  Form,
  FormItem,
  Step,
  Steps,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Avatar,
  Checkbox,
  CheckboxGroup
} from 'element-ui'

const element = {
  install(Vue) {
    Vue.use(Button)
    Vue.use(Input)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Step)
    Vue.use(Steps)
    Vue.use(Menu)
    Vue.use(MenuItem)
    Vue.use(Submenu)
    Vue.use(Avatar)
    Vue.use(MenuItemGroup)
    Vue.use(Checkbox)
    Vue.use(CheckboxGroup)
    Vue.prototype.$message = Message
  }
}

export default element
