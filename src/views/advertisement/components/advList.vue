<template>
  <div class="adv-list">
    <div class="adv-inner">
      <div style="display:flex; justify-content: space-between;">
        <div class="adv-title">{{$t('fb.myAdv')}}</div>
        <div class="adv-group">
          <el-button @click="goToOrder()" round>{{$t('fb.myOrder')}}</el-button>
        </div>
      </div>
      <adv-choice @orderChange="orderChange"></adv-choice>

      <div class="adv-table" v-loading="pageLoading">
        <el-table v-loading="isLoading" height="600px" :data="orderData" stripe style="width: 100%">
          <el-table-column width="200px" :label="$t('fb.advNo')">
            <template slot-scope="scope">
              <span class="order-no">{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" :label="$t('fb.advType')">
            <template slot-scope="scope">{{ scope.row.direction === '0'? $t('buy'): $t('sell') }}</template>
          </el-table-column>
          <el-table-column prop="name" :label="$t('fb.coinType')">
            <template slot-scope="scope">{{ getCoinNameByIDUp(scope.row.coinId) }}</template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('exchange.main.amount')">
            <template slot-scope="scope">{{ scope.row.amount }}</template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('fb.limit')">
            <template slot-scope="scope">{{ scope.row.min }}-{{ scope.row.max }}</template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('fb.cashType')">
            <template slot-scope="scope">{{ getCashNameById(scope.row.cashId) }}</template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('price')">
            <template slot-scope="scope">{{ scope.row.price }}</template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('exchange.main.status')">
            <template slot-scope="scope">{{ getTradeStatus(scope.row) }}</template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('createTime')" width="200px">
            <template slot-scope="scope">{{parseTime(scope.row.updateDate) }}</template>
          </el-table-column>
          <el-table-column width="260px" prop="address" :label="$t('exchange.main.operation')">
            <template slot-scope="scope">
              <el-button @click="checkDetail(scope.row.id)" type="primary" size="mini">{{$t('fb.checkTradeDetail')}}</el-button>
              <el-button
                v-if="scope.row.status !== '3'"
                @click="repeal(scope.row)"
                size="mini"
              >{{$t('repeal')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :title="$t('fb.orderList')" width="1000px" :visible.sync="ordersVisible">
      <el-table hight="400" :data="detailData" class="inner-table">
        <el-table-column :label="$t('fb.direction')" width="60px">
          <template slot-scope="scope">{{scope.row.direction === '0'? $t('sell'):$t('buy')}}</template>
        </el-table-column>
        <el-table-column :label="$t('fb.tradeTotal')" prop width="120px">
          <template
            slot-scope="scope"
          >{{scope.row.dealPrice}}{{getCashNameById(scope.row.coinId.split("_")[1])}}</template>
        </el-table-column>
        <el-table-column :label="$t('exchange.main.status')" prop="dealPrice" width="100px">
          <template slot-scope="scope">{{ getState(scope.row.status)}}</template>
        </el-table-column>

        <el-table-column :label="$t('exchange.main.time')" prop="dealPrice" width="180px">
          <template slot-scope="scope">{{ parseTime(scope.row.updateDate)}}</template>
        </el-table-column>
        <el-table-column :label="$t('fb.tradeTarget')" prop="direction">
          <template slot-scope="scope">{{ scope.row.user.name}}</template>
        </el-table-column>
        <el-table-column :label="$t('fb.contant')" prop="direction">
          <template slot-scope="scope">{{ scope.row.user.mobile}}</template>
        </el-table-column>
        <el-table-column :label="$t('exchange.main.operation')" width="200px" prop="dealPrice">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === '9'&& scope.row.direction ==='1' "
              size="mini"
              type="primary"
              @click="pass(scope.row)"
            >{{$t('fb.pay')}}</el-button>
            <el-button
              v-if="scope.row.status === '4'&& scope.row.direction ==='0'"
              size="mini"
              type="primary"
              @click="pass(scope.row)"
            >{{$t('fb.pass')}}</el-button>
            <el-button size="mini" type="warning" @click="appeal(scope.row)">{{$t('appeal')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog
      :title="$t('fb.passTitle')"
      :visible.sync="smsDialog"
      width="400px"
      :before-close="handleClose"
    >
      <el-form>
        <el-form-item :label="$t('fb.captcha')">
          <el-input v-model="code"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="smsDialog = false">{{$t('canceled')}}</el-button>
        <el-button type="primary" @click="confirm()">{{$t('confirm')}}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="$t('fb.appealTitle')"
      :visible.sync="appealVisible"
      width="400px"
      :before-close="handleClose"
    >
      <el-form label-position="top" v-model="appealForm">
        <el-form-item style="width:100%" :label="$t('fb.appReason')">
          <el-input v-model="appealForm.reason"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fb.appType')">
          <el-select style="width:100%" v-model="appealForm.type">
            <el-option :label="$t('fb.app0')" value="0"></el-option>
            <el-option :label="$t('fb.app1')" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="appealVisible = false">{{$t('cancel')}}</el-button>
        <el-button type="primary" @click="submitAppeal()">{{$t('confirm')}}</el-button>
      </span>
    </el-dialog>

    <div class="mpagination">
      <el-pagination
        :page-count="total"
        :current-page.sync="page"
        class
        background
        layout="prev, pager, next"
      />
    </div>
  </div>
</template>

<script>
import {
  fbOrders,
  fbCancel,
  fbAppeal,
  fbConfirm,
  fbFinish,
  order_publish
} from "../../../api/coin_trade";
import { mapGetters, mapState } from "vuex";
import { parseTime, sendUserCode } from "../../../utils";
import advChoice from "../../../components/advChoice";

export default {
  name: "AdvList",
  components: { advChoice },
  data() {
    return {
      pageLoading: false,
      isLoading: true,
      ordersVisible: false,
      detailData: [],
      orderData: [],
      smsDialog: false,
      appealVisible: false,
      code: null,
      appealForm: {
        id: "",
        processId: "",
        reason: "",
        type: "0"
      },
      currentOrder: {
        id: "-1",
        direction: "-1"
      },
      total: 0,
      page: 0,
      chooseForm: {
        direction: "",
        page: 0,
        size: 10,
        coinId: "2",
        cashId: "3",
        state: "",
        time: "",
        start: "",
        end: "",
        order: "1"
      }
    };
  },
  created() {
    //  初始化广告列表
    this.init();
  },
  methods: {
    getTradeStatus(order) {
      if (order.trades === null) {
        return this.getState(order.status);
      } else {
        return order.trades[order.trades.length - 1].status;
      }
    },
    checkDetail(id) {
      this.pageLoading = true;
      order_publish(id)
        .then(res => {
          if (res.content.trades instanceof Array) {
            this.detailData = res.content.trades;
          }
          this.ordersVisible = true;
          this.pageLoading = false;
        })
        .catch(_ => {});
    },
    orderChange(s) {
      this.pageLoading = true;
      this.chooseForm = s;
      this.orderData = [];
      (this.page = 0),
        fbOrders(
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
            this.pageLoading = false;
            if (res.content.records instanceof Array) {
              this.orderData = res.content.records;
            }
          })
          .catch(_ => {
            this.pageLoading = false;
          });
    },
    init() {
      this.isLoading = true;
      fbOrders(
        this.page,
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
          this.total = res.content.pages;
          this.orderData = [];
          if (res.content.records instanceof Array) {
            this.orderData = res.content.records;
            this.total = res.content.pages;
          }
          this.isLoading = false;
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
            fbCancel(order.id).then(res => {
              // this.
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
      // console.log(this.currentOrder);
      fbAppeal(
        this.currentOrder.orderId,
        this.currentOrder.id,
        this.appealForm.reason,
        this.appealForm.type
      )
        .then(res => {
          this.appealVisible = false;
          if (res.code === "200") {
            this.$notify.success(this.$t("appealSuccess"));
          } else {
            this.$notify.error(this.$t("appealFailed"));
          }
        })
        .catch(_ => {
          this.$notify.error(this.$t("appealFailed"));
        });
    },
    pass(order) {
      // if(order.direction)
      // 我是求购方 且我是挂单方
      this.$router.push({
        name: "orderDetail",
        params: { id: order.orderId, publish: "1" }
      });
      if (order.direction == "0") {
        // this.confirm();
      } else {
        this.currentOrder = order;
        sendUserCode(this);
      }
    },
    confirm() {
      this.$router.push({
        name: "orderDetail",
        params: { id: order.id, publish: "1" }
      });

      if (this.currentOrder.direction === "-1") {
        return;
      } else if (this.currentOrder.direction === "0") {
        // 此单为买入单
        fbConfirm(this.currentOrder.id, this.code)
          .then(res => {
            if (res.code === "200") {
              this.$notify.success($t("fb.dealFinished"));
              this.smsDialog = false;
              this.init();
            } else {
              this.smsDialog = false;
              this.init();
              // console.log(res);
            }
          })
          .catch(_ => {
            this.smsDialog = false;
            this.init();
          });
      } else if (this.currentOrder.direction === "1") {
        // 此单为卖出单
        fbFinish(this.currentOrder.id, this.code)
          .then(res => {
            if (res.code === "200") {
              this.$notify.success($t("fb.dealFinished"));
              this.smsDialog = false;
              this.init();
            } else {
              console.log(res);
              this.smsDialog = false;
              this.init();
            }
          })
          .catch(_ => {
            this.smsDialog = false;
            this.init();
          });
      }
    },
    goToOrder() {
      this.$router.push({ name: "advList" });
    },
    handleClose(done) {
      this.$confirm(this.$t("confirmToClose"))
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
      fbOrders(
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
          if (res) {
            this.total = res.content.pages;
            this.orderData = [];
            if (res.content.records instanceof Array) {
              this.orderData = res.content.records;
            }
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
  .el-table__expanded-cell[class*="cell"] {
    // padding: 10px 0;
  }

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
      td,
      th {
        // padding: 1px
      }
      // background-color: #1b1e2e;
      .cell {
        white-space: pre;
        overflow: hidden;
        font-size: 12px;
        // font-size: 14px;
        a:hover {
          color: #357ce1;
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
