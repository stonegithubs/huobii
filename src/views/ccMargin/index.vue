<template>
<div class="mg-container">
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane name="btc">
      <template slot="label">BTC交易</template>
      <div class="trade-tab">
        <div class="hb-buy">
          <h3>买入BTC</h3>
          <div class="trade-form">
            <el-input disabled v-model="buyPrice">
              <template slot="prefix">买入价</template>
            </el-input>
            <el-input v-model="buyNumber">
              <template slot="prefix">买入数量</template>
            </el-input>
            <div class="total-buy-price">需要 <span>13.4</span> CNY</div>
            <el-button class="buy-button">立即买入</el-button>
          </div>
        </div>
        <div class="hb-sell">
          <div class="trade-form">
            <h3>卖出BTC</h3>
            <el-input disabled v-model="buyPrice">
              <template slot="prefix">卖出价</template>
            </el-input>
            <el-input v-model="buyNumber">
              <template slot="prefix">卖出数量</template>
            </el-input>
            <div class="total-sell-price">可得 <span>13.4</span> CNY</div>
            <el-button class="sell-button">立即卖出</el-button>
          </div>

        </div>
      </div>
      <div class="trade-history">
          <div class="buy-show">
            <div class="shd">
              <span>用户</span>
              <span>成交数量</span>
              <span>类型</span>
              <span>状态</span>
            </div>
            <div class="trade-wrap">
              <scrollBar></scrollBar>
            </div>
          </div>
          <div class="sell-show">
            <div class="shd">
              <span>用户</span>
              <span>成交数量</span>
              <span>类型</span>
              <span>状态</span>
            </div>
            <div class="trade-wrap">
              <scrollBar></scrollBar>
            </div>
          </div>
      </div>
      <div class="my-trade">
        <span>兑换记录</span>
        <div class="bk-line"></div>
        <div class="my-trade-inner">
          <tradeTable></tradeTable>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane name="ustd">
      <template slot="label">USTD交易</template>
    </el-tab-pane>

  </el-tabs>
  <div class="hb-cover"></div>
</div>
</template>

<script>
import scrollBar from './components/scrollBar/scrollBar'
import tradeTable from './components/tradeTable/tradeTable'
export default {
  name: "index",
  components:{
    scrollBar,
    tradeTable
  },
  data(){
    return {
      activeName: 'btc',
      buyPrice:12,
      buyNumber:0,
    }
  },
}
</script>

<style>
  .mg-container {
    width: 1200px !important;
    margin-top: 30px !important;
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }
  .mg-container .el-tabs--card>.el-tabs__header .el-tabs__nav,
  .mg-container .el-tabs--card>.el-tabs__header .el-tabs__item,.el-tabs--card>.el-tabs__header,
  .mg-container .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    border: none;

  }

  .mg-container .el-tabs__item {
    height: 50px;
    line-height: 50px;
    min-width: 130px;
    width: 130px;
    text-align: center;
    font-size: 17px;
    background-color: #35394f;
    color: #7a98f7;
    margin-right: 20px;
  }
 .mg-container .el-tabs__item:hover {
   color :#aabdfa
 }
 .mg-container .el-tabs__header{
   margin: 0;
 }
  .mg-container .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    background-color: #1b1e2e;
    color: #7a98f7;
  }
  .mg-container .el-tabs__content {
    min-height: 600px;
  }
  .mg-container .trade-tab {
    /*width: 1170px;*/
    width: 100%;
    background-color: #1b1e2e;
    height: 300px;
    padding: 20px 20px 0 20px;
    position: relative;
  }
  .mg-container .trade-tab h3 {
    margin-bottom: 10px;
    margin-top: 20px;
    color: #c7cce6;
    font-size: 16px;
    font-weight: bold;
  }
  .mg-container .hb-buy, .hb-sell {
    position: absolute;
    width: 575px;
    height: 240px;
    /*background-color: hotpink;*/
    top: 20px;
    left: 20px;
  }
  .mg-container .hb-sell {
    left: 610px;
  }
  .mg-container .trade-history {
    height: 70px;
    width: 100%;
    padding-top: 25px;
  background-color: #1b1e2e;
    position: relative;
  }
  .mg-container .el-input.is-disabled .el-input__inner {
    background-color: #202437;
    color: #ae4e54;
  }
  .mg-container .el-input__inner {
    background-color: #202437;
    height: 48px;
    border: none;
    font-size: 18px;
    text-align: right;
    font-weight: 600;
    color: #ae4e54;
    margin-top: 14px;
  }
  .mg-container .el-input__prefix {
    left: 19px;
    top: 24px;
    font-size: 16px;
    color: #6d7b82
  }
  .mg-container .el-input__suffix {
    font-size: 14px;
    color: #6d7b82;
    font-weight: bold;
  }
  .mg-container .total-sell-price,.total-buy-price {
    font-size: 14px;
    /*margin-left: 20px;*/
    margin-top: 10px;
  }
  .mg-container .total-buy-price span {
    font-size: 17px;
    font-weight: 700;
    color: #ae4e54;
  }
  .mg-container .total-sell-price span {
    font-size: 17px;
    font-weight: 700;
    color: #589065;
  }
  .mg-container .buy-button {
    background-color:#ae4e54;
    border: none;
    color: white;
    width: 100%;
    margin-top: 20px;
  }
  .mg-container .buy-button:focus, .buy-button:hover {
    color: white;
    background-color:#ae4e54;
  }
  .mg-container .sell-button {
    background-color:#589065;
    border: none;
    color: white;
    width: 100%;
    margin-top: 20px;
  }
 .mg-container  .sell-button:focus, .sell-button:hover {
    color: white;
    background-color:#589065;
  }
  .mg-container .trade-wrap {
    overflow: hidden;
    position: relative;
    width: 1160px;
    height: 32px;
  }
  .mg-container .buy-show, .sell-show {
    border: 1px solid  #1f2943;
    width: 587px;
    height: 64px;
    position: absolute;
    top: 10px;
    color: #6d7b82;
    left: 10px;
  }
  .mg-container .sell-show {
    left: 610px;
  }
 .mg-container  .shd {
    height: 32px;
    border-bottom: 1px solid #61688a ;
    background-color: #1e2235;
  }
 .mg-container  .shd span {
    width: 115px;
    height: 32px;
    line-height: 32px;
    display: inline-block;
    /*border-right: 1px solid #61688a ;*/
    text-align: right;
  }
 .mg-container  .shd span:first-child {
    text-align: left;
    width: 180px;
    margin-left: 20px;
  }
  .mg-container .my-trade {
    min-height: 200px;
    padding-top: 20px;
    background-color: #1b1e2e;
    margin-bottom: 50px;
  }
  .mg-container .my-trade span {
    font-size: 16px;
    font-weight: 700;
    margin-left: 20px;
    margin-bottom: 10px;
    display: inline-block;
  }
 .mg-container  .my-trade-inner {
    min-height: 200px;
    margin-left: 20px;
    margin-right: 20px;
    /*background-color: hotpink;*/
  }
 .mg-container  .bk-line {
    width: 97%;
    height: 1px;
    margin-top: 10px;
    margin-bottom: 20px;
    background-color: #1f2943;
  }

  .mg-container .hb-cover {
    height: 1px;
    position: absolute;
    bottom: 50px;
    width: 100%;
    background-color: #1b1e2e;
    z-index: 999999999;
  }
</style>
