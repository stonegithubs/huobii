<template>
    <div class="forget-password">
        <el-form :model="forgetForm" status-icon ref="forget-form" label-width="100px" label-position="top">
            <el-form-item label="手机号" prop="phone" :rules="[{ required: true, message: 'this field is required', trigger: 'blur' }]">
                <el-input type="text" v-model="forgetForm.phone" autocomplete="off">
                    <template slot="suffix" class="send-code">
                        <el-button style="background:transparent;border:none" :class="buttonColor" @click="sendCode" :disabled='timeRest === 60? false:true'>{{ timeRest===60? '':timeRest }}{{ buttonInner }}</el-button>
</template>
                </el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="idcode" :rules="[{ required: true, message: 'this field is required', trigger: 'blur' }]">
                <el-input type="text" v-model="forgetForm.idcode" autocomplete="off" />
            </el-form-item>
            <el-form-item label="姓氏" prop="familyName" :rules="[{ required: true, message: 'this field is required', trigger: 'blur' }]">
                <el-input type="text" v-model="forgetForm.familyName " autocomplete="off" />
            </el-form-item>
            <el-form-item label="名字" prop="givenName" :rules="[{ required: true, message: 'this field is required', trigger: 'blur' }]">
                <el-input type="text" v-model="forgetForm.givenName " autocomplete="off" />
            </el-form-item>
            <el-form-item label="新密码" prop="newpwd" :rules="[{ required: true, message: 'this field is required', trigger: 'blur' }]">
                <el-input type="password" v-model="forgetForm.newpwd " autocomplete="off" />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirm" :rules="[{ required: true, message: 'this field is required', trigger: 'blur' }]">
                <el-input type="password" v-model="forgetForm.confirm " autocomplete="off" />
            </el-form-item>
            <el-form-item label="验证码" prop="captcha" :rules="[{ required: true, message: 'this field is required', trigger: 'blur' }]">
                <el-input type="text" v-model="forgetForm.captcha" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="forget-button" type='primary' @click="handleSubmit('forget-form')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {
        forget
    } from "../../../api/security";
    import {
        sendCaptcha,
        getCaptcha
    } from "../../../api/user";
    export default {
        name: "forget-password",
        data() {
            return {
                timeRest: 60,
                isDisable: false,
                counter: {},
                forgetForm: {
                    phone: "",
                    idcode: "",
                    familyName: "",
                    givenName: "",
                    newpwd: "",
                    confirm: "",
                    captcha: ""
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
            handleSubmit(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let formData = new FormData();
                        formData.append("idcode", this.forgetForm.idcode);
                        formData.append("familyName", this.forgetForm.familyName);
                        formData.append("givenName", this.forgetForm.givenName);
                        formData.append("newpwd", this.forgetForm.newpwd);
                        formData.append("confirm", this.forgetForm.confirm);
                        formData.append("captcha", this.forgetForm.captcha);
                        forget(formData).then(response => {
                            if (response.content) {
                                //todo:验证码修复后继续
                                this.$notify.success(response.message)
                            } else {
                                console.log(response)
                            }
                        }).catch(error => {
                            console.log(error)
                        })
                    }
                });
            },
            sendCode() {
                // console.log('已经发送')
                let phone = new FormData();
                phone.append("phone", this.forgetForm.phone);
                sendCaptcha(phone).then(responese => {
                    setTimeout(() => {
                        getCaptcha(this.forgetForm.phone).then(responese1 => {
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
            }
        },
        created() {}
    }
</script>
<style lang='scss' scoped>
    .forget-password /deep/ {
        width: 600px;
        margin: auto;
        .ok-color {
            color: white
        }
        button:focus {
            outline: none
        }
        .send-code {
            background: transparent;
            border: none;
            border-radius: 0%;
            width: 26%;
            color: white;
             ::before {
                content: "|";
                margin-right: 30px;
                color: #1e2235;
            }
        }
        .el-form /deep/ {
            .forget-button {
                // height: 48px;
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
                box-sizing: border-box; // height: 48px;
                border: 1px solid #4e5b85;
                border-radius: 3px;
                font-size: 16px;
            }
        }
    }
</style>
