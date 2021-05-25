<template>
  <div class="app-count-page">
    <el-link type="primary" style="margin-left: 100px" @click="$router.go(-1)">返回登录页</el-link>
    <div class="steps-content dispaly-content-center pt-3">
      <el-steps :active="stepCount" style="width: 80%;" finish-status="success">
        <el-step :title="firstStep" />
        <el-step :title="twoStep" />
        <el-step :title="thirdStep" />
      </el-steps>
    </div>
    <div class="app-count-contetn dispaly-content-center pt-3">
      <el-form class="email-form dispaly-content-center" :model="aapForm" :rules="appRules">
        <div style="text-align: center">
          <el-form-item
            v-if="stepCount === 0"
            prop="username"
            label="用户名"
            class="dispaly-center"
          >
            <el-input v-model="aapForm.username" placeholder="用户名" />
          </el-form-item>
          <el-form-item
            v-if="stepCount === 1"
            prop="email"
            label="邮箱"
            min-leng="6"
            class="dispaly-center"
          >
            <el-input v-model="aapForm.email" placeholder="邮箱" />
          </el-form-item>

          <el-form-item
            v-else-if="stepCount === 2"
            prop="yzm"
            label="邮箱验证码"
            class="dispaly-center"
          >
            <el-input v-model="aapForm.yzm" placeholder="验证码" />
          </el-form-item>
          <div v-else-if="stepCount === 3" class="mt-3 mb-3">
            提交完成，正在等管理员审核，请留意您的邮箱。
          </div>
          <el-button
            type="primary"
            style="margin-top: 12px;"
            :disabled="disableBtn"
            @click="submit"
          >{{ stepCount === 3 ? '返回登录页' : '下一步' }}</el-button>
        </div>
      </el-form>
    </div>
    <div class="git_hub_login" />
  </div>
</template>

<script>
import { applicationAccountNumber, sendEmailCode, userCheck } from '@/api/user'
export default {
  name: 'ApplicationAccount',
  data() {
    const validateUsername = (rule, value, callback) => {
      this.uCheck(value, res => {
        res.msg ? callback(new Error('用户已注册')) : callback()
      })
    }

    return {
      stepCount: 0,
      aapForm: {
        username: '',
        email: '',
        yzm: ''
      },
      appRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
        yzm: [{ required: true, message: '请输入您的验证码', trigger: 'blur' }]
      },
      disableBtn: true
    }
  },

  computed: {
    firstStep() {
      return [1, 2, 3].indexOf(this.stepCount) === -1 ? '进行中' : '已完成'
    },

    twoStep() {
      return this.stepCount < 2 ? '进行中' : '已完成'
    },

    thirdStep() {
      return this.stepCount === 3 ? '已完成' : '进行中'
    }
  },

  watch: {
    'aapForm.username': {
      handler: function(newVal) {
        this.btnChage(newVal)
      }
    },

    'aapForm.yzm': {
      handler: function(newVal) {
        this.btnChage(newVal)
      }
    },

    'aapForm.email': {
      handler: function(newVal) {
        this.btnChage(this.emailCheck(newVal))
        this.emailCheck(newVal) && (this.disableBtn = false)
      }
    }
  },
  methods: {
    btnChage(newVal) {
      this.disableBtn = !newVal
    },

    uCheck(username, cb) {
      userCheck(username).then(res => {
        res.msg && (this.disableBtn = true)
        cb && cb(res)
      })
    },

    emailCheck(val) {
      // eslint-disable-next-line no-useless-escape
      return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(val)
    },

    submit() {
      this.disableBtn = true
      switch (this.stepCount++) {
        case 0:
          console.log(this.aapForm.username)
          break
        case 1:
          this.sendEmailCode()
          break
        case 2:
          this.handleSubmit()
          break
        default :
          this.stepCount = 0
          this.$router.push('/login')
          break
      }
    },

    sendEmailCode() {
      sendEmailCode(this.aapForm.email).then(res => {
        this.$message({
          type: 'success',
          message: res.msg
        })
      }).catch(err => {
        err && this.$message({
          type: 'error',
          message: '未知错误'
        })
      })
    },

    handleSubmit() {
      this.disableBtn = false
      applicationAccountNumber(this.aapForm).then(res => {
        this.$message({
          type: 'success',
          message: res.msg
        })
      }).catch(() => {
        this.stepCount = 0
        this.aapForm = {
          username: '',
          email: '',
          yzm: ''
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/index.scss";
  .email-form {
    width: 40%;
  }
  .git_hub_login {
    @include dispaly-flex()
  }
</style>
