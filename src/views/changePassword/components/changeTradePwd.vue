<template>
  <div class="change-trade-pwd">
    <el-form :model="tradePwdForm" status-icon :rules="rules" ref="tradePwdForm" label-width="100px" label-position="top">
      <el-form-item label="当前交易密码,如果没有设置则为登陆密码" prop="current">
        <el-input type="password" v-model="tradePwdForm.current" autocomplete="off" />
      </el-form-item>
      <el-form-item label="新密码" prop="newpwd">
        <el-input type="password" v-model="tradePwdForm.newpwd" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirm">
        <el-input type="password" v-model="tradePwdForm.confirm" autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <el-input type="password" v-model="tradePwdForm.captcha" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('tradePwdForm')">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { trade_pwd } from "../../../api/security";

export default {
  name: "change-trade-pwd",
  data() {
    return {
      tradePwdForm: {
        current: '',
        newpwd: '',
        confirm: '',
        captcha: ''
      }
    }
  },
  computed: {
      
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formData = new FormData()
          formData.append('current', this.tradePwdForm.current)
          formData.append('newpwd', this.tradePwdForm.newpwd)
          formData.append('confirm', this.tradePwdForm.confirm)
          formData.append('captcha', this.tradePwdForm.captcha)

          trade_pwd(formData).then(response => {
            if (response.content) {
              this.$notify.success(response.message)
              this.$router.goBack()
            } else {
              alert(response.message)
            }
          }).catch(error => {
            this.$notify.error(error.message)
          })
        }
      })
    }
  },
  created(){
   
  }
}

</script>
<style lang='scss' scoped>
.change-trade-pwd {
  width: 600px;
  margin: auto;

  .el-form /deep/ {

    button {
      height: 48px;
      border-radius: 3px;
      border: none;
      min-width: 200px;
      font-size: 16px;
      width: 100%;
      background-color: #7a98f7;

      &:hover {
        background-color: #a0b6f9;
      }
    }

    .el-form-item__label {
      color: #61688a;
    }

    .el-input__inner {
      background-color: #1e2235;
      color: #c7cce6;
      box-sizing: border-box;
      height: 48px;
      border: 1px solid #4e5b85;
      border-radius: 3px;
      font-size: 16px;

    }
  }
}

</style>
