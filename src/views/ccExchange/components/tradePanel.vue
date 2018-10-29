<template>
    <div class="trade-panel">
      <el-tabs v-model="activeName">
        <!--<div>费率</div>-->
        <el-tab-pane name="xj">
          <template slot="label">限价交易</template>
          <div class="buy">
            <div class="balance"><span> 可用 {{this.getCoinBalanceByName(this.getMainCoin).coinBalance }} {{ this.getMainCoin.toUpperCase() }}</span><a href="">充币</a></div>
            <div class="trade-from">
              <span> 买入价</span>
              <el-input v-model.number="xj_buyForm.price">
                <span class="coin-name" slot="suffix">{{ this.getMainCoin.toUpperCase() }}</span>
              </el-input>
              <span> 买入量</span>
              <el-input v-model.number="xj_buyForm.amount" v-on:mouseenter.native="xj_buy_max = 999999">
                <span class="coin-name" slot="suffix">{{ this.getTargetCoin.toUpperCase() }}</span>
              </el-input>
              <el-slider
                v-on:mouseenter.native="xj_buy_max = xj_buyForm.amount"
                v-model.number="xj_buyForm.amount"
                :step="0.00001"
                :max="xj_buy_max"
                  >
              </el-slider>
              <div class="total">
                <p>交易额 <span>{{(this.xj_buyForm.amount*this.xj_buyForm.price).toFixed(5)}} {{ this.getMainCoin.toUpperCase()  }}</span></p>
              </div>
              <a @click="handle_xj_buy">买入 <span>{{ this.getTargetCoin.toUpperCase()  }}</span></a>
            </div>
          </div>
          <div class="sell">
            <div class="balance">
              <span>{{this.getCoinBalanceByName(this.getTargetCoin).coinBalance }} {{ this.getTargetCoin.toUpperCase() }}</span>
              <a href="">充币</a>
            </div>
            <div class="trade-from">
              <span> 卖出价</span>
              <el-input v-model.number="xj_sellForm.price">
                <span class="coin-name" slot="suffix">{{ this.getMainCoin.toUpperCase() }}</span>
              </el-input>

              <span> 卖出量</span>
              <el-input v-model.number="xj_sellForm.amount"  v-on:mouseenter.native="xj_sell_max = 999999">
                <span class="coin-name" slot="suffix">{{ this.getTargetCoin.toUpperCase()  }}</span>
              </el-input>
              <el-slider
                v-on:mouseenter.native="xj_sell_max = xj_sellForm.amount"
                v-model.number="xj_sellForm.amount"
                :step="0.00001"
                :max="xj_sell_max"
              >
              </el-slider>
              <div class="total">
                <p>交易额 <span>{{(this.xj_sellForm.amount*this.xj_sellForm.price).toFixed(5)}} {{ this.getMainCoin.toUpperCase()  }}</span></p>
              </div>
              <a class="sell-button" @click="handle_xj_sell">卖出 <span>{{ this.getTargetCoin.toUpperCase() }}</span></a>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="sj">
          <template slot="label">市价交易</template>
          <div class="buy">
            <div class="balance"><span> 可用 {{this.getCoinBalanceByName(this.getMainCoin).coinBalance }} {{ this.getMainCoin.toUpperCase() }}</span><a href="">充币</a></div>
            <div class="trade-from">
              <span> 买入价</span>
              <el-input v-model.number="sj_buyForm.price">
                <span class="coin-name" slot="suffix">{{ this.getMainCoin.toUpperCase() }}</span>
              </el-input>
              <span> 买入量</span>
              <el-input v-model.number="sj_buyForm.amount" v-on:mouseenter.native="xj_buy_max = 999999">
                <span class="coin-name" slot="suffix">{{ this.getTargetCoin.toUpperCase() }}</span>
              </el-input>
              <el-slider
                v-on:mouseenter.native="sj_buy_max = sj_buyForm.amount"
                v-model.number="sj_buyForm.amount"
                :step="0.00001"
                :max="sj_buy_max"
                  >
              </el-slider>
              <div class="total">
                <p>交易额 <span>{{(this.sj_buyForm.amount*this.sj_buyForm.price).toFixed(5)}} {{ this.getMainCoin.toUpperCase()  }}</span></p>
              </div>
              <a @click="handle_xj_buy">买入 <span>{{ this.getTargetCoin.toUpperCase()  }}</span></a>
            </div>
          </div>
          <div class="sell">
            <div class="balance">
              <span>{{this.getCoinBalanceByName(this.getTargetCoin).coinBalance }} {{ this.getTargetCoin.toUpperCase() }}</span>
              <a href="">充币</a>
            </div>
            <div class="trade-from">
              <span> 卖出价</span>
              <el-input v-model.number="sj_sellForm.price">
                <span class="coin-name" slot="suffix">{{ this.getMainCoin.toUpperCase() }}</span>
              </el-input>

              <span> 卖出量</span>
              <el-input v-model.number="sj_sellForm.amount"  v-on:mouseenter.native="sj_sell_max = 999999">
                <span class="coin-name" slot="suffix">{{ this.getTargetCoin.toUpperCase()  }}</span>
              </el-input>
              <el-slider
                v-on:mouseenter.native="sj_sell_max = sj_sellForm.amount"
                v-model.number="sj_sellForm.amount"
                :step="0.00001"
                :max="sj_sell_max"
              >
              </el-slider>
              <div class="total">
                <p>交易额 <span>{{(this.sj_sellForm.amount*this.sj_sellForm.price).toFixed(5)}} {{ this.getMainCoin.toUpperCase()  }}</span></p>
              </div>
              <a class="sell-button" @click="handle_xj_sell">卖出 <span>{{ this.getTargetCoin.toUpperCase() }}</span></a>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { submitTrade } from '../../../api/coin_trade'
  export default {
  name: "trade-panel",
  computed:{
    ...mapGetters([
      'getCoinBalanceByName',
      'getMainCoin',
      'getTargetCoin',
      'getCoinIdByName'
    ]),
  },

  data(){
    return {
      activeName:'xj',
      xj_sell_max: 999999,
      xj_buy_max: 999999,
      //限价买入
      xj_buyForm: {
        direction: 0,    //0买入 1卖出
        amount: 0,        //交易总数
        price: 0,         //交易单价
        localId: this.$store.getters.getCoinIdByName(this.getMainCoin),      //本币id
        foreignId: this.$store.getters.getCoinIdByName(this.getTargetCoin),    //外币id
        type: ''
      },
      //限价卖出
      xj_sellForm: {
        direction: 1,    //0买入 1卖出
        amount: 0,        //交易总数
        price: 0,         //交易单价
        localId: this.$store.getters.getCoinIdByName(this.getMainCoin),      //本币id
        foreignId: this.$store.getters.getCoinIdByName(this.getTargetCoin),    //外币id
        type: ''
      },
      //市价买入 //todo:市价交易未写
      sj_buyForm: {
        direction: 0,    //0买入 1卖出
        amount: 0,        //交易总数
        price: 0,         //交易单价
        localId: this.$store.getters.getCoinIdByName(this.getMainCoin),      //本币id
        foreignId: this.$store.getters.getCoinIdByName(this.getTargetCoin),    //外币id
        type: ''
      },
      //市价卖出
      sj_sellForm: {
        direction: 1,    //0买入 1卖出
        amount: 0,        //交易总数
        price: 0,         //交易单价
        localId: this.$store.getters.getCoinIdByName(this.getMainCoin),      //本币id
        foreignId: this.$store.getters.getCoinIdByName(this.getTargetCoin),    //外币id
        type: ''
      },

    }
  },
    methods: {
      handle_xj_buy(){
        let formData = new FormData()
        formData.append('direction',this.xj_buyForm.direction)
        formData.append('amount',this.xj_buyForm.amount)
        formData.append('price',this.xj_buyForm.price)
        formData.append('localId',this.xj_buyForm.localId)
        formData.append('foreignId',this.xj_buyForm.foreignId)
        formData.append('type',this.xj_buyForm.type)
        submitTrade(formData).then(response=>{
          console.log(response)
        })
      },
      handle_xj_sell(){
        console.log(this.xj_buyForm)
      }
    },

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
