<template>
  <el-form label-position='top' ref="loginForm" :model="loginForm" status-icon label-width="100px" class="login-form">
    <el-form-item label="国籍" prop="region" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]"> 
      <el-select v-model="loginForm.region" placeholder="请选择您的国籍"  >
        <el-option  v-for="item in getCountry" :label="item.enName+'    '+ item.name" :value="item.abbr" v-bind:key="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="账号" prop="username" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
      <el-input v-model="loginForm.username" type="text" placeholder="手机号" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
      <el-input v-model="loginForm.password" type="password" placeholder="请输入登录密码" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-dialog title='are you robot?' :visible.sync="dialogTableVisible" width='302px'>
        <vue-recaptcha ref="invisibleRecaptcha" size='Invisible' :sitekey="getSiteKey" @verify="getVerify"></vue-recaptcha>
      </el-dialog>
    </el-form-item>
     <el-form-item>
        <vue-recaptcha ref="invisibleRecaptcha" size='Invisible' :sitekey="getSiteKey" @verify="getVerify"></vue-recaptcha>
    </el-form-item>
    <el-form-item>
      <el-button class="login-btn" type="primary" @click="dialogTableVisible = true">登录</el-button>
      <div style="float:right;margin-top: 24px;margin-right: 116px;">
        <router-link :to="{ name: 'forget_password'}">忘记密码</router-link>
      </div>
    </el-form-item>
  </el-form>
</template>
<script>
  import VueRecaptcha from 'vue-recaptcha';
  import {mapGetters} from 'vuex'
  export default {
    name: "login-form",
    components: {
      VueRecaptcha
    },
    data() {
      return {
        loginForm: {
          region:'',
          username: '',
          password: '',
          captcha: ''
        },
        timeRest: 60,
        counter: {},
        isDisable: false,
        isVerify: false,
        dialogTableVisible:false,
      }
    },
    computed: {
      ...mapGetters([
      'getCountry',
      'getCountryCodeByAbbr',
      'getSiteKey'
    ])
    },
    created() {
      if (sessionStorage.getItem('Authorization')) {
        this.$router.back()
      }  
    var obj=document.getElementById("iframe的name").contentWindow;  


    },
    methods: { 
      getVerify(verifyCode) {
        this.dialogTableVisible = false
          this.$refs['loginForm'].validate(valid => {
            if (valid) {
              let formData = new FormData()
              formData.append('username', this.getCountryCodeByAbbr(this.loginForm.region) + this.loginForm.username)
              formData.append('password', this.loginForm.password)
              formData.append('country', this.loginForm.region)
              formData.append('captcha', verifyCode)
              this.$store.dispatch('LoginByUsername', formData).then(responese => {
                if(responese && responese.code === '200'){
                  this.$router.push({ name: 'index'})
                  this.$message.success(responese.message)
                }else{
                  location.reload()
                  this.$notify.error(responese.message)
                }
              }).catch(err => {
                this.$message.error(err.message)
              })
            }
          })
        
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/custom-theme/theme";
  .login-form /deep/ {
    width: 520px;
    .el-select {
      width: 100%;
    }
    .el-dialog /deep/{
      .el-dialog__header{
        display: none
      }
      .el-dialog__body{
        padding: 0;

      }

    }
    .vue-recaptcha /deep/ {
      .rc-anchor {
        background: transparent;
        border: none
      }
    }
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
