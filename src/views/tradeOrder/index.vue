<template>
  <div class="adv-list">
    <div class="adv-inner">
      <div style="display:flex; justify-content: space-between;">
        <div class="adv-title">我的订单</div>
        <order-choice @directionChange="newDirection"></order-choice>
      </div>

      <div class="adv-table">
        <el-table height='600px' :data="orderData" stripe style="width: 100%">
          <el-table-column width="200px" :label="$t('order.orderNo')">
            <template slot-scope="scope">
              <span class="order-no">
                <router-link
                  :to="{ name:'orderDetail', params: { id: scope.row.orderId, direction: scope.row.direction}}"
                >{{ scope.row.orderId }}</router-link>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="订单类型">
            <template slot-scope="scope">{{ scope.row.direction === '0'? '买入': '卖出' }}</template>
          </el-table-column>
          <el-table-column prop="name" label="币种">
            <template slot-scope="scope">{{ getCoinNameByIDUp(scope.row.coinId.split('_')[0]).toUpperCase() }}</template>
          </el-table-column>
          <el-table-column prop="address" label="数量">
            <template slot-scope="scope">{{ scope.row.amount }}</template>
          </el-table-column>
          <el-table-column prop="address" label="法币币种">
            <template slot-scope="scope">{{ getCashNameById(scope.row.coinId.split('_')[1]).toUpperCase() }}</template>
          </el-table-column>
          <el-table-column prop="address" label="状态">
            <template slot-scope="scope">{{ getState(scope.row.status) }}</template>
          </el-table-column>
          <el-table-column prop="address" label="创建时间" width="200px">
            <template slot-scope="scope">{{parseTime(scope.row.updateDate) }}</template>
          </el-table-column>
          <el-table-column width="250px" prop="address" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="warning" @click="appeal(scope.row)">申诉</el-button>
              <el-button type="primary" size="mini" @click="pass(scope.row)" v-if="scope.row.direction == '0' && scope.row.status == '9'">付款</el-button>

              <div style="display:inline-block" v-if="scope.row.status ==4">
                <el-button 
                  v-if="scope.row.direction == '1'"
                  type="primary" size="mini"
                  @click="pass(scope.row)"
                >放行</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="订单放行" :visible.sync="smsDialog" width="400px" :before-close="handleClose">
      <el-form>
        <!-- <el-form-item label="过程编号">
          <el-input v-model="processId"></el-input>
        </el-form-item>-->
        <el-form-item label="验证码">
          <el-input v-model="code"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="smsDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="订单申訴" :visible.sync="appealVisible" width="400px" :before-close="handleClose">
      <el-form v-model="appealForm">
        <!-- <el-form-item label="过程编号">
          <el-input v-model="appealForm.processId"></el-input>
        </el-form-item> -->
        <el-form-item label="申诉理由">
          <el-input v-model="appealForm.reason"></el-input>
        </el-form-item>
        <el-form-item label="申诉类型">
          <el-select v-model="appealForm.type" placeholder="请选择申诉类型">
            <el-option label="对方不放行" value="0"></el-option>
            <el-option label="交易数量不正确" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="appealVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAppeal()">确 定</el-button>
      </span>
    </el-dialog>
    <div class="mpagination">
      <el-pagination
        :page-count="Math.ceil(total/10)"
        :current-page.sync ="page"
        class=""
        background
        layout="prev, pager, next"
        @current-change="pageChange"/>
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

export default {
  name: "AdvList",
  components: { orderChoice },
  data() {
    return {
      orderData: [],
      smsDialog: false,
      appealVisible: false,
      code: null,
      appealForm: {
        id: "",
        processId: "",
        reason: "",
        type: 0
      },
      currentOrder: {
        id: "-1",
        direction: "-1"
      },
      stateList: [
        { id: "0", name: "挂单中" },
        { id: "1", name: "部分完成" },
        { id: "3", name: "用户撤销" },
        { id: "8", name: "历史纪录" },
        { id: "9", name: "交易中" },
        { id: "10", name: "全部" }
      ],
      total: 0,
      page: 0,
       chooseForm: {
        direction: "10",
        page: 0,
        size: 10,
        direction: "10",
        coinId: "2",
        cashId: "3",
        state: "10",
        time: '',
        start: "2018-10-10",
        end: "2019-10-10",
        order: "0"
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    pageChange(a){
      console.log(a)
    },
    newDirection(s){
      this.chooseForm = s
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
      ).then(res => {
        this.orderData = [];
        if (res.content.records instanceof Array) {
          this.orderData = res.content.records;
        }
      });
    },
    init() {
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
      ).then(res => {
        this.total = res.content.total
        this.orderData = [];
        if (res.content.records instanceof Array) {
          this.orderData = res.content.records;
        }
      });
    },
    getState(state) {
      switch (state) {
        case "0":
          return "挂单中";
        case "1":
          return "部分成交";
        case "2":
          return "已完成";
        case "3":
          return "已撤销";
        case "4":
          return "买家已付款";
        case "5": 
          return "买家已撤销";
        case "8":
          return "历史纪录";
        case "9":
          return "交易中";
      }
    },
    parseTime(timeStamp) {
      return parseTime(timeStamp);
    },
    repeal(order) {
      this.$alert("确定要撤销吗", "广告撤销", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        callback: action => {
          if (action == "confirm") {
            fbCancel(order.id).then(res => {
              if (res.code === "200") {
                this.$notify.success("撤销成功");
              } else {
                this.$notify.success("撤销失败");
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
      ).then(res => {
        if (res.code === "200") {
          this.$notify.success("申诉成功");
        } else {
          this.$notify.error("申诉失败");
        }
      });
    },
    pass(order) {
      // if(order.direction)
      if(order.direction == "0"){
        this.$router.push({ name: 'orderDetail', params: { id:order.id,direction: order.direction} })
      }else{
        this.currentOrder = order;
        sendUserCode(this);
      }
    },
    confirm() {
      if (this.currentOrder.direction === "-1") {
        return;
      } else if (this.currentOrder.direction === "0") {
        // 此单为买入单
        fbConfirm(this.currentOrder.orderId, this.code).then(res => {
          if (res.code === "200") {
            this.$notify.success("交易完成");
          } else {
            console.log(res);
          }
        });
      } else if (this.currentOrder.direction === "1") {
        // 此单为卖出单
        fbFinish(this.currentOrder.orderId, this.code).then(res => {
          if (res.code === "200") {
            this.$notify.success("交易完成");
          } else {
            console.log(res);
          }
        });
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
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
    ]),
    directionOption() {
      let option = [
        {
          direction: "0",
          name: "买入"
        },
        {
          name: "卖出",
          direction: "1"
        },
        {
          name: "全部",
          direction: "10"
        }
      ];
      return option;
    }
  },
  watch: {
    page(page){
      let s = this.chooseForm;
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
      ).then(res => {
        this.total = res.content.total
        this.orderData = [];
        if (res.content.records instanceof Array) {
          this.orderData = res.content.records;
        }
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
        font-size: 14px;
        a:hover {
          color: #357ce1;
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
