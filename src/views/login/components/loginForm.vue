<template>
  <el-form ref="loginForm" :model="loginForm" label-position="top" status-icon label-width="100px" class="login-form">
    <el-form-item :label="$t('login.country')" :rules="[{ required: true, message: $t('login.countryIsRequired'), trigger: 'blur' }]" prop="region">
      <el-select v-model="loginForm.region" :placeholder="$t('login.countryTip')">
        <el-option v-for="item in getCountry" :label="item.enName+'    '+ item.name" :value="item.abbr" :key="item.id"/>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('login.account')" :rules="[{ required: true, message: $t('login.accountIsRequired'), trigger: 'blur' }]" prop="username">
      <el-input v-model="loginForm.username" :placeholder="$t('login.phoneNumber')" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item :label="$t('login.password')" :rules="[{ required: true, message: $t('login.pwdIsRequired') , trigger: 'blur' }]" prop="password">
      <el-input v-model="loginForm.password" :placeholder="$t('login.pwdTip')" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item/>
    <el-form-item>
      <vue-recaptcha ref="invisibleRecaptcha" :sitekey="getSiteKey" size="Invisible" @verify="getVerify"/>
    </el-form-item>
    <el-form-item>
      <el-button class="login-btn" type="primary" @click="getVerify">{{ $t('login.login') }}</el-button>
      <div style="float:right;margin-top: 24px;margin-right: 116px;">
        <router-link :to="{ name: 'forget_password'}">{{ $t('login.forgetPwd') }}</router-link>
      </div>
    </el-form-item>
  </el-form>
</template>
<script>
import VueRecaptcha from 'vue-recaptcha'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'LoginForm',
  components: {
    VueRecaptcha
  },
  data() {
    return {
      loginForm: {
        region: '',
        username: '',
        password: '',
        captcha: ''
      },
      timeRest: 60,
      counter: {},
      isDisable: false,
      isVerify: false,
      // dialogTableVisible:false,

      cacheVerifyCode: null // 缓存谷歌验证码
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
  },
  mounted() {
    this.cacheVerifyCode = null
  },
  methods: {
    getVerify(verifyCode) {
      let myCode = verifyCode
      if ((Object.prototype.toString.call(myCode) === '[object MouseEvent]') && this.cacheVerifyCode === null) {
        // 如果没有正确显示验证码则返回值不是字符串 并且没有缓存到上一次的验证码
        //  提示网络状况
        this.$notify.error(this.$t('googleCaptchaNeed'))
        // console.log('无法加载谷歌验证码，请检查您的网络状况'+ verifyCode)
        return false
      }
      if (Object.prototype.toString.call(myCode) === '[object MouseEvent]' && Object.prototype.toString.call(this.cacheVerifyCode) === '[object String]') {
        // 如果点击按钮并且拿到上一次的缓存谷歌验证码 则把上一次的有效验证码提交
        myCode = this.cacheVerifyCode
        // console.log('检测到先行点击 上一次的谷歌验证码'+ myCode)
      }
      // this.dialogTableVisible = false
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          const formData = new FormData()
          formData.append('username', this.getCountryCodeByAbbr(this.loginForm.region) + this.loginForm.username)
          formData.append('password', this.loginForm.password)
          formData.append('country', this.loginForm.region)
          formData.append('captcha', myCode)
          this.$store.dispatch('LoginByUsername', formData).then(responese => {
            if (responese.code === '200') {
              this.$router.push({
                name: 'index'
              })
              this.$message.success(this.$t('login.success'))
            } else {
              console.log(responese)
              this.$alert(responese.message, this.$t('login.failed'), {
                confirmButtonText: this.$t('confirm'),
                callback: action => {
                  window.location.reload()
                }
              })
            }
          }).catch(err => {
            this.$alert(err.message, this.$t('login.failed'), {
              confirmButtonText: this.$t('confirm'),
              callback: action => {
                window.location.reload()
              }
            })
          })
        } else {
          this.cacheVerifyCode = verifyCode
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
    .el-dialog /deep/ {
      .el-dialog__header {
        display: none
      }
      .el-dialog__body {
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
      // background-color: #357ce1;
      margin-top: 20px;
      color: #fff; // border: 1px solid #357ce1;
      width: 200px;
    }
    .el-input__inner {
      // color: #61688a;
      // background-color: #1e2235; // height: 48px;
      width: 100%; // border: 1px solid
    } // .el-input.is-active .el-input__inner,
    // .el-input__inner:focus {
    //   color: $hbColor;
    //   border-color: $hbHoverColor;
    // }
  }
</style>
