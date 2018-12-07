<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{$t('userOptions.changePwd')}}</span>
    </div>
    <el-form label-position='top' :model="passwordForm" status-icon :rules="rules" ref="passwordForm" label-width="100px">
      <el-form-item :label="$t('userOptions.currentPwd')" prop="current">
        <el-input type="password" v-model="passwordForm.current" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('userOptions.newPwd')" prop="newpwd">
        <el-input type="password" v-model="passwordForm.newpwd" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('userOptions.confirmNewPwd')" prop="confirm">
        <el-input type="password" v-model="passwordForm.confirm" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="beforeSubmit('passwordForm')">{{$t('userOptions.confirmTochange')}}</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :title="$t('userOptions.yourCaptcha')" :visible.sync="captchaVisible" width="300px" :before-close="handleClose">
      <!-- <el-form-item :label="$t('userOptions.currentPwd')" prop="captcha"> -->
        <el-input type="text" v-model="passwordForm.captcha" autocomplete="off" />
      <!-- </el-form-item> -->
       <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('passwordForm')">{{$t('confirm')}}</el-button>
      </span>
    </el-dialog>
  </el-card>
  <!-- // <div class="change-password-form">
          
        // </div> -->
</template>
<script>
  import {
    login_pwd
  } from "../../../api/security";
  import {
    sendCode,
    getCode
  } from "../../../api/user";
  export default {
    name: "change-password-form",
    data() {
      let vallidatePassword = (rule, value, callback) => {
        if (value === "") {
          callback(new Error(this.$t('login.confirmPwd')));
        } else if (value !== this.passwordForm.newpwd) {
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
            trigger: "blur"
          }],
          newpwd: [{
            required: true,
            validator: checkPasswrod,
            trigger: "change"
          }],
          confirm: [{
            required: true,
            validator: vallidatePassword,
            trigger: "blur"
          }],
        },
      }
    },
    methods: {
      handleClose() {
        this.$confirm(this.$t('confirmToClose'))
          .then(_ => {
            this.captchaVisible = false;
            done();
          })
          .catch(_ => {});
      },
      beforeSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.captchaVisible = true
            let formData = new FormData();
            formData.append('phone', this.$store.state.user.userInfo.mobile)
            formData.append('country', this.$store.state.user.userInfo.countryCode)
            sendCode(formData).then(res => {
              //TODO: 接收验证码需要删除
              getCode(this.$store.state.user.userInfo.countryCode, this.$store.state.user.userInfo.mobile)
                .then(res => {
                  this.$notify.success(res.content)
                })
            })
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let formData = new FormData()
            formData.append('current', this.passwordForm.current)
            formData.append('newpwd', this.passwordForm.newpwd)
            formData.append('confirm', this.passwordForm.confirm)
            formData.append('captcha', this.passwordForm.captcha)
            login_pwd(formData).then(response => {
              if (response.content) {
                this.$notify.success(response.message)
                this.$router.reload()
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
