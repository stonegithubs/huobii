<template>
  <div class="adv-list">
    <div class="adv-inner">
      <div class="adv-title">我的订单</div>
      <!-- <order-choice></order-choice> -->
      <el-select v-model="direction" placeholder="交易方向">
        <el-option
          v-for="item in directionOption"
          :key="item.name"
          :label="item.name"
          :value="item.direction"
        >{{ item.name}}</el-option>
      </el-select>
      <el-select v-model="coinId" placeholder="货币类型">
        <el-option
          v-for="item in getSupportCoin"
          :key="item.abbr"
          :label="item.abbr"
          :value="item.id"
        >{{ item.abbr}}</el-option>
      </el-select>
      <el-select v-model="cashId" placeholder="法币类型">
        <el-option
          v-for="item in getSupportCash"
          :key="item.abbr"
          :label="item.abbr"
          :value="item.id"
        >{{ item.abbr}}</el-option>
      </el-select>

      <div class="adv-table">
        <el-table :data="orderData" stripe style="width: 100%">
          <el-table-column prop="date" label="广告类型" width="180">
            <template slot-scope="scope">{{ scope.row.direction === '0'? '买入': '卖出' }}</template>
          </el-table-column>
          <el-table-column prop="name" label="币种" width="180">
            <template slot-scope="scope">{{ getCoinNameByID(scope.row.coinId).toUpperCase() }}</template>
          </el-table-column>
          <el-table-column prop="address" label="数量">
            <template slot-scope="scope">{{ scope.row.amount }}</template>
          </el-table-column>
          <el-table-column prop="address" label="订单限额">
            <template slot-scope="scope">{{ scope.row.min }}-{{ scope.row.max }}</template>
          </el-table-column>
          <el-table-column prop="address" label="法币币种">
            <template slot-scope="scope">{{ getCashNameById(scope.row.cashId).toUpperCase() }}</template>
          </el-table-column>
          <el-table-column prop="address" label="状态">
            <template slot-scope="scope">{{ getState(scope.row.status) }}</template>
          </el-table-column>
          <el-table-column prop="address" label="创建时间" width="200px">
            <template slot-scope="scope">{{parseTime(scope.row.updateDate) }}</template>
          </el-table-column>
          <el-table-column width="200px" prop="address" label="操作">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status ==0 || scope.row.status==1 "
                @click="repeal(scope.row.id)"
              >撤销</el-button>
              <el-button
                v-if="scope.row.status ==9  "
                type="warning"
                @click="appeal(scope.row.id)"
              >申诉</el-button>
              <el-button v-if="scope.row.status ==9  " type="primary" @click="pass(scope.row.id)">放行</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      title="订单放行"
      :visible.sync="passFormVisible"
      width="400px"
      :before-close="handleClose"
    >
      <el-form>
        <el-form-item label="过程编号">
          <el-input v-model="processId"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="code"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="passFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>


      <el-dialog
      title="订单申訴"
      :visible.sync="appealVisible"
      width="400px"
      :before-close="handleClose"
    >
      <el-form v-model="appealForm">
        <el-form-item label="过程编号">
          <el-input v-model="appealForm.processId"></el-input>
        </el-form-item>
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
  </div>
</template>

<script>
import { fbOrders, fbCancel, fbAppeal,fbConfirm } from "../../../api/coin_trade";
import { mapGetters, mapState } from "vuex";
import { parseTime } from "../../../utils";
import orderChoice from "../../../components/orderChoice";
import { sendCaptcha1, getCaptcha } from "../../../api/user";

export default {
  name: "AdvList",
  components: { orderChoice },
  data() {
    return {
      orderData: [],
      passFormVisible: false,
      appealVisible: false,
      processId: null,
      id: null,
      code: null,
      appealForm: {
        id:'',
        processId: '',
        reason: '',
        type: 0
      },
      page: 0,
      size: 100,
      direction: 10,
      coinId: 2,
      cashId: 3,
      state: 10,
      start: "2018-10-10",
      end: "2019-10-10",
      order: "0"
    };
  },
  created() {
    this.init();
  },
  computed: {},
  methods: {
    init() {
      fbOrders(
        this.page,
        this.size,
        this.direction,
        this.coinId,
        this.cashId,
        this.state,
        this.start,
        this.end,
        this.order
      ).then(res => {
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
        case "8":
          return "历史纪录";
        case "9":
          return "交易中";
      }
    },
    parseTime(timeStamp) {
      return parseTime(timeStamp);
    },
    repeal(id) {
      this.$alert("确定要撤销吗", "广告撤销", {
        confirmButtonText: "确定",
        callback: action => {
          fbCancel(id).then(res => {
            if (res.code === "200") {
              this.$notify.success("撤销成功");
            } else {
              this.$notify.success("撤销失败");
            }
            window.location.reload();
          });
        }
      });
    },
    appeal(id){
      console.log(id)
      this.id = id
      this.appealVisible = true
    },
    submitAppeal(){
      fbAppeal(this.id, this.appealForm.processId,this.appealForm.reason, this.appealForm.type)
      .then(res=>{
        if(res.code === '200'){
          this.$notify.success('申诉成功')
        }else{
          this.$notify.error('申诉失败')          
        }
      })
    },
    pass(id) {
      this.passFormVisible = true;
      this.id = id;
      this.sendCode()
    },
    confirm() {
      if (this.processId === null) {
        this.$message.error("请输入交易号");
      } else {
        fbConfirm(this.id, this.processId, this.code).then(res => {
          console.log(res);
        });
      }
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
  },
  computed: {
    ...mapGetters([
      "getCoinNameByID",
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
    direction() {
      this.init();
    },
    coinId() {
      this.init();
    },
    cashId() {
      this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
.adv-list /deep/ {
  background-color: #fff;
  min-height: 800px;
  padding: 50px 0;
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
        overflow: unset;
        font-size: 14px;
      }
    }
  }
}
</style>
