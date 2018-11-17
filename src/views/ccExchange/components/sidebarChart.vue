<template>
  <div class="sidebar-chart">
    <div v-if="this.$store.state.user.token" class="total-balance">
      <div v-loading="isLoading" element-loading-background="#1b1e2e">
        <p style="font-size: 18px;margin-bottom: 0">当前币资产:
          <span class="upper">{{this.$store.getters.getCoinBalanceByName(this.$store.getters.getMainCoin).coinBalance }} {{ this.$store.getters.getMainCoin }}</span>
        </p>
        <p style="font-size: 18px;margin-bottom: 0">目标币资产:
          <span class="upper">{{this.$store.getters.getCoinBalanceByName(this.$store.getters.getTargetCoin).coinBalance}} {{ this.$store.getters.getTargetCoin }}
                </span>
        </p>
      </div>
    </div>
    <div v-else class="not-login">
      <p>
        <router-link :to="{ name: 'login'}">登录</router-link> 或
        <router-link :to="{ name: 'registry'}">注册</router-link>开始交易
      </p>
    </div>
    <div class="drawer">
      <el-tabs class="trade-bar" v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane v-for="symbol in symbols" v-bind:key="symbol.id" :name="symbol">
          <span slot="label">{{ symbol.toUpperCase() }}</span>
          <el-table class="mini-trade" height="600"  :data="symbolList" :default-sort="{prop: 'close', order: 'descending'}" max-height="800" @row-click="handleRowClick" v-loading="symbolList.length == 0" element-loading-background="#181b2a" style="width: 100%">
            <el-table-column prop="symbolName" label="币种" sortable >
              <template slot-scope="scope">
                {{ scope.row.target.toUpperCase()}}
                </template>
          </el-table-column>
          <el-table-column prop="close" label="最新价" sortable  >
            <template slot-scope="scope">
              {{ scope.row.close}}
              </template>
          </el-table-column>
          <el-table-column label="涨幅">
<template slot-scope="scope">
  <span v-if="scope.row.rate>0" style='color:#589065'> +{{ scope.row.rate.toFixed(2)}}% </span>
  <span v-if="scope.row.rate<0" style='color:#ae4e54'> {{ scope.row.rate.toFixed(2)}}% </span>
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
    name: "sidebar-chart",
    data() {
      return {
        activeName: "usdt",
        currentSymbol: 'usdt',
        sidebarInterval: {},
        symbols: ['usdt', 'btc', 'eth', 'tc'],
      }
    },
    computed: {
      symbolList() {
        return this.$store.getters.getCoinList(this.currentSymbol);
      },
      isLoading() {
        return this.$store.getters.getCoinList(this.currentSymbol).length === 0;
      }
    },
    methods: {
      handleClick(tab) {
        this.currentSymbol = this.symbols[tab.index]
        // this.$store.commit('SET_MAINCOIN', this.currentSymbol)
        // console.log(this.currentSymbol)
      },
      handleRowClick(row, event, column) {
        this.$store.commit('SET_MAINCOIN', row.symbolName)
        this.$store.commit('SET_TARGETCOIN', row.target)
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
          this.$notify.error(_.message) //todo:知道id之后最好把全部查询改为根据id查询
        })
      }
    },
    beforeDestroy() {
      clearInterval(this.sidebarInterval)
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/custom-theme/theme";
  .sidebar-chart /deep/ {
    margin-top: 5px;
    .not-login {
      padding: 16px 10px 16px 20px;
      background-color: #1b1e2e;
      a {
        color: #7a98f7;
      }
    }
    .total-balance {
      border-radius: 3px 3px 0 0;
      padding: 16px 10px 16px 20px;
      border-bottom: 2px solid transparent;
      background-color: #1b1e2e;
    }
    .drawer {
      background-color: #1b1e2e;
      position: relative;
    }
    .el-tabs--border-card {
      border: none;
      &>.el-tabs__header {
        background-color: #1b1e2e;
        border-bottom: 1px solid transparent;
        .el-tabs__item {
          color: #c7cce6;
          width: 70px;
          border: none;
          &:not(.is-disabled):hover {
            color: #7a98f7;
          }
          &.is-active {
            color: #7a98f7;
            background-color: #1b1e2e;
            border-right-color: #1b1e2e;
            border-left-color: #1b1e2e;
          }
        }
      }
      &>.el-tabs__content {
        padding: 0;
      }
    }
    .el-table {
      font-size: 13px;
      color: #c7cce6;
      .caret-wrapper {
        width: unset;
      }
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
      border-color: #262a42;
    }
    .el-table th,
    .el-table tr {
      background-color: #181b2a;
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
    .el-table--border,
    .el-table--group {
      border-color: #262a42;
    }
    .el-table,
    .el-table__expanded-cell {
      background-color: #181b2a;
    }
     ::-webkit-scrollbar {
      width: 10px;
      background-color: #181b2a;
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
     ::-webkit-scrollbar-button {}
  }
</style>
