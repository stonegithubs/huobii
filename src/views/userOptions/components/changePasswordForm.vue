<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ $t('userOptions.changePwd') }}</span>
    </div>
    <el-form ref="passwordForm" :model="passwordForm" :rules="rules" label-position="top" status-icon label-width="100px">
      <el-form-item :label="$t('userOptions.currentPwd')" prop="current">
        <el-input v-model="passwordForm.current" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('userOptions.newPwd')" prop="newpwd">
        <el-input v-model="passwordForm.newpwd" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('userOptions.confirmNewPwd')" prop="confirm">
        <el-input v-model="passwordForm.confirm" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="beforeSubmit('passwordForm')">{{ $t('userOptions.confirmTochange') }}</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :title="$t('userOptions.yourCaptcha')" :visible.sync="captchaVisible" :before-close="handleClose" width="300px">
      <!-- <el-form-item :label="$t('userOptions.currentPwd')" prop="captcha"> -->
      <el-input v-model="passwordForm.captcha" type="text" autocomplete="off" />
      <!-- </el-form-item> -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('passwordForm')">{{ $t('confirm') }}</el-button>
      </span>
    </el-dialog>
  </el-card>
  <!-- // <div class="change-password-form">

        // </div> -->
</template>
<script>
import {
  login_pwd
} from '../../../api/security'
import {
  sendCaptcha1,
  getCaptcha
} from '../../../api/user'
export default {
  name: 'ChangePasswordForm',
  data() {
    const vallidatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('login.confirmPwd')))
      } else if (value !== this.passwordForm.newpwd) {
        callback(new Error(this.$t('login.pwdNotConsistent')))
      } else {
        callback()
      }
    }
    const checkPasswrod = (rule, value, callback) => {
      const reg = new RegExp(
        "^(?:(?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,\\.#%'\\+\\*\\-:;^_`].*))[,\\.#%'\\+\\*\\-:;^_`0-9A-Za-z]{8,30}$"
      )
      if (!reg.test(value)) {
        callback(this.$t('login.pwdRule'))
      } else {
        callback()
      }
    }
    return {
      passwordForm: {
        current: '',
        newpwd: '',
        confirm: '',
        captcha: ''
      },
      captchaVisible: false,
      rules: {
        current: [{
          required: true,
          message: this.$t('login.pwdIsRequired'),
          trigger: 'blur'
        }],
        newpwd: [{
          required: true,
          validator: checkPasswrod,
          trigger: 'change'
        }],
        confirm: [{
          required: true,
          validator: vallidatePassword,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    handleClose() {
      this.$confirm(this.$t('confirmToClose'))
        .then(_ => {
          this.captchaVisible = false
          done()
        })
        .catch(_ => {})
    },
    beforeSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.captchaVisible = true
          const phone = this.$store.state.user.userInfo.mobile
          const country = this.$store.state.user.userInfo.countryCode
          sendCaptcha1(phone, country).then(res => {
            // TODO: 接收验证码需要删除
            getCaptcha(phone, country).then(res => {
              this.$notify.success(res.content)
            })
          })
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const formData = new FormData()
          formData.append('current', this.passwordForm.current)
          formData.append('newpwd', this.passwordForm.newpwd)
          formData.append('confirm', this.passwordForm.confirm)
          formData.append('captcha', this.passwordForm.captcha)
          login_pwd(formData).then(response => {
            if (response.content) {
              this.$notify.success(response.message)
              this.$store.dispatch('LogOut')
              this.$router.push({ name: 'login' })
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

</style>
