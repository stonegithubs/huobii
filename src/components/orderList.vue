<template>
  <div class="order-list">
    <div class="merchant-list" v-loading="listLoading">
      <div class="merchant-title">
        <span v-if="avatarShow" style="width:220px;">{{$t('fb.merchant')}}</span>
        <span v-if="!avatarShow" style="width:220px;">{{$t('fb.coinTyp')}}</span>
        <span style="width:236px;">{{$t('order.amount')}}</span>
        <span style="width:231px;">{{$t('fb.limit')}}</span>
        <span style="width:175px;">{{$t('price')}}</span>
        <span style="width:160px;">{{$t('order.payways')}}</span>
        <span style="width: 150px;text-align: right;">{{$t('exchange.main.operation')}}</span>
      </div>
      <div v-for="item in merchantList" :key="item.id">
        <div class="merchant-item" v-if="!isChoosen(item.id)">
          <div v-if="avatarShow" style="width:220px;" class="item-inner">
            <div :class="getAvatarColor(item.userId)" class="avatar-container">
              <em
                class="name"
              >{{ item.user.name.slice(0,1) === undefined? '':item.user.name.slice(0,1).toUpperCase() }}</em>
            </div>
            <router-link :to="{ name: 'trader', params: {id: item.userId}}">
              {{ item.user.name }}
              <!-- ({{item.order_msg.finish}} | {{item.order_msg.finish_rate}})  -->
            </router-link>
          </div>
          <div v-if="!avatarShow" style="width:220px;">
            <coin-icon :iconName="getCoinNameByIDUp(item.coinId)"></coin-icon>
            {{ getCoinNameByIDUp(item.coinId)}}
          </div>
          <div style="width:236px;" class="item-inner">
            <span>{{ item.amount }} {{getCoinNameByIDUp(item.coinId)}}</span>
          </div>
          <div style="width:231px;" class="item-inner">
            <span>{{ item.min }}-{{ item.max }} {{getCashNameById(item.cashId)}}</span>
          </div>
          <div style="width:175px;" class="item-inner">
            <span class="price">{{ item.price }} {{getCashNameById(item.cashId)}}</span>
          </div>
          <div style="width:160px;" class="item-inner">
            <b v-if="item.paywayIds === 'all'">
              <el-tooltip
                content="alipay"
                style="margin:0 3px"
                class="item"
                effect="dark"
                placement="bottom"
              >
                <img :src="alipay">
              </el-tooltip>
              <el-tooltip
                content="wechat"
                style="margin:0 3px"
                class="item"
                effect="dark"
                placement="bottom"
              >
                <img :src="wechat">
              </el-tooltip>
              <el-tooltip
                content="bankCard"
                style="margin:0 3px"
                class="item"
                effect="dark"
                placement="bottom"
              >
                <img :src="bankCard">
              </el-tooltip>
            </b>
            <b v-else>
              <el-tooltip
                v-for="(item,index) in item.paywayIds "
                :key="index"
                style="margin:0 3px"
                class="item"
                effect="dark"
                placement="bottom"
              >
                <img :src="getIcon(item)">
              </el-tooltip>
            </b>
          </div>
          <div class="last-item item-inner">
            <el-button
              type="primary"
              @click="chooseOrder(item)"
            >{{item.direction === '1'? $t('buy'):$t('sell')}}</el-button>

            <!-- <el-button
              type="primary"
              @click="chooseOrder(item)"
            >{{item.direction == 0? $t('sell'): $t('buy')}}</el-button>-->
          </div>
        </div>
        <div class="trade-panel" v-if="isChoosen(item.id)">
          <div class="panel-inner">
            <div class="trading">
              <div class="trade-user">
                <div class="user-info">
                  <div
                    v-if="avatarShow"
                    :class="getAvatarColor(item.userId)"
                    class="avatar-container"
                  >
                    <em
                      class="name"
                    >{{ item.user.name.slice(0,1) === undefined? '':item.user.name.slice(0,1).toUpperCase() }}</em>
                  </div>
                  <div v-if="!avatarShow" style="width:220px;">
                    <coin-icon :iconName="getCoinNameByIDUp(item.coinId)"></coin-icon>
                    {{ getCoinNameByIDUp(item.coinId)}}
                  </div>

                  <div class="name-info" v-if="avatarShow">
                    <div>
                      <router-link :to="{ name: 'trader', params: {id: item.userId}}">
                        {{ item.user.name }}
                        <!-- ({{item.order_msg.finish}} | {{item.order_msg.finish_rate}})  -->
                      </router-link>
                    </div>
                    <div>
                      <span>{{ item.amount }} {{getCoinNameByIDUp(item.coinId)}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="!avatarShow" style="width:220px;">
                <span>{{ item.amount }} {{getCoinNameByIDUp(item.coinId)}}</span>
              </div>
              <div class="price-amount">
                <p class="price">{{ item.price }} {{getCashNameById(item.cashId)}}</p>
                <p>{{ item.min }}-{{ item.max }} {{getCashNameById(item.cashId)}}</p>
              </div>
              <el-form
                class="trade-form"
                ref="tradeForm"
                :inline="true"
                :rules="tradeRule"
                :model="tradeForm"
              >
                <el-form-item prop="currency">
                  <!-- :label="$t('fb.currency')" -->
                  <el-input
                    @input="currencyChange"
                    v-model.number="tradeForm.currency"
                    :placeholder="$t('fb.cashAmount')"
                  >
                    <span slot="suffix">{{$store.getters.getCashNameById(item.cashId)}}</span>
                  </el-input>
                </el-form-item>
                <span class="exchange-icon">
                  <i class="iconfont icon-exchange"></i>
                </span>
                <el-form-item
                  prop="amount"
                >
                  <el-input
                    v-model.number="tradeForm.amount"
                    :placeholder="$t('exchange.main.amount')"
                    type="text"
                    @input="amountChange"
                  >
                    <span slot="suffix">{{$store.getters.getCoinNameByIDUp(item.coinId)}}</span>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="warning"
                    style="width: 100%"
                    @click="handleOrder()"
                  >{{$t('placeOrder')}}</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="other-message">
              <div class="other-row">
                <div class="pay-message">
                  <b v-if="item.paywayIds === 'all'">
                    <el-tooltip
                      content="alipay"
                      style="margin:0 3px"
                      class="item"
                      effect="dark"
                      placement="bottom"
                    >
                      <img :src="alipay">
                    </el-tooltip>
                    <el-tooltip
                      content="wechat"
                      style="margin:0 3px"
                      class="item"
                      effect="dark"
                      placement="bottom"
                    >
                      <img :src="wechat">
                    </el-tooltip>
                    <el-tooltip
                      content="bankCard"
                      style="margin:0 3px"
                      class="item"
                      effect="dark"
                      placement="bottom"
                    >
                      <img :src="bankCard">
                    </el-tooltip>
                  </b>
                  <b v-else>
                    <el-tooltip
                      v-for="(item,index) in item.paywayIds "
                      :key="index"
                      style="margin:0 3px"
                      class="item"
                      effect="dark"
                      placement="bottom"
                    >
                      <img :src="getIcon(item)">
                    </el-tooltip>
                  </b>
                </div>
                <div
                  class="limit-time"
                >{{$t('order.expireTip1')}}{{item.expire}}{{$t('userInfo.min')}}</div>
              </div>
              <div class="remark-shows">
                <p>{{$t('fb.merchantMsg')}}</p>
                <p>{{item.message}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog
        :visible.sync="smsDialog"
        :before-close="handleClose"
        :title="$t('smsTip')"
        width="300px"
      >
        <el-input v-model="tradeForm.code" :placeholder="$t('smsCode')"/>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="doTrade()">{{$t('confirm')}}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
import { change_nickname } from "@/api/user";
import { getAvatarColor, sendUserCode } from "@/utils/index";
import fbChoice from "@/components/fbChoice";
import { fbList, fbTrade } from "@/api/coin_trade";
import { mapGetters } from "vuex";
import coinIcon from "@/components/coinIcon";
export default {
  name: "order-list",
  props: {
    merchantList: {
      type: Array,
      required: true
    },
    avatarShow: {
      type: Boolean,
      required: false,
      default: true
    },
    coinIconShow: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    coinIcon
  },
  // props:['merchantList','avatar'],
  data() {
    var checkCurrency = (rule, value, callback) => {
      value = Number.parseFloat(value);
      if (value > this.currentOrder.max) {
        return callback(
          new Error(this.$t("fb.orderMax") + this.currentOrder.max)
        );
      } else if (value < this.currentOrder.min) {
        return callback(
          new Error(this.$t("fb.orderMin") + this.currentOrder.min)
        );
      } else {
        callback();
      }
    }
    var checkBalance = (rule, value, callback) => {
      if (this.currentOrder.direction === "1") {
        return callback();
        // return
      }
      let amount = Number.parseFloat(value);
      let coinBalance = this.getCoinBalanceById(this.currentOrder.coinId).coinBalance;
      // console.log(coinBalance)
      // console.log("下单金额："+amount+"  目标币余额："+coinBalance)
      if (value > coinBalance) {
        return callback(new Error(this.$t("fb.insufficientBalance")));
      } else {
        return callback();        
      }
    }

    return {
      buyLoading: false,
      listLoading: false,
      showId: "", //当前显示的商家
      tradePanelVisible: false,
      //   merchantList: [],
      currentOrder: {},
      payments: "all",
      direction: "0",
      tradeForm: {
        id: "",
        direction: this.direction,
        code: "",
        amount: 0,
        currency: 0
      },
      smsDialog: false,
      tradeBarVisible: false,
      price: 1,
      tradeRule: {
        amount:[
          { validator: checkBalance, trigger: "change" },
          { required: true, message: this.$t('amountErr'), trigger: 'blur' },
          { type: 'number', message: this.$t('amountErr'), trigger: ['blur', 'change'] }
        ],
        currency: [
          { validator: checkCurrency, trigger: "change" },
          { required: true, message: this.$t("amountErr"), trigger: "blur" },
          {
            type: "number",
            message: this.$t("amountErr"),
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  created() {
    //拉取商家列表
    // this.getMerchantList(0, 10, 0, "all", "2", "3");
    // 如果用户已经登录 就拉取个人信息（验证码需要国籍信息）
    if (this.$store.state.user.token) {
      if (!this.$store.state.user.userInfo) {
        this.$store.dispatch("GetUserInfo");
      }
      // console.log(this.$store.state.user.verifyInfo)
      if (!this.$store.state.user.verifyInfo) {
        // 拉取实名信息
        this.$store.dispatch("GetVerifyInfo").catch(_ => {});
      }
    }
    if (!this.$store.state.Common.supportPayway) {
      // 拉去支持的支付方式
      this.$store.dispatch("getSupportedPayway").catch(_ => {});
    }
    if (!this.$store.state.coinData.supportedCoin) {
      // 拉取支持的币种
      this.$store.dispatch("getSupportCoin").catch(_ => {});
    }
    if(this.getCoinBalance.length === 0){
      // 没有钱包信息需要拉取钱包信息
      this.$store.dispatch("GetCoinBalanceBoth").catch(_ => {});      
    }
  },
  methods: {
    isChoosen(id) {
      return this.showId === id;
    },

    changeNickname() {
      this.$prompt(this.$t("userInfo.changeTip1"), {
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
    chooseOrder(order) {
      this.showId = order.id;
      this.buyLoading = true;
      this.price = order.price;
      this.currentOrder = order;
      this.tradeForm.id = order.id;
      this.tradeForm.direction = this.direction;
      if (this.$store.state.user.token == null) {
        this.$alert(this.$t("fb.loginTip")).then(({ value }) => {
          this.$router.push({ name: "login" });
        });
      } else {
        if (
          this.$store.state.userInfo &&
          this.$store.state.userInfo.nickName === "-"
        ) {
          this.changeNickname();
        }
      }
      //   this.tradePanelVisible = true;
      this.buyLoading = false;
    },
    handleOrder() {
      // console.log(this.$refs["tradeForm"][0]);
      // return;
      this.$nextTick(() => {
        this.$refs["tradeForm"][0].validate(valid => {
          if (valid) {
            // 发送验证码吗
            sendUserCode(this);
          }
        });
      });
    },
    doTrade() {
      const form = this.tradeForm;
      // console.log(form.id, form.direction, form.code, form.amount)
      fbTrade(form.id, form.direction, form.code, form.amount)
        .then(res => {
          this.smsDialog = false;
          if (res.code === "200") {
            if (form.direction == "0") {
              // 此单我为出售方 不获取对方付款信息 TODO: 后端接口错误 挂单方拿不到交易信息
              this.$notify.success(this.$t("fb.orderSellTip"));
              this.smsDialog = false;
              this.$router.push({
                name: "orderDetail",
                params: { id: res.content.orderId, publish: "0" }
              });
            } else if (form.direction == "1") {
              // 此单我为买入方 跳转到付款页面正常付款
              this.$notify.success(this.$t("fb.orderBuyTip"));
              this.$router.push({
                name: "orderDetail",
                params: { id: res.content.orderId, publish: "0" }
              });
            }
          } else {
            this.$notify.error(this.$t("fb.orderFailed") + res.content.message);
            // console.log(res)
          }
        })
        .catch(err => {
          // this.$notify.error(err.message)
        });
    },
    goToAdv() {
      this.$router.push({ name: "advertising" });
    },
    checkMyAdv() {
      this.$router.push({ name: "tradeOrder" });
    },
    // 界面
    getIcon(id) {
      switch (id) {
        case "1":
          return this.weChat;
        case "2":
          return this.bankCard;
        case "9fe2dcef18e94c85adb3ff6da9c2a78d":
          return this.alipay;
      }
    },
    getAvatarColor(id) {
      return getAvatarColor(id);
    },
    handleClose(done) {
      this.$confirm(this.$t("confirmToClose"))
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    currencyChange(value) {
      let amount = (value / this.price).toFixed(8);
      this.tradeForm.amount = Number.parseFloat(amount);
    },
    amountChange(value) {
      let currency = (value * this.price).toFixed(2);
      this.tradeForm.currency = Number.parseFloat(currency);
    }
  },
  computed: {
    alipay() {
      return require("@/assets/svg/alipay.svg");
    },
    wechat() {
      return require("@/assets/svg/weChat.svg");
    },
    bankCard() {
      return require("@/assets/svg/ic_bankcard.svg");
    },

    ...mapGetters([
      "getCountry",
      "getCountryCodeByAbbr",
      "getCashNameById",
      "getCoinNameByIDUp",
      "getCoinBalanceById",
      'getCoinBalance'
    ])
  }
};
</script>

<style lang='scss' scoped>
.order-list {
  .merchant-list {
    min-height: 911px;
    // background-color: red;;
    .merchant-title {
      margin-bottom: 15px;
      span {
        display: inline-block;
        color: gray;
        font-size: 14px;
      }
    }
    .merchant-item {
      font-size: 14px;
      color: #333;
      display: flex;
      align-items: center;
      position: relative;
      border-bottom: 1px solid #ececec;
      width: 100%;
      padding: 24px 0;
      justify-content: flex-start;
      .item-inner {
        display: flex;
        // justify-content: center;
        align-content: center;
        vertical-align: baseline;
        a {
          &:hover {
            color: orange;
          }
          display: inline-block;
          //   height: 20px;
          font-weight: 600;
          padding: 7px 14px;
        }
      }
      .last-item {
        //   text-align: right;
        // display:
        padding-left: 90px;
        // justify-content: right;
      }
    }
    .trade-panel {
      width: 1258px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      padding: 24px;
      z-index: 999;
      background-color: #fff;
      position: relative;
      right: 27px;
      top: -1px;
      .trading {
        display: flex;
        // justify-content: space-between;
        .trade-user {
          width: 226px;
          .user-info {
            display: flex;
            justify-content: space-between;
            .name-info {
              width: 76%;
              text-align: left;
              a {
                &:hover {
                  color: orange;
                }
                display: inline-block;
                //   height: 20px;
                font-weight: 600;
                // padding: 7px 14px;
              }
              // margin-left: 10px;
            }
          }
        }
        .trade-form {
          margin-left: auto;
          .exchange-icon {
            display: inline-block;
            color: gray;
            margin: 8px 10px 5px 1px;
          }
        }
      }
      .other-message {
        margin-left: 50px;
        .remark-shows {
          margin-top: 16px;
          color: #999;
          word-break: break-all;
        }
        .other-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 24px;
        }
      }

      .panel-inner {
        // display: flex;
        font-size: 14px;
      }
    }
  }
  .avatar-container {
    height: 40px;
    width: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    position: relative;

    .name {
      color: white;
    }
  }

  //   .bottom-groups {
  //     // display: flex;
  //     vertical-align: bottom;
  //   }
  .price {
    color: #489972;
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
