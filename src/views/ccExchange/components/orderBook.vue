<template>
  <div class="order-book">
    <div class="header hb-tab">
      <div>{{ $t('index.tradeShow.lastPrice') }} <span v-loading="latestLoading">{{ getLatestPrice }} {{ this.$store.state.coinData.mainCoin.toUpperCase() }}</span>
        <!-- <span class="about">≈ 1516.60 cny</span> -->
      </div>
    </div>
    <div class="inner"  v-loading="this.buyDepthList.length == 0">
      <div class="inner-wrapper">
        <el-table :data="buyDepthList" :cell-class-name="cellClassName" :default-sort="{prop: 'accumulative'}" height="204" class="topTable">
          <el-table-column :label="$t('exchange.main.buy')+'/'+$t('exchange.main.sell')" >
            <template slot-scope="scope">
              <span style="color:#03c087">  {{ $t('exchange.main.buy') }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('exchange.main.price')+this.$store.state.coinData.mainCoin.toUpperCase()" prop="price"/>
          <el-table-column :label="$t('exchange.main.amount')+this.$store.state.coinData.targetCoin.toUpperCase()" prop="amount"/>
          <el-table-column :label="$t('exchange.main.total')+this.$store.state.coinData.targetCoin.toUpperCase()">
            <template slot-scope="scope">
              {{ scope.row.accumulative.toFixed(6) }}
            </template>
          </el-table-column>
        </el-table>
        <div style="height:3px;padding:0 14px">
          <div style="background-color:#f2f3f8;height:5px"/>
        </div>
        <el-table
          v-loading="this.sellDepthList.length == 0"
          :data="sellDepthList"
          :show-header="false"
          :default-sort = "{prop: 'accumulative'}"
          height="235"
          cell-class-name="cellClassName">

          <el-table-column :label="$t('exchange.main.buy')+'/'+$t('exchange.main.sell')">
            <template slot-scope="scope">
              <span style="color:#f55858">{{ $t('exchange.main.sell') }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('exchange.main.price')+ this.$store.state.coinData.mainCoin.toUpperCase()" prop="price"/>

          <el-table-column :label="$t('exchange.main.amount')+this.$store.state.coinData.targetCoin.toUpperCase()" prop="amount"/>
          <el-table-column :label="$t('exchange.main.total')+this.$store.state.coinData.targetCoin.toUpperCase()">
            <template slot-scope="scope">
              {{ scope.row.accumulative.toFixed(6) }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getMarketDetail,
  getMarketDepth
} from '../../../api/coins'
import {
  mapState
} from 'vuex'
export default {
  name: 'OrderBook',
  data() {
    return {
      latestPriceInterval: {},
      depthInterval: {},
      buyDepthList: [],
      sellDepthList: [],
      latestLoading: true

    }
  },
  computed: {
    targetCoin() {
      return this.$store.state.coinData.targetCoin
    },
    getLatestPrice() {
      return this.$store.state.coinData.symbolDetail.close
    }
  },
  watch: {
    targetCoin: function() {
      const symbol = this.$store.state.coinData.targetCoin + this.$store.state.coinData.mainCoin
      this.latestLoading = true
      getMarketDetail(symbol).then(response => {
        this.latestPrice = response.content.tick.close
      })
      this.$store.dispatch('updataPrice', symbol)
      this.latestLoading = false
      clearInterval(this.latestPriceInterval)
      this.latestPriceInterval = setInterval(() => {
        this.latestLoading = true
        getMarketDetail(symbol).then(response => {
          this.latestPrice = response.content.tick.close
          // console.log(this.latestPrice)
        })
        this.latestLoading = false
      }, 15000)
    }
  },
  created() {
    // this.latestLoading = true
    const symbol = this.$store.state.coinData.targetCoin + this.$store.state.coinData.mainCoin
    this.$store.dispatch('updataPrice', symbol).then(_ => {
      this.latestLoading = false
    })
    clearInterval(this.latestPriceInterval)
    this.latestPriceInterval = setInterval(() => {
      this.latestLoading = true
      this.$store.dispatch('updataPrice', symbol).then(res => {
        this.latestLoading = false
      })
    }, 15000)
    // 获取深度数据
    const form = new FormData()
    form.append('symbol', symbol)
    form.append('type', 'step0')
    this.$store.dispatch('MarketDepth', form).then(response => {
      let addUp = 0
      for (const item of response.content.tick.bids) {
        addUp += item[1]
        const listItem = {
          'price': item[0],
          amount: item[1],
          'accumulative': addUp
        }
        this.buyDepthList.push(listItem)
      }
      addUp = 0
      for (const item of response.content.tick.asks) {
        addUp += item[1]
        const listItem = {
          'price': item[0],
          amount: item[1],
          'accumulative': addUp
        }
        this.sellDepthList.push(listItem)
      }
    })
  },
  beforeDestroy() {
    clearInterval(this.latestPriceInterval)
  },
  methods: {
    cellClassName(row, rowIndex) {
      return 'my-cell'
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../assets/custom-theme/theme";
  .order-book /deep/ {
    // width: 100%;
    height: 490px;
    padding-left: 10px;
    width: 33%;
    @media only screen and (max-width: 1400px) {
        // margin-left: 285px;
        width: unset;
      }
    .cell {
      font-size: 12px;
      white-space: nowrap;
      display: table-cell; // width: 33%;
    }
    .header {

      .about {
        font-size: 12px;
        text-transform: uppercase;
        color: $lightColor;
      }
    }
    .inner {
      background: #fff;
      .inner-wrapper{
        margin-left: 10px;
      }
      .el-table th,
      .el-table tr {
        // background-color: #1b1e2a;
        color: $hbColor;
        font-size: 12px;
        text-align: center;
      }
      .el-table /deep/{
        height: 441px;
        .has-gutter {
          // height: 40px;
          // display: inline-table;
        }
        // background-color: #1b1e2a;
      }
      .el-table td,
      .el-table th.is-leaf,
      .el-table--border,
      .el-table--group {
        border: none
      }
      .el-table--border::after,
      .el-table--group::after,
      .el-table::before {
        display: none;
      }
      .el-table td,
      .el-table th {
        padding: 3px 0;
      }

    }
  }
</style>
