<template>
    <div>
        <div class="trade-user-center ">
            <div class="user-left">
                <div class="avatar-box">
                    <div class="avatar-container four"><em class="name">{{userInfo.name}}</em>
                        <div class="online-icon">
                            <p class=""></p>
                        </div>
                    </div>
                    <div class="avatar-desc"><span class="font16">{{userInfo.name.substring(0,1)}}</span>
                        <p class="font-gray">UID：{{userInfo.id}}</p>
                    </div>
                </div>
                <div class="trade-times">
                    <p>总成单：<span>{{totalOrder}}次</span></p>
                    <p>30日成单：<span>{{monthDeal}}次</span></p>
                    <p>平均放行：<span>{{average_pass}}分钟</span></p>
                    <p>30日完成率：<span>{{monthFinishRate}}%</span></p>
                </div>
                <div class="font-gray"><span>本账号于{{registryDataTime}}注册 , 首次交易在{{firstTradeDate}}</span></div>
            </div>
            <div class="user-right">
                <div class="user-info-container">
                    <el-card class="box-card" :body-style="{ padding: '30px'}">
                        <div slot="header" class="clearfix">
                            <span style="font-size: 18px; font-weight:700"> 账户与安全</span>
                            <p style="float: right; ">安全等级：{{ safeLevel }}</p>
                        </div>
                        <div class="user-info-list">
                            <p class="list-label"><i class="iconfont  icon-email"></i></p>
                            <div class="info-wrapper">
                                <p class="list-desc">
                                    <span class="desc-name m-desc-name">邮箱</span>
                                    <span v-if="hasEmail" class="auth-info m-auth-info" style="color:black">已绑定</span>
                                    <a v-if="hasEmail" @click="unbindButton">解绑</a>
                                    <span v-if="!hasEmail" class="auth-info m-auth-info">未绑定</span>
                                    <router-link v-if="!hasEmail" :to="{ name: 'bind_email'}">绑定</router-link>
                                </p>
                            </div>
                        </div>
                        <div class="user-info-list">
                            <p class="list-label"><i class="iconfont  icon-phone"></i> </p>
                            <div class="info-wrapper">
                                <p class="list-desc"><span class="desc-name m-desc-name">手机</span> <span class="auth-info m-auth-info" style="color:black">已绑定</span>
                                </p>
                            </div>
                        </div>
                        <!-- todo:谷歌验证器未完成 -->
                        <div class="user-info-list">
                            <p class="list-label"><i class="iconfont  icon-GA"></i> </p>
                            <div class="info-wrapper">
                                <p class="list-desc"><span class="desc-name m-desc-name">谷歌验证码</span> <span class="auth-info m-auth-info" style="color: rgb(153, 153, 153);">未绑定</span>
                                    <a @click="googleVisiable = true" rel="noopener noreferrer" class="isActive m-button">绑定</a>
                                </p>
                            </div>
                            <el-dialog :modal-append-to-body="false"  title="绑定谷歌验证器" :visible.sync="googleVisiable" width="650px" :before-close="handleClose">
                                <google-code></google-code>
                                <span slot="footer" class="dialog-footer">
                                </span>
                            </el-dialog>
                            
                        </div>
                        <div class="user-info-list">
                            <p class="list-label"><i class="iconfont  icon-login_password"></i> </p>
                            <div class="info-wrapper">
                                <p class="list-desc"><span class="desc-name m-desc-name">登陆密码</span>
                                    <span class="auth-info m-auth-info" style="color: rgb(153, 153, 153);">******</span>
                                    <router-link :to="{name: 'change_password'}" class="isActive m-button">修改</router-link>
                                </p>
                            </div>
                        </div>
                        <div class="user-info-list">
                            <p class="list-label"><i class="iconfont  icon-password-lock"></i></p>
                            <div class="info-wrapper">
                                <p class="list-desc"><span class="desc-name m-desc-name">资金密码</span>
                                    <span v-if="hasTradePwd" class="auth-info m-auth-info" style="color: rgb(153, 153, 153);">******</span>
                                    <router-link v-if="hasTradePwd" :to="{ name: 'change_trade_password'}" class="isActive m-button">更改</router-link>
                                    <span v-if="!hasTradePwd" class="auth-info m-auth-info" style="color: rgb(153, 153, 153);">未设置</span>
                                    <router-link v-if="!hasTradePwd" :to="{ name: 'change_trade_password'}" class="isActive m-button">设置</router-link>
                                </p>
                            </div>
                        </div>
                    </el-card>
                    <el-card class="box-card" :body-style="{ padding: '30px'}">
                        <div slot="header" class="clearfix">
                            <span style="font-size: 18px; font-weight:700"> 身份认证</span>
                            <p class="font14 font-gray" style="margin-bottom: 0;margin-top: 15px;">请如实填写您的身份信息，一经认证不可修改</p>
                        </div>
                        <div class="user-info-list">
                            <p class="list-label"><i class="iconfont  icon-name_certification"></i></p>
                            <div class="info-wrapper">
                                <p class="list-desc"><span class="desc-name m-desc-name">实名认证</span>
                                    <span v-if="this.$store.state.user.verifyInfo.auditFlag ==='2'" class="auth-info m-auth-info" style="color: rgb(153, 153, 153);">未通过</span>
                                    <span v-if="this.$store.state.user.verifyInfo===null" class="auth-info m-auth-info" style="color: rgb(153, 153, 153);">未认证</span>
                                    <router-link :to="{ name: 'verify' }" v-if="this.$store.state.user.verifyInfo===null||this.$store.state.user.verifyInfo.auditFlag ==='2'" class="isActive m-button">认证</router-link>
                                    <span v-if="this.$store.state.user.verifyInfo.auditFlag " class="auth-info m-auth-info" style="color:black">{{this.$store.state.user.verifyInfo.surName}} {{this.$store.state.user.verifyInfo.cardNo.slice(0,-4)}}****</span>
                                    <span v-if="hasVerify" class="isActive m-button">已认证</span>
                                </p>
                            </div>
                        </div>
                        <div class="user-info-list">
                            <p class="list-label"><i class="iconfont  icon-certification"></i> </p>
                            <div class="info-wrapper">
                                <p class="list-desc"><span class="desc-name m-desc-name">高级认证</span>
                                    <span v-if=" auditFlag === '0' || auditFlag === '1' ||auditFlag === '2'" class="auth-info m-auth-info" style="color: rgb(153, 153, 153);">未认证</span>
                                    <span v-if="auditFlag === '4'" class="auth-info m-auth-info" style="color:black">已认证</span>
                                    <span v-if="auditFlag === '3'" class="auth-info m-auth-info" style="color:black">审核中</span>
                                    <a v-if="auditFlag !== '4'" class="isActive m-button" @click="adv_verifyDialogVisible = true">认证</a>
                                    <!-- <span v-if="hasAdvVerify" class="isActive m-button">已认证</span> -->
                                </p>
                                <el-dialog :modal="true" title="高级认证" :visible.sync="adv_verifyDialogVisible" :lock-scroll="true" center :modal-append-to-body="false">
                                    <div style="text-align: center;">
                                        <div class="dialog-info">
                                            <!-- <div style="margin: 20px 0;font-weight: 700;"><span>交易额超过单笔 {{ normalUserMax }}{{ this.currencyType }} 或累计 {{ normalUserTotal }}{{this.currencyType}} 需进行高级认证！</span></div> -->
                                            <el-upload :file-list="adv_fileList" :on-change="handleChange" :on-remove="handleRemove" ref="upload" action="" list-type="picture" :limit="3" :auto-upload="false">
                                                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                                <el-button size="small" type="primary" @click="handleAdvancedVerify">点击上传</el-button>
                                                <div slot="tip" class="el-upload__tip">请上传身份证正反面照片和手持身份证的一段视频</div>
                                            </el-upload>
                                        </div>
                                    </div>
                                </el-dialog>
                            </div>
                        </div>
                    </el-card>
                    <!-- todo:实名认证后才可以添加收款方式 -->
                    <el-card class="box-card user-payment" :body-style="{ padding: '30px'}">
                        <div slot="header" class="clearfix">
                            <span style="font-size: 18px; font-weight:700"> 收款方式</span>
                            <p class="font14 font-gray" style="margin-bottom: 0;margin-top: 15px;">请务必使用您本人的实名账户，被激活的收款方式将在交易时向买方展示，最多激活3种</p>
                        </div>
                        <div v-if="hasPayment">
                            <div v-for="(item, index) in userPayment" v-bind:key="index" class="user-info-list">
                                <p class="list-label">
                                    <div class="info-wrapper">
                                        <p class="list-desc"><span class="desc-name m-desc-name">{{getPaywayByID(item.paywayId || '-1').payName}}</span>
                                            <span class="auth-info m-auth-info" style="color: rgb(153, 153, 153);">{{item.pram1 === "null"? '':item.pram1}} {{item.pram2 === "null"? '':item.pram2}} {{item.pram3=== "null"? '':item.pram3}} {{item.pram4 === "null"? '':item.pram4}}</span>
                                            <span class="isActive m-button">
                                                                            <el-switch active-text='on' inactive-text='off'	 :id="item.paywayId"  @click.native="init(item.paywayId)" v-model="getUserPaywayByID(item.paywayId).statusFlag" active-value="1" inactive-value="0" @change="handleChangePayStatus">
                                                                            </el-switch>
                                                                        </span>
                                        </p>
                                    </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="has-no-payment font14">
                                <p class="font-gray" style="margin-top:20px">您暂时没有添加任何收款方式</p>
                                <p> <a @click="AddPaymentdialogVisible=true" style="color:#638bd4;">点击添加收款方式</a></p>
                            </div>
                        </div>
                        <addPaymentForm :isShown="AddPaymentdialogVisible"></addPaymentForm>
                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import addPaymentForm from "./components/addPaymentForm";
    import googleCode from "./components/googleCode";
    import VueRecaptcha from 'vue-recaptcha';
    import {
        changePaymentStatus,
        submitAdvanceVerify
    } from '../../api/user'
    import {
        unBindEmail
    } from '../../api/verify_code';
    export default {
        name: "tradeUserCenter",
        components: {
            addPaymentForm,googleCode
        },
        data() {
            return {
                totalOrder: 19,
                monthDeal: 2,
                average_pass: 15,
                monthFinishRate: 90,
                registryDataTime: "2018-10-01 20:53:02",
                firstTradeDate: "2018-10-17 20:00:00",
                //   userPayment: [],
                AddPaymentdialogVisible: false,
                adv_verifyDialogVisible: false,
                isActive: {},
                targetPaywayID: '',
                auditFlag: this.$store.state.user.verifyInfo.auditFlag,
                adv_fileList: [],
                googleVisiable: false,
            };
        },
        computed: {
            safeLevel() {
                return "低";
            },
            userInfo(){
                return this.$store.state.user.userInfo
            },
            hasPayment() {
                return this.$store.state.user.payway.length === 0 || this.$store.state.user.payway==={}
            },
            userPayment() {
                return this.$store.state.user.payway
            },
            hasEmail() {
                return !!this.$store.state.user.userInfo.email
                // return true
            },
            hasTradePwd() {
                return this.$store.state.trade.hasTradePwd
            },
            hasVerify() {
                let flag = this.$store.state.user.verifyInfo.auditFlag
                if (flag === '0' || flag === '2') {
                    return false
                }
                return true
            },
            hasAdvVerify() {
                if (this.$store.state.user.verifyInfo.auditFlag === '4') {
                    return true
                }
            }
        },
        methods: {
            getPaywayByID(id) {
                for (let item of this.$store.state.Common.supportPayway) {
                    if (item.id === id) {
                        return item
                    }
                }
                return {
                    payName: 'unknown',
                    statusFlag: '0'
                }
            },
            getUserPaywayByID(id) {
                for (let item of this.$store.state.user.payway) {
                    if (item.paywayId == id) {
                        return item
                    }
                }
            },
            init(id) {
                // console.log('fuck')
                this.targetPaywayID = id
            },
            handleChangePayStatus(newValue) {
                this.$nextTick(() => {
                    let formData = new FormData()
                    formData.append('id', this.targetPaywayID)
                    formData.append('status', newValue)
                    changePaymentStatus(formData).then(response => {
                        this.$store.dispatch("GetUserPayway");
                    })
                })
            },
            unbindButton() {
                this.$alert('确定解绑邮箱？', '解绑邮箱', {
                    confirmButtonText: '确定',
                    callback: action => {
                        unBindEmail().then(response => {
                            this.$notify.success("邮件已发送，请注意查收")
                        }).catch(_ => {
                            console.log(_)
                        })
                    }
                })
            },
            handleChange(file) {
                this.adv_fileList.push(file)
            },
            handleRemove(file, fileList) {
                fileList.pop(file)
            },
            handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
            handleAdvancedVerify() {
                if (this.adv_fileList.length == 3) {
                    let reader1 = new FileReader()
                    reader1.readAsDataURL(this.adv_fileList[0].raw)
                    let reader2 = new FileReader()
                    reader2.readAsDataURL(this.adv_fileList[1].raw)
                    let reader3 = new FileReader()
                    reader3.readAsDataURL(this.adv_fileList[2].raw)
                    const formData = new FormData()
                    formData.append('img1', reader1.result)
                    formData.append('img2', reader2.result)
                    formData.append('video', reader3.result)
                    submitAdvanceVerify(formData).then(response => {
                        if (response.code === '200') {
                            this.$notify.success(response.message)
                        } else {
                            this.$notify.error(response.message)
                        }
                    }).catch(_ => {})
                } else {
                    this.$notify.error('请上传两张身份证照片和一段手持身份证的视频')
                }
            }
        },
        created() {
            this.$store.dispatch("GetUserPayway");
            this.$store.dispatch("GetUserInfo");
            this.$store.dispatch("GetVerifyInfo");
            this.$store.dispatch("GetTradePwd");
            // console.log(this.getUserPaywayByID('2').paywayId)
        }
    };
</script>

<style lang='scss' scoped>
    .trade-user-center /deep/ {
        .noo {
            display: none;
        }
        display: flex;
        justify-content: space-between;
        margin-top: 80px;
        @media (min-width: 992px) {
            width: 1200px;
            margin-left: auto;
            margin-right: auto;
        }
        @media (max-width: 768px) {
            flex-direction: column;
            padding: 16px 24px;
            width: 100%;
            margin-top: 40px;
        }
        .user-left {
            width: 240px;
            .avatar-box {
                display: flex;
                align-items: center;
                padding-bottom: 24px;
                border-bottom: 1px solid hsla(0, 0%, 85%, 0.5);
                .avatar-container {
                    width: 40px;
                    height: 40px;
                    display: flex;
                     flex-shrink:0;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50%;
                    position: relative;
                }
                .avatar-desc {
                    margin-left: 16px;
                    font-size: 14px;
                    color: #333;
                }
            }
            .trade-times {
                margin: 24px 0;
                padding-bottom: 24px;
                border-bottom: 1px solid hsla(0, 0%, 85%, 0.5);
                p {
                    line-height: 2.4;
                    color: #999;
                    margin-bottom: 0;
                    span {
                        color: #333;
                    }
                }
            }
        }
        .user-right {
            .user-info-container {
                .box-card {
                    width: 816px;
                    margin-bottom: 30px;
                    .user-info-list {
                        display: flex;
                        align-items: center;
                        padding: 14px 0 0;
                        color: #999;
                        .list-label {
                            margin-right: 10px;
                                margin-bottom: 8px;
                        }
                        .info-wrapper {
                            border-bottom: 1px solid hsla(0, 0%, 85%, 0.5);
                            width: 100%;
                            padding-bottom: 12px;
                            .list-desc {
                                display: flex;
                                flex-grow: 2;
                                flex-direction: row;
                                justify-content: space-between;
                                .desc-name {
                                    color: #999;
                                    width: 180px;
                                }
                                .auth-info {
                                    display: inline-block;
                                    width: 50%;
                                    text-align: left;
                                    flex-grow: 2;
                                }
                                a {
                                    color: #638bd4;
                                    cursor: pointer;
                                    width: 50px;
                                    text-align: right;
                                }
                            }
                        }
                    }
                    .has-no-payment {
                        // display: flex;
                        // align-content: center;
                        // justify-content: flex-start;
                        // align-items: center;
                        height: 100px;
                        text-align: center;
                        p {
                            display: inline-box;
                        }
                    }
                    .upload-demo {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        align-content: center;
                        .el-upload--picture-card {
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
</style>
