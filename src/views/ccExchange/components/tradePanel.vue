<template>
    <div class="trade-panel">
      <el-tabs v-model="activeName">
        <!--<div>费率</div>-->
        <el-tab-pane name="xj">
          <template slot="label">限价交易</template>
          <div class="buy">
            <div class="balance"><span>可用 0.0000000 BTC</span><a href="">充币</a>s</div>
            <div class="trade-from">
              <span> 买入价</span>
              <el-input v-model="current_symbol.price">
                <span class="coin-name" slot="suffix">USTD</span>
              </el-input>
              <div class="math-price">
                <span>≈ 27.40 CNY</span>
              </div>
              <span> 买入量</span>
              <el-input v-model="target_symbol.number">
                <span class="coin-name" slot="suffix">HPT</span>
              </el-input>
              <el-slider
                v-model="value7"
                :step="10"
                show-stops>
              </el-slider>
              <div class="total">
                <p>交易额 <span>0.00000000 USDT</span></p>
              </div>
              <a>买入 <span>HTP</span></a>
            </div>
          </div>
          <div class="sell">
            <div class="balance"><span>可用 0.0000000 BTC</span><a href="">充币</a>s</div>
            <div class="trade-from">
              <span> 卖出价</span>
              <el-input v-model="current_symbol.price">
                <span class="coin-name" slot="suffix">USTD</span>
              </el-input>
              <div class="math-price">
                <span>≈ 27.40 CNY</span>
              </div>
              <span> 卖出量</span>
              <el-input v-model="target_symbol.number">
                <span class="coin-name" slot="suffix">HPT</span>
              </el-input>
              <el-slider
                v-model="value7"
                :step="10"
                show-stops>
              </el-slider>
              <div class="total">
                <p>交易额 <span>0.00000000 USDT</span></p>
              </div>
              <a class="sell-button">卖出 <span>HTP</span></a>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane  name="sj">
          <template slot="label">市价交易</template>
          <div class="buy">
            <div class="balance"><span>可用 0.0000000 BTC</span><a href="">充币</a>s</div>
            <div class="trade-from">
              <span> 买入价</span>
              <el-input v-model="current_symbol.price">
                <span class="coin-name" slot="suffix">USTD</span>
              </el-input>
              <div class="math-price">
                <span>≈ 27.40 CNY</span>
              </div>
              <span> 买入量</span>
              <el-input v-model="target_symbol.number">
                <span class="coin-name" slot="suffix">HPT</span>
              </el-input>
              <el-slider
                v-model="value7"
                :step="10"
                show-stops>
              </el-slider>
              <div class="total">
                <p>交易额 <span>0.00000000 USDT</span></p>
              </div>
              <a>买入 <span>HTP</span></a>
            </div>
          </div>
          <div class="sell">
            <div class="balance"><span>可用 0.0000000 BTC</span><a href="">充币</a>s</div>
            <div class="trade-from">
              <span> 卖出价</span>
              <el-input v-model="current_symbol.price">
                <span class="coin-name" slot="suffix">USTD</span>
              </el-input>
              <div class="math-price">
                <span>≈ 27.40 CNY</span>
              </div>
              <span> 卖出量</span>
              <el-input v-model="target_symbol.number">
                <span class="coin-name" slot="suffix">HPT</span>
              </el-input>
              <el-slider
                v-model="value7"
                :step="10"
                show-stops>
              </el-slider>
              <div class="total">
                <p>交易额 <span>0.00000000 USDT</span></p>
              </div>
              <a class="sell-button">卖出 <span>HTP</span></a>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
export default {
  // props:['coinName'],
  name: "trade-panel",
  computed:{
    // 'coinName':'BTC'
  },
  data(){
    return {
      activeName:'xj',
      current_symbol:{
        name:'USTD',
        price: 12.99211
      },
      target_symbol: {
        name: 'HTP',
        number:0
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../../../assets/custom-theme/theme";

  .trade-panel {
    width: 763px;
    height: 490px;
    background-color: $innerColor;
    padding-left: 30px;
    .el-tabs__nav-scroll {
      background-color: $tabColor;
    }
    .el-tabs__active-bar {
      background-color: $hbHoverColor;
    }
    .el-tabs__item.is-active {
      color: $hbHoverColor;
    }
    .el-tabs__header {
      box-shadow: 0 3px 6px rgba(0,0,0,.1);
    }
    .el-tabs__nav-wrap::after {
      display: none
    }
    .el-tabs__item {
      color: $hbColor;
      height: 48px;
      line-height: 48px;
      font-size: 16px;
    }
    .buy, .sell {
      width: 350px;
      height: 400px;
      float: left;
      font-size: 14px;
      .balance {
        height: 40px;
        line-height: 30px;
        border-bottom: 1px solid $hbBackgroundColor;
        a {
          transition: all .2s ease-in-out;
          float: right;
          margin-right: 20px;
          color: $hbHoverColor;
          &:hover {
            color: $hbColor;
          }
        }
      }
      .trade-from>span {
        display: inline-block;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .trade-from {
        .el-slider {
          width: 90%;
          margin-top: 20px;
        }
        .coin-name {
          line-height:40px ;
          height:40px;
          margin-right: 40px;
          color: $lightColor;
          font-weight: 600;
        }
        a {
          display: inline-block;
          width: 90%;
          height: 40px;
          line-height: 40px;
          box-sizing: border-box;
          font-size: 16px;
          cursor: pointer;
          text-transform: uppercase;
          color: #fff;
          border: none;
          border-radius: 3px;
          text-align: center;
          background-color: #589065;
          &:hover {
            opacity: .9;
          }

        }
      }
      .el-input__inner {
        border-color: #4e5b85;
        color: $hbColor;
        background-color: #1e2235;
        width: 90%;
      }
      .math-price {
        width: 90%;
        height: 24px;
        background: rgba(78,91,133,.4);
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        span {
          margin-left: 20px;
          font-size: 12px;
          line-height: 24px;
          height: 24px;
        }
      }
      .total {
        margin: 20px 0;
        font-size: 16px;
      }
    }
    .sell-button{
      background-color: #ae4e54 !important;
    }
  }
</style>
