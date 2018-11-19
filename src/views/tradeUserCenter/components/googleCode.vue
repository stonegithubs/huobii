<template>
    <div class="google-code">
        <div class="mod_bd">
            <div class="ga_detail">谷歌验证器是一款动态口令工具，工作原理类似短信动态验证。绑定后每30s生成一个动态验证码，验证码可用于登录、提现、修改安全设置等操作的安全验证。</div>
            <hr>
            <div class="ga_text"><label class="border-rad">1</label><span>&nbsp;下载谷歌验证器APP</span>
                <p>iOS用户登录App Store搜索“Authenticator”下载。<br>安卓用户登录应用商店或使用手机浏览器搜索“谷歌验证器”下载。</p><a class="tag" rel="noopener noreferrer" target="_blank" href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8"><i class="hb_icon_apple"></i> App Store</a>
                <a class="tag" target="_blank" href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"><i class="hb_icon_googleplay"></i> Google Play</a>
            </div>
            <hr>
            <div class="ga_qr form_set m_30" id="ga_qr" data-msg="复制成功">
                <div class="ga_text m_0"><label class="border-rad">2</label><span>&nbsp;在谷歌验证器中添加密钥并备份</span>
                    <p>打开谷歌验证器，扫描下方二维码或手动输入下述密钥添加验证令牌。<br><em>密钥用于手机更换或遗失时找回谷歌验证器，绑定前请务必将下述密钥备份保存。</em></p>
                </div>
                <div class="qr_code">
                    <div id="qrcode" ref="qrcode"></div>
                    <p>密钥</p>
                    <span id="copy_ga_code" :value="qrCode" class="link">{{qrCode}}</span>
                    <a @click="copy" class="cp" style="color:#357ce1" data-clipboard-target="#copy_ga_code">复制</a>
                </div>
            </div>
            <hr>
            <div class="ga_text m_0">
                <form method="post" onsubmit="return!1" action="" id="form_ga_bind" class="form_set m_30" autocomplete="off"><label class="border-rad">3</label><span>&nbsp;输入谷歌验证器中6位验证码</span>
                    <div class="group group_ga" id="verify_ga"><label class="label p_t_30">谷歌验证码</label>
                        <div class="content">
                            <el-form :model="googleForm" ref="googleForm" class="demo-dynamic">
                                <el-form-item label-position='top' prop="code" :rules="[{ required: true, message: '请输入谷歌验证码', trigger: 'blur' }]">
                                    <el-input v-model="googleForm.code"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <div class="submit"><button @click="handleSubmit" type="submit" class="btn btn_submit">绑定</button></div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import qrCode from 'qrcodejs2'
    import Clipboard from 'clipboard'
    import {
        getGoogleSecret,
        GoogleAuth,
        bindGoogleAuth
    } from '../../../api/user'
    export default {
        name: "google-code",
        data() {
            return {
                qrCode: "",
                googleForm: {
                    code: ''
                }
            }
        },
        methods: {
            qrcode() {
                let qrcode = new qrCode('qrcode', {
                    width: 130, // 设置宽度，单位像素
                    height: 130, // 设置高度，单位像素
                    text: this.qrCode // 设置二维码内容或跳转地址
                })
            },
            copy() {
                let clipboard = new Clipboard('.cp')
            },
            handleSubmit() {
                this.$refs["googleForm"].validate((valid) => {
                    if (valid) {
                        bindGoogleAuth(this.googleForm.code).then(res => {
                            this.$notify.success('绑定成功')
                            location.reload()
                        }).catch(err => {
                            this.$notify.error('绑定失败' + err.message)
                        })
                    }
                });
            }
        },
        created() {
            getGoogleSecret().then(res => {
                if (res.code === '200') {
                    this.qrCode = res.content
                    this.qrcode()
                }
            })
            //  this.$nextTick(() => {
            // })
        }
    };
</script>

<style lang="scss" scoped>
    .google-code {
        .mod_bd {
            border-radius: 0 0 3px 3px;
            padding: 1px 30px 30px;
            .ga_detail {
                color: #9194a4;
                font-weight: 150;
                font-size: 12px;
                line-height: 20px;
            }
            .ga_text {
                width: 100%;
                font-weight: 150;
            }
            .ga_qr {
                font-weight: 150;
                padding-bottom: 40px;
            }
            .ga_text {
                width: 100%;
                color: #9194a4;
            }
            .ga_text span {
                width: 100%;
                font-size: 14px;
                line-height: 70px;
                color: #232a4a;
            }
            .tag {
                background-color: #7a98f7;
                text-align: center;
                width: 140px;
                margin: 35px 30px 8px 0;
                height: 40px;
                line-height: 40px;
                border-radius: 3px;
                color: #fff;
                display: inline-block;
                text-decoration: none;
                font-size: 16px;
                outline: none;
            }
            em {
                color: #f55858;
            }
            .qr_code {
                display: flex; // align-items: center;
                justify-content: space-around;
                align-items: flex-end;
                margin-top: 25px;
                p,
                span {
                    // margin-bottom: 0;
                }
            }
            .ga_detail,
            .ga_text {
                font-weight: 150;
            }
            .m_30 .submit {
                padding-top: 20px;
                button {
                    background-color: #357ce1;
                    color: #fff;
                    width: 100%;
                }
            }
            .group .label {
                font-size: 12px;
                height: 22px;
                display: block;
            }
            .group .content {
                min-height: 68px;
                clear: both;
            }
            .ga_text .border-rad {
                background-color: #d1d3df;
                color: black;
                display: inline-block;
                width: 20px;
                height: 20px;
                line-height: 20px;
                border-radius: 50%;
                text-align: center;
                font-size: 14px;
            }
        }
    }
</style>
