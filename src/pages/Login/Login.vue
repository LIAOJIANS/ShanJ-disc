<template>
  <div class="login-page">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form pt-2 pb-3 pl-2 pr-2" autocomplete="on" label-position="left">
      <p class="login-title dispaly-content-center pt-1 pb-3">登录</p>
      <el-form-item prop="username">
        <span class="el-icon-user-solid" style="font-size: 1.2rem; line-height: 47px" />
        <el-input
          ref="username"
          v-model="loginForm.username"
          type="text"
          name="username"
          placeholder="用户名"
          clearable
          autocomplete="on"
          tabindex="1"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="el-icon-lock" style="font-size: 1.2rem; line-height: 47px" />
        <el-input
          ref="password"
          v-model="loginForm.password"
          name="password"
          placeholder="请输入密码"
          tabindex="2"
          autocomplete="on"
          show-password
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <div class="pl-2 pr-2">
        <el-button
          type="primary"
          class="login-btn"
          @click.native.prevent="handleLogin"
        >登录</el-button>
        <div class="login-alert dispaly-flex mt-2">
          <p>没有账号?<span @click="$router.push('/app-account')">立即申请</span></p>
          <p class="forget-name">忘记密码</p>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value || value === 6) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('密码不能小于4位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'tourist',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'change', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      redirect: '',
      otherQuery: {}
    }
  },

  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },

  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },

  methods: {
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        (cur !== 'redirect') && (acc[cur] = query[cur])
        return acc
      }, {})
    },

    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        valid && this.$store.dispatch('login', this.loginForm).then(() => {
          this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
        })
      })
    }
  }
}
</script>

<style lang="scss">
  .login-page {
    min-height: calc(100vh - 20px);
    width: 100%;
    position: relative;

    background: #0f2027;
    background: -webkit-linear-gradient(to right, #0f2027, #203a43, #2c5364);
    background: linear-gradient(to right, #0f2027, #203a43, #2c5364);

    .login-form {
      width: 500px;
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 20px 20px rgba(0, 0, 0, 0.1);
      border-radius: 5px;

      .el-input {
        display: inline-block;
        height: 47px;
        width: 93%;

        input {
          background: transparent;
          border: 0;
          -webkit-appearance: none;
          border-radius: 0;
          padding: 12px 0px 12px 15px;
          color: #fff;
          height: 47px;
          caret-color: #fff;

          &:-webkit-autofill {
            box-shadow: 0 0 0px 1000px #0f2027 inset !important;
            -webkit-text-fill-color: #fff !important;
          }
        }
      }

      .el-form-item {
        padding-left: 10px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
      }

      .login-btn {
        width: 100%;
      }
    }
  }

  .login-title {
    font-size: 20px;
    color: #666;
    font-weight: bold;
  }

  .login-alert {
    font-size: 12px;
    color: #999;
    span {
      cursor: pointer;
      padding-left: 5px;
      &:hover {
        color: #666;
      }
    }
    .forget-name {
      cursor: pointer;
    }
  }
</style>
