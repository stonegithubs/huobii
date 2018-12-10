<template>
  <el-form class="registry-form" ref="registryForm" :model="registryForm" :rules="rules" status-icon label-width="100px">
    <el-form-item :label="$t('login.country')">
      <el-select v-model="registryForm.region" :placeholder="$t('login.countryTip')">
        <el-option v-for="item in getCountry" :label="item.enName+'    '+ item.name" :value="item.abbr" v-bind:key="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('login.account')" prop="phone">
      <el-input v-model="registryForm.phone" type="text" :placeholder="$t('login.phoneNumber')" autocomplete="off">
        <template slot="suffix">
          <el-button class="send-code" :class="buttonColor" @click="sendCode" :disabled='timeRest === 60? false:true'>{{ timeRest===60? '':timeRest }}{{ buttonInner }}</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item :label="$t('login.password')" prop="password">
      <el-input v-model="registryForm.password" type="password" :placeholder="$t('login.pwdTip')" autocomplete="off" />
    </el-form-item>
    <el-form-item :label="$t('login.confirmPwd')" prop="confirm">
      <el-input v-model="registryForm.confirm" type="password" :placeholder="$t('login.confirmPwd')" autocomplete="off" />
    </el-form-item>
    <el-form-item :label="$t('captcha')" prop="code">
      <el-input v-model="registryForm.code" type="text" :placeholder="$t('login.captchaTip')" autocomplete="off" @keyup.enter.native ="sendCode">
      </el-input>
    </el-form-item>
   <!-- <el-form-item>
      <vue-recaptcha  size='Invisible' :sitekey="getSiteKey" @verify="getVerify"></vue-recaptcha>
    </el-form-item> -->
    <el-form-item>
      <el-checkbox v-model="checked">{{$t('login.iHaveReadAndConfirm')}} <router-link :to="{ name: 'agreement'}">{{$t('login.agreement')}}</router-link>
      </el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleRegistry('registryForm')">{{$t('login.signUp')}}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import {
    sendCaptcha1,
    getCaptcha
  } from "../../../api/user";
  import {
    getCountry
  } from "../../../api/common";
  import {
    setTimeout,
    setInterval,
    clearInterval,
    clearTimeout
  } from "timers";
  import {
    mapGetters
  } from 'vuex'
  import VueRecaptcha from 'vue-recaptcha';
  export default {
    name: "registry-form",
    components: {
      VueRecaptcha
    },
    data() {
      let vallidatePassword = (rule, value, callback) => {
        if (value === "") {
          callback(new Error(this.$t('login.confirmPwd')));
        } else if (value !== this.registryForm.password) {
          callback(new Error(this.$t('login.pwdNotConsistent')));
        } else {
          callback();
        }
      };
      let checkPasswrod = (rule, value, callback) => {
        let reg = new RegExp(
          "^(?:(?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,\\.#%'\\+\\*\\-:;^_`].*))[,\\.#%'\\+\\*\\-:;^_`0-9A-Za-z]{8,30}$"
        );
        if (!reg.test(value)) {
          callback(this.$t('login.pwdRule'));
        } else {
          callback();
        }
      };
      let captchaCheck = (rule, value, callback) => {
        if (value !== "") {
          callback();
        } else {
          callback(this.$t('login.captchaTip'));
        }
      };
      return {
        // buttonInner:'点击发送验证码',
        timeRest: 60,
        isDisable: false,
        counter: {},
        checked: false,
        registryForm: {
          phone: "",
          password: "",
          confirm: "",
          region: "",
          code: ""
          // inviteCode: ''
        },
        rules: {
          phone: [{
            required: true,
            message: this.$t('login.accountIsRequired'),
            trigger: "blur"
          }],
          password: [{
            required: true,
            validator: checkPasswrod,
            trigger: "change"
          }],
          confirm: [{
            required: true,
            validator: vallidatePassword,
            trigger: "blur"
          }],
          captcha: [{
            required: true,
            validator: captchaCheck,
            trigger: "blur"
          }]
          // inviteCode: [
          //   { require: false }
          // ]
        },
      };
    },
    computed: {
      ...mapGetters([
        // 'getCountry',
        // 'getCountryCodeByAbbr',
        'getSiteKey'
      ]),
      buttonInner() {
        if (this.isDisable === true) {
          return "s " + this.$t('login.reSend');
        } else {
          return this.$t('login.clickToSendCaptcha');
        }
      },
      buttonColor() {
        if (this.isDisable) {
          return "disabled-color";
        } else {
          return "ok-color";
        }
      },
      ...mapGetters([
        'getCountry',
        'getCountryCodeByAbbr'
      ])
    },
    methods: {
      sendCode() {
        if (this.registryForm.region === '') {
          this.$notify.error(this.$t('login.countryIsRequired'))
          return false
        }
        if (this.registryForm.phone === '') {
          this.$notify.error(this.$t('login.accountIsRequired'))
          return false
        }
        let regionPhone = this.getCountryCodeByAbbr(this.registryForm.region) + this.registryForm.phone
        sendCaptcha1(regionPhone, this.registryForm.region).then(responese => {
          setTimeout(() => {
            getCaptcha(regionPhone, this.registryForm.region).then(responese1 => {
              if (responese1.code == '200') {
                this.$notify({
                  title: this.$t('captcha'),
                  message: responese1.content,
                  duration: 0
                });
              } else {
                this.$notify.error(this.$t('shitHappens'), )
              }
            }).catch(_ => {});
          }, 4000);
        });
        (this.isDisable = true), this.timeRest--;
        // clearInterval(this.counter)
        this.counter = setInterval(() => {
          if (this.timeRest > 0) {
            this.timeRest--;
          } else {
            clearInterval(this.counter);
            this.timeRest = 60;
            this.isDisable = false;
          }
        }, 1000);
      },
      doSubmit() {
        let regionPhone = this.getCountryCodeByAbbr(this.registryForm.region) + this.registryForm.phone
        let form = new FormData();
        form.append("phone", regionPhone);
        form.append("password", this.registryForm.password);
        form.append("confirm", this.registryForm.confirm);
        form.append("code", this.registryForm.code);
        form.append("country", this.registryForm.region);
        this.$store
          .dispatch("Register", form)
          .then(response => {
            if (response.content === true) {
              // this.$router.goBack();
              this.$notify.success(response.message);
              this.$router.push("/login");
            } else {
              this.$notify.error(response.message);
            }
          })
          .catch(err => {
            this.$notify.error(err.message);
          });
      },
      handleRegistry(formName) {
        if (this.checked) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.doSubmit();
            } else {
              return false;
            }
          });
        } else {
          this.$notify.warning(this.$t('login.confirmAgreement'));
        }
      },
      // getVerify(verifyCode){
      //   this.handleRegistry('registryForm')
      // }
    },
    beforeDestroy() {
      // clearInterval(this.counter);
    },
    created() {
      if (getCountry.length === 0) {
        this.$store.dispatch('getCountryList')
      }
    }
  };
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
