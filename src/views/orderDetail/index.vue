<template>
  <div class="trade-order-wrapper" v-loading="isLoading">
    <div v-if="!isSelf" class="trade-order">
      <div class="to-info">
        <span class="font12 font-gray">订单：{{ this.$route.params.id }}</span>
        <div class="tip-message">
          您向 {{ userName }}
          <span v-if="isBuyer">购买</span>
          <span v-else>出售</span>
          {{orderInfo.amount}} {{orderInfo.coinId === undefined? '':getCoinNameByIDUp(orderInfo.coinId.split('_')[0])}}
        </div>
        <div class="order-info">
          <div>
            <span>单价:</span>
            <span>{{ orderInfo.dealPrice }} {{ orderInfo.coinId === undefined? '':getCashNameById( orderInfo.coinId.split('_')[1]) }}</span>
          </div>
          <div>
            <span>总价:</span>
            <span
              style="color:#489972"
            >{{ orderInfo.amount*orderInfo.dealPrice }}{{ orderInfo.coinId === undefined? '':getCashNameById(orderInfo.coinId.split('_')[1]) }}</span>
          </div>
        </div>
      </div>
      <div class="to-payment">
        <div v-if="isBuyer && !hasPayed" class="tp-tip">
          <div class="tip-message">卖方收款方式</div>
          <!-- <el-form>
            <el-form-item  v-for="item in payment_list" :key="item.id" :label="getPaywayById(item.paywayId)" class="payment-item">
            </el-form-item>
          </el-form>-->
          <div v-for="item in payment_list" :key="item.id" class="payment-item">
            <!-- <i class="el-icon-success"/> -->
            <div>
              <el-radio v-model="paymentChoosed" :label="item.paywayId">
                <img :src="getPayIcon(item.paywayId)" style="margin-right:5px;">
                <!-- <i style="margin:0 4px;" :class="'iconfont icon-'+getIcon(item.paywayId)"></i> -->
                {{ getPaywayById(item.paywayId) === undefined? '' :getPaywayById(item.paywayId).payName }}
                <span>{{ item.pram1 === 'null'? '': item.pram1 }}</span>
                <span>{{ item.pram2 === 'null'? '': item.pram2 }}</span>
                <span>{{ item.pram3 === 'null'? '': item.pram3 }}</span>
              </el-radio>
            </div>

            <!-- 认证 -->
          </div>
        </div>
        <!-- <p v-if="orderInfo.status == 9" class="font20">交易已经完成</p> -->
        <div class="tip-message">
          <p>订单状态: {{ getStatus(orderInfo.status)}}</p>
        </div>
      </div>

      <!-- 买家未付款 -->
      <div class="to-pay" v-if="isBuyer && !hasPayed">
        <p>
          待支付，请于
          <span class="time-left">{{ advInfo.expire }}</span>
          分钟内向{{ userName }}支付
          <span
            class="tp-price"
          >{{ orderInfo.amount*orderInfo.dealPrice }}{{ orderInfo.coinId === undefined? '':getCashNameById(orderInfo.coinId.split('_')[1]) }}</span>
          ,付款参考号:
          <span class="tp-flag">{{ orderInfo.id }}</span>
        </p>
        <div class="tp-pay">
          <el-button type="primary" @click="handlePay">支付完成</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </div>
      </div>

      <!-- 买家已付款 -->
      <div class="to-pay" v-if="isBuyer && hasPayed">
        <p>
          已支付，等待对方确认交易
          <span class="tp-price">
            <!-- {{ orderInfo.amount*orderInfo.price }}{{ getCashNameById(orderInfo.cashId) }} -->
          </span>
          , 付款参考号:
          <span class="tp-flag">{{ orderInfo.id }}</span>
        </p>
        <!-- <div class="tp-pay">
          <el-button type="primary" @click="handlePay()">确认放行</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </div>-->
      </div>

      <!-- 卖家未确认 买家未付款 -->
      <div class="to-pay" v-if="!isBuyer && !hasPayed">
        <p>
          待支付，等待买家{{userName}}在
          <span class="time-left">{{ advInfo.expire }}</span>
          分钟内向我支付
          <span class="money-re">
            {{ orderInfo.amount*orderInfo.dealPrice }}
            {{ orderInfo.coinId === undefined? '':getCashNameById(orderInfo.coinId.split('_')[1]) }}
          </span>
          ,付款参考号:
          <span class="tp-flag">{{ orderInfo.id }}</span>
        </p>
        <div class="tp-pay" v-if="orderInfo.status === '4'">
          <el-button type="primary" @click="confirmToFinish()">确认放行</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </div>
      </div>

      <!-- 卖家未确认 买家已付款 -->
      <div class="to-pay" v-if="!isBuyer && hasPayed">
        <p>
          {{userName}} 已付款，请尽快放行
          <!-- <span class="money-re" -->
          <!-- >{{ orderInfo.amount*orderInfo.dealPrice }}{{ orderInfo.coinId === undefined? '':getCashNameById(orderInfo.coinId.split('_')[1]) }}</span> -->
          ,付款参考号:
          <span class="tp-flag">{{ orderInfo.id }}</span>
        </p>
        <div class="tp-pay">
          <el-button type="primary" @click="confirmToFinish()">确认放行</el-button>
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
    <!-- <div v-else>测试页面 这个页面用来查看自己的广告详情~</div> -->
    <el-dialog
      :visible.sync="paymentShowPanel"
      :before-close="handleClose"
      title="确认付款"
      width="400px"
    >
      <div class="confirm-panel">
        <p>支付金额：</p>
        <p style="font-size:18px;color: #489972;font-weight:600;">223 CNY</p>
        <p>支付方式</p>
        <p>
          <img :src="getPayIcon(currentPayment.paywayId)" style="margin-right:5px;">
          {{getPaywayById(currentPayment.paywayId) === undefined? '' :getPaywayById(currentPayment.paywayId).payName}}
        </p>
        <p
          style="font-weight:600;font-size:18px"
        >{{ currentPayment.pram1 === 'null'? '': currentPayment.pram1 }}</p>
        <p
          style="font-weight:600;font-size:18px"
        >{{ currentPayment.pram2 === 'null'? '': currentPayment.pram2 }}</p>
        <p
          style="font-weight:600;font-size:18px"
        >{{ currentPayment.pram3 === 'null'? '': currentPayment.pram3 }}</p>
        <p class>付款参考号：</p>
        <p style="font-weight:600;font-size:18px">{{orderInfo.id}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmToFinish()">确 定</el-button>
      </span>
    </el-dialog>
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
import {
  order_accept,
  order_publish,
  fbGetPayment,
  fbConfirm,
  fbOrderDetail,
  fbFinish
} from "../../api/coin_trade";
import { mapGetters } from "vuex";
import { sendUserCode, getStatusG } from "../../utils/index";
import { getPayway } from "../../api/user";
export default {
  name: "OrderDetail",
  data() {
    return {
      paymentChoosed: null, //交易方式id
      userName: "",
      currentPayment: {}, //当前用户选择的交易方式
      orderInfo: { user: { name: "" }, direction: "0" }, //交易实体
      advInfo: {}, //广告实体
      question_list: [
        {
          id: 1,
          title: "对方不付款怎么办",
          des: "可以点击撤销或者申诉",
          link: "www.baidu.com"
        },
        {
          id: 2,
          title: "账户余额不足怎么办",
          des: "请充值",
          link: "www.baidu.com"
        },
        {
          id: 3,
          title: "我付了钱，对方不放行怎么办",
          des: "请点击申诉按钮与我们的客服人员进行联系",
          link: "www.baidu.com"
        },
        {
          id: 4,
          title: "buyy8oihb",
          des: "测试问题hvgujb9809题测试问题",
          link: "www.baidu.com"
        }
      ],
      isLoading: true,
      // currentTrade:
      activeNames: ["1"],
      payment_list: [],
      sms: "",
      smsDialog: false,
      isBuyer: false, // 我是买家
      isSelf: false, //订单是我自己的
      publisher: false, //是否是我挂的单
      hasPayed: true, //对方已付款
      paymentShowPanel: false //付款确认按钮
    };
  },
  created() {
    if (!this.$store.state.user.token) {
      this.$router.push({ name: "login" });
    }
    if (this.$route.params.publish == 1) {
      this.publisher = true;
      // console.log("这个单是我挂出去的");
    }
    //  查询订单详情
    if (this.publisher) {
      // 挂单方查询订单详情
      order_publish(this.$route.params.id)
        .then(res => {
          if (res.code === "200") {
            this.advInfo = res.content;
            this.findCurrentTrade(res.content);
            this.isBuyer = this.orderInfo.direction === "1";
            this.isLoading = false;
            if (this.isBuyer) {
              // 购买方获取对方的支付方式
              // console.log(res.content.trades[0].id)
              this.getPay(this.orderInfo.id);
            }
            // 初始化订单状态
            this.hasPayed = this.orderInfo.status === "4";
          }
        })
        .catch(_ => {});
    } else {
      // 接单方查询订单详情
      order_accept(this.$route.params.id)
        .then(res => {
          if (res.code === "200") {
            this.advInfo = res.content;
            // console.log(res.content)
            this.findCurrentTrade(res.content);
            this.isBuyer = this.orderInfo.direction === "0";
            this.isLoading = false;
            if (this.isBuyer) {
              // 购买方获取对方的支付方式

              this.getPay(this.orderInfo.id);
            }
            this.hasPayed = this.orderInfo.status === "4";
          }
        })
        .catch(_ => {});
    }
    if (this.$route.params.direction == "0") {
      this.isBuyer = true;
    } else if (this.$route.params.direction == "1") {
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
  methods: {
    findCurrentTrade(order) {
      // console.log(order)
      for (let tradeItem of order.trades) {
        if (tradeItem.id === order.processId) {
          this.orderInfo = tradeItem; // 初始化页面交易
          // return; // 找到第一个就返回 (默认是第一个排序)
        }
      }
        if (this.publisher) {
          //广告发布者
          console.log('1',order)
  
          this.userName = this.orderInfo.user.name;
        } else {
          //是接单人
          console.log(order)
          this.userName = order.user.name;
        }
      
    },
    getPay(id) {
      fbGetPayment(id).then(res => {
        if (res.code === "200") {
          this.payment_list = res.content;
        } else {
        }
      });
    },
    getStatus(a) {
      return getStatusG(this, a);
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
        if (this.isBuyer) {
          fbConfirm(
            this.$route.params.id,
            // this.$route.params.processId,
            this.sms
          )
            .then(res => {
              if (res.code === "200") {
                this.$notify.success("付款已确认!");
                this.smsDialog = false;
                this.$router.go(-1);
              } else {
              }
            })
            .catch(_ => {});
        } else {
          fbFinish(
            this.$route.params.id,
            // this.$route.params.processId,
            this.sms
          )
            .then(res => {
              if (res.code === "200") {
                this.$notify.success("订单已确认!");
                this.smsDialog = false;
                this.$router.go(-1);
              } else {
              }
            })
            .catch(_ => {});
        }
      }
    },
    handlePay() {
      // if (this.isBuyer) {
        if (this.paymentChoosed === null) {
          this.$alert("您必须选择一种支付方式");
          return false;
        } else {
          // 查询对方的支付信息
          // this.currentPayment = getPaywayById(this.paymentChoosed)
          for (let item of this.payment_list) {
            if (item.paywayId === this.paymentChoosed) {
              this.currentPayment = item;
            }
          }
          // console.log(this.paymentChoosed)
          this.paymentShowPanel = true;
        }
      // } else {
        // this.();
      // }
    },
    confirmToFinish() {
      this.smsDialog = true;
      this.sendCode();
    },
    handleClose(done) {
      this.$confirm(this.$t("confirmToClose"))
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
  padding: 110px 0;
}
.confirm-panel {
  p {
    line-height: 40px;
  }
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
    line-height: 32px;
    margin: 30px 0 24px;
    padding-right: 50px;
    font-size: 18px;
    font-weight: 600;
    .time-left {
      color: #dc2b2b;
    }
    .money-re {
      color: #489972;
    }
    .tp-pay {
      margin: 20px 0;
    }
  }
  .to-question {
    margin: 60px 0 0 0;
  }
}
</style>
