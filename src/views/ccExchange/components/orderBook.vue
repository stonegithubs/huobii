<template>
  <div class="order-book">
    <div class="header">
      <div>最新价 <span v-loading="latestLoading" element-loading-background="#181b2a">{{ getLatestPrice }} {{ this.$store.state.coinData.mainCoin.toUpperCase() }}</span>
        <!-- <span class="about">≈ 1516.60 cny</span> -->
      </div>
    </div>
    <div class="inner">
      <el-table :data="buyDepthList" style="width: 100%" v-loading="this.buyDepthList.length == 0" element-loading-background="#181b2a" height="204" :cell-class-name="cellClassName" class="topTable" :default-sort="{prop: 'accumulative'}">
        <el-table-column width="60" label="买/卖">
          <template slot-scope="scope">
              <span style="color:#589065">买入</span>
</template>
        </el-table-column>
        <el-table-column prop="price" :label="'价格 '+this.$store.state.coinData.mainCoin.toUpperCase()">
        </el-table-column>
        <el-table-column prop="amount" :label="'数量 '+this.$store.state.coinData.targetCoin.toUpperCase()">
        </el-table-column>
        <el-table-column :label="'累计 '+this.$store.state.coinData.targetCoin.toUpperCase()">
        <template slot-scope="scope">
            {{scope.row.accumulative.toFixed(6)}}
          </template>
        </el-table-column>
      </el-table>
      <div style="height:3px;padding:0 14px">
        <div style="background-color:#262a42;height:5px"></div>
      </div>
      <el-table
        height="235"
        :data="sellDepthList" 
        style="width: 100%" 
        v-loading="this.sellDepthList.length == 0" 
        element-loading-background="#181b2a"
        :show-header="false"
        cell-class-name="cellClassName"
        :default-sort = "{prop: 'accumulative'}">

        <el-table-column width="60" label="买/卖">
<template slot-scope="scope">
  <span style="color:#ae4e54">卖出</span>
</template>
        </el-table-column>

        <el-table-column prop="price" :label="'价格 '+ this.$store.state.coinData.mainCoin.toUpperCase()">
        </el-table-column>

        <el-table-column prop="amount" :label="'数量 '+this.$store.state.coinData.targetCoin.toUpperCase()">
        </el-table-column>
        <el-table-column :label="'累计 '+this.$store.state.coinData.targetCoin.toUpperCase()">
          <template slot-scope="scope">
            {{scope.row.accumulative.toFixed(6)}}
          </template>
        </el-table-column>
      </el-table>
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
    name: "order-book",
    data() {
      return {
        latestPrice: 0,
        latestPriceInterval: {},
        depthInterval: {},
        buyDepthList: [],
        sellDepthList: []
      }
    },
    computed: {
      targetCoin() {
        return this.$store.state.coinData.targetCoin
      },
      getLatestPrice() {
        return this.latestPrice
      }
    },
    methods: {
      cellClassName(row, rowIndex) {
        return 'my-cell'
      }
    },
    created() {
      this.latestLoading = true
      let symbol = this.$store.state.coinData.targetCoin + this.$store.state.coinData.mainCoin
      getMarketDetail(symbol).then(response => {
        this.latestPrice = response.content.tick.close
      })
      this.latestLoading = false
      clearInterval(this.latestPriceInterval)
      this.latestPriceInterval = setInterval(() => {
        this.latestLoading = true
        getMarketDetail(this.$store.state.coinData.targetCoin + this.$store.state.coinData.mainCoin).then(response => {
          this.latestPrice = response.content.tick.close
        })
        this.latestLoading = false
      }, 15000)
      //获取深度数据
      let form = new FormData()
      form.append('symbol', symbol)
      form.append('type', 'step0')
      this.$store.dispatch('MarketDepth', form).then(response => {
        let addUp = 0
        for (let item of response.content.tick.bids) {
          addUp += item[1]
          let listItem = {
            'price': item[0],
            amount: item[1],
            'accumulative': addUp
          }
          this.buyDepthList.push(listItem)
        }
        addUp = 0
        for (let item of response.content.tick.asks) {
          addUp += item[1]
          let listItem = {
            'price': item[0],
            amount: item[1],
            'accumulative': addUp
          }
          this.sellDepthList.push(listItem)
        }
      })
    },
    watch: {
      targetCoin: function() {
        this.latestLoading = true
        getMarketDetail(this.$store.state.coinData.targetCoin + this.$store.state.coinData.mainCoin).then(response => {
          this.latestPrice = response.content.tick.close
        })
        this.latestLoading = false
        clearInterval(this.latestPriceInterval)
        this.latestPriceInterval = setInterval(() => {
          this.latestLoading = true
          getMarketDetail(this.$store.state.coinData.targetCoin + this.$store.state.coinData.mainCoin).then(response => {
            this.latestPrice = response.content.tick.close
            console.log(this.latestPrice)
          })
          this.latestLoading = false
        }, 15000)
      }
    },
    beforeDestroy() {
      clearInterval(this.latestPriceInterval);
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/custom-theme/theme";
  .order-book /deep/ {
    width: 356px;
    height: 490px;
    .cell {
      font-size: 12px;
      white-space: nowrap;
      display: table-cell; // width: 33%;
    }
    .header {
      box-shadow: 0 3px 6px rgba(1, 1, 1, .3);
      background-color: $tabColor;
      height: 48px;
      padding-left: 20px;
      line-height: 48px;
      font-size: 14px;
      color: $hbColor;
      .about {
        font-size: 12px;
        text-transform: uppercase;
        color: $lightColor;
      }
    }
    .inner {
      background-color: #1b1e2a;
      padding-left:10px;
      .el-table th,
      .el-table tr {
        background-color: #1b1e2a;
        color: $hbColor;
        font-size: 12px;
        text-align: center;
      }
      .el-table {
        height: 441px;
        background-color: #1b1e2a;
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
      .el-table--enable-row-hover {
        .el-table__body {
          tr {
            &:hover {
              &>td {
                background-color: #1b1e2a !important;
              }
            }
          }
        }
      }
      /*.order-book .inner .el-table, .order-book .inner .el-table__expanded-cell {*/
      /*background-color: ;*/
      /*}*/
    }
  }
</style>
