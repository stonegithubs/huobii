<template>
  <div class="animated bounceInLeft verify-info">
    <el-card :body-style="{ padding: '30px'}" class="box-card" width="500">
      <div slot="header" class="clearfix">
        <span style="font-size: 18px; font-weight:700">{{$t('userInfo.verify')}}</span>
        <p
          class="font14 font-gray"
          style="margin-bottom: 0;margin-top: 15px;"
        >{{$t('userInfo.verifyTip')}}</p>
      </div>
      <div class="user-info-list">
        <p class="list-label">
          <i class="iconfont icon-name_certification"/>
        </p>
        <div class="info-wrapper">
          <p class="list-desc">
            <span class="desc-name m-desc-name">{{$t('userInfo.verify')}}</span>
            <span
              v-if="auditFlag ==='2'"
              class="auth-info m-auth-info"
              style="color: rgb(153, 153, 153);"
            >{{$t('userInfo.vFailed')}}</span>
            <span
              v-if="getVerifyInfo===false"
              class="auth-info m-auth-info"
              style="color: rgb(153, 153, 153);"
            >{{$t('userInfo.notVer')}}</span>
            <span
              v-if="getVerifyInfo "
              class="auth-info m-auth-info"
              style="color:black"
            >{{ getVerifyInfo? getVerifyInfo.surName+' '+getVerifyInfo.name :'' }}&nbsp;&nbsp;{{ getVerifyInfo? getVerifyInfo.cardNo.slice(0,-4) +'****':'' }}</span>
            <span
              v-if="getVerifyInfo===false||auditFlag ==='2'||auditFlag ==='0'"
              class="auth-info m-auth-info"
              style="color:black"
            >
              <router-link
                :to="{ name: 'verify' }"
                class="isActive m-button"
                style="float: right;"
              >{{$t('userInfo.doVerify')}}</router-link>
            </span>
            <span
              v-if="!getVerifyInfo && auditFlag !=='2' && auditFlag !=='0'"
              class="isActive m-button"
            >{{$t('userInfo.verified')}}</span>
          </p>
        </div>
      </div>
      <div class="user-info-list">
        <p class="list-label">
          <i class="iconfont icon-certification"/>
        </p>
        <div class="info-wrapper">
          <p class="list-desc">
            <span class="desc-name m-desc-name">{{$t('userInfo.advVer')}}</span>
            <!-- <span
                    v-if=" auditFlag === '0' || auditFlag === '1' ||auditFlag === '2'"
                    class="auth-info m-auth-info"
                    style="color: rgb(153, 153, 153);"
            >{{$t('userInfo.notVer')}}</span>-->
            <span
              v-if="auditFlag === '4'"
              class="auth-info m-auth-info"
              style="color:black"
            >{{$t('userInfo.verified')}}</span>
            <span v-if="auditFlag < '3'" class="auth-info m-auth-info" style="color:black">
              {{$t('userInfo.notVer')}}
              <!-- {{$t('userInfo.pending')}} -->
            </span>
            <span
              v-if="auditFlag === '3'"
              class="auth-info m-auth-info"
              style="color:black"
            >{{$t('userInfo.pending')}}</span>
            <!-- <span
                    v-if="auditFlag === '4'"
                    class="auth-info m-auth-info"
                    style="color:black"
                  >
                  {{$t('userInfo.verified')}}
            </span>-->
            <span
              v-if="auditFlag === '5'"
              class="auth-info m-auth-info"
              style="color:black"
            >{{$t('userInfo.vFailed')}}</span>
            <a
              v-if="auditFlag !== '4'"
              class="isActive m-button"
              @click="adv_verifyDialogVisible = true"
            >{{$t('userInfo.doVerify')}}</a>
            <!-- <span v-if="hasAdvVerify" class="isActive m-button">已认证</span> -->
          </p>
          <el-dialog
            v-loading="advLoading"
            :modal="true"
            :append-to-body="true"
            :visible.sync="adv_verifyDialogVisible"
            :modal-append-to-body="false"
            width="500px"
            :title="$t('userInfo.advVer')"
            center
          >
            <div style="text-align: center;">
              <div class="dialog-info">
                <!-- <div style="margin: 20px 0;font-weight: 700;"><span>交易额超过单笔 {{ normalUserMax }}{{ this.currencyType }} 或累计 {{ normalUserTotal }}{{this.currencyType}} 需进行高级认证！</span></div> -->
                <el-upload
                  ref="upload"
                  action
                  :file-list="adv_fileList"
                  :on-change="handleChangeas"
                  :on-remove="handleRemovea"
                  :limit="3"
                  :auto-upload="false"
                  list-type="picture"
                >
                  <el-button
                    slot="trigger"
                    size="small"
                    type="primary"
                  >{{$t('userInfo.chooseFile')}}</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="handleAdvancedVerify"
                  >{{$t('userInfo.clickToUpload')}}</el-button>
                  <div slot="tip" class="el-upload__tip">{{$t('userInfo.advTip')}}</div>
                </el-upload>
              </div>
            </div>
          </el-dialog>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { submitAdvanceVerify } from "@/api/user";
import { parseTime, isImage, isMp4 } from "@/utils/index";
import { qrCodeUpLoad, imgsUpload, videoUpLoad } from "@/api/cms";
import { mapGetters } from "vuex";
export default {
  name: "verify-info",
  data() {
    return {
      advLoading: false,
      adv_verifyDialogVisible: false,
      adv_fileList: [],
      advFrom: {
        img1: null,
        img2: null,
        video: null
      },
      qrFile: []
    };
  },

  computed: {
    ...mapGetters(["getVerifyInfo"]),
    auditFlag() {
      if (this.getVerifyInfo === false) {
        return "0";
      } else {
        return this.getVerifyInfo.auditFlag;
      }
    },
    parseTime(a) {
      return parseTime(a);
    },
    hasAdvVerify() {
      if (this.verifyInfo == false) {
        return false;
      } else {
        if (this.verifyInfo["auditFlag"] === "4") {
          return true;
        }
      }
    }
  },
  methods: {
    // ============tools======================
    isImage(qrCodeFile) {
      return isImage(qrCodeFile);
    },
    isMp4(file) {
      return isMp4(file);
    },
    handleClose(done) {
      this.$confirm(this.$t("confirm"))
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // ============tools======================

    //===================高级认证start==================

    handleChangeas(file, fileList) {
      if (!(this.isImage(file.raw) || this.isMp4(file.raw))) {
        // console.log("格式错误");
        fileList.pop();
        this.$notify.error(this.$t("userInfo.wrongType"));
        return false;
      } else {
        // 是图片或者视频
        this.advLoading = true;
        this.adv_fileList.push(file);
        let rawFrom = new FormData();
        rawFrom.append("m", file.raw);
        if (this.isImage(file.raw)) {
          // 是文件则调用文件接口
          imgsUpload(rawFrom)
            .then(res => {
              this.advLoading = false;
              if (res && res.code === "200") {
                if (this.advFrom.img1 === null) {
                  // 一号图片位置空缺
                  this.advFrom.img1 = res.content;
                } else {
                  // 二号图片位置空缺
                  this.advFrom.img2 = res.content;
                }
              } else {
                // 返回失败 弹栈
                this.$notify.error(this.$t("userInfo.upLoadFailed"));
                this.adv_fileList.pop();
                fileList.pop();
              }
            })
            .catch(_ => {
              // 异常 弹栈
              this.advLoading = false;
              fileList.pop();
              this.adv_fileList.pop();
              this.$notify.error(this.$t("userInfo.upLoadFailed"));
            });
        } else if (this.isMp4(file.raw)) {
          // 是视频则调用视频接口
          videoUpLoad(rawFrom).then(res => {
            if (res && res.code === "200") {
              this.advFrom.video = res.content;
            } else {
              this.$notify.error(this.$t("userInfo.upLoadFailed"));
              this.adv_fileList.pop();
              fileList.pop();
            }
          });
        }
      }
    },
    handleRemovea(file, fileList) {
      let index = 0;
      for (let item of this.adv_fileList) {
        console.log(item.url);
        if (item.url == file.url) {
          this.adv_fileList.splice(index, 1);
        }
        index++;
      }
    },
    handleAdvancedVerify() {
      if (this.adv_fileList.length !== 3) {
        this.$notify.error(this.$t("userInfo.verifyInfo"));
        return false;
      } else {
        this.advLoading = true;
        formData.append("img1", this.advFrom.img1);
        formData.append("img2", this.advFrom.img2);
        formData.append("video", this.advFrom.video);
        submitAdvanceVerify(formData)
          .then(response => {
            this.advLoading = false;
            if (response && response.code === "200") {
              this.$notify.success(this.$t("userInfo.advSubmitSuc"));
            } else {
              this.$notify.error(this.$t("userInfo.advSubmitFailed"));
            }
          })
          .catch(_ => {
            this.$notify.error(this.$t("userInfo.advSubmitFailed"));
            this.advLoading = false;
          });
      }
      this.adv_verifyDialogVisible = false;
    },

    //===================高级认证end==================

    handleClose(done) {
      this.$confirm(this.$t("confirm"))
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>
