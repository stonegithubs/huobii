<template>
    <div class="sidebar-chart">
        <div v-if="this.$store.state.user.token" class="total-balance">
          <div><p>净资产折合:</p></div>
          <div>0.00000000 BTC <span class="upper" style="opacity: 0.5;"> ≈ 0.00 cny</span></div>
        </div>
        <div v-else class="not-login">
          <p>
            <router-link :to="{ name: 'login'}">登录</router-link> 或 <router-link :to="{ name: 'registry'}">注册</router-link>开始交易</p>
        </div>
        <div class="drawer">
          <el-tabs class="trade-bar"  v-model="activeName" type="border-card"  @tab-click="handleClick">
            <el-tab-pane v-for="symbol in symbols" :key="symbol.symbolName" :name= "symbol.symbolName" >
              <span slot="label" >{{ symbol.toUpperCase() }}</span>
              <el-table class="mini-trade" height="600" border
                        :data="symbolList"
                        :default-sort = "{prop: 'close', order: 'descending'}"
                        max-height="800"
                        style="width: 100%">

                <el-table-column
                  prop="symbolName"
                  label="币种"
                  sortable
                  min-width="70"
                >
                </el-table-column>
                <el-table-column
                  prop="close"
                  label="最新价"
                  sortable
                  :formatter="priceFormatter"
                  min-width="80"
                >
                </el-table-column>
                <el-table-column
                  prop="amount"
                  label="成交量"
                  sortable
                  :formatter="amountFormatter"
                  min-width="80">
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
    computed:{
      symbols() {
        return this.$store.getters.getUniqueSymbol();
      },
      symbolList() {
        return this.$store.getters.getSymbolData(this.currentSymbol);
      },

    },
  methods: {
    handleClick(tab) {
      this.currentSymbol = this.symbols[tab.index]
    },
    amountFormatter(row){
      return row.amount.toFixed(row['amount-precision'])
    },
    priceFormatter(row){
      return row.amount.toFixed(row['price-precision'])
    },

  },
  created(){
      if(this.$store.state.coinData.symbols.length ===0 ){
        this.$store.dispatch('getSymbols').then(() => {
          this.$store.getters.getUniqueSymbol()
        }).catch(()=>{
          this.$message({
            message: 'network err',
            type: 'error'
          })
        })
        this.$store.dispatch('getSymbolList').catch(()=>{
          this.$message({
            message: 'network err',
            type: 'error'
          })
        })
      }
  },

    data() {
      return {
        activeName: "0",
        currentSymbol: 'usdt',
      }
  }
}
</script>

<style lang="scss">
  @import "../../../assets/custom-theme/theme";

.sidebar-chart {
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
      & > .el-tabs__header {
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
      & > .el-tabs__content {
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
            & > td {
              background-color: #1b1e2e !important;
            }
          }
        }
      }
    }

    .el-table td, .el-table th.is-leaf {
      border-color: #262a42;
    }
    .el-table th, .el-table tr {
      background-color: #181b2a;
    }
    .el-table td, .el-table th {
      padding: 4px;
    }
    .el-table--border::after, .el-table--group::after, .el-table::before {
      display: none;
    }
    .el-table--border th.gutter:last-of-type {
      border: none;
    }
    .el-table--border, .el-table--group {
      border-color: #262a42;
    }
    .el-table, .el-table__expanded-cell {
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
    ::-webkit-scrollbar-button {
    }
  }

</style>
