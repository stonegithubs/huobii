<template>
  <div class="trade-order-wrapper">
    <div class="trade-order">
      <div class="to-info">
        <span class="font12 font-gray">订单：{{ this.orderInfo.order_id }}</span>
        <div
          class="ti-order-message"
        >您向测试用户购买 测试数据 测试币种</div>
        <div class="order-info">
          <div>
            <span>单价:</span>
            {{ orderInfo.price }} {{ orderInfo.coinType }}
          </div>
          <div>
            <span>总价:</span>
            {{ orderInfo.total }}
          </div>
        </div>
      </div>
      <div class="to-payment">
        <div class="tp-tip">
          <div style="font-size:22px;margin:20px 0;">卖方收款方式</div>
          <div v-for="item in payment_list" :key="item.id" class="payment-item">
            <!-- <i class="el-icon-success"/> -->
            <div>
              <i style="margin:0 4px;" :class="'iconfont icon-'+getIcon(item.paywayId)"></i>
              {{ getPaywayById(item.paywayId).payName }}
            </div>
            <div>
              <span>{{ item.pram1 }}</span>
              
              <span>{{ item.pram2 }}</span>
              <span>{{ item.pram3 }}</span>
            </div>
            <!-- 认证 -->
          </div>
        </div>
        <!-- <div v-if="orderInfo.isPending" class="tp-list">
          <div v-for="item in orderInfo.target_user.payment_list">
            <span>{{ item.name }}</span> {{ item.payname }}{{ item.cardNo }}
          </div>
        </div>
        <p v-if="orderInfo.isCanceled" class="payment-canceled">订单已失效 支付方式无法查看</p>
        <p v-if="orderInfo.isSuccess" class="payment-success">订单已放行</p>-->
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
          待支付，请于{{ orderInfo.timeLeft }}秒内向测试用户支付
          <span class="tp-price">
            测试数据
            </span> ,付款参考号:
          <span class="tp-flag">{{ this.$route.params.processId }}</span>
        </p>
        <div class="tp-pay">
          <el-button type="primary" @click="handlePay">支付完成</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </div>
      </div>
      <div class="to-question">
        <div class="tq-title">
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
import { fbGetPayment, fbConfirm } from "../../api/coin_trade";
import { sendCaptcha1, getCaptcha } from "../../api/user";
import { mapGetters } from "vuex";
export default {
  name: "OrderDetail",
  data() {
    return {
      orderInfo: {
        // 订单信息
        order_id: this.$route.params.id, // 订单号
        timeLeft: 900 // 订单剩余时间 写死！
      },
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
      ], // 常见问题列表
      activeNames: ["1"],
      payment_list: [],
      sms: "",
      smsDialog: false
    };
  },
  created() {
    console.log(this.$route.params);
    fbGetPayment(this.$route.params.id, this.$route.params.processId).then(
      res => {
        this.payment_list = res.content;
      }
    );
  },
  computed: {
    ...mapGetters(["getPaywayById"])
  },
  mounted() {
    setInterval(() => {
      this.orderInfo.timeLeft--;
    }, 1000);
  },
  methods: {
    finishTrade() {
      if (this.sms !== "") {
        fbConfirm(
          this.$route.params.id,
          this.$route.params.processId,
          this.sms
        ).then(res => {
          if (res.code === "200") {
            this.$notify.success("已确认，等待卖家确认订单");
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
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    sendCode() {
      const country = this.$store.state.user.userInfo.countryCode;
      const phone = this.$store.state.user.userInfo.mobile;
      sendCaptcha1(phone, country)
        .then(res => {
          if (res.code === "200") {
            this.smsDialog = true;
            getCaptcha(phone, country).then(res => {
              this.$notify.success(res.content);
            });
          } else {
            this.$notify.error(this.$t("shitHappens"));
          }
        })
        .catch(_ => {});
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
.trade-order {
  width: 1200px;
  margin: auto;
  .to-info {
    .ti-order-message {
      font-size: 30px;
      font-weight: normal;
      margin: 20px 0;
    }
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
