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
        </div> -->
      </div>
      <div class="user-right">
        <div class="user-info-container">
          <el-card :body-style="{ padding: '30px'}" class="box-card">
            <div slot="header" class="clearfix">
              <span style="font-size: 18px; font-weight:700">{{$t('userInfo.tip1_1')}}</span>
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
              <el-dialog
                :modal-append-to-body="false"
                :visible.sync="googleVisiable"
                :before-close="handleClose"
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
                  >{{ getVerifyInfo? getVerifyInfo.surName+getVerifyInfo.name :'' }} {{ getVerifyInfo? getVerifyInfo.cardNo.slice(0,-4) +'****':'' }}</span>
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
                  :modal="true"
                  :visible.sync="adv_verifyDialogVisible"
                  :lock-scroll="true"
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
                        :file-list="adv_fileList"
                        :on-change="handleChange"
                        :on-remove="handleRemove"
                        :limit="3"
                        :auto-upload="false"
                        action
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
          <!-- todo:实名认证后才可以添加收款方式 -->
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
                    <span
                      class="desc-name m-desc-name"
                    >{{ getPaywayByID(item.paywayId || '-1').payName }}</span>
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
            <addPaymentForm :is-shown="AddPaymentdialogVisible"/>
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
                  <el-form-item v-if="this.hasQrCode" :label="$t('userInfo.qrCode')">
                    <el-upload
                      :limit="1"
                      :auto-upload="false"
                      :on-change="handleChange"
                      :on-remove="handleRemove"
                      :file-list="this.qrFile"
                      class="upload-demo"
                      action
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
      </div>
    </div>
  </div>
</template>

<script>
import addPaymentForm from "./components/addPaymentForm";
import googleCode from "./components/googleCode";
import VueRecaptcha from "vue-recaptcha";
import { parseTime } from "../../utils/index";
import {
  changePaymentStatus,
  submitAdvanceVerify,
  addPay,
  getPayway,
  isBindGoogle,
  change_nickname
} from "../../api/user";
import { unBindEmail } from "../../api/verify_code";
import { mapGetters } from "vuex";
export default {
  name: "TradeUserCenter",
  components: {
    addPaymentForm,
    googleCode
  },
  data() {
    return {
      isBind: false,
      AddPaymentdialogVisible: false,
      adv_verifyDialogVisible: false,
      targetPaywayID: "",
      // auditFlag: this.$store.state.user.verifyInfo===null? '':auditFlag,
      adv_fileList: [],
      googleVisiable: false,
      currentPayway: {
        pram1: null,
        pram2: null,
        pram3: null,
        pram4: null
        // qrcode: null
      },
      hasQrCode: false,
      // qrcode:'',
      addPaymenForm: {
        id: "", // bank表id
        pram1: "",
        pram2: "",
        pram3: "",
        pram4: ""
        // qrcode: '',
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
    safeLevel() {
      return "中";
    },
    userInfo() {
      return this.$store.state.user.userInfo;
    },
    hasPayment() {
      return (
        this.$store.state.user.payway.length == !0 ||
        this.$store.state.user.payway !== {}
      );
    },
    userPayment() {
      return this.$store.state.user.payway;
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
    hasAdvVerify() {
      if (this.verifyInfo == false) {
        return false;
      } else {
        if (this.verifyInfo["auditFlag"] === "4") {
          return true;
        }
      }
    },
    getID() {
      return this.addPaymenForm.id;
    },
    hhshown() {
      return this.AddPaymentdialogVisible;
    }
  },
  created() {
    if(!this.$store.state.user.token){
      this.$router.push({ name: 'login'})
    }
    this.$store.dispatch("GetUserInfo");
    this.$store.dispatch("GetVerifyInfo");
    this.$nextTick(() => {
      this.$store.dispatch("GetUserPayway");
      this.$store.dispatch("GetTradePwd");
      isBindGoogle().then(res => {
        if (res && res.code === "200") {
          this.isBind = res.content;
        }
      });
      // console.log(this.getUserPaywayByID('2').paywayId)
    });
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
    changeNickname() {
      this.$prompt(this.$t("userInfo.nickNameTip"), {
        confirmButtonText: this.$t("confirm"),
        cancelButtonText: this.$t("canceled"),
        inputPattern: /^.{3,6}$/,
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
    init(id) {
      // console.log('fuck')
      this.targetPaywayID = id;
    },
    handleChangePayStatus(newValue) {
      this.$nextTick(() => {
        const formData = new FormData();
        formData.append("payWayId", this.targetPaywayID);
        formData.append("status", newValue);
        changePaymentStatus(formData).then(response => {
          this.$store.dispatch("GetUserPayway");
        });
      });
    },
    unbindButton() {
      this.$alert(
        this.$t("userInfo.confirmUnbind"),
        this.$t("userInfo.unbindEmail"),
        {
          confirmButtonText: this.$t("userInfo.confirmUnbind"),
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
    handleChange(file) {
      this.adv_fileList.push(file);
    },
    handleRemove(file, fileList) {
      fileList.pop(file);
    },
    handleClose(done) {
      this.$confirm(this.$t("confirm"))
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleAdvancedVerify() {
      if (this.adv_fileList.length == 3) {
        const reader1 = new FileReader();
        reader1.readAsDataURL(this.adv_fileList[0].raw);
        const reader2 = new FileReader();
        reader2.readAsDataURL(this.adv_fileList[1].raw);
        const reader3 = new FileReader();
        reader3.readAsDataURL(this.adv_fileList[2].raw);
        const formData = new FormData();
        formData.append("img1", reader1.result);
        formData.append("img2", reader2.result);
        formData.append("video", reader3.result);
        submitAdvanceVerify(formData)
          .then(response => {
            if (response.code === "200") {
              this.$notify.success(response.message);
            } else {
              this.$notify.error(response.message);
            }
          })
          .catch(_ => {});
      } else {
        this.$notify.error(this.$t("userInfo.verifyInfo"));
      }
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
    handleAddPayment() {
      const formData = new FormData();
      formData.append("id", this.addPaymenForm.id);
      formData.append("pram1", this.addPaymenForm.pram1);
      formData.append("pram2", this.addPaymenForm.pram2);
      formData.append("pram3", this.addPaymenForm.pram3);
      formData.append("pram4", this.addPaymenForm.pram4);
      if (this.qrFile.length === 1) {
        const reader = new FileReader();
        reader.readAsDataURL(this.qrFile[0].raw);
        formData.append("qrcode", reader.result);
      } else {
        formData.append("qrcode", null);
      }
      addPay(formData)
        .then(response => {
          this.$notify.success(response.message);
          this.AddPaymentdialogVisible = false;
          this.$store.dispatch("GetUserPayway");
        })
        .catch(_ => {
          this.$notify.error(_.message);
        });
      // console.log(formData.get('qrcode'))
    },
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
