<template>
  <div class="order-history">
    <div class="hb-tab">
      <div class="mod-name">
        <span>{{$t('exchange.main.historyBook')}}</span>
      </div>
    </div>
    <div class="inner">
      <el-table max-height='600' :data="this.$store.state.coinTrade.historyOrders" style="width: 100%">
        <el-table-column :label="$t('exchange.main.time')">
          <template slot-scope="scope">
           <span>{{ parseTime(scope.row.updateDate===null?0: scope.row.updateDate) }}</span>
           </template>
          </el-table-column>
          <el-table-column :label="$t('index.tradeShow.pair')">
            <template slot-scope="scope">
              <span>{{ getCoinNameByID(scope.row.forgCoinId).toUpperCase() }}/{{ getCoinNameByID(scope.row.localCoinId).toUpperCase() }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('exchange.main.direction')">
            <template slot-scope="scope">
              <span>{{ scope.row.direction === '0'? '买入': '卖出' }}</span>
              </template>
          </el-table-column>
          <el-table-column :label="$t('exchange.main.price')+'('+this.$store.state.coinData.mainCoin.toUpperCase()+')'">
            <template slot-scope="scope">
              <span>{{ scope.row.price.toFixed(6) }}</span>
              </template>
          </el-table-column>
          <el-table-column :label="$t('exchange.main.amount')+'('+this.$store.state.coinData.targetCoin.toUpperCase()+')'">
            <template slot-scope="scope">
              <span>{{ scope.row.amount.toFixed(6) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('exchange.main.total')+'('+this.$store.state.coinData.mainCoin.toUpperCase()+')'">
            <template slot-scope="scope">
              <span>{{ (scope.row.price*scope.row.amount).toFixed(6) }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('exchange.main.deal')">
            <template slot-scope="scope">
              <span>{{ Number(scope.row.tradeAmount).toFixed(6) }}</span>
            </template>
          </el-table-column>
          
          <el-table-column :label="$t('exchange.main.notClosed')">
            <template slot-scope="scope">
              <span>{{ (scope.row.price*scope.row.amount - Number(scope.row.tradeAmount)).toFixed(6) }}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column :label="$t('exchange.main.operation')">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="appeal(scope.row)">{{$t('appeal')}}</el-button>
            </template>
          </el-table-column> -->
          </el-table>
      <el-dialog
        :title="$t('appeal')"
        :visible.sync="appealVisible"
        width="500px"
        :before-close="handleClose">
        <el-form ref="appealForm" :model="appealForm" label-width="80px">
        <el-form-item :label="$t('appealType')">
          <el-select v-model="appealForm.type" :placeholder="$t('appealReason')">
            <el-option :label="$t('exchange.main.notGet')" value="0"></el-option>
            <el-option :label="$t('exchange.main.getWrong')" value="1"></el-option>
            <el-option :label="$t('exchange.main.moneyWrong')" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('appealReason')">
          <el-input v-model="appealForm.reason"></el-input>
        </el-form-item>
        </el-form>
          <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitAppeal">{{$t('appeal')}}</el-button>
          </span>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import { parseTime } from '../../../utils';
import { mapGetters } from 'vuex'
import {
    getOrderBySymbolName, submitAppeals
  } from "../../../api/coin_trade";
  export default {
    name: "order-history",
    data() {
      return {
        // orderHistoryData: this.getHistoryOrder,
        appealVisible: false,
        appealForm: {
          id: '',
          reason: '',
          type: 0,
        }
      }
    },
    computed: {
       ...mapGetters([
        'getCoinNameByID',
      ]),
      // getHistoryOrder(){
      //   return this.$store.state.coinTrade.historyOrders
      //   }
      
    },
    created(){
      console.log(this.getHistoryOrder)
    },
    methods: {

      appeal(row) {
        this.appealVisible = true
        this.appealForm.id = row.id
        // console.log(row)
      },
      submitAppeal(){
        submitAppeals(this.appealForm.id, this.appealForm.reason, this.appealForm.type)
        .then(res=>{
          if(res.code === '200'){
              this.$notify.success(this.$t('appealSuccess'))
          }else{
            this.$notify.success(this.$t('appealFailed'))
          }
          console.log(res)
        })
      },
      handleClose(done) {
        this.$confirm(this.$t('confirmToClose'))
          .then(_ => {
            // this.appealVisible = false
            done();
          })
          .catch(_ => {});
      },
      parseTime(timeStamp){
        return parseTime(timeStamp)
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../assets/custom-theme/theme";
  .order-history {
    width: 1136px;
    min-height: 190px;
    /*background-color: darkgoldenrod;*/
    .title {
      height: 48px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, .1); // background-color: #1b1e2e;
      font-size: 16px;
      line-height: 48px;
      padding-left: 20px;
      .mod-name {
        float: left;
      }
    }
    .inner {
      min-height: 142px;
      .el-table {
        // background-color: #181b2a;
        color: $hbColor;
        font-size: 12px;
        min-height: 140px;
        .cell {
          white-space: pre;
          overflow:unset;
        }
      }
      .el-table th,
      .el-table tr {
        // background-color: #181b2a;
      }
      .el-table--border::after,
      .el-table--group::after,
      .el-table::before {
        display: none;
      }
      .el-table td,
      .el-table th.is-leaf {
        border-bottom: none;
      }
    }
  }
</style>
