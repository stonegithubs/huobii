<template>
  <div class="trade-show">
    <el-tabs v-model="activeName" class="trade-bar" type="border-card" @tab-click="handleClick">
      <el-tab-pane v-for="symbol in symbols" :name="symbol" :key="symbol.id" class="trade-show-panel">
        <span slot="label">
        <i :class="'iconfont icon-'+symbol.toUpperCase()" style="font-size: 18px"/> &nbsp;{{ symbol.toUpperCase() }}</span>
        <el-table v-loading="mainTradeLoading" :data="symbolList" :default-sort="{prop: 'close', order: 'descending'}" height="600" style="width: 100%" @row-click="chooseCoin">
          <el-table-column :label="$t('index.tradeShow.pair')" prop="symbolName" sortable min-width="160">
            <template slot-scope="scope">
              {{ scope.row.target }} / <span style="color:#61688a">{{ scope.row.symbolName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('index.tradeShow.lastPrice')" prop="close" sortable min-width="170">
            <template slot-scope="scope">
              {{ scope.row.close }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('index.tradeShow.change')">
            <template slot-scope="scope">
              <span v-if="scope.row.rate>0" class="green-rate" > +{{ scope.row.rate.toFixed(2) }}% </span>
              <span v-if="scope.row.rate<0" class="red-rate"> {{ scope.row.rate.toFixed(2) }}% </span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('index.tradeShow.high')" prop="high" width="170"/>
          <el-table-column :label="$t('index.tradeShow.low')" prop="low" min-width="170"/>
          <el-table-column :label="$t('index.tradeShow.vol24h')" prop="amount" min-width="135" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'TradeShow',
  data() {
    return {
      activeName: 'usdt',
      currentSymbol: 'usdt',
      // 这里可以进行热插拔，选择需要显示的symbol名字
      symbols: ['usdt', 'btc', 'eth', 'tc'],
      mainInterval: {}
    }
  },
  computed: {

    symbolList() {
      return this.$store.getters.getCoinList(this.currentSymbol)
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
    this.$store.dispatch('SymbolRate').catch(_ => {})
    this.$nextTick(() => {
      this.mainTradeLoading = false
      this.mainInterval = setInterval(() => {
        this.$store.dispatch('getSymbolList')
        this.$store.dispatch('SymbolRate')
      }, 15000)
    })
  },
  beforeDestroy() {
    clearInterval(this.mainInterval)
  },
  methods: {
    handleClick(tab) {
      this.currentSymbol = this.symbols[tab.index]
    },

    chooseCoin(row, event, column) {
      this.$store.commit('SET_SYMBOL_SHOW', row.symbolName)
      this.$store.commit('SET_MAINCOIN', row.symbolName)
      this.$store.commit('SET_TARGETCOIN', row.target)
      this.$router.push('/coin_coin/exchange')
    }
  }
}

</script>
<style lang="scss">
@import '../../../assets/custom-theme/theme';

.el-table td div {
  text-transform: uppercase;
}

.trade-show {
  padding: 30px 60px;
  position: relative;
  margin-top: 60px;

  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    display: none;
  }

  .trade-show-panel {
    padding: 0 30px;
  }
  .green-rate, .red-rate {
    color: rgb(174, 78, 84);
    // background-color: rgba(239, 86, 86, 0.1);
    display: inline-block;
    line-height: 1;
    min-width: 80px;
    padding: 2px 14px;
    min-width: 70px;
    line-height: 26px;
    border-radius: 5px;
    text-align: center
  }
  .green-rate {
    color: #0da88b;
    background-color: rgba(13,168,139,.1);
  }
  .red-rate {
    color: #ef5656;
    background-color: rgba(239,86,86,.1);
  }

  .el-tabs--border-card {
    &>.el-tabs__header {
      background-color: #f2f6fa;

      .el-tabs__item {
        color: $hbColor;
        width: 180px;
        text-align: center;
        height: 45px;

        &:not(.is-disabled):hover {
          color:$hbColor;
        }

        &.is-active {
         border-bottom:1px solid #357ce1;
         background-color: #fff;
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

  .el-table td,
  .el-table th.is-leaf {
    border-bottom: none !important;
  }

  .el-table td,
  .el-table th {
    padding: 0;
  }

  .el-table th,
  .el-table tr {
    height: 40px;
    line-height: 40px;
    position: relative;
    box-shadow: 0 0 1px hsla(231, 9%, 54%, .2);
    cursor: pointer;
    // background-color: #202437;
    // color: #c7cce6;
  }

  ::-webkit-scrollbar {
    /*height: 20px;*/
    width: 17px;

    background-color: transparent;
  }

  /*滚动条的轨道*/
  ::-webkit-scrollbar-track {
    // background-color: #181b2a;
  }

  /*滚动条的滑块按钮*/
  ::-webkit-scrollbar-thumb {
    // background-color:#fcfdfd;
    border-radius: 10px;

  }
}

</style>
