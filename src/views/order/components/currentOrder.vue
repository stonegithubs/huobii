<template>
  <div class="current-order">
    <el-table v-loading="this.loading" :data="currentOrderData" style="width: 100%">
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
          <span>{{ (scope.row.amount).toFixed(6) }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('exchange.main.deal')"
        prop="">
        <template slot-scope="scope">
          <span>{{ Number(scope.row.tradeAmount).toFixed(6) }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('exchange.main.notClosed')"
        prop="">
        <template slot-scope="scope">
          <span>{{ (scope.row.amount - Number(scope.row.tradeAmount)).toFixed(6) }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('exchange.main.operation')">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="mrepeal(scope.row.id)">
            {{ $t('repeal') }}</el-button>
            <!-- <el-button size="mini" type="text" @click="appeal(scope.row)">{{$t('appeal')}}</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  parseTime, confirmReppelCoinTrade
} from '../../../utils'
import {
  mapGetters
} from 'vuex'
import {
  getOrderBySymbolName
} from '../../../api/coin_trade'
export default {
  name: 'CurrentOrder',
  data() {
    return {
      currentOrderData: [],
      page: 0,
      symbolName: 'usdt_btc',
      loading: true
    }
  },
  created() {
    this.loading = true
    this.$store.dispatch('getSupportCoin').then(_ => {
      getOrderBySymbolName(0, 10, 10, this.symbolName, 11, '2018-12-08', '2038-12-08', 1)
        .then(response => {
          this.loading = false
          if (response.content.records instanceof Array) {
            this.currentOrderData = response.content.records
          }
        })
    }).catch(_ => {})
  },
  methods: {
     update() {
      this.loading = true
      this.page++
      getOrderBySymbolName(page, 10, 10, this.symbolName, 9, '2018-12-08', '2038-12-08', 1)
        .then(response => {
          this.loading = false
          if (response.content.records instanceof Array) {
            this.currentOrderData = response.content.records
          }
        })
    },
    mrepeal(id){
      confirmReppelCoinTrade(this,id)
    },
    parseTime(timeStamp) {
      return parseTime(timeStamp)
    }
  },
  computed: {
    ...mapGetters([
      'getCoinNameByID'
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
