<template>
  <div class="trade-content">
    <div class="trade-nav">{{this.$t('navbar.trade')}}</div>
    <div class="trade-selects">
      <div class="coin-choice">
        <fbChoice class="temp-choicer" @orderChange="ChangeOrder"></fbChoice>
      </div>
      <div class="bottom-groups">
        <el-button @click="goToAdv()" round>{{$t('fb.pubAdv')}}</el-button>
        <el-button @click="checkMyAdv()" round>{{$t('fb.myAdv')}}</el-button>
      </div>
    </div>
    <order-list :merchantList="merchantList"></order-list>

    <!-- 分页 -->
    <div class="mpagination">
      <el-pagination
        :page-count="Math.ceil(total/10)"
        :current-page.sync="page"
        class
        @current-change="pageChange"
        background
        layout="prev, pager, next"
      />
    </div>
  </div>
</template>

<script>
import { change_nickname } from "@/api/user";
import { getAvatarColor, sendUserCode } from "../../../utils/index";
import fbChoice from "../../../components/fbChoice";
import orderList from "../../../components/orderList";
// import paymentIcon from "./paymentIcon";
import { fbList, fbTrade } from "../../../api/coin_trade";
// import { sendCaptcha1, getCaptcha } from '../../../api/user'
import { mapGetters } from "vuex";
export default {
  name: "TradeContent",
  components: {
    // paymentIcon,
    fbChoice,
    orderList
  },
  data() {
    return {
      merchantList: [],
      page: 0,
      total: 0,
      payments: "all",
      onePageNum: 10, // 一页显示10个
      chooseForm: {
        page: 0,
        size: 10,
        direction: "1",
        payments: "all",
        coinId: "4",
        cashId: "3"
      },
      
      direction: "0"
      
    };
  },
  created() {
    // 拉取商家列表
    this.getMerchantList(0, 10, 0, "all", "2", "3");
    // 如果用户已经登录 就拉取个人信息（验证码需要国籍信息）
  },
  methods: {
    ChangeOrder(s) {
      this.chooseForm = s;
      this.getMerchantList(0, 10, s.direction, s.payments, s.coinId, s.cashId);
    },
    getMerchantList(page, size, direction, payments, coinId, cashId) {
      this.merchantList = [];
      fbList(page, size, direction, payments, coinId, cashId)
        .then(res => {
          if (res.code === "200") {
            const content = res.content;
            this.total = content.total;
            if (content.records instanceof Array) {
              this.merchantList = content.records;
            }
          }
        })
        .catch(_ => {});
    },
    
    pageChange(page) {
      let s = this.chooseForm;
      fbList(page, 10, s.direction, s.payments, s.coinId, s.cashId)
        .then(res => {
          if (res.code === "200") {
            const content = res.content;
            this.total = content.total;
            if (content.records instanceof Array) {
              this.merchantList = content.records;
            }
          }
        })
        .catch(_ => {});
    },

    goToAdv() {
      this.$router.push({ name: "advertising" });
    },
    checkMyAdv() {
      this.$router.push({ name: "tradeOrder" });
    }
  },
};
</script>

<style lang="scss" scoped>
.search-box {
  text-align: right;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
}
.trade-nav {
  font-size: 28px;
  font-weight: 500;
  margin-top: 30px;
}
.trade-selects {
  display: flex;
  justify-content: space-between;
}
.trade-content {
  width: 1200px;
  margin: auto;
  padding-bottom: 50px;
  .el-dialog {
    z-index: 2001;
    position: relative;
    @media (max-width: 768px) {
      width: 90%;
    }
    /*i {*/
    /*font-size: 30px;*/
    /*color: #55a532;*/
    /*}*/
  }
  .mpagination {
    display: flex;
    margin-top: 40px;
    width: 100%;
    /*align-content: center;*/
    /*align-items: center;*/
    .el-pagination {
      margin: auto;
    }
  }
}
</style>
