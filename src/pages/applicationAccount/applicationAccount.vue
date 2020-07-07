<template>
  <div class="app-count-page">
    <div class="steps-content dispaly-content-center mt-3">
      <el-steps :active="stepCount" style="width: 80%;" finish-status="success">
        <el-step :title="[1, 2, 3].indexOf(stepCount) === -1 ? '进行中' : '已完成'"></el-step>
        <el-step :title="stepCount === 1 ? '进行中' : '已完成'"></el-step>
        <el-step :title="stepCount === 3 ? '已完成' : '进行中'"></el-step>
      </el-steps>
    </div>
    <div class="app-count-contetn dispaly-content-center pt-3">
      <el-form class="email-form dispaly-content-center">
        <div style="text-align: center">
          <el-form-item
              v-if="stepCount === 0"
              prop="text"
              label="用户名"
              class="dispaly-center"
              :rules="[
              { required: true, message: '请输入您的用户名', trigger: 'blur' }
            ]"
          >
            <el-input v-model="username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item
              v-if="stepCount === 1"
              prop="email"
              label="邮箱"
              class="dispaly-center"
              :rules="[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ]"
          >
            <el-input v-model="email" placeholder="邮箱" ></el-input>
          </el-form-item>

          <el-form-item
              v-else-if="stepCount === 2"
              prop="yzm"
              label="邮箱验证码"
              class="dispaly-center"
          >
            <el-input v-model="yzm" placeholder="验证码" :rules="[
              { required: true, message: '请输入您的验证码', trigger: 'blur' }
            ]"></el-input>
          </el-form-item>
          <div  v-else-if="stepCount === 3">
            提交完成，正在等管理员审核，请留意您的邮箱
          </div>
          <el-button type="primary" style="margin-top: 12px;" @click="submit" :disabled="disableBtn">{{ stepCount === 3 ? '返回登录页' : '下一步' }}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "applicationAccount",
  data() {
    return {
      stepCount: 0,
      email: '',
      yzm: '',
      username: '',
      disableBtn: true
    }
  },
  watch: {
    username(newVal) {
     this.btnChage(newVal)
    },

    yzm(newVal) {
      this.btnChage(newVal)
    },

    email(newVal) {
      this.btnChage(newVal)
      if(this.emailCheck(newVal)) this.disableBtn = true
    }
  },
  methods: {
    btnChage(newVal) {
      !newVal ? this.disableBtn = true : this.disableBtn = false
    },

    emailCheck(val) {
      return !/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(val)
    },

    submit() {
      this.disableBtn = true
      if (this.stepCount++ > 2) this.stepCount = 0;

    }
  }
}
</script>

<style scoped>
  .email-form {
    width: 40%;
  }
</style>
