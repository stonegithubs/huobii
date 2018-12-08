<template>
  <div class="open-orders">
    <div class="hb-tab">
      <div class="mod-name">
        <span>{{$t('exchange.main.openBook')}}</span>
      </div>
    </div>
    <div class="inner">
      <el-table :data="openOrderList" style="width: 100%">
        <el-table-column :label="$t('exchange.main.time')">
          <template slot-scope="scope">
                <span>{{ scope.row.tradeTime }}</span>
</template>
          </el-table-column>

          <el-table-column
          :label="$t('index.tradeShow.pair')"
          >
<template slot-scope="scope">
  <span>{{ getCoinNameByID(scope.row.forgCoinId).toUpperCase() }}/{{ getCoinNameByID(scope.row.localCoinId).toUpperCase() }}</span>
</template>
          </el-table-column>
          <!-- todo:这里id要查询到币种 -->

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
            :label="$t('exchange.main.operation')">
<template slot-scope="scope">
  <el-button size="mini" type="text" @click="repeal(scope.row)">
    {{$t('repeal')}}</el-button>
  <el-button size="mini" type="text" @click="appeal(scope.row)">{{$t('appeal')}}</el-button>
</template>
          </el-table-column>
        </el-table>
      </div>
      
    </div>
</template>

<script>
  import {
    getOrderBySymbolName
  } from "../../../api/coin_trade";
  import {
    mapGetters
  } from 'vuex';
  export default {
    name: "open-orders",
    data() {
      return {
        // 当前委托列表
        openOrderList: [],
        
      };
    },
    computed: {
      ...mapGetters([
        'getCoinNameByID'
      ])
    },
    created() {
      // console.log(this.$store.getters.getCoinNameByID)
      getOrderBySymbolName(0, 20, 10, 'usdt_btc', 9, '2018-12-08', '2038-12-08', 1)
        .then(response => {
          this.openOrderList = response.content.records;
        })
        .catch(_ => {});
    },
    methods: {
      repeal(row) {
        console.log(row)
      },
      appeal(row) {
        this.appealVisible = true
        console.log(row)
      },
      handleClose(done) {
        this.$confirm(this.$t('confirmToClose'))
          .then(_ => {
            this.appealVisible = false
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>

<style lang="scss">
  @import "../../../assets/custom-theme/theme";
  .open-orders {
    width: 1136px;
    min-height: 190px;
    /*background-color: darkgoldenrod;*/
    .title {
      height: 48px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1); // background-color: #1b1e2e;
      font-size: 16px;
      line-height: 48px;
      padding-left: 20px;
      .mod-name {
        float: left;
      }
    }
    .inner {
      min-height: 142px;
      .el-table {
        // background-color: #181b2a;
        color: $hbColor;
        font-size: 13px;
        min-height: 140px;
      }
      .el-table--border::after,
      .el-table--group::after,
      .el-table::before {
        display: none;
      }
      .el-table td,
      .el-table th.is-leaf {
        border-bottom: none;
      }
    }
  }
</style>
