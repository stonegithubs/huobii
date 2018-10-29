<template>
  <el-form ref="loginForm" :model="loginForm" status-icon label-width="100px" class="demo-ruleForm" >
   
    <el-form-item label="账号" prop="username" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
      <el-input v-model="loginForm.username" type="text" placeholder="手机号/邮箱" autocomplete="off" />
    </el-form-item>

    <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
      <el-input v-model="loginForm.password" type="password" placeholder="请输入登录密码" autocomplete="off" />
    </el-form-item>
    
    <el-form-item label="验证码" prop="captcha" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]"   >
      <el-input v-model="loginForm.captcha" type="text" placeholder="请输入验证码" autocomplete="off" @keyup.enter.native ="handleLogin"/>
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="handleLogin">登录</el-button>
    </el-form-item>
  
  </el-form>
</template>
<script>
export default {
  name: "login-form",
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        captcha: ''
      },
    }
  },
  created() {
    if (this.$store.state.user.token) {
      this.$router.back()
    }
  },
  methods: {
    handleLogin() {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          let formData = new FormData()
          formData.append('username', this.loginForm.username)
          formData.append('password', this.loginForm.password)
          formData.append('captcha', this.loginForm.captcha)
          this.$store.dispatch('LoginByUsername', formData).then(msg => {
            this.$router.push('/')
            this.$message.success(msg)
          }).catch(err => {
            this.$message.error(err)
          })
        }
      })
    }
  }
}

</script>
<style lang="scss">
@import "../../../assets/custom-theme/theme";

.el-input__inner {
  color: #61688a;
  background-color: #1e2235;
  height: 48px;
  width: 100%;
  border: 1px solid
}

.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  color: $hbColor;
  border-color: $hbHoverColor;

}

</style>
