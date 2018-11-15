<template>
  <div class="trade-show">
    <el-tabs class="trade-bar" v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane class="trade-show-panel" v-for="symbol in symbols" :name='symbol'  v-bind:key="symbol.id">
        <span slot="label">
        <i :class="'iconfont icon-'+symbol.toUpperCase()" style="font-size: 18px"></i> &nbsp;{{ symbol.toUpperCase() }}</span>
        <el-table @row-click="chooseCoin" v-loading="mainTradeLoading" :data="okCoinList" :default-sort="{prop: 'close', order: 'descending'}" height="600" style="width: 100%">
          <el-table-column prop="symbolName" label="交易对" sortable min-width="160">
          </el-table-column>
          <el-table-column prop="close" label="最新价" sortable :formatter="priceFormatter" min-width="170">
          </el-table-column>
          <el-table-column label="涨幅">
            <template slot-scope="scope">
              <!-- {{ scope.row}} -->
              woshirate
            </template>
          </el-table-column>
          <el-table-column prop="high" label="最高价" :formatter="priceFormatter" width="170">
          </el-table-column>
          <el-table-column prop="low" label="最低价" :formatter="priceFormatter" min-width="170">
          </el-table-column>
          <el-table-column prop="amount" label="24H量" min-width="135" :formatter="amountFormatter">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "tradeShow",
  data() {
    return {
      activeName: "usdt",
      currentSymbol: 'usdt',
      //这里可以进行热插拔，选择需要显示的symbol名字
      symbols: ['usdt'],
      mainInterval: {}
    };
  },
  computed: {
    // symbols() {
    //   return this.$store.getters.getUniqueSymbol();
    // },
    symbolList() {
      return this.$store.getters.getSymbolData(this.currentSymbol);
    },
    okCoinList(){
      return this.$store.getters.getCoinList(this.currentSymbol)
    }
  },
  methods: {
    handleClick(tab) {
      this.currentSymbol = this.symbols[tab.index]
    },
    amountFormatter(row) {
      return row.amount.toFixed(row['amount-precision'])
    },
    priceFormatter(row) {
      return row.amount.toFixed(row['price-precision'])
    },
    chooseCoin(row, event, column) {
      this.$store.commit('SET_SYMBOL_SHOW', row.symbolName)
      this.$store.commit('SET_MAINCOIN', row['quote-currency'])
      this.$store.commit('SET_TARGETCOIN', row['base-currency'])
      this.$router.push('/coin_coin/exchange')

    }
  },
  created() {
    this.mainTradeLoading = true
    if (!localStorage.getItem('symbols')) {
      this.$store.dispatch('getSymbols').then(() => {
        this.$store.getters.getUniqueSymbol()
      }).catch(err => {
        // this.$message.error(err.message)
      })
    }
    this.$store.dispatch('getSymbolList').catch(() => {
      // this.$message.error("can't get coin information")
    })
    this.$store.dispatch('SymbolRate').catch(_=>{})
    this.$nextTick(() => {
      this.mainTradeLoading = false
      this.mainInterval = setInterval(()=>{
            this.$store.dispatch('getSymbolList')
            this.$store.dispatch('SymbolRate')
          },15000)
    })


  },
  beforeDestroy(){
    clearInterval(this.mainInterval)
  }
}

</script>
<style lang="scss">

.el-table td div {
  text-transform: uppercase;
}

.trade-show {
  padding: 30px 60px;
  position: relative;
  margin-top: 60px;

  .el-loading-mask {
    background-color: #202437
  }

  .el-table {
    background-color: #202437;
  }

  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    display: none;
  }

  .trade-show-panel {
    padding: 0 30px;
    background-color: #202437;
  }

  .trade-bar {
    border: 1px solid #61688a;
    background-color: #262a42;
    color: #c7cce6;
  }

  .el-tabs--border-card {
    &>.el-tabs__header {
      background-color: #262a42;
      border-bottom: 1px solid #61688a;

      .el-tabs__item {
        color: #c7cce6;
        width: 180px;
        text-align: center;
        height: 45px;

        &:not(.is-disabled):hover {
          color: #c7cce6;
        }

        &.is-active {
          background-color: #262a42;
          border-left-color: #61688a;
          border-right-color: #61688a;
          color: #c7cce6;
        }
      }
    }

    &>.el-tabs__content {
      padding: 0;
    }
  }

  img {
    width: 22px;
    height: 22px;
    vertical-align: middle;
  }

  .el-table--enable-row-hover {
    .el-table__body {
      tr {
        &:hover {
          &>td {
            background-color: #1b1e2e !important;
          }
        }
      }
    }
  }

  .el-table td,
  .el-table th.is-leaf {
    border-bottom: none !important;
  }

  .el-table td,
  .el-table th {
    padding: 0;
  }

  .el-tabs--border-card {
    border: 1px solid #61688a;
  }

  .el-table th,
  .el-table tr {
    height: 40px;
    line-height: 40px;
    position: relative;
    box-shadow: 0 0 1px hsla(231, 9%, 54%, .2);
    cursor: pointer;
    background-color: #202437;
    color: #c7cce6;
  }

  ::-webkit-scrollbar {
    /*height: 20px;*/
    width: 17px;

    background-color: transparent;
  }

  /*滚动条的轨道*/
  ::-webkit-scrollbar-track {
    background-color: #181b2a;
  }

  /*滚动条的滑块按钮*/
  ::-webkit-scrollbar-thumb {
    background-color: rgba(97, 104, 138, .15);
    border-radius: 10px;

  }

  /*滚动条的上下两端的按钮*/
  ::-webkit-scrollbar-button {
    /*display: none;*/
  }

}

</style>
