<template>
    <el-form label-position='top' ref="loginForm" :model="loginForm" status-icon label-width="100px" class="login-form">
    <el-form-item :label="$t('login.country')" prop="region" :rules="[{ required: true, message:$t('login.countryIsRequired'), trigger: 'blur' }]">
            <el-select v-model="loginForm.region" :placeholder="$t('login.countryTip')">
                <el-option v-for="item in getCountry" :label="item.enName+'    '+ item.name" :value="item.abbr" v-bind:key="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item :label="$t('login.account')" prop="phone" :rules="[{ required: true, message: $t('login.accountIsRequired'), trigger: 'blur' }]">
            <el-input v-model="loginForm.phone" type="text" :placeholder="$t('login.phoneNumber')" autocomplete="off">
                <template slot="suffix">
                    <el-button class="send-code" :class="buttonColor" @click="msendCode" :disabled='timeRest === 60? false:true'>{{ timeRest===60? '':timeRest }}{{ buttonInner }}</el-button>
                </template>
             </el-input>
    </el-form-item>
    <el-form-item :label="$t('captcha')" prop="code" :rules="[{ required: true, message: $t('login.captchaIsRequired'), trigger: 'blur' }]">
      <el-input v-model="loginForm.code" type="text" :placeholder="$t('login.captchaTip')" autocomplete="off" />
    </el-form-item>
     <el-form-item>
      <vue-recaptcha ref="invisibleRecaptcha" size='Invisible' :sitekey="getSiteKey" @verify="getVerify"></vue-recaptcha>
    </el-form-item>
    <el-form-item>
      <el-button class="login-btn" type="primary" @click="getVerify">{{$t('login.login')}}</el-button>
      <div style="float:right;margin-top: 24px;margin-right: 116px;">
        <router-link :to="{ name: 'forget_password'}">{{$t('login.forgetPwd')}}</router-link>
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
        sendCode,
        getCode
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
                    code: ''
                },
                timeRest: 60,
                counter: {},
                isDisable: false,
                isVerify: false,
                mycode: '',
                // dialogTableVisible: false,
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
                                });
                            }
                        }).catch(err => {
                            this.$alert(err.message, this.$t('login.failed'), {
                                confirmButtonText: this.$t('confirm'),
                                callback: action => {
                                    window.location.reload()
                                }
                            });
                        })
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
                let phone = new FormData();
                let regionPhone = this.getCountryCodeByAbbr(this.loginForm.region) + this.loginForm.phone
                phone.append("phone", regionPhone);
                phone.append("country", this.loginForm.region)
                sendCode(phone).then(responese => {
                    setTimeout(() => {
                        getCode(this.loginForm.region, regionPhone).then(responese1 => {
                            if (responese1 && responese1.code == '200') {
                                this.$notify({
                                    title: this.$t('captcha'),
                                    message: responese1.content,
                                    duration: 0
                                });
                            } else {
                                this.$notify.error()
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
