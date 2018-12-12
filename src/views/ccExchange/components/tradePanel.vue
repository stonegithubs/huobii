<template>
  <div class="trade-panel">
    <el-tabs v-model="activeName">
      <!--<div>费率</div>-->
      <el-tab-pane name="xj">
        <template slot="label">
          <span style="padding:0 15px;margin-left:15px">{{ $t('exchange.main.fixedPrice') }}</span>
        </template>
        <div class="hb-buy">
          <div class="panel-wrapper">
            <div v-if="!isAuth">
            <router-link :to="{ name: 'registry'}"> {{ $t('exchange.sidebar.registry') }}</router-link> {{ $t('exchange.sidebar.or') }} <router-link :to="{ name: 'login'}">{{ $t('exchange.sidebar.signIn') }} </router-link>{{ $t('exchange.sidebar.startTrade') }}
          </div>
          <div v-if="isAuth" class="balance"><span> {{ $t('exchange.main.available') }} {{ Number(this.getCoinBalanceByName(this.getMainCoin).coinBalance).toFixed(8) }} {{ this.getMainCoin.toUpperCase() }}</span><router-link :to="{ name: 'wallet'}">{{ $t('exchange.main.topUps') }}</router-link></div>
          <div class="trade-from">
            <span> {{ $t('exchange.main.buyPrice') }}</span>
            <el-input v-model.number="xj_buyForm.price">
              <span slot="suffix" class="coin-name">{{ this.getMainCoin.toUpperCase() }}</span>
            </el-input>
            <span> {{ $t('exchange.main.buyAmount') }}</span>
            <el-input v-model.number="xj_buyForm.amount" @mouseenter.native="xj_buy_max = 999999">
              <span slot="suffix" class="coin-name">{{ this.getTargetCoin.toUpperCase() }}</span>
            </el-input>
            <el-slider
              v-model.number="xj_buyForm.amount"
              :step="0.00001"
              :max="xj_buy_max"
              @mouseenter.native="xj_buy_max = xj_buyForm.amount"
            />
            <div class="total">
              <p>{{ $t('exchange.main.tradeTotalPrice') }} <span>{{ Number(this.xj_buyForm.amount*this.xj_buyForm.price).toFixed(8) }} {{ this.getMainCoin.toUpperCase() }}</span></p>
            </div>
          </div>
          <el-button :disabled="!isAuth" :class="isAuth? '':'disabled-button'" class="buy-button" @click="handle_xj_buy">买入 <span>{{ this.getTargetCoin.toUpperCase() }}</span></el-button>
          </div>
        </div>
        <div class="hb-sell">
          <div class="panel-wrapper">
          <div v-if="!isAuth">
            <router-link :to="{ name: 'registry'}"> {{ $t('exchange.sidebar.registry') }}</router-link> {{ $t('exchange.sidebar.or') }} <router-link :to="{ name: 'login'}">{{ $t('exchange.sidebar.signIn') }} </router-link>{{ $t('exchange.sidebar.startTrade') }}
          </div>
          <div v-if="isAuth" class="balance">
            <span>{{ Number(this.getCoinBalanceByName(this.getTargetCoin).coinBalance).toFixed(8) }} {{ this.getTargetCoin.toUpperCase() }}</span>
            <router-link :to="{ name: 'wallet'}">{{ $t('exchange.main.topUps') }}</router-link>
          </div>
          <div class="trade-from">
            <span> {{ $t('exchange.main.sellPrice') }}</span>
            <el-input v-model.number="xj_sellForm.price">
              <span slot="suffix" class="coin-name">{{ this.getMainCoin.toUpperCase() }}</span>
            </el-input>

            <span> {{ $t('exchange.main.sellAmount') }}</span>
            <el-input v-model.number="xj_sellForm.amount" @mouseenter.native="xj_sell_max = 999999">
              <span slot="suffix" class="coin-name">{{ this.getTargetCoin.toUpperCase() }}</span>
            </el-input>
            <el-slider
              v-model.number="xj_sellForm.amount"
              :step="0.00001"
              :max="xj_sell_max"
              @mouseenter.native="xj_sell_max = xj_sellForm.amount"
            />
            <div class="total">
              <p>{{ $t('exchange.main.tradeTotalPrice') }} <span>{{ Number(this.xj_sellForm.amount*this.xj_sellForm.price).toFixed(8) }} {{ this.getMainCoin.toUpperCase() }}</span></p>
            </div>
          </div>
          <el-button :disabled="!isAuth" :class="isAuth? '':'disabled-button'" class="sell-button" @click="handle_xj_sell">卖出 <span>{{ this.getTargetCoin.toUpperCase() }}</span></el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="false" name="sj">
        <template slot="label">
          <span style="padding:0 15px">{{ $t('exchange.main.marketBestPrice') }}</span>
        </template>
        <div class="hb-buy">
          <div v-if="!isAuth">
            <router-link :to="{ name: 'registry'}"> {{ $t('exchange.sidebar.registry') }}</router-link> {{ $t('exchange.sidebar.or') }} <router-link :to="{ name: 'login'}">{{ $t('exchange.sidebar.signIn') }} </router-link>{{ $t('exchange.sidebar.startTrade') }}
          </div>
          <div v-if="isAuth" class="balance"><span> {{ $t('exchange.main.available') }} {{ Number(this.getCoinBalanceByName(this.getMainCoin).coinBalance).toFixed(8) }} {{ this.getMainCoin.toUpperCase() }}</span><router-link :to="{ name: 'wallet'}">{{ $t('exchange.main.topUps') }}</router-link></div>
          <div class="trade-from">
            <span> {{ $t('exchange.main.buyPrice') }}</span>
            <el-input v-model.number="xj_buyForm.price" disabled placeholder="">
              <span slot="prefix" class="best-price">{{ $t('exchange.main.buyInWithBestPrice') }}</span>
              <span slot="suffix" class="coin-name">{{ this.getMainCoin.toUpperCase() }}</span>
            </el-input>
            <span> {{ $t('exchange.main.buyAmount') }}</span>
            <el-input v-model.number="xj_buyForm.amount" @mouseenter.native="xj_buy_max = 999999">
              <span slot="suffix" class="coin-name">{{ this.getTargetCoin.toUpperCase() }}</span>
            </el-input>
            <el-slider
              v-model.number="xj_buyForm.amount"
              :step="0.00001"
              :max="xj_buy_max"
              @mouseenter.native="xj_buy_max = xj_buyForm.amount"
            />

          </div>
        </div>
        <div class="hb-sell">
          <div v-if="!isAuth">
            <router-link :to="{ name: 'registry'}"> {{ $t('exchange.sidebar.registry') }}</router-link> {{ $t('exchange.sidebar.or') }} <router-link :to="{ name: 'login'}">{{ $t('exchange.sidebar.signIn') }} </router-link>{{ $t('exchange.sidebar.startTrade') }}
          </div>
          <div v-if="isAuth" class="balance">
            <span>{{ Number(this.getCoinBalanceByName(this.getTargetCoin).coinBalance).toFixed(8) }} {{ this.getTargetCoin.toUpperCase() }}</span>
            <router-link :to="{ name: 'wallet'}">{{ $t('exchange.main.topUps') }}</router-link>
          </div>
          <div class="trade-from">
            <span> {{ $t('exchange.main.sellPrice') }}</span>
            <el-input v-model.number="xj_sellForm.price" disabled>
              <span slot="prefix" class="best-price">{{ $t('exchange.main.sellWithBestPrice') }}</span>
              <span slot="suffix" class="coin-name">{{ this.getMainCoin.toUpperCase() }}</span>
            </el-input>

            <span> {{ $t('exchange.main.sellAmount') }}</span>
            <el-input v-model.number="xj_sellForm.amount" @mouseenter.native="xj_sell_max = 999999">
              <span slot="suffix" class="coin-name">{{ this.getTargetCoin.toUpperCase() }}</span>
            </el-input>
            <el-slider
              v-model.number="xj_sellForm.amount"
              :step="0.00001"
              :max="xj_sell_max"
              @mouseenter.native="xj_sell_max = xj_sellForm.amount"
            />

          </div>
          <el-button :disabled="!isAuth" :class="isAuth? '':'disabled-button'" class="sell-button" @click="handle_xj_sell">卖出 <span>{{ this.getTargetCoin.toUpperCase() }}</span></el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters
} from 'vuex'
import {
  submitTrade
} from '../../../api/coin_trade'
export default {
  name: 'TradePanel',
  computed: {
    ...mapGetters([
      'getCoinBalanceByName',
      'getMainCoin',
      'getTargetCoin',
      'getCoinIdByName'
    ]),
    isAuth() {
      return !!this.$store.state.user.token
    }
  },
  data() {
    return {
      activeName: 'xj',
      xj_sell_max: 999999,
      xj_buy_max: 999999,
      xj_sell_max: 999999,
      xj_buy_max: 999999,
      // 买入
      xj_buyForm: {
        direction: 0, // 0买入 1卖出
        amount: 0, // 交易总数
        price: 0, // 交易单价
        type: 0
      },
      // 卖出
      xj_sellForm: {
        direction: 1, // 0买入 1卖出
        amount: 0, // 交易总数
        price: 0, // 交易单价
        type: 0
      }
    }
  },
  created() {
    if (this.$store.state.user.token) {
      this.$store.dispatch('GetCoinBalanceBoth')
      // console.log(this.getSymbol())
      this.$store.dispatch('initOrdersByName', this.getSymbol()).catch(_ => {
        // console.log(_)
      })
    }
  },
  methods: {
    getSymbol() {
      return this.getMainCoin + '_' + this.getTargetCoin
    },
    // TODO: 交易之前使用谷歌验证器
    handle_xj_buy() {
      if (Number(this.xj_buyForm.price * this.xj_buyForm.amount) === 0) {
        this.$notify.error(this.$t('exchange.main.tradeInvailed'))
        return
      }
      this.$confirm(this.$t('exchange.main.tradeBuyConfirm') + this.xj_buyForm.price * this.xj_buyForm.amount, this.$t('info'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('canceled'),
        type: 'info'
      }).then(() => {
        const formData = new FormData()
        formData.append('direction', this.xj_buyForm.direction)
        formData.append('amount', this.xj_buyForm.amount)
        formData.append('price', this.xj_buyForm.price)
        formData.append('localId', this.$store.getters.getCoinIdByName(this.getMainCoin))
        formData.append('foreignId', this.$store.getters.getCoinIdByName(this.getTargetCoin))
        formData.append('type', this.xj_buyForm.type)
        submitTrade(formData).then(response => {
          if (response.code === '200') {
            this.$store.dispatch('GetCoinBalanceBoth')
            this.$message({
              type: 'success',
              message: this.$t('exchange.main.tradeSucceed')
            })
          } else {
            this.$message.error(this.$t('exchange.main.tradeFailed'))
          }
          // console.log(response)
          this.$store.dispatch('initOrdersByName', this.getSymbol()).catch(_ => {
            // console.log(_)
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('exchange.main.tradeCanceled')
        })
      })
    },
    handle_xj_sell() {
      if (Number(this.xj_sellForm.price * this.xj_sellForm.amount) === 0) {
        this.$notify.error(this.$t('exchange.main.tradeInvailed'))
        return
      }
      this.$confirm(this.$t('exchange.main.tradeSellConfirm') + this.xj_sellForm.price * this.xj_sellForm.amount, this.$t('info'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('canceled'),
        type: 'info'
      }).then(() => {
        const formData = new FormData()
        formData.append('direction', this.xj_sellForm.direction)
        formData.append('amount', this.xj_sellForm.amount)
        formData.append('price', this.xj_sellForm.price)
        formData.append('localId', this.$store.getters.getCoinIdByName(this.getMainCoin))
        formData.append('foreignId', this.$store.getters.getCoinIdByName(this.getTargetCoin))
        formData.append('type', this.xj_sellForm.type)
        submitTrade(formData).then(response => {
          if (response.code === '200') {
            this.$store.dispatch('GetCoinBalanceBoth')
            this.$message({
              type: 'success',
              message: this.$t('exchange.main.tradeSucceed')
            })
          } else {
            this.$message.error(this.$t('exchange.main.tradeFailed'))
          }
          // console.log(response)
          this.$store.dispatch('initOrdersByName', this.getSymbol()).catch(_ => {
            // console.log(_)
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('exchange.main.tradeCanceled')
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/custom-theme/theme";
  .trade-panel /deep/ {
    height: 490px;
    background-color: $bodyColor; 
    .el-tab-pane {
      padding: 0 28px
    }
    .el-tabs__header {
      box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
    }
    .el-tabs__nav-wrap::after {
      display: none
    }
    .el-tabs__item {
      // color: $hbColor;
      height: 48px;
      line-height: 48px;
      font-size: 16px;
    }
    .hb-buy,
    .hb-sell {
      height: 372px;
      float: left;
      width: 50%;
      font-size: 14px;
      .balance {
        height: 40px;
        line-height: 30px; // border-bottom: 1px solid $hbBackgroundColor;
        a {
          transition: all .2s ease-in-out;
          float: right;
          margin-right: 20px; // color: $hbHoverColor;

        }
      }
      .trade-from>span {
        display: inline-block;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .trade-from {
        .el-slider {
          // width: 90%;
          margin-top: 20px;
        }
        .coin-name {
          line-height: 40px;
          height: 40px;
          margin-right: 40px; // color: $lightColor;
          font-weight: 600;
        }
        .best-price {
          line-height: 40px;
          height: 40px;
          margin-right: 40px;
          font-weight: 600;
          background: #f5f7fa;
          margin-left: 14px;
        }
        a {
          display: inline-block;
          // width: 90%;
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
          background-color: $hbGreen;
          &:hover {
            opacity: .9;
          }
        }
      }
      .el-input__inner {
        // width: 90%;
      }
      .math-price {
        // width: 90%;
        height: 24px; // background: rgba(78, 91, 133, .4);
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
    .panel-wrapper {
      padding-right: 20px; 
    }
      .el-button {
        background-color: $hbRed;
        // width: 290px;
        width: 100%;
        height: 40px;
        color: #fff // line-height: 40px;
      }
      .sell-button {
        // margin-left: 60px;
      }
      .buy-button {
        // margin-left: 45px;
        background-color: $hbGreen;
      }
      .disabled-button {
        background-color: #d1d3df;
      }
    // }
  }
</style>
