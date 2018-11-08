<template>
    <div class="market-trades">
      <div class="mt-title">
        <span>实时成交</span>
      </div>
      <div class="mt-inner">
        <el-table cell-class-name='market-table' :data="marketHistory"  height='468' style="width: 100%">
          <el-table-column label="时间">
           <template slot-scope="scope">
            {{parseTime(scope.row.data[0].ts,'{h}:{i}:{s}')}}
          </template>
          </el-table-column>
          <el-table-column label="方向">
              <template slot-scope="scope">
                <span v-if="scope.row.data[0].direction == 'sell'" style="color:#ae4e54">
                  卖出
                </span>
                <span v-if="scope.row.data[0].direction == 'buy'" style="color:#589065">
                  买入
                </span>
                
            </template>
          </el-table-column>
          <el-table-column :label="'价格'+'('+this.$store.state.coinData.targetCoin.toUpperCase()+')'">
              <template slot-scope="scope">
            {{scope.row.data[0].price}}
            </template>
          </el-table-column>
          <el-table-column :label="'数量'+'('+this.$store.state.coinData.mainCoin.toUpperCase()+')'">
              <template slot-scope="scope">
            {{scope.row.data[0].amount.toFixed(6)}}
          </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
import { getHistoryTrade } from '../../../api/coin_trade'
import { parseTime } from '../../../utils/index'
import { clearInterval, setInterval } from 'timers';
export default {
  name: "market-trades",
  data(){
    return {
      marketHistory:[],
      historyInterval: null,
    }
  },
  created(){
    this.fetchData()
    // getHistoryTrade
  },
  methods:{
    parseTime(a,b){
      return parseTime(a,b)
    },
    fetchData(){
      let mySymbol = this.$store.state.coinData.targetCoin + this.$store.state.coinData.mainCoin
      const formData = new FormData()
      formData.append('symbol',mySymbol)
      formData.append('size',30)
      getHistoryTrade(formData).then(res=>{
        this.marketHistory = res.content.data
      }).catch(_=>{})
      if(this.historyInterval){
        clearInterval( this.historyInterval )
      }
      this.historyInterval = setInterval(()=>{
        getHistoryTrade(formData).then(res=>{
        this.marketHistory = res.content.data
      }).catch(_=>{})
      },15000)
    }
    
  },
  computed:{
    symbol(){
      return this.$store.state.coinData.targetCoin
    }
  },
  watch:{
    symbol(){
      this.fetchData()
    }
  },
  beforeDestroy(){
    clearInterval( this.historyInterval )
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/custom-theme/theme";

  .market-trades /deep/{
    width: 445px;
    height: 520px;
    /*background-color: lemonchiffon;*/
    .mt-title {
      height: 48px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
      background-color: #1b1e2e;
      font-size: 16px;
      line-height: 48px;
      padding-left: 20px;
    }
    .mt-inner {
      height: 472px;
      padding: 0 20px;
      background-color: #181b2a;
      // overflow: hidden;
      .el-table {
        background-color: #181b2a;
        color: $hbColor;
        font-size: 13px;
        min-height:472px;
      }
      .el-table--enable-row-hover .el-table__body tr:hover>td {
        background: #181b2a;
      }
      .market-table {
        padding: 0
      }
      .el-table th, .el-table tr {
        background-color: #181b2a;
      }
      .el-table--border::after, .el-table--group::after, .el-table::before {
        display: none;
      }
      .el-table td, .el-table th.is-leaf {
        border-bottom: none;
      }
    }
  }
</style>
