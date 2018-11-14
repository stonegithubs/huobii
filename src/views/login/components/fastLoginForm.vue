<template>
    <el-form label-position='top' ref="loginForm" :model="loginForm" status-icon label-width="100px" class="login-form">
        <el-form-item label="国籍" prop="region" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
            <el-select v-model="loginForm.region" placeholder="请选择您的国籍">
                <el-option v-for="item in getCountry" :label="item.enName+'    '+ item.name" :value="item.abbr" v-bind:key="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
            <el-input v-model="loginForm.phone" type="text" placeholder="手机号" autocomplete="off">
                <template slot="suffix">
                <el-button class="send-code" :class="buttonColor" @click="sendCode" :disabled='timeRest === 60? false:true'>{{ timeRest===60? '':timeRest }}{{ buttonInner }}</el-button>
</template>
      </el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="code" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
      <el-input v-model="loginForm.code" type="text" placeholder="请输入验证码" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-dialog title='are you robot?' :visible.sync="dialogTableVisible" width='302px'>
        <vue-recaptcha ref="invisibleRecaptcha" size='Invisible' :sitekey="getSiteKey" @verify="getVerify"></vue-recaptcha>
      </el-dialog>
    </el-form-item>
    <el-form-item>
      <el-button class="login-btn" type="primary" @click="dialogTableVisible = true">登录</el-button>
      <div style="float:right;margin-top: 24px;margin-right: 116px;">
        <router-link :to="{ name: 'forget_password'}">忘记密码</router-link>
      </div>
    </el-form-item>
  </el-form>
</template>
<script>
    import VueRecaptcha from 'vue-recaptcha';
    import {
        mapGetters
    } from 'vuex'
    import {
        sendCaptcha,
        getCaptcha
    } from "../../../api/user";
    import {
        setTimeout,
        setInterval,
        clearInterval,
        clearTimeout
    } from "timers";
    export default {
        name: "fast-login-form",
        components: {
            VueRecaptcha
        },
        data() {
            return {
                loginForm: {
                    region: '',
                    phone: '',
                    captcha: ''
                },
                timeRest: 60,
                counter: {},
                isDisable: false,
                isVerify: false,
                dialogTableVisible: false,
            }
        },
        computed: {
            ...mapGetters([
                'getCountry',
                'getCountryCodeByAbbr',
                'getSiteKey'
            ]),
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
            },
        },
        created() {
            if (sessionStorage.getItem('Authorization')) {
                this.$router.back()
            }
        },
        methods: {
            getVerify(verifyCode) {
                this.$refs['loginForm'].validate(valid => {
                    if (valid) {
                        let formData = new FormData()
                        formData.append('phone', this.getCountryCodeByAbbr(this.loginForm.region) + this.loginForm.username)
                        formData.append('password', this.loginForm.password)
                        formData.append('country', this.loginForm.region)
                        formData.append('captcha', verifyCode)
                        this.$store.dispatch('LoginByUsername', formData).then(responese => {
                            if (responese && responese.code === '200') {
                                this.$router.push({
                                    name: 'index'
                                })
                                this.$message.success(responese.message)
                            } else {
                                location.reload()
                                this.$notify.error(responese.message)
                            }
                        }).catch(err => {
                            this.$message.error(err.message)
                        })
                    }
                })
            },
            sendCode() {
                if(this.loginForm.region === ''){
                    this.$notify.error('请选择国籍')
                    return false
                }
                if(this.loginForm.phone === ''){
                    this.$notify.error('请输入您的手机号')
                    return false
                }
                console.log('已经发送')
                let phone = new FormData();
                let regionPhone = this.getCountryCodeByAbbr(this.loginForm.region) + this.loginForm.phone
                phone.append("phone", regionPhone);
                //todo: 快速登陆验证码接口待定 暂时搁置
                sendCaptcha(phone).then(responese => {
                  setTimeout(() => {
                    getCaptcha(regionPhone).then(responese1 => {
                      if (responese1 && responese1.code == '200') {
                        this.$notify({
                          title: "验证码",
                          message: responese1.content,
                          duration: 0
                        });
                      } else {
                        this.$notify.error('发生了未知错误')
                      }
                    }).catch(_ => {});
                  }, 4000);
                });
                this.isDisable = true
                this.timeRest--;
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
        },
        beforeDestroy() {
            clearInterval(this.counter);
        },
    }
</script>
<style lang="scss" scoped>
    @import "../../../assets/custom-theme/theme";
    .login-form /deep/ {
        width: 520px;
        .disabled-color {
            color: #606266 !important;
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
            background-color: #357ce1;
            margin-top: 20px;
            color: #fff;
            border: 1px solid #357ce1;
            width: 200px;
        }
        .el-input__inner {
            color: #61688a;
            background-color: #1e2235; // height: 48px;
            width: 100%;
            border: 1px solid
        }
        .el-input.is-active .el-input__inner,
        .el-input__inner:focus {
            color: $hbColor;
            border-color: $hbHoverColor;
        }
    }
</style>
