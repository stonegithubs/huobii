<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ $t('userOptions.bindEmail') }}</span>
    </div>
    <el-form ref="emailForm" :model="emailForm" label-position="top" status-icon label-width="100px">
      <el-form-item :label="$t('userOptions.emailAddress')" :rules="[{ required: true, message: $t('userOptions.emailAddressTip'), trigger: 'blur' },{ type: 'email', message: $t('userOptions.emialInvaild'), trigger: ['blur', 'change'] }]" prop="address">
        <el-input v-model="emailForm.address" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitEmailForm('emailForm')">{{ $t('userOptions.sendEmail') }}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {
  bindEmail
} from '../../../api/verify_code'
export default {
  name: 'BindEmail',
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
          const formData = new FormData()
          formData.append('address', this.emailForm.address)
          // console.log(bindEmail)
          bindEmail(formData).then(response => {
            // if (response.content) {
            this.$notify.success(this.$t('userOptions.haveSent'))
            // this.$router.goBack()
            // } else {
            // alert(response.message)
            // }
          }).catch(error => {
            // this.$notify.error(error.message)
          })
          this.$notify.success(this.$t('userOptions.haveSent'))
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
