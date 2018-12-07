<template>
  <el-container>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane v-for="item in supportCoin" v-bind:key="item.id" :name="item.abbr.toUpperCase()">
        <template slot="label">{{item.abbr.toUpperCase()}}交易
</template>
      <div class="trade-tab">
        <div class="hb-buy">
          <h3 class="title">买入{{item.abbr.toUpperCase()}}</h3>
          <div class="trade-form">
            <el-input disabled v-model="buyPrice">
            <template slot="suffix">
              <span class="suf-msg"> 买入价</span>
            </template>
              </el-input>
                <el-input v-model="buyNumber">
            <template slot="suffix">
              <span class="suf-msg">买入数量</span>
            </template>
            </el-input>
            <div class="total-price">需要 <span class="buy">13.4</span> CNY</div>
            <el-button class="buy-button">立即买入</el-button>
          </div>
        </div>
        <div class="hb-sell">
          <div class="trade-form">
            <h3 class="title">卖出{{item.abbr.toUpperCase()}}</h3>
            <el-input disabled v-model="buyPrice">
            <template slot="suffix">
              <span class="suf-msg"> 卖出价</span>
            </template>
            </el-input>
            <el-input v-model="buyNumber">
            <template slot="suffix">
              <span class="suf-msg">   卖出数量</span>
            </template>
            </el-input>
            <div class="total-price">可得 <span class="sell">13.4</span> CNY</div>
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
    </el-tab-pane>
  </el-tabs>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>兑换记录</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
  <tradeTable></tradeTable>
  </el-card>
  </el-container>
  </template>

<script>
  import scrollBar from './components/scrollBar/scrollBar'
  import tradeTable from './components/tradeTable/tradeTable'
  export default {
    name: "index",
    components: {
      scrollBar,
      tradeTable
    },
    data() {
      return {
        activeName: 'btc',
        buyPrice: 12,
        buyNumber: 0,
        supportCoin: [],
      }
    },
    computed: {
    
    },
    methods: {
    handleClick(tab, e){
      console.log(tab)
    }
    },

    beforeCreate(){
        this.$store.dispatch('getSupportCoin').then(_=>{
          this.supportCoin = _.content.records
        }).catch(_=>{})
    }
  }
</script>

<style lang='scss' scoped>
  .el-container /deep/ {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    .el-tabs {
      width: 1200px;
      margin: auto;
      margin-top: 40px;
      .el-tabs__content {
        padding: 30px;
        .el-tab-pane /deep/ {
          .trade-tab {
            justify-content: space-around;
            display: flex;
            .title {
              font-size: 20px;
              font-weight: 700;
            }
            .el-input {
              margin-top: 20px;
              width: 100%;
              .suf-msg {
                height: 40px;
                line-height: 40px;
                padding: 0 20px;
              }
            }
            .hb-buy,
            .hb-sell {
              width: 550px;
            }
            .buy-button {
              width: 100%;
              background-color: #03c087;
              color: #fff;
            }
            .sell-button {
              width: 100%;
              background-color: #f55858;
              color: #fff;
            }
            .total-price {
              margin: 30px 0;
              font-weight: 600;
            }
          }
          .trade-history {
            display: flex; // height: 200px;
            .trade-wrap {
              height: 30px;
              overflow: hidden;
            }
            .shd {
              margin-top: 30px;
              background-color: #f5f7fa;
              span {
                width: 115px;
                height: 32px;
                line-height: 32px;
                display: inline-block;
                text-align: right;
              }
              span:first-child {
                text-align: left;
                width: 180px;
                margin-left: 20px;
              }
            }
          }
        }
      }
    }
    .my-trade {
      .trade-history {
        display: inline-block;
        margin-left: 466px;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: -1px;
        margin-top: 40px;
      }
    }
    .box-card {
      width: 1200px;
      margin: auto;
      margin-top: 30px;
      .clearfix {
        font-size: 20px;
        font-weight: 600;
      }
    } // .el-tabs--border-card>
  } //   .mg-container .el-tabs--card>.el-tabs__header .el-tabs__nav,
  //   .mg-container .el-tabs--card>.el-tabs__header .el-tabs__item,.el-tabs--card>.el-tabs__header,
  //   .mg-container .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
  //     border: none;
  //   }
  //   .mg-container .el-tabs__item {
  //     height: 50px;
  //     line-height: 50px;
  //     min-width: 130px;
  //     width: 130px;
  //     text-align: center;
  //     font-size: 17px;
  //     /* background-color: #35394f; */
  //     color: #7a98f7;
  //     margin-right: 20px;
  //   }
  //  .mg-container .el-tabs__item:hover {
  //    color :#aabdfa
  //  }
  //  .mg-container .el-tabs__header{
  //    margin: 0;
  //  }
  //   .mg-container .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
  //     /* background-color: #1b1e2e; */
  //     /* color: #7a98f7; */
  //   }
  //   .mg-container .el-tabs__content {
  //     min-height: 600px;
  //   }
  //   .mg-container .trade-tab {
  //     /*width: 1170px;*/
  //     width: 100%;
  //     /* background-color: #1b1e2e; */
  //     height: 300px;
  //     padding: 20px 20px 0 20px;
  //     position: relative;
  //   }
  //   .mg-container .trade-tab h3 {
  //     margin-bottom: 10px;
  //     margin-top: 20px;
  //     /* color: #c7cce6; */
  //     font-size: 16px;
  //     font-weight: bold;
  //   }
  //   .mg-container .hb-buy, .hb-sell {
  //     position: absolute;
  //     width: 575px;
  //     height: 240px;
  //     /*background-color: hotpink;*/
  //     top: 20px;
  //     left: 20px;
  //   }
  //   .mg-container .hb-sell {
  //     left: 610px;
  //   }
  //   .mg-container .trade-history {
  //     height: 70px;
  //     width: 100%;
  //     padding-top: 25px;
  //   /* background-color: #1b1e2e; */
  //     position: relative;
  //   }
  //   .mg-container .el-input.is-disabled .el-input__inner {
  //     /* background-color: #202437; */
  //     color: #ae4e54;
  //   }
  //   .mg-container .el-input__inner {
  //     /* background-color: #202437; */
  //     height: 48px;
  //     border: none;
  //     font-size: 18px;
  //     text-align: right;
  //     font-weight: 600;
  //     color: #ae4e54;
  //     margin-top: 14px;
  //   }
  //   .mg-container .el-input__prefix {
  //     left: 19px;
  //     top: 24px;
  //     font-size: 16px;
  //     /* color: #6d7b82 */
  //   }
  //   .mg-container .el-input__suffix {
  //     font-size: 14px;
  //     color: #6d7b82;
  //     font-weight: bold;
  //   }
  //   .mg-container .total-sell-price,.total-buy-price {
  //     font-size: 14px;
  //     /*margin-left: 20px;*/
  //     margin-top: 10px;
  //   }
  //   .mg-container .total-buy-price span {
  //     font-size: 17px;
  //     font-weight: 700;
  //     color: #ae4e54;
  //   }
  //   .mg-container .total-sell-price span {
  //     font-size: 17px;
  //     font-weight: 700;
  //     color: #589065;
  //   }
  //   .mg-container .buy-button {
  //     background-color:#ae4e54;
  //     border: none;
  //     color: white;
  //     width: 100%;
  //     margin-top: 20px;
  //   }
  //   .mg-container .buy-button:focus, .buy-button:hover {
  //     color: white;
  //     background-color:#ae4e54;
  //   }
  //   .mg-container .sell-button {
  //     background-color:#589065;
  //     border: none;
  //     color: white;
  //     width: 100%;
  //     margin-top: 20px;
  //   }
  //  .mg-container  .sell-button:focus, .sell-button:hover {
  //     color: white;
  //     background-color:#589065;
  //   }
  //   .mg-container .trade-wrap {
  //     overflow: hidden;
  //     position: relative;
  //     width: 1160px;
  //     height: 32px;
  //   }
  //   .mg-container .buy-show, .sell-show {
  //     /* border: 1px solid  #1f2943; */
  //     width: 587px;
  //     height: 64px;
  //     position: absolute;
  //     top: 10px;
  //     /* color: #6d7b82; */
  //     left: 10px;
  //   }
  //   .mg-container .sell-show {
  //     left: 610px;
  //   }
  //  .mg-container  .shd {
  //     height: 32px;
  //     /* border-bottom: 1px solid #61688a ; */
  //     /* background-color: #1e2235; */
  //   }
  //  .mg-container  .shd span {
  //     width: 115px;
  //     height: 32px;
  //     line-height: 32px;
  //     display: inline-block;
  //     /*border-right: 1px solid #61688a ;*/
  //     text-align: right;
  //   }
  //  .mg-container  .shd span:first-child {
  //     text-align: left;
  //     width: 180px;
  //     margin-left: 20px;
  //   }
  //   .mg-container .my-trade {
  //     min-height: 200px;
  //     padding-top: 20px;
  //     /* background-color: #1b1e2e; */
  //     margin-bottom: 50px;
  //   }
  //   .mg-container .my-trade span {
  //     font-size: 16px;
  //     font-weight: 700;
  //     margin-left: 20px;
  //     margin-bottom: 10px;
  //     display: inline-block;
  //   }
  //  .mg-container  .my-trade-inner {
  //     min-height: 200px;
  //     margin-left: 20px;
  //     margin-right: 20px;
  //     /*background-color: hotpink;*/
  //   }
  //  .mg-container  .bk-line {
  //     width: 97%;
  //     height: 1px;
  //     margin-top: 10px;
  //     margin-bottom: 20px;
  //     /* background-color: #1f2943; */
  //   }
  //   .mg-container .hb-cover {
  //     height: 1px;
  //     position: absolute;
  //     bottom: 50px;
  //     width: 100%;
  //     /* background-color: #1b1e2e; */
  //     z-index: 999999999;
  //   }
</style>
