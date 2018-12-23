<template>
  <div class="secure-info"> 
    <el-card class="animated bounceInRight box-card" :body-style="{ padding: '30px'}" >
      <div slot="header" class="clearfix">
        <span style="font-size: 18px; font-weight:700">{{$t('userInfo.secure')}}</span>
        <!-- <p style="float: right; ">{{$t('userInfo.tip1_1')}}{{ safeLevel }}</p> -->
      </div>
      <div class="user-info-list">
        <p class="list-label">
          <i class="iconfont icon-email"/>
        </p>
        <div class="info-wrapper">
          <p class="list-desc">
            <span class="desc-name m-desc-name">{{$t('userInfo.email')}}</span>
            <span
              v-if="hasEmail"
              class="auth-info m-auth-info"
              style="color:black"
            >{{$t('userInfo.binded')}}</span>
            <a v-if="hasEmail" @click="unbindButton">{{$t('userInfo.disBind')}}</a>
            <span v-if="!hasEmail" class="auth-info m-auth-info">{{$t('userInfo.unbind')}}</span>
            <router-link v-if="!hasEmail" :to="{ name: 'bind_email'}">{{$t('userInfo.bind')}}</router-link>
          </p>
        </div>
      </div>
      <div class="user-info-list">
        <p class="list-label">
          <i class="iconfont icon-phone"/>
        </p>
        <div class="info-wrapper">
          <p class="list-desc">
            <span class="desc-name m-desc-name">{{$t('userInfo.phone')}}</span>
            <span
              class="auth-info m-auth-info"
              style="color:black"
            >{{this.$store.state.user.userInfo.mobile}}</span>
          </p>
        </div>
      </div>
      <div class="user-info-list">
        <p class="list-label">
          <i class="iconfont icon-GA"/>
        </p>
        <div class="info-wrapper">
          <p class="list-desc">
            <span class="desc-name m-desc-name">{{$t('userInfo.googleCaptcha')}}</span>
            <span
              class="auth-info m-auth-info"
              style="color: rgb(153, 153, 153);"
            >{{isBind?$t('userInfo.binded'):$t('userInfo.unbind')}}</span>
            <a
              v-if="!isBind"
              rel="noopener noreferrer"
              class="isActive m-button"
              @click="googleVisiable = true"
            >{{$t('userInfo.bind')}}</a>
          </p>
        </div>
          <!-- :modal-append-to-body="false" -->
          <!-- :before-close="handleClose" -->
        <el-dialog
          :append-to-body="true"	
          :visible.sync="googleVisiable"
          :title="$t('userInfo.bindGoogle')"
          width="650px"
        >
          <google-code/>
          <span slot="footer" class="dialog-footer"/>
        </el-dialog>
      </div>
      <div class="user-info-list">
        <p class="list-label">
          <i class="iconfont icon-login_password"/>
        </p>
        <div class="info-wrapper">
          <p class="list-desc">
            <span class="desc-name m-desc-name">{{$t('userInfo.password')}}</span>
            <span class="auth-info m-auth-info" style="color: rgb(153, 153, 153);">******</span>
            <router-link
              :to="{name: 'change_password'}"
              class="isActive m-button"
            >{{$t('userInfo.modify')}}</router-link>
          </p>
        </div>
      </div>
      <div class="user-info-list">
        <p class="list-label">
          <i class="iconfont icon-password-lock"/>
        </p>
        <div class="info-wrapper">
          <p class="list-desc">
            <span class="desc-name m-desc-name">{{$t('userInfo.tradePwd')}}</span>
            <span
              v-if="hasTradePwd"
              class="auth-info m-auth-info"
              style="color: rgb(153, 153, 153);"
            >******</span>
            <router-link
              v-if="hasTradePwd"
              :to="{ name: 'change_trade_password'}"
              class="isActive m-button"
            >{{$t('userInfo.modify')}}</router-link>
            <span
              v-if="!hasTradePwd"
              class="auth-info m-auth-info"
              style="color: rgb(153, 153, 153);"
            >{{$t('userInfo.doSet')}}</span>
            <router-link
              v-if="!hasTradePwd"
              :to="{ name: 'change_trade_password'}"
              class="isActive m-button"
            >{{$t('userInfo.notSet')}}</router-link>
          </p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
// import addPaymentForm from "./components/addPaymentForm";
import googleCode from "./googleCode";
import {
  isBindGoogle,
  change_nickname
} from "@/api/user";
import { unBindEmail } from "@/api/verify_code";
import { mapGetters, mapState } from "vuex";
export default {
  name: "secure-info",
  components: {
    // addPaymentForm,
    googleCode
  },
  data() {
    return {
      isBind: false,
      googleVisiable: false,
    };
  },
  mounted() {
  },
  computed: {
      ...mapState(['user']),
    ...mapGetters(["getVerifyInfo",'getUserInfo']),
    safeLevel() {
      return "中";
    },
    userInfo() {
      return this.$store.state.user.userInfo;
    },
   
    hasEmail() {
      return !!this.$store.state.user.userInfo.email;
      // return true
    },
    hasTradePwd() {
      return this.$store.state.trade.hasTradePwd;
    },

    parseTime(a) {
      return parseTime(a);
    },
    
  },
  created() {
    if (!this.$store.state.user.token) {
      this.$router.push({ name: "login" });
    }
    isBindGoogle().then(res => {
        if (res && res.code === "200") {
          this.isBind = res.content;
        }
      });
  },
  methods: {
    changeNickname() {
      this.$prompt(this.$t("userInfo.nickNameTip"), {
        confirmButtonText: this.$t("confirm"),
        cancelButtonText: this.$t("canceled"),
        inputPattern: /^.{3,10}$/,
        inputErrorMessage: this.$t("userInfo.changeRule")
      }).then(nickName => {
        if (nickName.action === "confirm") {
          change_nickname(nickName.value)
            .then(res => {
              this.$store.dispatch("GetUserInfo");
              if (res && res.code === "200") {
                this.$message({
                  type: "success",
                  message: this.$t("changeSuccess")
                });
              }
            })
            .catch(_ => {
              this.$notify.error(this.$t("changeFailed"));
            });
        }
      });
    },
    getUserPaywayByID(id) {
      for (const item of this.$store.state.user.payway) {
        if (item.paywayId == id) {
          return item;
        }
      }
    },
    unbindButton() {
      this.$alert(
        this.$t("userInfo.confirmUnbind"),
        this.$t("userInfo.unbindEmail"),
        {
          confirmButtonText: this.$t("confirm"),
          callback: action => {
            if (action == "confirm") {
              unBindEmail()
                .then(response => {
                  this.$notify.success(this.$t("userInfo.emailSent"));
                })
                .catch(_ => {});
            } else {
              return false;
            }
          }
        }
      );
    },

  }
};
</script>

<!--<style lang='scss' scoped>
// .trade-user-center /deep/ {
//   .adv-verify {
//     width: 500px;
//   }
//   .noo {
//     display: none;
//   }
//   display: flex;
//   justify-content: space-between;
//   margin-top: 80px;
//   @media (min-width: 992px) {
//     width: 1200px;
//     margin-left: auto;
//     margin-right: auto;
//   }
//   @media (max-width: 768px) {
//     flex-direction: column;
//     padding: 16px 24px;
//     width: 100%;
//     margin-top: 40px;
//   }
//   .user-left {
//     width: 240px;
//     .avatar-box {
//       display: flex;
//       align-items: center;
//       padding-bottom: 24px;
//       border-bottom: 1px solid hsla(0, 0%, 85%, 0.5);
//       .avatar-container {
//         width: 40px;
//         height: 40px;
//         display: flex;
//         flex-shrink: 0;
//         flex-direction: row;
//         justify-content: center;
//         align-items: center;
//         border-radius: 50%;
//         position: relative;
//       }
//       .avatar-desc {
//         margin-left: 16px;
//         font-size: 14px;
//         color: #333;
//         cursor: pointer;
//       }
//     }
//     .trade-times {
//       margin: 24px 0;
//       padding-bottom: 24px;
//       border-bottom: 1px solid hsla(0, 0%, 85%, 0.5);
//       p {
//         line-height: 2.4;
//         color: #999;
//         margin-bottom: 0;
//         span {
//           color: #333;
//         }
//       }
//     }
//   }
//   .user-right {
//     .user-info-container {
//       .box-card {
//         width: 816px;
//         margin-bottom: 30px;
//         .user-info-list {
//           display: flex;
//           align-items: center;
//           padding: 14px 0 0;
//           color: #999;
//           .dialog-info {
//             min-height: 400px;
//           }
//           .list-label {
//             margin-right: 10px;
//             margin-bottom: 8px;
//           }
//           .info-wrapper {
//             border-bottom: 1px solid hsla(0, 0%, 85%, 0.5);
//             width: 100%;
//             padding-bottom: 12px;
//             .list-desc {
//               display: flex;
//               flex-grow: 2;
//               flex-direction: row;
//               justify-content: space-between;
//               .desc-name {
//                 color: #999;
//                 width: 180px;
//               }
//               .auth-info {
//                 display: inline-block;
//                 // width: 50%;
//                 text-align: left;
//                 flex-grow: 2;
//               }
//               a {
//                 color: #638bd4;
//                 cursor: pointer;
//                 // width: 50px;
//                 text-align: right;
//               }
//             }
//           }
//         }
//         .has-no-payment {
//           // display: flex;
//           // align-content: center;
//           // justify-content: flex-start;
//           // align-items: center;
//           height: 100px;
//           text-align: center;
//           p {
//             display: inline-box;
//           }
//         }
//       }
//     }
//   }
//   .upload-demo {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     align-content: center;
//     .el-upload--picture-card {
//       width: 100%;
//     }
//   }
// }
// </style>
