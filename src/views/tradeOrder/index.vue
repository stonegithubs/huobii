<template>
  <div class="adv-list" v-loading="pageLoading">
    <div class="adv-inner">
      <div style="display:flex; justify-content: space-between;">
        <div class="adv-title">{{$t('fb.myOrder')}}</div>
        <div class="adv-group">
          <el-button @click="goToAdv()" round>{{$t('fb.myAdv')}}</el-button>

          <!-- <order-choice @directionChange="newDirection"></order-choice> -->
        </div>
      </div>
      <orderChoice @orderChange="orderChange"></orderChoice>

      <div class="adv-table">
        <el-table v-loading="isLoading" height="600px" :data="orderData" stripe style="width: 100%">
          <el-table-column width="150px" :label="$t('order.orderNo')">
            <template slot-scope="scope">
              <span class="order-no">
                <router-link v-if="scope.row.status === '4' || scope.row.status === '9'"
                  :to="{ name:'orderDetail', params: { id: scope.row.orderId, publish: '0'}}"
                >{{ scope.row.orderId }}</router-link>
                <span v-else>{{ scope.row.orderId }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column width="110px" prop="date" :label="$t('fb.tradeType')">
            <template
              slot-scope="scope"
            >{{ scope.row.direction === '0'? $t('buy'): $t('sell') }} {{ scope.row.amount }} {{ getCoinNameByIDUp(scope.row.coinId.split('_')[0]) }}</template>
          </el-table-column>
          <el-table-column width="110px" prop="name" :label="$t('fb.total')">
            <template
              slot-scope="scope"
            >{{ (scope.row.dealPrice*scope.row.amount).toFixed(2) }}{{ getCashNameById(scope.row.coinId.split('_')[1]) }}</template>
          </el-table-column>
          <el-table-column width="110px" prop="address" :label="$t('price')">
            <template
              slot-scope="scope"
            >{{ scope.row.dealPrice.toFixed(2) }} {{ getCashNameById(scope.row.coinId.split('_')[1]) }}</template>
          </el-table-column>
          <el-table-column width="110px" prop="address" :label="$t('order.fee')">
            <template
              slot-scope="scope"
            >{{scope.row.fee.toFixed(2)}} {{ getCoinNameByIDUp(scope.row.coinId.split('_')[0]) }}</template>
          </el-table-column>
          <el-table-column width="150px" prop="address" :label="$t('createTime')">
            <template slot-scope="scope">{{parseTime(scope.row.order.updateDate) }}</template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('exchange.main.status')">
            <template slot-scope="scope">{{ getState(scope.row.order.status) }}</template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('fb.tradeTarget')">
            <template slot-scope="scope">{{ scope.row.order.user.name }}</template>
          </el-table-column>

          <el-table-column prop="address" width="250px" :label="$t('exchange.main.operation')">
            <template slot-scope="scope">
              <el-button size="mini" type="warning" @click="appeal(scope.row)">{{$t('fb.repeal')}}</el-button>
              <!-- 我是买家 我接了单 还未付款 我可以撤销、付款 -->
              <el-button
                v-if="scope.row.status === '0'|| scope.row.status === '9'"
                @click="repeal(scope.row)"
                size="mini"
              >{{$t('repeal')}}</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="pass(scope.row)"
                v-if="scope.row.direction == '0' && scope.row.status === '9'"
              >{{$t('fb.pay')}}</el-button>
              <!-- 我是卖家 我接了单 等对方付款 我可以撤销、申诉 或者等时间到期 -->
              <!-- 我是买家 我接了单 对方已付款  -->
              <el-button
                v-if="scope.row.direction === '1' && scope.row.status ==='4'"
                type="primary"
                size="mini"
                @click="pass(scope.row)"
              >{{$t('fb.pass')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      :title="$t('fb.passTitle')"
      :visible.sync="smsDialog"
      width="400px"
      :before-close="handleClose"
    >
      <el-form>
        <!-- <el-form-item label="过程编号">
          <el-input v-model="processId"></el-input>
        </el-form-item>-->
        <el-form-item :label="$t('captcha')">
          <el-input v-model="code"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="smsDialog = false">{{$t('cancel')}}</el-button>
        <el-button type="primary" @click="confirm()">{{$t('confirm')}}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="$t('fb.appealTitle')"
      :visible.sync="appealVisible"
      width="400px"
      :before-close="handleClose"
    >
      <el-form v-model="appealForm">
        <!-- <el-form-item label="过程编号">
          <el-input v-model="appealForm.processId"></el-input>
        </el-form-item>-->
        <el-form-item :label="$t('fb.appReason')">
          <el-input v-model="appealForm.reason"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fb.appType')">
          <el-select style="width:100%" v-model="appealForm.type" :placeholder="$t('fb.appTip')">
            <el-option :label="$t('fb.app0')" value="0"></el-option>
            <el-option :label="$t('fb.app1')" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="appealVisible = false">{{$t('canceled')}}</el-button>
        <el-button type="primary" @click="submitAppeal()">{{$t('confirm')}}</el-button>
      </span>
    </el-dialog>
    <div class="mpagination">
      <el-pagination
        :page-count="Math.ceil(total/10)"
        :current-page.sync="page"
        class
        background
        layout="prev, pager, next"
        @current-change="pageChange"
      />
    </div>
  </div>
</template>

<script>
import {
  // fbOrders,
  fbCancel,
  fbAppeal,
  fbConfirm,
  fbFinish,
  fbJdOrders
} from "../../api/coin_trade";
import { mapGetters, mapState } from "vuex";
import { parseTime, sendUserCode } from "../../utils";
import orderChoice from "../../components/orderChoice";
import fbChoice from "@/components/fbChoice";

export default {
  name: "AdvList",
  components: { orderChoice, fbChoice },
  data() {
    return {
      isLoading: false,
      orderData: [],
      pageLoading: false,
      smsDialog: false,
      appealVisible: false,
      code: null,
      appealForm: {
        id: "",
        processId: "",
        reason: "",
        type: '0'
      },
      currentOrder: {
        id: "-1",
        direction: "-1"
      },
      total: 0,
      page: 0,
      chooseForm: {
        page: 0,
        size: 10,
        direction: "",
        coinId: "2",
        cashId: "3",
        state: "10",
        time: "",
        start: "2018-10-10",
        end: "2019-10-10",
        order: "0"
      }
    };
  },
  created() {
    if (!this.$store.state.user.token) {
      this.$router.push({ name: "login" });
    }
    this.init();
  },
  methods: {
    // orderChange(s){
    //   console.log(s)
    // },
    pageChange(a) {
      console.log(a);
    },
    orderChange(s) {
      this.chooseForm = s;
      this.orderData = [];
      (this.pageLoading = true),
        fbJdOrders(
          0,
          10,
          s.direction,
          s.coinId,
          s.cashId,
          s.state,
          s.time[0],
          s.time[1],
          1
        )
          .then(res => {
            if (res.content.records instanceof Array) {
              this.orderData = res.content.records;
            }
            this.pageLoading = false;
          })
          .catch(_ => {
            this.pageLoading = false;
          });
    },
    init() {
      this.isLoading = true;

      fbJdOrders(
        this.chooseForm.page,
        this.chooseForm.size,
        this.chooseForm.direction,
        this.chooseForm.coinId,
        this.chooseForm.cashId,
        this.chooseForm.state,
        this.chooseForm.start,
        this.chooseForm.end,
        this.chooseForm.order
      )
        .then(res => {
          this.isLoading = false;
          this.total = res.content.total;
          this.orderData = [];
          if (res.content.records instanceof Array) {
            this.orderData = res.content.records;
          }
        })
        .catch(_ => {
          this.isLoading = false;
        });
    },
    getState(state) {
      switch (state) {
        case "0":
          return this.$t("fb.status0");
        case "1":
          return this.$t("fb.status1");
        case "2":
          return this.$t("fb.status2");
        case "3":
          return this.$t("fb.status3");
        case "4":
          return this.$t("fb.status4");
        case "5":
          return this.$t("fb.status5");
        case "8":
          return this.$t("fb.status8");
        case "9":
          return this.$t("fb.status9");
      }
    },
    parseTime(timeStamp) {
      return parseTime(timeStamp);
    },
    repeal(order) {
      this.$alert(this.$t("fb.confirmToRepealAdv"), this.$t("fb.advCancel"), {
        confirmButtonText: this.$t("confirm"),
        cancelButtonText: this.$t("cancel"),
        callback: action => {
          if (action == "confirm") {
            // console.log(order)
            // return 
            fbCancel(order.order.processId).then(res => {
              if (res.code === "200") {
                this.$notify.success(this.$t("repealSuccess"));
              } else {
                this.$notify.success(this.$t("repealFailed"));
              }
              this.init();
            });
          } else if (action == "cancel") {
            return false;
          }
        }
      });
    },
    appeal(order) {
      this.currentOrder = order;
      this.appealVisible = true;
    },
    submitAppeal() {
      fbAppeal(
        this.currentOrder.orderId,
        this.currentOrder.id,
        this.appealForm.reason,
        this.appealForm.type
      )
        .then(res => {
          this.appealVisible = false;
          if (res.code === "200") {
            this.$notify.success(this.$t("fb.appealSuccess"));
          } else {
            this.$notify.error(this.$t("fb.appealSuccess"));
          }
        })
        .catch(_ => {
          this.$notify.error(this.$t("fb.appealSuccess"));
        });
    },
    pass(order) {
      // if(order.direction)
      // 我是买家
      this.$router.push({
        name: "orderDetail",
        params: { id: order.orderId, publish: "0" }
      });
    },
    confirm() {
      this.$router.push({
        name: "orderDetail",
        params: { id: order.orderId, publish: "0" }
      });
      // if (this.currentOrder.direction === "-1") {
      //   return;
      // } else if (this.currentOrder.direction === "0") {
      //   // 此单为买入单
      //   fbConfirm(this.currentOrder.orderId, this.code).then(res => {
      //     if (res.code === "200") {
      //       this.$notify.success(this.$t('fb.dealFinished'));
      //       this.smsDialog = false
      //       this.init();
      //     } else {
      //       console.log(res);
      //       this.smsDialog = false
      //       this.init();
      //     }
      //   }).catch(_=>{
      //     this.smsDialog = false
      //       this.init();
      //   });
      // } else if (this.currentOrder.direction === "1") {
      //   // 此单为卖出单
      //   fbFinish(this.currentOrder.orderId, this.code).then(res => {
      //     if (res.code === "200") {
      //       this.$notify.success(this.$t('fb.dealFinished'));
      //       this.smsDialog = false
      //       this.init();
      //     } else {
      //       console.log(res);
      //       this.smsDialog = false
      //       this.init();
      //     }
      //   }).catch(_=>{
      //     this.smsDialog = false
      //       this.init();
      //   });
      // }
    },
    handleClose(done) {
      this.$confirm(this.$t("confirmToClose"))
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    goToAdv() {
      this.$router.push({ name: "tradeOrder" });
    }
  },
  computed: {
    ...mapGetters([
      "getCoinNameByIDUp",
      "getCashNameById",
      "getSupportCoin",
      "getSupportCash"
    ])
  },
  watch: {
    page(page) {
      let s = this.chooseForm;
      this.isLoading = true;
      fbJdOrders(
        page,
        10,
        s.direction,
        s.coinId,
        s.cashId,
        s.state,
        s.time[0],
        s.time[1],
        1
      )
        .then(res => {
          this.isLoading = false;
          this.total = res.content.total;
          this.orderData = [];
          if (res.content.records instanceof Array) {
            this.orderData = res.content.records;
          }
        })
        .catch(_ => {
          this.isLoading = false;
        });
    }
    // direction() {
    //   this.init();
    // },
    // coinId() {
    //   this.init();
    // },
    // cashId() {
    //   this.init();
    // },
    // state() {
    //   this.init();
    // }
  }
};
</script>

<style lang="scss" scoped>
.adv-list /deep/ {
  background-color: #fff;
  min-height: 800px;
  padding: 50px 0;
  .adv-group {
    display: flex;
    .el-button {
      margin: 0 20px;
      height: 40px;
    }
  }
  .mpagination {
    margin-top: 30px;
    text-align: center;
  }
  .adv-inner {
    width: 1200px;
    margin: auto;
    .adv-title {
      font-size: 28px;
      font-weight: 500;
      margin-bottom: 30px;
    }
    .el-table {
      // background-color: #1b1e2e;
      .cell {
        white-space: pre;
        overflow: hidden;
        font-size: 12px;
        a:hover {
          color: #357ce1;
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
