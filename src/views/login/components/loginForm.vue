<template>
  <el-form ref="loginForm" :model="loginForm" status-icon label-width="100px" class="login-form">
    <el-form-item label="账号" prop="username" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
      <el-input v-model="loginForm.username" type="text" placeholder="手机号/邮箱" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
      <el-input v-model="loginForm.password" type="password" placeholder="请输入登录密码" autocomplete="off" />
    </el-form-item>
    <!-- <el-form-item label="验证码" prop="captcha" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
          <el-input v-model="loginForm.captcha" type="text" placeholder="请输入验证码" autocomplete="off" @keyup.enter.native="handleLogin" />
        </el-form-item> -->
    <el-form-item>
      <el-button class="login-btn" type="primary" @click="handleLogin">登录</el-button>
      <div style="float:right;margin-top: 24px;margin-right: 116px;"><router-link :to="{ name: 'forget_password'}">忘记密码</router-link></div>
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
        timeRest: 60,
        counter: {},
        isDisable: false,
      }
    },
    created() {
      if (sessionStorage.getItem('Authorization')) {
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
      },
      sendCode() {
        // console.log('已经发送')
        let phone = new FormData();
        phone.append("phone", this.registryForm.phone);
        sendCaptcha(phone).then(responese => {
          setTimeout(() => {
            getCaptcha(this.registryForm.phone).then(responese1 => {
              this.$notify({
                title: "验证码",
                message: responese1.content,
                duration: 0
              });
            });
          }, 4000);
        });
        (this.isDisable = true), this.timeRest--;
        // clearInterval(this.counter)
        this.counter = setInterval(() => {
          if (this.timeRest > 0) {
            this.timeRest--;
          } else {
            clearInterval(this.counter);
            this.timeRest = 60;
            this.isDisable = false;
          }
        }, 1000);
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/custom-theme/theme";
  .login-form /deep/ {
    .login-btn {
      background-color: #357ce1;
      margin-top: 20px;
      color: #fff;
      border: 1px solid #357ce1;
      width: 200px;
    }
    .el-input__inner {
      color: #61688a;
      background-color: #1e2235; // height: 48px;
      width: 100%;
      border: 1px solid
    }
    .el-input.is-active .el-input__inner,
    .el-input__inner:focus {
      color: $hbColor;
      border-color: $hbHoverColor;
    }
  }
</style>
