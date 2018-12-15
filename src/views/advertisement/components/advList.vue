<template>
  <div class="adv-list">
    <div class="adv-inner">
      <div style="display:flex; justify-content: space-between;">
        <div class="adv-title">{{$t('fb.myAdv')}}</div>
        <div class="adv-group">
          <el-button @click="goToOrder()"  round>{{$t('fb.myOrder')}}</el-button>

        <!-- <order-choice @directionChange="newDirection"></order-choice> -->
        </div>
      </div>

      <div class="adv-table">
        <el-table height='600px' :data="orderData" stripe style="width: 100%">
          <el-table-column width="200px" :label="$t('fb.advNo')">
            <template slot-scope="scope">
              <span class="order-no"><!-- <router-link :to="{ name:'orderDetail', params: { id: scope.row.id,direction: scope.row.direction}}">{{ scope.row.id }}</router-link> -->{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" :label="$t('fb.advType')">
            <template slot-scope="scope">{{ scope.row.direction === '0'? '求购': '出售' }}</template>
          </el-table-column>
          <el-table-column prop="name" :label="$t('fb.coinType')">
            <template slot-scope="scope">{{ getCoinNameByIDUp(scope.row.coinId).toUpperCase() }}</template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('exchange.main.amount')">
            <template slot-scope="scope">{{ scope.row.amount }}</template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('fb.limit')">
            <template slot-scope="scope">{{ scope.row.min }}-{{ scope.row.max }}</template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('fb.cashType')">
            <template slot-scope="scope">{{ getCashNameById(scope.row.cashId).toUpperCase() }}</template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('exchange.main.status')">
            <template slot-scope="scope">{{ getState(scope.row.status) }}</template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('createTime')" width="200px">
            <template slot-scope="scope">{{parseTime(scope.row.updateDate) }}</template>
          </el-table-column>
          <el-table-column width="260px" prop="address" :label="$t('exchange.main.operation')">
            <template slot-scope="scope">
              <el-button size="mini" type="warning" @click="appeal(scope.row)">{{$t('appeal')}}</el-button>
              <!-- <el-button type="primary" size="mini" @click="pass(scope.row)" v-if="scope.row.direction == '0' && scope.row.status == '9'">放行</el-button> -->
              <el-button v-if="scope.row.status ==0|| scope.row.status == 9" @click="repeal(scope.row)" size="mini">{{$t('repeal')}}</el-button>
              <!-- 出售方 对方已付款 -->
              <el-button v-if="scope.row.direction == '1' && scope.row.status ==4" type="primary" size="mini" 
              @click="pass(scope.row)">{{$t('fb.pass')}}</el-button>
                 <!-- 求购方 对方已接单 -->
              <el-button v-if="scope.row.direction == '0' && scope.row.status ==9" type="primary" size="mini" 
              @click="pass(scope.row)">{{$t('fb.pay')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :title="$t('fb.passTitle')" :visible.sync="smsDialog" width="400px" :before-close="handleClose">
      <el-form>
        <!-- <el-form-item label="过程编号">
          <el-input v-model="processId"></el-input>
        </el-form-item>-->
        <el-form-item :label="$t('fb.captcha')">
          <el-input v-model="code"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="smsDialog = false">{{$t('cancel')}}</el-button>
        <el-button type="primary" @click="confirm()">{{$t('confirm')}}</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="$t('fb.appealTitle')" :visible.sync="appealVisible" width="400px" :before-close="handleClose">
      <el-form label-position='top' v-model="appealForm">
        <el-form-item style="width:100%" :label="$t('fb.appReason')">
          <el-input v-model="appealForm.reason"></el-input>
        </el-form-item>
        <el-form-item  :label="$t('fb.appType')">
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
  fbOrders,
  fbCancel,
  fbAppeal,
  fbConfirm,
  fbFinish
} from "../../../api/coin_trade";
import { mapGetters, mapState } from "vuex";
import { parseTime, sendUserCode } from "../../../utils";
import orderChoice from "../../../components/orderChoice";

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
        type: '0'
      },
      currentOrder: {
        id: "-1",
        direction: "-1"
      },
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
      ).then(res => {
        this.orderData = [];
        if (res.content.records instanceof Array) {
          this.orderData = res.content.records;
        }
      });
    },
    init() {
      fbOrders(
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
          return this.$t('fb.status0');
        case "1":
          return this.$t('fb.status1');
        case "2":
          return this.$t('fb.status2');
        case "3":
          return this.$t('fb.status3');
        case "4":
          return this.$t('fb.status4');
        case "5":
          return this.$t('fb.status5');
        case "8":
          return this.$t('fb.status8');
        case "9":
          return this.$t('fb.status9');
      }
    },
    parseTime(timeStamp) {
      return parseTime(timeStamp);
    },
    repeal(order) {
      this.$alert(this.$t('fb.confirmToRepealAdv'), this.$t('fb.advCancel'), {
        confirmButtonText:this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        callback: action => {
          if (action == "confirm") {
            fbCancel(order.id).then(res => {
              if (res.code === "200") {
                this.$notify.success(this.$t('repealSuccess'));
              } else {
                this.$notify.success(this.$t('repealFailed'));
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
      console.log(this.currentOrder)
      fbAppeal(
        this.currentOrder.id,
        this.currentOrder.processId,
        this.appealForm.reason,
        this.appealForm.type
      ).then(res => {
        if (res.code === "200") {
          this.$notify.success(this.$t('fb.appealSuccess'));
        } else {
          this.$notify.error(this.$t('fb.appealSuccess'));
        }
      }).catch(_=>{this.$notify.error(this.$t('fb.appealSuccess'));});
    },
    pass(order) {
      // if(order.direction)
      // 我是求购方 且我是挂单方
      if(order.direction == "0"){
        // this.confirm();
        this.$router.push({ name: 'orderDetail', params: { id:order.id,direction: order.direction =='0'?'1':'0'} })
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
        fbConfirm(this.currentOrder.id, this.code).then(res => {
          if (res.code === "200") {
            this.$notify.success($t('fb.dealFinished'));
          } else {
            console.log(res);
          }
        }).catch(_=>{

        });
      } else if (this.currentOrder.direction === "1") {
        // 此单为卖出单
        fbFinish(this.currentOrder.id, this.code).then(res => {
          if (res.code === "200") {
            this.$notify.success($t('fb.dealFinished'));
          } else {
            console.log(res);
          }
        });
      }
    },
     goToOrder(){
      this.$router.push({ name: 'advList'})
    },
    handleClose(done) {
      this.$confirm(this.$t('fb.confirmToClose'))
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
    page(page){
      let s = this.chooseForm;
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
      ).then(res => {
        if(res){
        this.total = res.content.total
        this.orderData = [];
        if (res.content.records instanceof Array) {
          this.orderData = res.content.records;
        }}
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
