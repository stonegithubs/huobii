<template>
  <div>
    <div class="trade-user-center">
      <div class="user-left">
        <div class="avatar-box">
          <div class="avatar-container four">
            <em class="name">{{ userInfo.name.substring(0,1) }}</em>
            <div class="online-icon">
              <p class/>
            </div>
          </div>
          <div class="avatar-desc" @click="changeNickname()">
            <span class="font16" v-if="userInfo.name !== '-'">{{ userInfo.name }}</span>
            <span class="font16" v-else>{{$t('userInfo.clickToChangeName')}}</span>
            <p class="font-gray">UID:{{ userInfo.id }}</p>
          </div>
        </div>
        <div class="trade-times">
          <!-- TODO: 要数据 -->
          <p>
            {{$t('userInfo.dealTotal')}}:
            <span>0 {{$t('userInfo.times')}}</span>
          </p>
          <p>
            {{$t('userInfo.monthDeal')}}:
            <span>0 {{$t('userInfo.times')}}</span>
          </p>
          <p>
            {{$t('userInfo.avgPassTime')}}
            <span>0 {{$t('userInfo.min')}}</span>
          </p>
          <p>
            {{$t('userInfo.finishRate')}}
            <span>0 %</span>
          </p>
        </div>
        <!-- <div class="font-gray">
          <span>{{$t('userInfo.tip1')}}{{ userInfo.updateDate === null?"":parseTime(userInfo.updateDate/10000) }}{{$t('userInfo.tip1_1')}} , {{$t('userInfo.tip2')}}{{ userInfo.loginDate || parseTime(userInfo.loginDate/10000) }}</span>
        </div>-->
      </div>
      <div class="user-right">
        <div class="user-info-container">
          <secure-info></secure-info>
          <verify-info></verify-info>
          <payway-info></payway-info>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import addPaymentForm from "./components/addPaymentForm";
// import googleCode from "./components/googleCode";
import VueRecaptcha from "vue-recaptcha";
import { parseTime, isImage, isMp4 } from "../../utils/index";
import {
  changePaymentStatus,
  submitAdvanceVerify,
  addPay,
  getPayway,
  isBindGoogle,
  change_nickname
} from "../../api/user";
import { qrCodeUpLoad, imgsUpload, videoUpLoad } from "@/api/cms";
import { unBindEmail } from "../../api/verify_code";
import { mapGetters } from "vuex";
import secureInfo from './components/secureInfo'
import verifyInfo from './components/verifyInfo'
import paywayInfo from './components/paywayInfo'
export default {
  name: "user-center",
  components: {
    secureInfo,verifyInfo,paywayInfo
    // googleCode
  },
  // data() {
  //   return {
      
  //     animate:{
  //       // one:'animated bounceInRight',
  //       two:'animated bounceInLeft',
  //       three: '',
  //       four: '',
  //       five: ''
  //     },
  //     advLoading: false,
  //     isBind: false,
  //     AddPaymentdialogVisible: false,
  //     adv_verifyDialogVisible: false,
  //     targetPaywayID: "",
  //     // auditFlag: this.$store.state.user.verifyInfo===null? '':auditFlag,
  //     adv_fileList: [],
  //     googleVisiable: false,
  //     advFrom: {
  //       img1: null,
  //       img2: null,
  //       video: null
  //     },
  //     currentPayway: {
  //       pram1: null,
  //       pram2: null,
  //       pram3: null,
  //       pram4: null
  //       // qrcode: null
  //     },
  //     hasQrCode: false,
  //     // qrcode:'',
  //     addPaymenForm: {
  //       id: "", // bank表id
  //       pram1: "",
  //       pram2: "",
  //       pram3: "",
  //       pram4: ""
  //       // qrcode: '',
  //     },
  //     qrFile: []
  //   };
  // },
  // mounted(){
  //    window.addEventListener("scroll", this.handleScroll);
  // },
  // computed: {
  //   ...mapGetters(["getVerifyInfo"]),
  //   hasPayment() {
  //     return (
  //       this.$store.state.user.payway.length == !0 ||
  //       this.$store.state.user.payway !== {}
  //     );
  //   },
    computed:{
      userInfo() {
        return this.$store.state.user.userInfo
      }
},
  //   userPayment() {
  //     return this.$store.state.user.payway;
  //   },
  //   hasEmail() {
  //     return !!this.$store.state.user.userInfo.email;
  //     // return true
  //   },
  //   hasTradePwd() {
  //     return this.$store.state.trade.hasTradePwd;
  //   },

  //   parseTime(a) {
  //     return parseTime(a);
  //   },
  //   hasAdvVerify() {
  //     if (this.verifyInfo == false) {
  //       return false;
  //     } else {
  //       if (this.verifyInfo["auditFlag"] === "4") {
  //         return true;
  //       }
  //     }
  //   },
  //   getID() {
  //     return this.addPaymenForm.id;
  //   },
  //   hhshown() {
  //     return this.AddPaymentdialogVisible;
  //   }
  // },
  created() {
    if (!this.$store.state.user.token) {
      this.$router.push({ name: "login" });
    }
    this.$store.dispatch("GetUserInfo");
    this.$store.dispatch("GetVerifyInfo");
    this.$nextTick(() => {
      this.$store.dispatch("GetUserPayway");
      this.$store.dispatch("GetTradePwd");
    });
  },
  // methods: {
  //   handleScroll(){
  //     var scrollTop =
  //       window.pageYOffset ||
  //       document.documentElement.scrollTop ||
  //       document.body.scrollTop;
  //     if(scrollTop > 210){
  //         this.animate.three = 'animated bounceInRight'
  //     }
  //   },
  //   getPaywayByID(id) {
  //     for (const item of this.$store.state.Common.supportPayway) {
  //       if (item.id === id) {
  //         return item;
  //       }
  //     }
  //     return {
  //       payName: "unknown",
  //       statusFlag: "0"
  //     };
  //   },
  //   changeNickname() {
  //     this.$prompt(this.$t("userInfo.nickNameTip"), {
  //       confirmButtonText: this.$t("confirm"),
  //       cancelButtonText: this.$t("canceled"),
  //       inputPattern: /^.{3,10}$/,
  //       inputErrorMessage: this.$t("userInfo.changeRule")
  //     }).then(nickName => {
  //       if (nickName.action === "confirm") {
  //         change_nickname(nickName.value)
  //           .then(res => {
  //             this.$store.dispatch("GetUserInfo");
  //             if (res && res.code === "200") {
  //               this.$message({
  //                 type: "success",
  //                 message: this.$t("changeSuccess")
  //               });
  //             }
  //           })
  //           .catch(_ => {
  //             this.$notify.error(this.$t("changeFailed"));
  //           });
  //       }
  //     });
  //   },
  //   getUserPaywayByID(id) {
  //     for (const item of this.$store.state.user.payway) {
  //       if (item.paywayId == id) {
  //         return item;
  //       }
  //     }
  //   },
  //   init(id) {
  //     // console.log('fuck')
  //     this.targetPaywayID = id;
  //   },
  //   handleChangePayStatus(newValue) {
  //     this.$nextTick(() => {
  //       const formData = new FormData();
  //       formData.append("payWayId", this.targetPaywayID);
  //       formData.append("status", newValue);
  //       changePaymentStatus(formData).then(response => {
  //         this.$store.dispatch("GetUserPayway");
  //       });
  //     });
  //   },
  //   unbindButton() {
  //     this.$alert(
  //       this.$t("userInfo.confirmUnbind"),
  //       this.$t("userInfo.unbindEmail"),
  //       {
  //         confirmButtonText: this.$t("userInfo.confirmUnbind"),
  //         callback: action => {
  //           if (action == "confirm") {
  //             unBindEmail()
  //               .then(response => {
  //                 this.$notify.success(this.$t("userInfo.emailSent"));
  //               })
  //               .catch(_ => {});
  //           } else {
  //             return false;
  //           }
  //         }
  //       }
  //     );
  //   },
  //   // ============tools======================
  //   isImage(qrCodeFile) {
  //     return isImage(qrCodeFile);
  //   },
  //   isMp4(file) {
  //     return isMp4(file);
  //   },
  //   handleClose(done) {
  //     this.$confirm(this.$t("confirm"))
  //       .then(_ => {
  //         done();
  //       })
  //       .catch(_ => {});
  //   },
  //   // ============tools======================

  //   //===================高级认证start==================

  //   handleChangeas(file, fileList) {
  //     if (!(this.isImage(file.raw) || this.isMp4(file.raw))) {
  //       // console.log("格式错误");
  //       fileList.pop();
  //       this.$notify.error(this.$t("userInfo.wrongType"));
  //       return false;
  //     } else {
  //       // 是图片或者视频
  //       this.advLoading = true;
  //       this.adv_fileList.push(file);
  //       let rawFrom = new FormData();
  //       rawFrom.append("m", file.raw);
  //       if (this.isImage(file.raw)) {
  //         // 是文件则调用文件接口
  //         imgsUpload(rawFrom)
  //           .then(res => {
  //             this.advLoading = false;
  //             if (res && res.code === "200") {
  //               if (this.advFrom.img1 === null) {
  //                 // 一号图片位置空缺
  //                 this.advFrom.img1 = res.content;
  //               } else {
  //                 // 二号图片位置空缺
  //                 this.advFrom.img2 = res.content;
  //               }
  //             } else {
  //               // 返回失败 弹栈
  //               this.$notify.error(this.$t("userInfo.upLoadFailed"));
  //               this.adv_fileList.pop();
  //               fileList.pop();
  //             }
  //           })
  //           .catch(_ => {
  //             // 异常 弹栈
  //             this.advLoading = false;
  //             fileList.pop();
  //             this.adv_fileList.pop();
  //             this.$notify.error(this.$t("userInfo.upLoadFailed"));
  //           });
  //       } else if (this.isMp4(file.raw)) {
  //         // 是视频则调用视频接口
  //         videoUpLoad(rawFrom).then(res => {
  //           if (res && res.code === "200") {
  //             this.advFrom.video = res.content;
  //           } else {
  //             this.$notify.error(this.$t("userInfo.upLoadFailed"));
  //             this.adv_fileList.pop();
  //             fileList.pop();
  //           }
  //         });
  //       }

        
  //     }
  //   },
  //   handleRemovea(file, fileList) {
  //     let index = 0;
  //     for (let item of this.adv_fileList) {
  //       console.log(item.url);
  //       if (item.url == file.url) {
  //         this.adv_fileList.splice(index, 1);
  //       }
  //       index++;
  //     }
  //   },
  //   handleAdvancedVerify() {
  //     if (this.adv_fileList.length !== 3) {
  //       this.$notify.error(this.$t("userInfo.verifyInfo"));
  //       return false;
  //     } else {
  //       this.advLoading = true;
  //       formData.append("img1", this.advFrom.img1);
  //       formData.append("img2", this.advFrom.img2);
  //       formData.append("video", this.advFrom.video);
  //       submitAdvanceVerify(formData)
  //         .then(response => {
  //           this.advLoading = false;
  //           if (response && response.code === "200") {
  //             this.$notify.success(this.$t("userInfo.advSubmitSuc"));
  //           } else {
  //             this.$notify.error(this.$t("userInfo.advSubmitFailed"));
  //           }
  //         })
  //         .catch(_ => {
  //           this.$notify.error(this.$t("userInfo.advSubmitFailed"));
  //           this.advLoading = false;
  //         });
  //     }
  //     this.adv_verifyDialogVisible = false;
  //   },

  //   //===================高级认证end==================

  //   // ================== 支付方式添加begin========================

  //   handleAddPayment() {
  //     console.log("1");
  //     let qrCodeUrl = "";
  //     if (this.hasQrCode) {
  //       // 判断是否需要qrcpde
  //       let qrCodeFile = this.qrFile[0].raw;
  //       // 检查文件后缀
  //       if (!this.isImage(qrCodeFile)) {
  //         this.$notify.error("请添加图片");
  //         return false;
  //       }
  //       // 上传文件 拉回地址
  //       console.log("2");
  //       let fileForm = new FormData();
  //       fileForm.append("paymentImg", qrCodeFile);
  //       qrCodeUpLoad(fileForm)
  //         .then(res => {
  //           console.log("3");

  //           if (res && res.code === "200") {
  //             qrCodeUrl = res.content;
  //             // 拉回成功 添加到addform中
  //             this.doAddPayment(qrCodeUrl);
  //           } else {
  //             // 文件上传失败
  //             this.$notify.error(this.$t("userInfo.addFailed"));
  //             return false;
  //           }
  //         })
  //         .catch(_ => {
  //           console.log("4");
  //           this.$notify.error(this.$t("userInfo.addFailed"));
  //           return false;
  //         });
  //     } else {
  //       //  不需要qrcode直接上传
  //       this.doAddPayment(qrCodeUrl);
  //     }
  //   },
  //   doAddPayment(qrCodeUrl) {
  //     const formData = new FormData();
  //     formData.append("id", this.addPaymenForm.id);
  //     formData.append("pram1", this.addPaymenForm.pram1);
  //     formData.append("pram2", this.addPaymenForm.pram2);
  //     formData.append("pram3", this.addPaymenForm.pram3);
  //     formData.append("pram4", this.addPaymenForm.pram4);
  //     if (this.hasQrCode) {
  //       if (qrCodeUrl === "") {
  //         return false;
  //       }
  //       formData.append("qrcode", qrCodeUrl);
  //     }
  //     addPay(formData)
  //       .then(response => {
  //         if (response && response.code === "200") {
  //           this.$notify.success(this.$t("userInfo.addSuccess"));
  //         } else {
  //           this.$notify.success(this.$t("userInfo.addFailed"));
  //         }
  //         this.AddPaymentdialogVisible = false;
  //         this.$store.dispatch("GetUserPayway");
  //       })
  //       .catch(_ => {
  //         this.$notify.error(this.$t("shitHappens"));
  //       });
  //   },
  //   handleChange(file) {
  //     this.qrFile.push(file);
  //     // this.addPaymenForm.qrcode = file.raw;
  //     document
  //       .getElementsByClassName("el-upload--picture-card")[0]
  //       .classList.add("noo");
  //   },
  //   handleRemove(file, fileList) {
  //     document
  //       .getElementsByClassName("el-upload--picture-card")[0]
  //       .classList.remove("noo");
  //     this.qrFile = [];
  //     // this.addPaymenForm.qrcode = ''
  //   },
  //   // ================== 支付方式添加end========================
  //   handleClose(done) {
  //     this.$confirm(this.$t("confirm"))
  //       .then(_ => {
  //         done();
  //       })
  //       .catch(_ => {});
  //   }
  // },

  // watch: {
  //   addPaymenForm: {
  //     handler(val, oldval) {
  //       for (const item of this.$store.state.Common.supportPayway) {
  //         if (val.id === item.id) {
  //           this.currentPayway.pram1 = item.pram1;
  //           this.currentPayway.pram2 = item.pram2;
  //           this.currentPayway.pram3 = item.pram3;
  //           this.currentPayway.pram4 = item.pram4;
  //           if (item.qrcode === "1") {
  //             this.hasQrCode = true;
  //           } else {
  //             this.hasQrCode = false;
  //           }
  //         }
  //       }
  //     },
  //     deep: true
  //   },
  //   getID(newValue, oldval) {
  //     (this.addPaymenForm.pram1 = null),
  //       (this.addPaymenForm.pram2 = null),
  //       (this.addPaymenForm.pram3 = null),
  //       (this.addPaymenForm.pram4 = null),
  //       (this.qrFile = []);
  //   }
  // }
};
</script>

<style lang='scss' scoped>
.trade-user-center /deep/ {
  .adv-verify {
    width: 500px;
  }
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
        flex-shrink: 0;
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
        cursor: pointer;
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
          .dialog-info {
            min-height: 400px;
          }
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
                // width: 50%;
                text-align: left;
                flex-grow: 2;
              }
              a {
                color: #638bd4;
                cursor: pointer;
                // width: 50px;
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
      }
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
</style>
