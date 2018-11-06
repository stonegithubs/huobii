<template>
  <el-form class="registry-form" ref="registryForm" :model="registryForm" :rules="rules" status-icon label-width="100px">
    <el-form-item label="国籍">
    <el-select v-model="registryForm.region" placeholder="请选择您的国籍">
      <el-option v-for="item in countryList" :label="item.enName+'    '+ item.name" :value="item.abbr" v-bind:key="item.id"  ></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="registryForm.phone" type="text" placeholder="手机号" autocomplete="off">
         <template slot="suffix">
            <el-button class="send-code" :class="buttonColor" @click="sendCode" :disabled='timeRest === 60? false:true'>{{ timeRest===60? '':timeRest }}{{ buttonInner }}</el-button>
          </template>
      </el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="registryForm.password" type="password" placeholder="请输入登录密码" autocomplete="off" />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirm">
      <el-input v-model="registryForm.confirm" type="password" placeholder="再次输入登录密码" autocomplete="off" />
    </el-form-item>
    <el-form-item label="验证码" prop="captcha">
      <el-input v-model="registryForm.captcha" type="text" placeholder="请输入验证码" autocomplete="off" @keyup.enter.native ="sendCode">
       
      </el-input>
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
import { sendCaptcha, getCaptcha } from "../../../api/user";
import { getCountry } from "../../../api/common";
import { setTimeout, setInterval, clearInterval, clearTimeout } from "timers";

export default {
  name: "registry-form",
  data() {
    let vallidatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registryForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    let checkPasswrod = (rule, value, callback) => {
      let reg = new RegExp(
        "^(?:(?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,\\.#%'\\+\\*\\-:;^_`].*))[,\\.#%'\\+\\*\\-:;^_`0-9A-Za-z]{8,30}$"
      );
      if (!reg.test(value)) {
        callback("密码不能低于8位且由字符、数字、字母构成");
      } else {
        callback();
      }
    };
    let captchaCheck = (rule, value, callback) => {
      if (value !== "") {
        callback();
      } else {
        callback("请输入验证码");
      }
    };
    return {
      // buttonInner:'点击发送验证码',
      timeRest: 60,
      isDisable: false,
      counter: {},
      checked: false,
      countryList: [],
      registryForm: {
        phone: "",
        password: "",
        confirm: "",
        region: "",
        captcha: ""
        // inviteCode: ''
      },
      rules: {
        phone: [{ require: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { require: true, validator: checkPasswrod, trigger: "change" }
          // todo:  密码的验证和后端保持一致  手机号正则暂时不需要 以后台为准
        ],
        confirm: [
          { require: true, validator: vallidatePassword, trigger: "blur" }
        ],
        captcha: [{ require: true, validator: captchaCheck, trigger: "blur" }]
        // inviteCode: [
        //   { require: false }
        // ]
      }
    };
  },
  computed: {
    buttonInner() {
      if (this.isDisable === true) {
        return "s 后重新发送";
      } else {
        return "点击发送验证码";
      }
    },
    buttonColor() {
      if (this.isDisable) {
        return "disabled-color";
      } else {
        return "ok-color";
      }
    }
  },
  methods: {
    sendCode() {
      // console.log('已经发送')
      let phone = new FormData();
      phone.append("phone", this.registryForm.phone);

      sendCaptcha(phone).then(responese => {
        setTimeout(() => {
          getCaptcha(this.registryForm.phone).then(responese1 => {
            this.$notify({
              title: "验证码",
              message: responese1.content,
              duration: 0
            });
          });
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
    handleRegionPhone(phone){
      for(let item of this.countryList){
        if(item.abbr === this.registryForm.region){
          phone ='+' +item.code+ phone
          // phone = '+'+phone
        }
      }
      return phone
    },
    doSubmit() {
      let regionPhone = this.handleRegionPhone(this.registryForm.phone)
      let form = new FormData();
      form.append("phone", regionPhone);
      form.append("password", this.registryForm.password);
      form.append("confirm", this.registryForm.confirm);
      form.append("captcha", this.registryForm.captcha);
      form.append("region", this.registryForm.region);

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
        this.$notify.warning("您必须同意用户协议");
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.counter);
  },
  created() {
    if (!localStorage.getItem("country")) {
      getCountry()
        .then(response => {
          if (response.code === "200") {
            localStorage.setItem("country", JSON.stringify(response.content));
          }
        })
        .catch(() => {});
    }
    this.countryList = JSON.parse(localStorage.getItem("country"));
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/custom-theme/theme";
.registry-form /deep/ {
  input {
    color: #61688a !important;
    background-color: #1e2235;
    // height: 48px;
    width: 100%;
    border: 1px solid;
  }
  .el-select {
    width: 100%;
  }
  .disabled-color {
    color: #606266 !important;
  }
  .el-input.is-active .el-input__inner,
  .el-input__inner:focus {
    color: $hbColor !important;
    border-color: $hbHoverColor;
  }

  .el-checkbox__input.is-checked + .el-checkbox__label {
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
  .send-code {
    background: transparent;
    border: none;
    border-radius: 0%;
    color: #7a98f7;
    ::before {
      content: "|";
      margin-right: 30px;
      color: #1e2235;
    }
  }
  .el-button--primary:focus,
  .el-button--primary:hover {
    background-color: #a0b6f9;
    border-color: #a0b6f9;
  }
}
</style>
