<template>
    <div>
        <div class="trade-user-center ">
            <div class="user-left">
                <div class="avatar-box">
                    <div class="avatar-container four"><em class="name">{{t_name}}</em>
                        <div class="online-icon">
                            <p class=""></p>
                        </div>
                    </div>
                    <div class="avatar-desc"><span class="font16">{{name}}</span>
                        <p class="font-gray">UID：{{uid}}</p>
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
                                <p class="list-desc"><span class="desc-name m-desc-name">邮箱</span> <span class="auth-info m-auth-info" style="color: rgb(153, 153, 153);">未绑定</span>
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.huobi.br.com/zh-cn/user_center/uc_bind_email/?action=bindmail&amp;backurl=https%3A%2F%2Fotc.huobi.br.comzh-cn%2fUser%3ftype%3d1" class="isActive m-button">绑定</a>
                                </p>
                            </div>
                        </div>
                        <div class="user-info-list">
                            <p class="list-label"><i class="iconfont  icon-phone"></i> </p>
                            <div class="info-wrapper">
                                <p class="list-desc"><span class="desc-name m-desc-name">手机</span> <span class="auth-info m-auth-info" style="color: rgb(153, 153, 153);">未绑定</span>
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.huobi.br.com/zh-cn/user_center/uc_bind_email/?action=bindmail&amp;backurl=https%3A%2F%2Fotc.huobi.br.comzh-cn%2fUser%3ftype%3d1" class="isActive m-button">绑定</a>
                                </p>
                            </div>
                        </div>
                        <div class="user-info-list">
                            <p class="list-label"><i class="iconfont  icon-GA"></i> </p>
                            <div class="info-wrapper">
                                <p class="list-desc"><span class="desc-name m-desc-name">谷歌验证码</span> <span class="auth-info m-auth-info" style="color: rgb(153, 153, 153);">未绑定</span>
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.huobi.br.com/zh-cn/user_center/uc_bind_email/?action=bindmail&amp;backurl=https%3A%2F%2Fotc.huobi.br.comzh-cn%2fUser%3ftype%3d1" class="isActive m-button">绑定</a>
                                </p>
                            </div>
                        </div>
                        <div class="user-info-list">
                            <p class="list-label"><i class="iconfont  icon-login_password"></i> </p>
                            <div class="info-wrapper">
                                <p class="list-desc"><span class="desc-name m-desc-name">登陆密码</span> <span class="auth-info m-auth-info" style="color: rgb(153, 153, 153);">未绑定</span>
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.huobi.br.com/zh-cn/user_center/uc_bind_email/?action=bindmail&amp;backurl=https%3A%2F%2Fotc.huobi.br.comzh-cn%2fUser%3ftype%3d1" class="isActive m-button">绑定</a>
                                </p>
                            </div>
                        </div>
                        <div class="user-info-list">
                            <p class="list-label"><i class="iconfont  icon-password-lock"></i></p>
                            <div class="info-wrapper">
                                <p class="list-desc"><span class="desc-name m-desc-name">资金密码</span> <span class="auth-info m-auth-info" style="color: rgb(153, 153, 153);">未绑定</span>
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.huobi.br.com/zh-cn/user_center/uc_bind_email/?action=bindmail&amp;backurl=https%3A%2F%2Fotc.huobi.br.comzh-cn%2fUser%3ftype%3d1" class="isActive m-button">绑定</a>
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
                                <p class="list-desc"><span class="desc-name m-desc-name">实名认证</span> <span class="auth-info m-auth-info" style="color: rgb(153, 153, 153);">未绑定</span>
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.huobi.br.com/zh-cn/user_center/uc_bind_email/?action=bindmail&amp;backurl=https%3A%2F%2Fotc.huobi.br.comzh-cn%2fUser%3ftype%3d1" class="isActive m-button">绑定</a>
                                </p>
                            </div>
                        </div>
                        <div class="user-info-list">
                            <p class="list-label"><i class="iconfont  icon-certification"></i> </p>
                            <div class="info-wrapper">
                                <p class="list-desc"><span class="desc-name m-desc-name">高级认证</span> <span class="auth-info m-auth-info" style="color: rgb(153, 153, 153);">未绑定</span>
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.huobi.br.com/zh-cn/user_center/uc_bind_email/?action=bindmail&amp;backurl=https%3A%2F%2Fotc.huobi.br.comzh-cn%2fUser%3ftype%3d1" class="isActive m-button">绑定</a>
                                </p>
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
                            <div class="has-no-payment">
                                <p class="font-gray">您暂时没有添加任何收款方式</p>
                                <p> <a @click="AddPaymentdialogVisible=true">点击添加收款方式</a></p>
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
    import {
        changePaymentStatus
    } from '../../api/user'
    export default {
        name: "tradeUserCenter",
        components: {
            addPaymentForm
        },
        data() {
            return {
                name: "TrumanGu",
                t_name: "T",
                uid: "12345678910",
                totalOrder: 19,
                monthDeal: 2,
                average_pass: 15,
                monthFinishRate: 90,
                registryDataTime: "2018-10-01 20:53:02",
                firstTradeDate: "2018-10-17 20:00:00",
                //   userPayment: [],
                AddPaymentdialogVisible: false,
                isActive: {},
                targetPaywayID: ''
            };
        },
        computed: {
            safeLevel() {
                return "低";
            },
            hasPayment() {
                if (this.$store.state.user.payway.length === 0) {
                    return false
                } else {
                    return true
                }
            },
            userPayment() {
                return this.$store.state.user.payway
            },
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
            }
        },
        created() {
            this.$store.dispatch("GetUserPayway");
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
                        }
                        .info-wrapper {
                            border-bottom: 1px solid hsla(0, 0%, 85%, 0.5);
                            width: 100%;
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
