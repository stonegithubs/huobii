<template>
  <div class="current-order">
    <el-table  :data="currentOrderData" style="width: 100%">
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

          <el-table-column
            :label="$t('exchange.main.direction')">
<template slot-scope="scope">
  <span>{{ scope.row.direction === '0'? '买入': '卖出' }}</span>
</template>
          </el-table-column>

          <el-table-column
            :label="$t('exchange.main.price')+'('+this.$store.state.coinData.mainCoin.toUpperCase()+')'">
<template slot-scope="scope">
  <span>{{ scope.row.price.toFixed(6) }}</span>
</template>
          </el-table-column>

          <el-table-column
            :label="$t('exchange.main.amount')+'('+this.$store.state.coinData.targetCoin.toUpperCase()+')'">
<template slot-scope="scope">
  <span>{{ scope.row.amount.toFixed(6) }}</span>
</template>
          </el-table-column>

          <el-table-column
           :label="$t('exchange.main.total')+'('+this.$store.state.coinData.mainCoin.toUpperCase()+')'">
<template slot-scope="scope">
  <span>{{ (scope.row.price*scope.row.amount).toFixed(6) }}</span>
</template>
          </el-table-column>

          <el-table-column
            prop=""
            :label="$t('exchange.main.deal')">
<template slot-scope="scope">
  <span>{{ Number(scope.row.tradeAmount).toFixed(6) }}</span>
</template>
          </el-table-column>
          
          <el-table-column
            prop=""
            :label="$t('exchange.main.notClosed')">
<template slot-scope="scope">
  <span>{{ (scope.row.price*scope.row.amount - Number(scope.row.tradeAmount)).toFixed(6) }}</span>
</template>
          </el-table-column>

          <el-table-column
          :label="$t('exchange.main.status')">
            <template slot-scope="scope">
              <span v-if="(scope.row.price*scope.row.amount - Number(scope.row.tradeAmount)) === 0"> {{$t('exchange.main.finished')}}</span>
              <span v-else>{{$t('exchange.main.userCanceled')}} </span>
            </template>
           </el-table-column>

          </el-table>
  </div>
</template>

<script>
import { parseTime } from '../../../utils';
import  { mapGetters} from 'vuex'
  import {
    getOrderBySymbolName
  } from '../../../api/coin_trade'
  export default {
    name: 'CurrentOrder',
    data() {
      return {
        currentOrderData: [],
        page: 0,
        symbolName: 'usdt_btc'
      }
    },
    methods: {
      update() {
        this.page++
          getOrderBySymbolName(page, 10, 10, this.symbolName, 8, '2018-12-08', '2038-12-08', 1)
          .then(response => {
            if (response.content.records instanceof Array) {
              this.currentOrderData = response.content.records
            }
          })
      }
    },
    created() {
      getOrderBySymbolName(0, 10, 10, this.symbolName, 8, '2018-12-08', '2038-12-08', 1)
        .then(response => {
          if (response.content.records instanceof Array) {
            this.currentOrderData = response.content.records
          }
        })
    },
    methods: {
      parseTime(timeStamp){
        return parseTime(timeStamp)
      }
    },
    computed:{
      ...mapGetters([
        'getCoinNameByID',
      ])
    }
  }
</script>

<style lang="scss" scoped> 
  @import "../../../assets/custom-theme/theme";
  .current-order /deep/ {
   .el-table  {
      // background-color: #1b1e2e;
       .cell {
          white-space: pre;
          overflow:unset;
          font-size: 12px;
        }
    }
  }
</style>
