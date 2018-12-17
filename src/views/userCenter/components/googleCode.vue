<template>
  <div class="google-code">
    <div class="mod_bd">
      <div class="ga_detail">{{$t('userInfo.googleInfo1')}}</div>
      <hr>
      <div class="ga_text"><label class="border-rad">1</label><span>&nbsp;{{$t('userInfo.info2')}}</span>
        <p>{{$t('userInfo.info3')}}<br>{{$t('userInfo.info4')}}</p><a class="tag" rel="noopener noreferrer" target="_blank" href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8"><i class="hb_icon_apple"/> App Store</a>
        <a class="tag" target="_blank" href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"><i class="hb_icon_googleplay"/> Google Play</a>
      </div>
      <hr>
      <div id="ga_qr" class="ga_qr form_set m_30" data-msg="复制成功">
        <div class="ga_text m_0"><label class="border-rad">2</label><span>&nbsp;{{$t('userInfo.info5')}}</span>
          <p>{{$t('userInfo.info6')}}<br><em>{{$t('userInfo.info7')}}</em></p>
        </div>
        <div class="qr_code">
          <div id="qrcode" ref="qrcode"/>
          <p>{{$t('userInfo.info8')}}</p>
          <span id="copy_ga_code" :value="qrCode" class="link">{{ qrCode }}</span>
          <a class="cp" style="color:#357ce1" data-clipboard-target="#copy_ga_code" @click="copy">{{$t('userInfo.info9')}}</a>
        </div>
      </div>
      <hr>
      <div class="ga_text m_0">
        <form id="form_ga_bind" method="post" onsubmit="return!1" action="" class="form_set m_30" autocomplete="off"><label class="border-rad">3</label><span>&nbsp;{{$t('userInfo.info11')}}</span>
          <div id="verify_ga" class="group group_ga"><label class="label p_t_30">{{$t('userInfo.googleCaptcha')}}</label>
            <div class="content">
              <el-form ref="googleForm" :model="googleForm" class="demo-dynamic">
                <el-form-item :rules="[{ required: true, message: $t('userInfo.info10'), trigger: 'blur' }]" label-position="top" prop="code">
                  <el-input v-model="googleForm.code"/>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="submit"><button type="submit" class="btn btn_submit" @click="handleSubmit">{{$t('userInfo.bind')}}</button></div>
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
  bindGoogleAuth,
  getGoogleUrl
} from '../../../api/user'
import { setTimeout } from 'timers';
export default {
  name: 'GoogleCode',
  data() {
    return {
      qrCode: '',
      googleForm: {
        code: ''
      },
      qrCodeUrl: ''
    }
  },
  created() {
    getGoogleSecret().then(res => {
      if (res.code === '200') {
        this.qrCode = res.content
      }
    })
    getGoogleUrl().then(res => {
      if (res.code === '200') {
        this.qrCodeUrl = res.content
        this.qrcode()
      }
    })

    //  this.$nextTick(() => {
    // })
  },
  methods: {
    qrcode() {
      setTimeout(()=>{
        const qrcode = new qrCode('qrcode', {
        width: 130, // 设置宽度，单位像素
        height: 130, // 设置高度，单位像素
        text: this.qrCodeUrl // 设置二维码内容或跳转地址
      })
      },1)
      
    },
    copy() {
      const clipboard = new Clipboard('.cp')
    },
    handleSubmit() {
      this.$refs['googleForm'].validate((valid) => {
        if (valid) {
          bindGoogleAuth(this.googleForm.code).then(res => {
            this.$notify.success($t('userInfo.info12'))
            // this.rou
            location.reload()
          }).catch(err => {
            this.$notify.error($t('userInfo.info13') + err.message)
          })
        }
      })
    }
  }
}
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
                    height: 35px;
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
