<template>
  <div class="trade-order-wrapper">
    <div v-if="!isSelf" class="trade-order">
      <div class="to-info">
        <span class="font12 font-gray">订单：{{ this.$route.params.id }}</span>
        <div class="tip-message">
          您向 {{orderInfo.userId}}
          <span v-if="isBuyer">购买</span>
          <span v-else>出售</span>
          {{orderInfo.amount}} {{getCoinNameByIDUp(orderInfo.coinId)}}
        </div>
        <div class="order-info">
          <div>
            <span>单价:</span>
            {{ orderInfo.price }} {{ getCashNameById(orderInfo.cashId) }}
          </div>
          <div>
            <span>总价:</span>
            {{ orderInfo.amount*orderInfo.price }}{{ getCashNameById(orderInfo.cashId) }}
          </div>
        </div>
      </div>
      <div class="to-payment">
        <div v-if="isBuyer" class="tp-tip">
          <div class="tip-message">卖方收款方式</div>
          <div v-for="item in payment_list" :key="item.id" class="payment-item">
            <!-- <i class="el-icon-success"/> -->
            <div>
              <img :src="getPayIcon(item.paywayId)" style="margin-right:5px;">
              <!-- <i style="margin:0 4px;" :class="'iconfont icon-'+getIcon(item.paywayId)"></i> -->
              {{ getPaywayById(item.paywayId) === undefined? '' :getPaywayById(item.paywayId).payName }}
            </div>
            <div>
              <span>{{ item.pram1 === 'null'? '': item.pram1 }}</span>
              <span>{{ item.pram2 === 'null'? '': item.pram2 }}</span>
              <span>{{ item.pram3 === 'null'? '': item.pram3 }}</span>
            </div>
            <!-- 认证 -->
          </div>
        </div>
        <!-- <p v-if="orderInfo.status == 9" class="font20">交易已经完成</p> -->
        <div class="tip-message">
          <p>订单状态: {{ getStatus(orderInfo.status)}}</p>
        </div>
      </div>
      <!-- <div class="to-service">
        <div class="ts-tip">
          <span>增值保障服务</span>
          <hr>
        </div>
        <div v-if="orderInfo.isPending" class="ts-inner">
          <span>
              <a :href="this.law_service.link"/>服务协议
            </span>
        </div>
      </div>-->
      <div class="to-pay">
        <p>
          待支付，请于{{ orderInfo.expire }}分钟内向测试用户支付
          <span
            class="tp-price"
          >{{ orderInfo.amount*orderInfo.price }}{{ getCashNameById(orderInfo.cashId) }}</span> ,付款参考号:
          <span class="tp-flag">{{ orderInfo.processId }}</span>
        </p>
        <div class="tp-pay">
          <el-button type="primary" @click="handlePay">支付完成</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </div>
      </div>
      <div class="to-question">
        <div class="tip-message">
          <span>常见问题</span>
        </div>
        <el-collapse v-model="activeNames">
          <el-collapse-item
            v-for="item in question_list"
            :key="item.id"
            :title="item.title"
            :name="item.id"
          >
            <div>{{ item.des }}</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div v-else>测试页面 这个页面用来查看自己的广告详情~</div>
    <el-dialog
      :visible.sync="smsDialog"
      :before-close="handleClose"
      title="请输入您收到的验证码"
      width="300px"
    >
      <el-input v-model="sms" placeholder="请输入您收到的验证码"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="finishTrade()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fbGetPayment, fbConfirm, fbOrderDetail } from "../../api/coin_trade";
import { mapGetters } from "vuex";
import { sendUserCode, getStatus } from "../../utils/index";
export default {
  name: "OrderDetail",
  data() {
    return {
      orderInfo: {},
      question_list: [
        {
          id: 1,
          title: "buyy8oihb",
          des: "测试问题测试问题测试问题测试问题",
          link: "www.baidu.com"
        },
        {
          id: 2,
          title: "b测试测试b",
          des: "测试问题测试问题测试问题",
          link: "www.baidu.com"
        },
        {
          id: 3,
          title: "hasbas",
          des: "测试问65789090876ghm,",
          link: "www.baidu.com"
        },
        {
          id: 4,
          title: "buyy8oihb",
          des: "测试问题hvgujb9809题测试问题",
          link: "www.baidu.com"
        }
      ],
      activeNames: ["1"],
      payment_list: [],
      sms: "",
      smsDialog: false,
      isBuyer: false,
      isSelf: false
    };
  },
  created() {
    if (this.$store.state.user.userInfo.id === this.$route.params.id) {
      this.isSelf = true;
      console.log("这个单是我挂出去的");
    }
    // console.log(this.getPaywayById(2).payName);
    if (this.$route.params.direction == "1") {
      this.isBuyer = true;
      console.log("我是付款方 ");
      // 付款方点进来拉取对方付款信息
      fbGetPayment(this.$route.params.id, this.$route.params.processId).then(
        res => {
          if (res.code === "200") {
            console.log(
              "我可以通过orderId:" +
                this.$route.params.id +
                "查询对方的支付宝账户"
            );
            this.payment_list = res.content;
          } else {
            console.log("无法获取对方的支付宝账户");
          }
        }
      );
      fbOrderDetail(this.$route.params.id)
        .then(res => {
          if (res.code === "200") {
            console.log("并且可以获取此订单的详细信息");
            this.orderInfo = res.content;
          } else {
            console.log("但是无法获取订单的详细信息");
          }
        })
        .catch(res => {
          console.log("但是无法获取订单的详细信息");
        });
    } else if (this.$route.params.direction == "0") {
      console.log("我是出售方,orderId:" + this.$route.params.id);
      fbOrderDetail(this.$route.params.id)
        .then(res => {
          if (res.code === "200") {
            this.orderInfo = res.content;
            console.log("查询到此订单的详细信息");
          } else {
            console.log("无法查询到到此订单的详细信息");
          }
        })
        .catch(res => {
          console.log("无法查询到到此订单的详细信息");
        });
      this.isBuyer = false;
    }
  },
  computed: {
    ...mapGetters([
      "getSupportCoin",
      "getSupportCash",
      "getPayway",
      "getCoinNameByIDUp",
      "getCashNameById",
      "getPaywayById"
    ]),
    alipay() {
      return require("@/assets/svg/alipay.svg");
    },
    wechat() {
      return require("@/assets/svg/weChat.svg");
    },
    bankCard() {
      return require("@/assets/svg/ic_bankcard.svg");
    }
  },
  mounted() {
    setInterval(() => {
      this.orderInfo.timeLeft--;
    }, 1000);
  },
  methods: {
    getStatus(a) {
      return getStatus(a);
    },
    getPayIcon(id) {
      switch (id) {
        case "1":
          return this.wechat;
        case "2":
          return this.bankCard;
        case "9fe2dcef18e94c85adb3ff6da9c2a78d":
          return this.alipay;
      }
    },
    finishTrade() {
      if (this.sms !== "") {
        fbConfirm(
          this.$route.params.id,
          // this.$route.params.processId,
          this.sms
        ).then(res => {
          if (res.code === "200") {
            this.$notify.success("订单已确认!");
            this.smsDialog = false;
          } else {
            console.log(res);
          }
        });
      }
    },
    handlePay() {
      this.sendCode();
      this.smsDialog = true;
    },
    handleClose(done) {
      this.$confirm(this.$t('confirmToClose'))
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    sendCode() {
      sendUserCode(this);
    },
    handleCancel() {},
    getIcon(id) {
      switch (id) {
        case "2":
          return "bankCard";
        case "1":
          return "wechat";
        case "9fe2dcef18e94c85adb3ff6da9c2a78d":
          return "alipay";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.trade-order-wrapper {
  background-color: #fff;
  padding: 50px 0;
}
.tip-message {
  font-size: 30px;
  font-weight: normal;
  margin: 20px 0;
}
.order-status {
  margin: 20px 0;
}
.trade-order {
  width: 1200px;
  margin: auto;
  .to-info {
    // .ti-order-message {
    //   font-size: 30px;
    //   font-weight: normal;
    //   margin: 20px 0;
    // }
    .order-info {
      font-size: 16px;
      height: 90px;
      border-bottom: 1px solid #d9d9d9;
      span {
        font-weight: 700;
        width: 100px;
        display: inline-block;
      }
    }
  }
  .tp-tip {
    min-height: 140px;
    &:span {
      font-size: 24px;
    }
  }
  .payment-item {
    display: flex;
    width: 400px;
    justify-content: space-between;
    font-size: 14px;
    span {
      display: inline-block;
      width: 100px;
      text-align: right;
    }
  }
  .to-pay {
    font-size: 14px;
    margin: 20px 0;
    .tp-pay {
      margin: 20px 0;
    }
  }
  .to-question {
    margin: 60px 0 0 0;
  }
}
</style>
