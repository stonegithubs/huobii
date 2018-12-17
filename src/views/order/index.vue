<template>
  <div class="orders-list">
    <div class="order-inner">
      <h1>{{$t('navbar.user.exchangeOrder')}}</h1>
      <div class="fliter-inner">
        <coin-fliter @makeChange="changeOrder"></coin-fliter>
      </div>
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

          <el-table-column
            v-if="state==0 || state==1||state==9||state==11"
            :label="$t('exchange.main.operation')"
          >
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="mrepeal(scope.row.id)">{{ $t('repeal') }}</el-button>
              <!-- <el-button size="mini" type="text" @click="appeal(scope.row)">{{$t('appeal')}}</el-button> -->
            </template>
          </el-table-column>
          <el-table-column v-else :label="$t('exchange.main.status')">
            <template slot-scope="scope">
              <span>{{getStatus(scope.row.status)}}</span>
              <!-- TODO: Zhuangtai fan yi -->
              <!-- <span v-else>{{ $t('exchange.main.userCanceled') }} </span> -->
            </template>
          </el-table-column>
        </el-table>
        <div class="pgn">
 <el-pagination
        :page-count="pages"
        :current-page.sync ="page"
        class=""
        background
        layout="prev, pager, next"
        />
                </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseTime, confirmReppelCoinTrade, getStatusG } from "@/utils";
import coinFliter from "./components/coinFliter";
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
      pages: 2,
      size: 10,
      direction: "10",
      state: "0",
      targetCoin: "usdt",
      mainCoin: "btc",
      time: ["2018-09-15", "2022-09-15"],
      order: "1",
      total: 10,
    };
  },
  created() {
    if(!this.$store.state.user.token){
      this.$router.push({ name: 'login'})
    }
    this.loading = true;
    this.$store.dispatch("getSupportCoin").then(_ => {
      this.init();
    });
  },
  methods: {
    changeOrder(s) {
      this.page = 0;
      this.direction = s.direction;
      this.targetCoin = s.targetCoin;
      this.mainCoin = s.mainCoin;
      this.time = s.time;
      this.order = s.order;
      this.state = s.state;
      this.init();
    },
    init() {
      this.loading = true;
      getOrderBySymbolName(
        this.page,
        10,
        this.direction,
        this.targetCoin + "_" + this.mainCoin,
        this.state,
        this.time[0],
        this.time[1],
        1
      ).then(response => {
        this.loading = false;
        this.currentOrderData = [];
        if (response.content.records instanceof Array) {
          this.currentOrderData = response.content.records;
          this.pages = response.content.pages
        }
      });
    },
    mrepeal(id) {
      confirmReppelCoinTrade(this, id);
    },
    parseTime(timeStamp) {
      return parseTime(timeStamp);
    },
    getStatus(a) {
      return getStatusG(this, a);
    },
    changePaege(){
      console.log("cao")
    }
  },
  computed: {
    ...mapGetters(["getCoinNameByID"])
  },
  watch: {
    page(page){
      this.init()
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/custom-theme/theme";
.current-order /deep/ {
  .el-table {
    // background-color: #1b1e2e;
    .cell {
      white-space: pre;
      overflow: unset;
      font-size: 12px;
      padding: 0;
    }
  }
}
.orders-list {
  background-color: #fff;
  padding: 50px 0;
  .order-inner {
    width: 1200px;
    margin: auto;
    min-height: 800px;
    h1 {
      font-size: 28px;
      font-weight: 500;
    }
    .fliter-inner {
      width: 1200px;
      overflow: hidden;
      height: 40px;
      margin-top: 30px;
      display: flex;
      justify-content: left;
    }
    .pgn {
      display: flex;
      margin: 20px;
      justify-content: center;
    }
  }
}
</style>
