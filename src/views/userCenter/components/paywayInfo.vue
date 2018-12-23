<template>
  <div class="animated bounceInLeft">
    <el-card :body-style="{ padding: '30px'}" class="box-card user-payment">
      <div slot="header" class="clearfix">
        <span style="font-size: 18px; font-weight:700">{{$t('userInfo.payment')}}</span>
        <p
          class="font14 font-gray"
          style="margin-bottom: 0;margin-top: 15px;"
        >{{$t('userInfo.addPayTip')}}</p>
      </div>
      <div v-if="hasPayment">
        <div v-for="(item, index) in userPayment" :key="index" class="user-info-list">
          <p class="list-label"/>
          <div class="info-wrapper">
            <p class="list-desc">
              <span class="desc-name m-desc-name">{{ getPaywayByID(item.paywayId || '-1').payName }}</span>
              <span
                class="auth-info m-auth-info"
                style="color: rgb(153, 153, 153);"
              >{{ item.pram1 === "null"? '':item.pram1 }} {{ item.pram2 === "null"? '':item.pram2 }} {{ item.pram3=== "null"? '':item.pram3 }} {{ item.pram4 === "null"? '':item.pram4 }}</span>
              <span class="isActive m-button">
                <el-switch
                  :id="item.paywayId"
                  v-model="getUserPaywayByID(item.paywayId).statusFlag"
                  active-text="ON"
                  inactive-text="OFF"
                  active-value="1"
                  inactive-value="0"
                  @click.native="init(item.paywayId)"
                  @change="handleChangePayStatus"
                />
              </span>
            </p>
          </div>
        </div>
        <div style="text-align:center;margin-top:30px">
          <p>
            <a
              class="font14"
              style="color:#638bd4; "
              @click="AddPaymentdialogVisible=true"
            >{{$t('userInfo.clickToAddPay')}}</a>
          </p>
        </div>
      </div>
      <div v-else>
        <div class="has-no-payment font14">
          <p class="font-gray" style="margin-top:20px">{{$t('userInfo.noPayment')}}</p>
          <p>
            <a
              style="color:#638bd4;"
              @click="AddPaymentdialogVisible=true"
            >{{$t('userInfo.clickToAddPay')}}</a>
          </p>
        </div>
      </div>
      <!-- <addPaymentForm :is-shown="AddPaymentdialogVisible"/> -->
    </el-card>
    <el-dialog
      :visible.sync="AddPaymentdialogVisible"
      :before-close="handleClose"
      :modal-append-to-body="false"
      :title="$t('userInfo.addPayment')"
      width="472px"
    >
      <div class="add-payment-form">
        <div class="payment-params">
          <el-form
            :model="addPaymenForm"
            label-position="top"
            label-width="80px"
            style="width:100%"
          >
            <el-form-item :label="$t('userInfo.payment')">
              <el-select v-model="addPaymenForm.id" style="width:100%">
                <el-option
                  v-for="(item, id) in this.$store.state.Common.supportPayway"
                  :label="item.payName"
                  :value="item.id"
                  :key="id"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-for="(item, id, index) in this.currentPayway"
              v-show="item !== null"
              :key="id"
              :label="item"
              :prop="'pram'+ (index+1)"
            >
              <el-input v-model="addPaymenForm[id]" type="text"/>
            </el-form-item>

            <!-- action="https://api.hextec.cn:8443/api/v1/pay/qrcode"
            :headers="{:'Bearer '+this.$store.state.user.token}"-->
            <el-form-item v-if="this.hasQrCode" :label="$t('userInfo.qrCode')">
              <el-upload
                action
                :limit="1"
                :auto-upload="false"
                :on-change="handleChange"
                :on-remove="handleRemove"
                :file-list="this.qrFile"
                class="upload-demo"
                list-type="picture-card"
              >
                <el-button
                  v-if="this.qrFile.length ==0"
                  size="small"
                  type="primary"
                >{{$t('userInfo.clickToUpload')}}</el-button>
              </el-upload>
            </el-form-item>
            <!-- <el-form-item label="安全密码">
                    <el-input type='password'></el-input>
            </el-form-item>-->
            <el-form-item>
              <el-button
                style="width:100%"
                type="primary"
                @click="handleAddPayment"
              >{{$t('userInfo.confirmAdd')}}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime, isImage, isMp4 } from "@/utils/index";
import {
  changePaymentStatus,
  addPay,
  getPayway,
} from "@/api/user";
import { qrCodeUpLoad, imgsUpload, videoUpLoad } from "@/api/cms";
import { mapGetters } from "vuex";
export default {
  name: "payway-info",
  components: {
  },
  data() {
    return {
      advLoading: false,
      AddPaymentdialogVisible: false,
      targetPaywayID: "",
      currentPayway: {
        pram1: null,
        pram2: null,
        pram3: null,
        pram4: null
        // qrcode: null
      },
      hasQrCode: false,
      addPaymenForm: {
        id: "", // bank表id
        pram1: "",
        pram2: "",
        pram3: "",
        pram4: ""
        // qrcode: '',
      },
    };
  },
  computed: {
    ...mapGetters(["getVerifyInfo"]),
    hasPayment() {
      return (
        this.$store.state.user.payway.length == !0 ||
        this.$store.state.user.payway !== {}
      );
    },
    userPayment() {
      return this.$store.state.user.payway;
    },
    
    parseTime(a) {
      return parseTime(a);
    },
    getID() {
      return this.addPaymenForm.id;
    },
    hhshown() {
      return this.AddPaymentdialogVisible;
    }
  },
  methods: {
    
    getPaywayByID(id) {
      for (const item of this.$store.state.Common.supportPayway) {
        if (item.id === id) {
          return item;
        }
      }
      return {
        payName: "unknown",
        statusFlag: "0"
      };
    },
    getUserPaywayByID(id) {
      for (const item of this.$store.state.user.payway) {
        if (item.paywayId == id) {
          return item;
        }
      }
    },
    init(id) {
      this.targetPaywayID = id;
    },
    handleChangePayStatus(newValue) {
      this.$nextTick(() => {
        const formData = new FormData();
        formData.append("payWayId", this.targetPaywayID);
        formData.append("status", newValue);
        changePaymentStatus(formData).then(response => {
          if(response && response.code === '200'){
            this.$notify.success(this.$t('userInfo.paywayStatusChangeSucc'))
          }
          this.$store.dispatch("GetUserPayway");
        }).catch(_=>{});
      });
    },
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

    // ================== 支付方式添加begin========================

    handleAddPayment() {
      console.log("1");
      let qrCodeUrl = "";
      if (this.hasQrCode) {
        // 判断是否需要qrcpde
        let qrCodeFile = this.qrFile[0].raw;
        // 检查文件后缀
        if (!this.isImage(qrCodeFile)) {
          this.$notify.error("请添加图片");
          return false;
        }
        // 上传文件 拉回地址
        console.log("2");
        let fileForm = new FormData();
        fileForm.append("paymentImg", qrCodeFile);
        qrCodeUpLoad(fileForm)
          .then(res => {
            console.log("3");

            if (res && res.code === "200") {
              qrCodeUrl = res.content;
              // 拉回成功 添加到addform中
              this.doAddPayment(qrCodeUrl);
            } else {
              // 文件上传失败
              this.$notify.error(this.$t("userInfo.addFailed"));
              return false;
            }
          })
          .catch(_ => {
            console.log("4");
            this.$notify.error(this.$t("userInfo.addFailed"));
            return false;
          });
      } else {
        //  不需要qrcode直接上传
        this.doAddPayment(qrCodeUrl);
      }
    },
    doAddPayment(qrCodeUrl) {
      const formData = new FormData();
      formData.append("id", this.addPaymenForm.id);
      formData.append("pram1", this.addPaymenForm.pram1);
      formData.append("pram2", this.addPaymenForm.pram2);
      formData.append("pram3", this.addPaymenForm.pram3);
      formData.append("pram4", this.addPaymenForm.pram4);
      if (this.hasQrCode) {
        if (qrCodeUrl === "") {
          return false;
        }
        formData.append("qrcode", qrCodeUrl);
      }
      addPay(formData)
        .then(response => {
          if (response && response.code === "200") {
            this.$notify.success(this.$t("userInfo.addSuccess"));
          } else {
            this.$notify.success(this.$t("userInfo.addFailed"));
          }
          this.AddPaymentdialogVisible = false;
          this.$store.dispatch("GetUserPayway");
        })
        .catch(_ => {
          this.$notify.error(this.$t("shitHappens"));
        });
    },
    handleChange(file) {
      this.qrFile.push(file);
      // this.addPaymenForm.qrcode = file.raw;
      document
        .getElementsByClassName("el-upload--picture-card")[0]
        .classList.add("noo");
    },
    handleRemove(file, fileList) {
      document
        .getElementsByClassName("el-upload--picture-card")[0]
        .classList.remove("noo");
      this.qrFile = [];
      // this.addPaymenForm.qrcode = ''
    },
    // ================== 支付方式添加end========================
    handleClose(done) {
      this.$confirm(this.$t("confirm"))
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },

  watch: {
    addPaymenForm: {
      handler(val, oldval) {
        for (const item of this.$store.state.Common.supportPayway) {
          if (val.id === item.id) {
            this.currentPayway.pram1 = item.pram1;
            this.currentPayway.pram2 = item.pram2;
            this.currentPayway.pram3 = item.pram3;
            this.currentPayway.pram4 = item.pram4;
            if (item.qrcode === "1") {
              this.hasQrCode = true;
            } else {
              this.hasQrCode = false;
            }
          }
        }
      },
      deep: true
    },
    getID(newValue, oldval) {
      (this.addPaymenForm.pram1 = null),
        (this.addPaymenForm.pram2 = null),
        (this.addPaymenForm.pram3 = null),
        (this.addPaymenForm.pram4 = null),
        (this.qrFile = []);
    }
  }
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
