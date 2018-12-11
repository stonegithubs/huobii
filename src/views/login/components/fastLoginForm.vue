<template>
  <el-form ref="loginForm" :model="loginForm" label-position="top" status-icon label-width="100px" class="login-form">
    <el-form-item :label="$t('login.country')" :rules="[{ required: true, message:$t('login.countryIsRequired'), trigger: 'blur' }]" prop="region">
      <el-select v-model="loginForm.region" :placeholder="$t('login.countryTip')">
        <el-option v-for="item in getCountry" :label="item.enName+'    '+ item.name" :value="item.abbr" :key="item.id"/>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('login.account')" :rules="[{ required: true, message: $t('login.accountIsRequired'), trigger: 'blur' }]" prop="phone">
      <el-input v-model="loginForm.phone" :placeholder="$t('login.phoneNumber')" type="text" autocomplete="off">
        <template slot="suffix">
          <el-button :class="buttonColor" :disabled="timeRest === 60? false:true" class="send-code" @click="msendCode">{{ timeRest===60? '':timeRest }}{{ buttonInner }}</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item :label="$t('captcha')" :rules="[{ required: true, message: $t('login.captchaIsRequired'), trigger: 'blur' }]" prop="code">
      <el-input v-model="loginForm.code" :placeholder="$t('login.captchaTip')" type="text" autocomplete="off" />
    </el-form-item>
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
import {
  sendCaptcha1,
  getCaptcha
} from '../../../api/user'
import {
  setTimeout,
  setInterval,
  clearInterval,
  clearTimeout
} from 'timers'
export default {
  name: 'FastLoginForm',
  components: {
    VueRecaptcha
  },
  data() {
    return {
      loginForm: {
        region: '',
        phone: '',
        code: ''
      },
      timeRest: 60,
      counter: {},
      isDisable: false,
      isVerify: false,
      mycode: '',
      cacheVerifyCode: null
      // dialogTableVisible: false,
    }
  },
  mounted() {
    this.cacheVerifyCode = null
  },
  computed: {
    ...mapGetters([
      'getCountry',
      'getCountryCodeByAbbr',
      'getSiteKey'
    ]),
    buttonInner() {
      if (this.isDisable === true) {
        return 's ' + this.$t('login.reSend')
      } else {
        return this.$t('login.clickToSendCaptcha')
      }
    },
    buttonColor() {
      if (this.isDisable) {
        return 'disabled-color'
      } else {
        return 'ok-color'
      }
    }
  },
  created() {
    if (sessionStorage.getItem('Authorization')) {
      this.$router.back()
    }
  },
  beforeDestroy() {
    // clearInterval(this.counter);
  },
  methods: {
    getVerify(verifyCode) {
      let myCode = verifyCode
       if(Object.prototype.toString.call(myCode) === '[object MouseEvent]'){
        // 点击按钮 
        if(this.cacheVerifyCode === null){
          this.$notify.error(this.$t('googleCaptchaNeed'))
          return false
        }else{
          myCode = this.cacheVerifyCode
        }

      }else if(Object.prototype.toString.call(this.cacheVerifyCode) === '[object String]'){
        // 不是点击按钮
         this.cacheVerifyCode =  myCode 
      }
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          const formData = new FormData()
          formData.append('phone', this.getCountryCodeByAbbr(this.loginForm.region) + this.loginForm.phone)
          formData.append('country', this.loginForm.region)
          formData.append('captcha', verifyCode)
          formData.append('code', this.loginForm.code)
          this.$store.dispatch('FastLogin', formData).then(responese => {
            if (responese.code === '200') {
              this.$router.push({
                name: 'index'
              })
              // this.$message.success(responese.message)
            } else {
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
    },
    msendCode() {
      if (this.loginForm.region === '') {
        this.$notify.error(this.$t('login.countryIsRequired'))
        return false
      }
      if (this.loginForm.phone === '') {
        this.$notify.error(this.$t('login.accountIsRequired'))
        return false
      }
      // console.log('已经发送')
      const regionPhone = this.getCountryCodeByAbbr(this.loginForm.region) + this.loginForm.phone
      sendCaptcha1(regionPhone, this.loginForm.region).then(responese => {
        setTimeout(() => {
          getCaptcha(regionPhone, this.loginForm.region).then(responese1 => {
            if (responese1 && responese1.code == '200') {
              this.$notify({
                title: this.$t('captcha'),
                message: responese1.content,
                duration: 0
              })
            } else {
              this.$notify.error(this.$t('shitHappens'),)
            }
          }).catch(_ => {})
        }, 4000)
      })
      this.isDisable = true
      this.timeRest--
      // clearInterval(this.counter)
      this.counter = setInterval(() => {
        if (this.timeRest > 0) {
          this.timeRest--
        } else {
          clearInterval(this.counter)
          this.timeRest = 60
          this.isDisable = false
        }
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
    @import "../../../assets/custom-theme/theme";
    .login-form /deep/ {
        width: 520px;
        .disabled-color {
            // color: #606266 !important;
        }
        .send-code {
            background: transparent;
            border: none;
            border-radius: 0%; // color: #7a98f7;
             ::before {
                content: "|";
                margin-right: 30px; // color: #1e2235;
            }
        }
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
        //     color: $hbColor;
        //     border-color: $hbHoverColor;
        // }
    }
</style>
