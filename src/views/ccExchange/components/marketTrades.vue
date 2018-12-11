<template>
  <div class="market-trades">
    <div class="hb-tab">
      <span>{{ $t('exchange.main.realtimeTrade') }}</span>
    </div>
    <div class="mt-inner">
      <el-table :data="marketHistory" cell-class-name="market-table" height="468" style="width: 100%">
        <el-table-column label="时间">
          <template slot-scope="scope">
            {{ parseTime(scope.row.data[0].ts,'{h}:{i}:{s}') }}
          </template>
        </el-table-column>
        <el-table-column label="方向">
          <template slot-scope="scope">
            <span v-if="scope.row.data[0].direction == 'sell'" style="color:#03c087">
              {{ $t('exchange.main.buy') }}
            </span>
            <span v-if="scope.row.data[0].direction == 'buy'" style="color:#f55858">
              {{ $t('exchange.main.sell') }}
            </span>

          </template>
        </el-table-column>
        <el-table-column :label="$t('exchange.main.price')+'('+this.$store.state.coinData.targetCoin.toUpperCase()+')'">
          <template slot-scope="scope">
            {{ scope.row.data[0].price }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('exchange.main.amount')+'('+this.$store.state.coinData.mainCoin.toUpperCase()+')'">
          <template slot-scope="scope">
            {{ scope.row.data[0].amount.toFixed(6) }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getHistoryTrade } from '../../../api/coin_trade'
import { parseTime } from '../../../utils/index'
import { clearInterval, setInterval } from 'timers'
export default {
  name: 'MarketTrades',
  data() {
    return {
      marketHistory: [],
      historyInterval: null
    }
  },
  computed: {
    symbol() {
      return this.$store.state.coinData.targetCoin
    }
  },
  watch: {
    symbol() {
      this.fetchData()
    }
  },
  created() {
    this.fetchData()
    // getHistoryTrade
  },
  beforeDestroy() {
    clearInterval(this.historyInterval)
  },
  methods: {
    parseTime(a, b) {
      return parseTime(a, b)
    },
    fetchData() {
      const mySymbol = this.$store.state.coinData.targetCoin + this.$store.state.coinData.mainCoin
      const formData = new FormData()
      formData.append('symbol', mySymbol)
      formData.append('size', 30)
      getHistoryTrade(formData).then(res => {
        this.marketHistory = res.content.data
      }).catch(_ => {})
      if (this.historyInterval) {
        clearInterval(this.historyInterval)
      }
      this.historyInterval = setInterval(() => {
        getHistoryTrade(formData).then(res => {
          this.marketHistory = res.content.data
        }).catch(_ => {})
      }, 15000)
    }

  }
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/custom-theme/theme";

  .market-trades /deep/{
    width: 445px;
    height: 520px;
    /*background-color: lemonchiffon;*/
    // .mt-title {
    //   height: 48px;
    //   box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
    //   background-color: #1b1e2e;
    //   font-size: 16px;
    //   line-height: 48px;
    //   padding-left: 20px;
    // }
    .mt-inner {
      height: 472px;
      padding: 0 20px;
      background-color: #fff;
      // overflow: hidden;
      .el-table {
        // background-color: #181b2a;
        color: $hbColor;
        font-size: 13px;
        min-height:472px;
      }
      .el-table--enable-row-hover .el-table__body tr:hover>td {
        // background: #181b2a;
      }
      .market-table {
        padding: 0
      }
      .el-table th, .el-table tr {
        // background-color: #181b2a;
      }
      .el-table--border::after, .el-table--group::after, .el-table::before {
        display: none;
      }
      .el-table td, .el-table th.is-leaf {
        border-bottom: none;
      }
    }
  }
</style>
