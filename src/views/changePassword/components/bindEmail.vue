<template>
  <div class="bind-email">
    <el-form :model="emailForm" status-icon ref="emailForm" label-width="100px">
      <el-form-item label="邮箱地址" prop="address" :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
        <el-input type="text" v-model="emailForm.address" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitEmailForm('emailForm')">发送邮件</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    bindEmail
  } from "../../../api/verify_code";
  export default {
    name: "bind-email",
    data() {
      return {
        emailForm: {
          address: ''
        }
      }
    },
    methods: {
      submitEmailForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let formData = new FormData()
            formData.append('address', this.emailForm.address)
            console.log(bindEmail)
            bindEmail(formData).then(response => {
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
    }
  }
</script>

<style lang="scss">
  .bind-email {
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
