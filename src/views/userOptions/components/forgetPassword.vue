<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ $t('login.forgetPwd') }}</span>
    </div>
    <el-form ref="forget-form" :model="forgetForm" status-icon label-width="100px" label-position="top">
      <el-form-item :label="$t('login.account')" :rules="[{ required: true, message: 'This field is required', trigger: 'blur' }]" prop="phone">
        <el-input v-model="forgetForm.phone" type="text" autocomplete="off"/>
      </el-form-item>
     
 
      <el-form-item :label="$t('userOptions.newPwd')" :rules="[{ required: true, message: 'this field is required', trigger: 'blur' }]" prop="newpwd">
        <el-input v-model="forgetForm.newpwd " type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('userOptions.confirmNewPwd')" :rules="[{ required: true, message: 'this field is required', trigger: 'blur' }]" prop="confirm">
        <el-input v-model="forgetForm.confirm " type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('login.country')">
      <el-select @change="countryChange" v-model="registryForm.region" :placeholder="$t('login.countryTip')">
        <el-option v-for="item in getCountry" :label="item.enName+'    '+ item.name" :value="item.abbr" :key="item.id"/>
      </el-select>
    </el-form-item>
      <el-form-item>
        <el-button class="forget-button" type="primary" @click="beforeSubmit('forget-form')" >{{ $t('confirm') }}</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :before-close="handleClose" :title="$t('userOptions.yourCaptcha')" :visible.sync="captchaVisible" width="300px">
      <el-input v-model="forgetForm.captcha" type="text" autocomplete="off"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit('forget-form')">{{ $t('confirm') }}</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import {
  forget
} from '../../../api/security'
import {
  getCountry
} from '../../../api/common'
import {
  sendCaptcha1,
  getCaptcha,
} from '../../../api/user'
export default {
  name: 'ForgetPassword',
  data() {
    return {
      timeRest: 60,
      isDisable: false,
      counter: {},
      cuntryCode: '+86',
      forgetForm: {
        phone: '',
        idcode: '',
        country: '',
        familyName: '',
        givenName: '',
        newpwd: '',
        confirm: '',
        captcha: ''
      },
      captchaVisible: false
    }
  },
  computed: {

  },
  created() {
     if (getCountry.length === 0) {
      this.$store.dispatch('getCountryList')
    }
  },
  methods: {
    beforeSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.captchaVisible = true
          const phone = this.forgetForm.phone
          const country = this.forgetForm.country
          sendCaptcha1(phone, country).then(res => {
            // TODO: 接收验证码需要删除
            getCaptcha(phone, country)
              .then(res => {
                this.$notify.success(res.content)
              })
          })
          // console.log()
        }
      })
    },
    countryChange(VAL){
      this.cuntryCode = this.getCountryCodeByAbbr(val)
    },
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const formData = new FormData()
          formData.append('country', this.forgetForm.country)
          formData.append('phone', this.forgetForm.phone)                   
          formData.append('newpwd', this.forgetForm.newpwd)
          formData.append('confirm', this.forgetForm.confirm)
          // formData.append('captcha', this.forgetForm.captcha)
          forget(formData).then(response => {
            if (response.content) {
              // todo:验证码修复后继续
              this.$notify.success(response.message)
              this.$router.go(-1)
            } else {
              // console.log(response)
            }
          }).catch(error => {
            // console.log(error)
          })
        }
      })
    },
    sendCode() {
      // console.log('已经发送')
      const phone = new FormData()
      phone.append('phone', this.forgetForm.phone)
      sendCaptcha(phone).then(responese => {
        setTimeout(() => {
          getCaptcha(this.forgetForm.phone).then(responese1 => {
            this.$notify({
              title: '验证码',
              message: responese1.content,
              duration: 0
            })
          })
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
    handleClose(done) {
      this.$confirm(this.$t('confirmToClose'))
        .then(_ => {
          this.captchaVisible = false
          done()
        })
        .catch(_ => {})
    },
    computed: {
       ...mapGetters([
      'getCountryCodeByAbbr',
      'getCountry'
      ]),
    }
  }
}
</script>
<style lang='scss' scoped>
    // .forget-password /deep/ {
    //     width: 600px;
    //     margin: auto;
    //     .ok-color {
    //         color: white
    //     }
    //     button:focus {
    //         outline: none
    //     }
    //     .send-code {
    //         background: transparent;
    //         border: none;
    //         border-radius: 0%;
    //         width: 26%;
    //         color: white;
    //          ::before {
    //             content: "|";
    //             margin-right: 30px;
    //             color: #1e2235;
    //         }
    //     }
    //     .el-form /deep/ {
    //         .forget-button {
    //             // height: 48px;
    //             border-radius: 3px;
    //             border: none;
    //             min-width: 200px;
    //             font-size: 16px;
    //             width: 100%;
    //             background-color: #7a98f7;
    //             &:hover {
    //                 background-color: #a0b6f9;
    //             }
    //         }
    //         .el-form-item__label {
    //             color: #61688a;
    //         }
    //         .el-input__inner {
    //             background-color: #1e2235;
    //             color: #c7cce6;
    //             box-sizing: border-box; // height: 48px;
    //             border: 1px solid #4e5b85;
    //             border-radius: 3px;
    //             font-size: 16px;
    //         }
    //     }
    // }
</style>
