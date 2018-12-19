<template>
  <el-form ref="registryForm" :model="registryForm" :rules="rules" class="registry-form" status-icon label-width="100px">
    <el-form-item :label="$t('login.country')">
      <el-select @change="countryChange" v-model="registryForm.region" :placeholder="$t('login.countryTip')">
        <el-option v-for="item in getCountry" :label="item.enName+'    '+ item.name" :value="item.abbr" :key="item.id"/>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('login.account')" prop="phone">
      <el-input v-model="registryForm.phone" :placeholder="$t('login.phoneNumber')" type="text" autocomplete="off">
       <template slot="prepend">
          {{ cuntryCode }}
        </template>
        <template slot="suffix">
          <el-button :class="buttonColor" :disabled="timeRest === 60? false:true" class="send-code" @click="sendCode">{{ timeRest===60? '':timeRest }}{{ buttonInner }}</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item :label="$t('login.password')" prop="password">
      <el-input v-model="registryForm.password" :placeholder="$t('login.pwdTip')" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item :label="$t('login.confirmPwd')" prop="confirm">
      <el-input v-model="registryForm.confirm" :placeholder="$t('login.confirmPwd')" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item :label="$t('captcha')" prop="code">
      <el-input v-model="registryForm.code" :placeholder="$t('login.captchaTip')" type="text" autocomplete="off" @keyup.enter.native ="sendCode"/>
    </el-form-item>
    <!-- <el-form-item>
      <vue-recaptcha  size='Invisible' :sitekey="getSiteKey" @verify="getVerify"></vue-recaptcha>
    </el-form-item> -->
    <el-form-item>
      <el-checkbox v-model="checked">{{ $t('login.iHaveReadAndConfirm') }} <router-link :to="{ name: 'agreement'}">{{ $t('login.agreement') }}</router-link>
      </el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleRegistry('registryForm')">{{ $t('login.signUp') }}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import {
  sendCaptcha1,
  getCaptcha
} from '../../../api/user'
import {
  getCountry
} from '../../../api/common'
import {
  setTimeout,
  setInterval,
  clearInterval,
  clearTimeout
} from 'timers'
import {
  mapGetters
} from 'vuex'
import VueRecaptcha from 'vue-recaptcha'
export default {
  name: 'RegistryForm',
  components: {
    VueRecaptcha
  },
  data() {
    const vallidatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('login.confirmPwd')))
      } else if (value !== this.registryForm.password) {
        callback(new Error(this.$t('login.pwdNotConsistent')))
      } else {
        callback()
      }
    }
    const checkPasswrod = (rule, value, callback) => {
      const reg = new RegExp(
        '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$'
        // "^(?:(?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,\\.#%'\\+\\*\\-:;^_`].*))[,\\.#%'\\+\\*\\-:;^_`0-9A-Za-z]{8,30}$"
        // '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$'
        // "^(?:(?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,\\.#%'\\+\\*\\-:;^_`].*))[,\\.#%'\\+\\*\\-:;^_`0-9A-Za-z]{8,30}$"
        )
      if (!reg.test(value)) {
        callback(this.$t('login.pwdRule'))
      } else {
        callback()
      }
    }
    const captchaCheck = (rule, value, callback) => {
      if (value !== '') {
        callback()
      } else {
        callback(this.$t('login.captchaTip'))
      }
    }
    return {
      // buttonInner:'点击发送验证码',
      timeRest: 60,
      isDisable: false,
      counter: {},
      checked: false,
      cuntryCode: '+86',
      registryForm: {
        phone: '',
        password: '',
        confirm: '',
        region: '',
        code: ''
        // inviteCode: ''
      },
      rules: {
        phone: [{
          required: true,
          message: this.$t('login.accountIsRequired'),
          trigger: 'blur'
        }],
        password: [{
          required: true,
          validator: checkPasswrod,
          trigger: 'change'
        }],
        confirm: [{
          required: true,
          validator: vallidatePassword,
          trigger: 'blur'
        }],
        captcha: [{
          required: true,
          validator: captchaCheck,
          trigger: 'blur'
        }]
        // inviteCode: [
        //   { require: false }
        // ]
      }
    }
  },
  computed: {
    ...mapGetters([
      // 'getCountry',
      // 'getCountryCodeByAbbr',
      'getSiteKey',
      'getCountryCodeByAbbr'
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
    },
    ...mapGetters([
      'getCountry',
      'getCountryCodeByAbbr'
    ])
  },
  beforeDestroy() {
    // clearInterval(this.counter);
  },
  created() {
    if (getCountry.length === 0) {
      this.$store.dispatch('getCountryList')
    }
  },
  methods: {
     countryChange(val){
      this.cuntryCode = this.getCountryCodeByAbbr(val)
    },
    sendCode() {
      if (this.registryForm.region === '') {
        this.$notify.error(this.$t('login.countryIsRequired'))
        return false
      }
      if (this.registryForm.phone === '') {
        this.$notify.error(this.$t('login.accountIsRequired'))
        return false
      }
      const regionPhone = this.getCountryCodeByAbbr(this.registryForm.region) + this.registryForm.phone
      sendCaptcha1(regionPhone, this.registryForm.region).then(responese => {
        setTimeout(() => {
          getCaptcha(regionPhone, this.registryForm.region).then(responese1 => {
            if (responese1.code == '200') {
              this.$notify({
                title: this.$t('captcha'),
                message: responese1.content,
                duration: 0
              })
            } else {
              this.$notify.error(this.$t('shitHappens'), )
            }
          }).catch(_ => {})
        }, 4000)
      });
      (this.isDisable = true), this.timeRest--
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
    },
    doSubmit() {
      const regionPhone = this.getCountryCodeByAbbr(this.registryForm.region) + this.registryForm.phone
      const form = new FormData()
      form.append('phone', regionPhone)
      form.append('password', this.registryForm.password)
      form.append('confirm', this.registryForm.confirm)
      form.append('code', this.registryForm.code)
      form.append('country', this.registryForm.region)
      this.$store
        .dispatch('Register', form)
        .then(response => {
          if (response.content === true) {
            // this.$router.goBack();
            this.$notify.success(response.message)
            this.$router.push('/login')
          } else {
            this.$notify.error(response.message)
          }
        })
        .catch(err => {
          this.$notify.error(err.message)
        })
    },
    handleRegistry(formName) {
      if (this.checked) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.doSubmit()
          } else {
            return false
          }
        })
      } else {
        this.$notify.warning(this.$t('login.confirmAgreement'))
      }
    }
    // getVerify(verifyCode){
    //   this.handleRegistry('registryForm')
    // }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../assets/custom-theme/theme";
  .registry-form /deep/ {
    .ok-color {
      color: $hbHoverColor;
    }
    input {
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
    .el-button--primary {
      // background-color: #7a98f7;
      // border-color: #7a98f7;
      width: 180px;
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
  }
</style>
