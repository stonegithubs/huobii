<template>

  <el-form ref="registryForm" :model="registryForm" :rules="rules" status-icon label-width="100px" class="demo-ruleForm">
    <el-form-item label="手机号" prop="phone" >
      <el-input v-model="registryForm.phone" type="text" placeholder="手机号" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="registryForm.password" type="password" placeholder="请输入登录密码" autocomplete="off"/>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirm">
      <el-input v-model="registryForm.confirm" type="password" placeholder="再次输入登录密码" autocomplete="off"/>
    </el-form-item>
    <el-form-item label="验证码" prop="captcha">
      <el-input v-model="registryForm.captcha" type="text" placeholder="请输入验证码" autocomplete="off"/>
    </el-form-item>
    <el-form-item label="邀请码" prop="inviteCode">
      <el-input v-model="registryForm.inviteCode" type="text" placeholder="您的邀请码（选填）" autocomplete="off"/>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="checked">我已阅读并同意 <router-link :to="{ name: 'agreement'}">《用户协议》</router-link></el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleRegistry('registryForm')">注册</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
  import {set_rec_code} from "../../../api/login";

  export default {
    name: "registry-form",
    data() {
      let vallidatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registryForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      let checkPhone = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('手机号格式有误'));
          } else {
            if (value !== '') {
              let reg=/\d{10}/;
              if(!reg.test(value)){
                callback(new Error('请输入有效的手机号码'));
              }
            }
            callback();
          }
      }
      let checkPasswrod = (rule, value, callback) =>{
        if(!/(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{6,}/.test(value)){
          callback("密码不能含有敏感字符或低于6位")
        }else if(/^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/.test(value)){
          callback('密码不能输纯数字或纯字母')
        }else{
          callback()
        }
      }
      let captchaCheck = (rule, value, callback) => {
        if (value !== ''){
          callback()
        }else{
          callback('请输入验证码')
        }
      }
      return {
        checked: false,
        registryForm: {
          phone: '',
          password: '',
          confirm: '',
          captcha:'',
          inviteCode: ''
        },
        rules: {
          phone: [
            {require: true, validator: checkPhone, trigger: 'blur' }
          ],
          password: [
            {require: true, validator: checkPasswrod, trigger: 'change' }

          ],
          confirm: [
            {require: true, validator: vallidatePassword , trigger: 'blur' }

          ],
          captcha: [
            {require: true,validator: captchaCheck, trigger: 'blur' }

          ],
          inviteCode: [
            {require: false }
          ]
        }
      }
    },

    methods: {
      doSubmit(){
        set_rec_code(this.registryForm.inviteCode).then(response=>{
          if(response.content === true){
            this.$store.dispatch('Register',this.registryForm).then(()=>{
              this.$router.push('/') // TODO: 注册成功之后拉取个人信息 获得token
              this.$message({
                message: '注册成功',
                type: 'success'
              })
            })
          }else {
            this.$message({
              message: '您的邀请码无效 请重新填写',
              type: 'warning'
            })
          }
        }).catch(err=>{
          alert(err)
        })
      },
      handleRegistry(formName){
        if(this.checked){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.doSubmit()
            } else {
              return false;
            }
          });
        }else{
          this.$message({
            message: '您必须同意用户协议',
            type: 'warning'
          })
        }
      },
    }
  }
</script>

<style lang="scss">
  @import "../../../assets/custom-theme/theme";
  .el-input__inner {
    color: #61688a !important;
    background-color: #1e2235;
    height: 48px;
    width: 100%;
    border: 1px solid
  }
  .el-input.is-active .el-input__inner, .el-input__inner:focus {
    color: $hbColor!important;
    border-color: $hbHoverColor;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #7a98f7;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #7a98f7;
    border-color:#7a98f7 ;
  }

  .el-button--primary {
    background-color: #7a98f7;
    border-color:#7a98f7 ;
    width: 180px;
  }
  .el-checkbox {
    color: #c7cce6;
  }
  .el-button--primary:focus, .el-button--primary:hover {
    background-color: #a0b6f9;
    border-color: #a0b6f9;
  }
</style>
