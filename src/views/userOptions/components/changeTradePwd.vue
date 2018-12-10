<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{$t('userOptions.setTradePwd')}}</span>
    </div>
    <el-form :model="tradePwdForm" status-icon :rules="rules" ref="tradePwdForm" label-width="100px" label-position="top">
      <el-form-item :label="$t('userOptions.tradePwd')" prop="current">
        <el-input type="password" v-model="tradePwdForm.current" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('userOptions.newPwd')" prop="newpwd">
        <el-input type="password" v-model="tradePwdForm.newpwd" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('userOptions.confirmNewPwd')" prop="confirm">
        <el-input type="password" v-model="tradePwdForm.confirm" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="beforeSubmit('tradePwdForm')">{{$t('confirm')}}</el-button>
      </el-form-item>
    </el-form>
    <el-dialog width='300px' :before-close="handleClose" :title="$t('userOptions.yourCaptcha')" :visible.sync="captchaVisible">
      <el-input type="password" v-model="tradePwdForm.captcha" autocomplete="off" />
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('tradePwdForm')">{{$t('confirm')}}</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
  import {
    trade_pwd
  } from "../../../api/security";
  import {
    sendCaptcha,
    getCaptcha,
    sendCode,
    getCode 
  } from "../../../api/user";
  export default {
    name: "change-trade-pwd",
    data() {
      let vallidatePassword = (rule, value, callback) => {
        if (value === "") {
          callback(new Error(this.$t('login.confirmPwd')));
        } else if (value !== this.tradePwdForm.newpwd) {
          callback(new Error(this.$t('login.pwdNotConsistent')));
        } else {
          callback();
        }
      };
      return {
        tradePwdForm: {
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
            trigger: "change"
          }, {
            min: 6,
            max: 8,
            message: this.$t('userOptions.tradePwdTip')
          }],
          confirm: [{
            required: true,
            validator: vallidatePassword,
            trigger: "blur"
          }],
        },
      }
    },
    computed: {},
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let formData = new FormData()
            formData.append('current', this.tradePwdForm.current)
            formData.append('newpwd', this.tradePwdForm.newpwd)
            formData.append('confirm', this.tradePwdForm.confirm)
            formData.append('captcha', this.tradePwdForm.captcha)
            trade_pwd(formData).then(response => {
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
      },
      beforeSubmit(formName) {
        this.$refs[formName].validate((valid) => {
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
            // console.log()
          }
        })
      },
      handleClose() {
        this.$confirm(this.$t('confirmToClose'))
          .then(_ => {
            this.captchaVisible = false
            done();
          })
          .catch(_ => {});
      }
    },
    created() {
      
    }
  }
</script>
<style lang='scss' scoped>
  .change-trade-pwd {
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
