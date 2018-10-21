<template>
  <div class="verify-form">
    <el-form :model="verifyForm" status-icon ref="verifyForm" label-width="100px">
      <el-form-item label="姓氏" prop="familyName">
        <el-input type="text" v-model="verifyForm.familyName" autocomplete="off"/>
      </el-form-item>

      <el-form-item label="名字" prop="givenName">
        <el-input type="text" v-model="verifyForm.givenName" autocomplete="off"/>
      </el-form-item>

      <el-form-item label="身份证号" prop="idNo">
        <el-input type="text" v-model="verifyForm.idNo" autocomplete="off"/>
      </el-form-item>


      <el-form-item label="身份证号" prop="验证码">
        <el-input type="text" v-model="verifyForm.idNo" autocomplete="off"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('verifyForm')">认证</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getVerifyInfo, normalVerify } from "../../../api/user";

export default {
  name: "verify-form",
  data(){
      return {
        verifyForm: {
          familyName: '',
          givenName: '',
          idNo: '',
          type: '', // TODO: 证件类型是不是只需要身份证
          captcha: '' // TODO: 验证码类型 包括在登陆页面的验证码
        }
      }
  },
  methods: {
    submitForm(formName){
      normalVerify(this.verifyForm).then(response => {
        if(response.content === true){
          this.$message({
            message: response.message,
            type: 'success'
          })
        }else {
          this.$message.error(response.message)
        }

      }).catch(err => {
        this.$message.error(err)
      })
    }
  },
  created(){

  }

}
</script>

<style lang="scss">
  .verify-form{
    .el-form {
      width: 600px;
      margin: auto;
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
    }
    .el-form-item__label {
      color:#61688a;
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
</style>
