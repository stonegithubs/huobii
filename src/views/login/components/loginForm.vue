<template>
  <el-form
    ref="loginForm"
    :model="loginForm"
    label-position="top"
    status-icon
    label-width="100px"
    class="login-form"
  >
    <el-form-item
      :label="$t('login.country')"
      :rules="[{ required: true, message: $t('login.countryIsRequired'), trigger: 'blur' }]"
      prop="region"
    >
      <el-select
        @change="countryChange"
        v-model="loginForm.region"
        :placeholder="$t('login.countryTip')"
      >
        <el-option
          v-for="item in getCountry"
          :label="item.enName+'    '+ item.name"
          :value="item.abbr"
          :key="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      :label="$t('login.account')"
      :rules="[{ required: true, message: $t('login.accountIsRequired'), trigger: 'blur' }]"
      prop="username"
    >
      <el-input
        v-model="loginForm.username"
        :placeholder="$t('login.phoneNumber')"
        type="text"
        autocomplete="off"
      >
        <template slot="prepend">{{ cuntryCode }}</template>
      </el-input>
    </el-form-item>
    <el-form-item
      :label="$t('login.password')"
      :rules="[{ required: true, message: $t('login.pwdIsRequired') , trigger: 'blur' }]"
      prop="password"
    >
      <el-input
        v-model="loginForm.password"
        :placeholder="$t('login.pwdTip')"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item/>
    <el-form-item>
      <vue-recaptcha
        ref="invisibleRecaptcha"
        :sitekey="getSiteKey"
        size="Invisible"
        @verify="getVerify"
      />
    </el-form-item>
    <el-form-item>
      <el-button class="login-btn" type="primary" @click="submitLogin()">{{ $t('login.login') }}</el-button>
      <div style="float:right;margin-top: 24px;margin-right: 116px;">
        <router-link :to="{ name: 'forget_password'}">{{ $t('login.forgetPwd') }}</router-link>
      </div>
    </el-form-item>
  </el-form>
</template>
<script>
import VueRecaptcha from "vue-recaptcha";
import { mapGetters } from "vuex";
export default {
  name: "LoginForm",
  components: {
    VueRecaptcha
  },
  data() {
    return {
      loginForm: {
        region: "",
        username: "",
        password: "",
        captcha: ""
      },
      cuntryCode: "+86",
      timeRest: 60,
      counter: {},
      isDisable: false,
      isVerify: false,
      // dialogTableVisible:false,

      cacheVerifyCode: null // 缓存谷歌验证码
    };
  },
  computed: {
    ...mapGetters(["getCountry", "getCountryCodeByAbbr", "getSiteKey"])
  },
  created() {
    if (sessionStorage.getItem("Authorization")) {
      this.$router.back();
    }
  },
  mounted() {
    this.cacheVerifyCode = null;
  },
  methods: {
    getVerify(verifyCode) {
      let myCode = verifyCode;
      this.cacheVerifyCode = verifyCode;
    },
    countryChange(val) {
      this.cuntryCode = this.getCountryCodeByAbbr(val);
    },
    submitLogin() {
      if (this.cacheVerifyCode === null) {
        this.$notify.warning(this.$t("googleCaptchaNeed"));
        return;
      } else {
        this.$refs["loginForm"].validate(valid => {
          if (valid) {
            const formData = new FormData();
            formData.append(
              "username",
              this.getCountryCodeByAbbr(this.loginForm.region) +
                this.loginForm.username
            );
            formData.append("password", this.loginForm.password);
            formData.append("country", this.loginForm.region);
            formData.append("captcha", this.cacheVerifyCode);
            this.$store
              .dispatch("LoginByUsername", formData)
              .then(responese => {
                if (responese.code === "200") {
                  this.$router.push({
                    name: "index"
                  });
                  this.$message.success(this.$t("login.success"));
                } else {
                  console.log(responese);
                  this.$alert(this.$t("shitHappens"), this.$t("login.failed"), {
                    confirmButtonText: this.$t("confirm"),
                    callback: action => {
                      window.location.reload();
                    }
                  });
                }
              })
              .catch(err => {
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
              });
          } else {
            this.cacheVerifyCode = verifyCode;
          }
        });
      }
    }
  },
  watch: {}
};
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
      display: none;
    }
    .el-dialog__body {
      padding: 0;
    }
  }
  .vue-recaptcha /deep/ {
    .rc-anchor {
      background: transparent;
      border: none;
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
