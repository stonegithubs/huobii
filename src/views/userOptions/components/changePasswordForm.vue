<template>
<el-card  class="box-card">
  <div slot="header" class="clearfix">
    <span>修改密码</span>
  </div>
  <el-form label-position='top' :model="passwordForm" status-icon :rules="rules" ref="passwordForm" label-width="100px">
      <el-form-item label="当前密码" prop="current">
        <el-input type="password" v-model="passwordForm.current" autocomplete="off" />
      </el-form-item>
      <el-form-item label="新密码" prop="newpwd">
        <el-input type="password" v-model="passwordForm.newpwd" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirm">
        <el-input type="password" v-model="passwordForm.confirm" autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <el-input type="password" v-model="passwordForm.captcha" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('passwordForm')">确认修改</el-button>
      </el-form-item>
    </el-form>
</el-card>

  <!-- // <div class="change-password-form">
    
  // </div> -->
</template>
<script>
import { login_pwd } from "../../../api/security";
export default {
  name: "change-password-form",
  data() {
    return {
      passwordForm: {
        current: '',
        newpwd: '',
        confirm: '',
        captcha: ''
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formData = new FormData()
          formData.append('current', this.passwordForm.current)
          formData.append('newpwd', this.passwordForm.newpwd)
          formData.append('confirm', this.passwordForm.confirm)
          formData.append('captcha', this.passwordForm.captcha)

          login_pwd(formData).then(response => {
            if(response.content){
              this.$notify.success(response.message)
              this.$router.reload()
            }
            else{
              alert(response.message)
            }
          }).catch(error => {
              this.$notify.error(error.message)
          })
        }
      })
    }
  }
}

</script>
<style lang="scss">

// .change-password-form {
//   width: 600px;
//   margin: auto;

//   .el-form /deep/ {

//     button {
//       height: 48px;
//       border-radius: 3px;
//       border: none;
//       min-width: 200px;
//       font-size: 16px;
//       width: 100%;
//       background-color: #7a98f7;

//       &:hover {
//         background-color: #a0b6f9;
//       }
//     }

//     .el-form-item__label {
//       color: #61688a;
//     }

//     .el-input__inner {
//       background-color: #1e2235;
//       color: #c7cce6;
//       box-sizing: border-box;
//       height: 48px;
//       border: 1px solid #4e5b85;
//       border-radius: 3px;
//       font-size: 16px;

//     }
//   }
// }

</style>
