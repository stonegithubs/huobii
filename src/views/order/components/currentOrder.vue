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

      <el-table-column :label="$t('exchange.main.direction')">
        <template slot-scope="scope">
          <span>{{ scope.row.direction === '0'? $t('exchange.main.buy'):$t('exchange.main.sell') }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('exchange.main.price')+'('+this.$store.state.coinData.mainCoin.toUpperCase()+')'"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.price.toFixed(6) }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('exchange.main.amount')+'('+this.$store.state.coinData.targetCoin.toUpperCase()+')'"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.amount.toFixed(6) }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('exchange.main.total')+'('+this.$store.state.coinData.mainCoin.toUpperCase()+')'"
      >
        <template slot-scope="scope">
          <span>{{ (scope.row.amount).toFixed(6) }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('exchange.main.deal')" prop>
        <template slot-scope="scope">
          <span>{{ Number(scope.row.tradeAmount).toFixed(6) }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('exchange.main.notClosed')" prop>
        <template slot-scope="scope">
          <span>{{ (scope.row.amount - Number(scope.row.tradeAmount)).toFixed(6) }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('exchange.main.operation')">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="mrepeal(scope.row.id)">{{ $t('repeal') }}</el-button>
          <!-- <el-button size="mini" type="text" @click="appeal(scope.row)">{{$t('appeal')}}</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { parseTime, confirmReppelCoinTrade } from "@/utils";
import coinFliter from "./coinFliter";
import { mapGetters } from "vuex";
import { getOrderBySymbolName } from "@/api/coin_trade";
export default {
  name: "CurrentOrder",
  components: {
    coinFliter
  },
  data() {
    return {
      currentOrderData: [],
      symbolName: "usdt_btc",
      loading: true,
      page: 0,
      size: 10,
      direction: "10",
      targetCoin: "usdt",
      mainCoin: "btc",
      time: ["2018-09-15", "2022-09-15"],
      order: "1"
    };
  },
  created() {
    this.loading = true;
    this.$store.dispatch("getSupportCoin").then(_ => {
      this.init();
    });
  },
  methods: {
    changeOrder(s) {
      this.direction = s.direction;
      this.targetCoin = s.targetCoin;
      this.mainCoin = s.mainCoin;
      this.time = s.time;
      this.order = s.order;
    },
    init() {
      this.loading = true;
      getOrderBySymbolName(
        this.page,
        10,
        this.direction,
        this.targetCoin+'_'+this.mainCoin,
        this.state,
        this.time[0],
        this.time[1],
        1
      ).then(response => {
        this.loading = false;
        if (response.content.records instanceof Array) {
          this.currentOrderData = response.content.records;
        }
      });
    },
    mrepeal(id) {
      confirmReppelCoinTrade(this, id);
    },
    parseTime(timeStamp) {
      return parseTime(timeStamp);
    }
  },
  computed: {
    ...mapGetters(["getCoinNameByID"])
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/custom-theme/theme";
.current-order /deep/ {
  .el-table {
    // background-color: #1b1e2e;
    .cell {
      white-space: pre;
      overflow: unset;
      font-size: 12px;
    }
  }
}
</style>
