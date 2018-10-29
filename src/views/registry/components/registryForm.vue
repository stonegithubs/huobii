<template>
  <el-form ref="registryForm" :model="registryForm" :rules="rules" status-icon label-width="100px" class="demo-ruleForm">
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="registryForm.phone" type="text" placeholder="手机号" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="registryForm.password" type="password" placeholder="请输入登录密码" autocomplete="off" />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirm">
      <el-input v-model="registryForm.confirm" type="password" placeholder="再次输入登录密码" autocomplete="off" />
    </el-form-item>
    <el-form-item label="验证码" prop="captcha">
      <el-input v-model="registryForm.captcha" type="text" placeholder="请输入验证码" autocomplete="off" @keyup.enter.native ="handleRegistry('registryForm')"/>
    </el-form-item>
    <!--   <el-form-item label="邀请码" prop="inviteCode">
      <el-input v-model="registryForm.inviteCode" type="text" placeholder="您的邀请码（选填）" autocomplete="off" />
    </el-form-item> -->
    <el-form-item>
      <el-checkbox v-model="checked">我已阅读并同意 <router-link :to="{ name: 'agreement'}">《用户协议》</router-link>
      </el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleRegistry('registryForm')">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { set_rec_code } from "../../../api/login";

export default {
  name: "registry-form",
  data() {
    let vallidatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registryForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    let checkPasswrod = (rule, value, callback) => {
      let reg = new RegExp("^(?:(?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,\\.#%'\\+\\*\\-:;^_`].*))[,\\.#%'\\+\\*\\-:;^_`0-9A-Za-z]{8,30}$") ;
      if (!reg.test(value)) {
        callback("密码不能低于8位且由字符、数字、字母构成")
      } else {
        callback()
      }
    }
    let captchaCheck = (rule, value, callback) => {
      if (value !== '') {
        callback()
      } else {
        callback('请输入验证码')
      }
    }
    return {
      checked: false,
      registryForm: {
        phone: '',
        password: '',
        confirm: '',
        captcha: '',
        // inviteCode: ''
      },
      rules: {
        phone: [
          { require: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { require: true, validator: checkPasswrod, trigger: 'change' }
            // todo:  密码的验证和后端保持一致  手机号正则暂时不需要 以后台为准
        ],
        confirm: [
          { require: true, validator: vallidatePassword, trigger: 'blur' }

        ],
        captcha: [
          { require: true, validator: captchaCheck, trigger: 'blur' }

        ],
        // inviteCode: [
        //   { require: false }
        // ]
      }
    }
  },

  methods: {
    doSubmit() {
      let form = new FormData();
      form.append('phone',this.registryForm.phone)
      form.append('password',this.registryForm.password)
      form.append('confirm',this.registryForm.confirm)
      form.append('captcha',this.registryForm.captcha)
      this.$store.dispatch('Register', form).then(response => {
        if (response.content === true) {
          // this.$router.goBack();
          this.$notify.success(response.message)
          this.$router.push('/login')
        } else {
          this.$notify.error(response.message)
        }
      }).catch(err => {
        this.$notify.error(err.message)
      })
    },
    handleRegistry(formName) {
      if (this.checked) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.doSubmit()
          } else {
            return false;
          }
        });
      } else {
        this.$notify.warning('您必须同意用户协议')
      }
    },
  }
}

</script>
<style lang="scss">
@import "../../../assets/custom-theme/theme";

.el-input__inner {
  color: #61688a !important;
  background-color: #1e2235;
  height: 48px;
  width: 100%;
  border: 1px solid
}

.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  color: $hbColor !important;
  border-color: $hbHoverColor;
}

.el-checkbox__input.is-checked+.el-checkbox__label {
  color: #7a98f7;
}

.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #7a98f7;
  border-color: #7a98f7;
}

.el-button--primary {
  background-color: #7a98f7;
  border-color: #7a98f7;
  width: 180px;
}

.el-checkbox {
  color: #c7cce6;
}

.el-button--primary:focus,
.el-button--primary:hover {
  background-color: #a0b6f9;
  border-color: #a0b6f9;
}

</style>
