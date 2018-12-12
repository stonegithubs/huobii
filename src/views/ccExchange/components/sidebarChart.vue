<template>
  <div class="sidebar-chart">
    <div v-if="this.$store.state.user.token" class="total-balance">
      <div v-loading="isLoading">
        <p style="font-size: 18px;margin-bottom: 0; color:#909399">{{ $t('exchange.sidebar.account') }}:
          <span class="upper">{{ this.$store.getters.getCoinBalanceByName(this.$store.getters.getMainCoin).coinBalance }} {{ this.$store.getters.getMainCoin }}</span>
        </p>
        <p style="font-size: 18px;margin-bottom: 0; color:#909399">{{ $t('exchange.sidebar.targetAccount') }}:
          <span class="upper">{{ this.$store.getters.getCoinBalanceByName(this.$store.getters.getTargetCoin).coinBalance }} {{ this.$store.getters.getTargetCoin }}
          </span>
        </p>
      </div>
    </div>
    <div v-else class="not-login">
      <p>
        <router-link :to="{ name: 'login'}">{{ $t('exchange.sidebar.signIn') }}</router-link> {{ $t('exchange.sidebar.or') }}
        <router-link :to="{ name: 'registry'}">{{ $t('exchange.sidebar.registry') }}</router-link>{{ $t('exchange.sidebar.startTrade') }}
      </p>
    </div>
    <div class="drawer">
      <el-tabs v-model="activeName" class="trade-bar" type="border-card" @tab-click="handleClick">
        <el-tab-pane v-for="symbol in symbols" :key="symbol.id" :name="symbol">
          <span slot="label">{{ symbol.toUpperCase() }}</span>
          <el-table v-loading="symbolList.length == 0" :data="symbolList" :default-sort="{prop: 'close', order: 'descending'}" class="mini-trade" height="600" max-height="800" style="width: 100%" @row-click="handleRowClick">
            <el-table-column :label="$t('index.tradeShow.pair')" prop="symbolName" sortable >
              <template slot-scope="scope">
                {{ scope.row.target.toUpperCase() }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('index.tradeShow.lastPrice')" prop="close" sortable >
              <template slot-scope="scope">
                {{ scope.row.close }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('index.tradeShow.change')">
              <template slot-scope="scope">
                <span v-if="scope.row.rate>0" style="color:#03c087"> +{{ scope.row.rate.toFixed(2) }}% </span>
                <span v-if="scope.row.rate<0" style="color:#f55858"> {{ scope.row.rate.toFixed(2) }}% </span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SidebarChart',
  data() {
    return {
      activeName: 'usdt',
      currentSymbol: 'usdt',
      sidebarInterval: {},
      symbols: ['usdt', 'btc', 'eth', 'tc']
    }
  },
  computed: {
    symbolList() {
      return this.$store.getters.getCoinList(this.currentSymbol)
    },
    isLoading() {
      return this.$store.getters.getCoinList(this.currentSymbol).length === 0
    }
  },
  created() {
    this.$store.dispatch('getSymbolList').catch(_ => {})
    this.$store.dispatch('SymbolRate').catch(_ => {})
    this.sidebarInterval = setInterval(() => {
      this.$store.dispatch('getSymbolList').catch(_ => {})
      this.$store.dispatch('SymbolRate').catch(_ => {})
    }, 15000)

    // // 获取币种精度信息
    // if (this.$store.state.coinData.symbols.length === 0) {
    //   this.$store.dispatch('getSymbols').then(() => {
    //     this.$store.getters.getUniqueSymbol()
    //   }).catch(error => {
    //     this.$message(error.message)
    //   })
    // }
    // 获取账户
    if (this.$store.getters.getCoinBalanceByName(this.$store.getters.getMainCoin).length === 0) {
      this.balanceInfoLoading = true
      this.$store.dispatch('GetCoinBalanceBoth').then(_ => {
        this.balanceInfoLoading = false
      }).catch(_ => {
        this.$notify.error(_.message) // TODO:知道id之后最好把全部查询改为根据id查询
      })
    }
  },
  beforeDestroy() {
    clearInterval(this.sidebarInterval)
  },
  methods: {
    handleClick(tab) {
      this.currentSymbol = this.symbols[tab.index]
    },
    handleRowClick(row, event, column) {
      this.$store.commit('SET_MAINCOIN', row.symbolName)
      this.$store.commit('SET_TARGETCOIN', row.target)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../assets/custom-theme/theme";
  .sidebar-chart /deep/ {
    .not-login {
      padding: 16px 10px 16px 20px;
      background-color: white;
      margin-bottom: 5px;
    }
    .total-balance {
      border-radius: 3px 3px 0 0;
      padding: 16px 10px 16px 20px;
      border-bottom: 2px solid transparent;
      background-color: white;
    }
    .drawer {
      background-color: white;
      position: relative;
    }
    .el-tabs--border-card {
      border: none;
      &>.el-tabs__header {
        // background-color: #1b1e2e;
        border-bottom: 1px solid transparent;
        .el-tabs__item {
          // color: #c7cce6;
          width: 70px;
          border: none;

        }
      }
      &>.el-tabs__content {
        padding: 0;
      }
    }
    .el-table {
      font-size: 13px;
      // color: #c7cce6;
      .caret-wrapper {
        width: unset;
      }
    }

    .el-table th,
    .el-table tr {
      // background-color: #181b2a;
      cursor: pointer;
    }
    .el-table td,
    .el-table th {
      padding: 4px;
    }
    .el-table--border::after,
    .el-table--group::after,
    .el-table::before {
      display: none;
    }
    .el-table--border th.gutter:last-of-type {
      border: none;
    }

     ::-webkit-scrollbar {
      width: 10px;
      // background-color: #181b2a;
    }

    /*滚动条的滑块按钮*/
     ::-webkit-scrollbar-thumb {
      // background-color: rgba(97, 104, 138, .15);
      border-radius: 10px;
    }

  }
</style>
