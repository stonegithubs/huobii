<template>
  <div class="trade-assets">
    <el-card>
      <div slot="header" class="clearfix">
        <span class="font16">{{ $t('wallet.propertyDetail') }}</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <router-link :to="{ name: 'withdraw_address'}" class="to-withdraw" style="color: #638bd4!important;">{{ $t('wallet.withDrawAddr') }}</router-link>
        </el-button>
      </div>
      <!-- <div v-for="wallet of getSupportCoin" :key="wallet.id"> -->
        <div v-for="item in getCoinBalance" v-if="shi(item.coinId)" :key="item.coinId" class="list-wrapper">
          <div class="coin-list" >
            <div class="coin-avatar">
              <i :class="'iconfont icon-'+ item.coinName.toUpperCase()" style="font-size: 24px !important;"/>
              <p>{{ item.coinName.toUpperCase() }}</p>
            </div>
            <div class="account-detail">
              <p class="account-title">{{ $t('wallet.cashBalance') }}</p>
              <div class="asset-list">
                <p><span class="font-gray">{{ $t('wallet.available') }}:</span> {{ item.currencyBalance.toFixed(6) }}</p>
                <p><span class="font-gray">{{ $t('wallet.frozen') }}:</span> {{ item.currencyFrozen.toFixed(6) }}</p>
              </div>
            </div>
            <div class="account-detail">
              <p class="account-title">{{ $t('wallet.coinBalance') }}</p>
              <div class="asset-list">
                <p><span class="font-gray">{{ $t('wallet.available') }}:</span> {{ item.coinBalance.toFixed(6) }}</p>
                <p><span class="font-gray">{{ $t('wallet.frozen') }}:</span> {{ item.coinFrozen.toFixed(6) }}</p>
              </div>
            </div>
            <div class="account-option">
              <el-button @click="handleTransfer(item)">{{ $t('wallet.getStronger') }}</el-button>
              <el-button type="primary" @click="handleDeposit(item)">{{ $t('wallet.deposit') }}</el-button>
            </div>
          </div>
        </div>
      <!-- </div>s -->
     
    </el-card>
    <el-dialog :title="$t('wallet.getStronger')+ currentCoin.coinName.toUpperCase()" :modal-append-to-body="false" :visible.sync="transferDiaVisible" width="500px">
      <div class="d-content">
        <p class="font-gray font12">{{ $t('wallet.strongTip') }}{{ currentCoin.coinName.toUpperCase() }}{{ $t('wallet.strongTip1') }}</p>
        <p class="font16 address">{{ currentCoin.address }}</p>
        <div id="qrcode" ref="qrcode"/>
      </div>
      <div class="d-footer">
        <li style="color: red">{{ $t('wallet.share') }}{{ currentCoin.coinName.toUpperCase() }}
          {{ $t('wallet.share1') }}{{ currentCoin.coinName.toUpperCase() }}
          {{ $t('wallet.listTip') }}</li>
        <li>{{ $t('wallet.info') }}{{ currentCoin.coinName.toUpperCase() }}{{ $t('wallet.info1') }}</li>
        <li>{{ $t('wallet.finishTip') }}</li>
      </div>
      <span  slot="footer">
        <el-button style="width:455px" type="primary" @click="submitIIn()">确认完成充值</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('wallet.transfer')" :modal-append-to-body="false" :visible.sync="depositDiaVisible" :before-close="handledepositClose" width="500px">
      <el-form ref="depositForm" :model="depositForm" label-position="top" label-width="80px">
        <el-form-item label="币种">
          <el-select v-model="depositForm.coinId" :placeholder="$t('wallet.chooseCoin')" style="width: 100%">
            <el-option v-for="item in  getSupportCoin" :key="item.id" :label="item.abbr ===undefined? '':item.abbr.toUpperCase()" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('wallet.from')">
          <el-select v-model="depositForm.depositType" :placeholder="$t('wallet.chooseWallet')" style="width: 100%">
            <el-option :label="$t('wallet.cashBalance')" value="0"/>
            <el-option :label="$t('wallet.coinBalance')" value="1"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('wallet.to')">
          <el-select v-model="depositForm.depositType" :placeholder="$t('wallet.chooseWallet')" style="width: 100%">
            <el-option :label="$t('wallet.coinBalance')" value="0"/>
            <el-option :label="$t('wallet.cashBalance')" value="1"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('exchange.main.amount')" style="width: 100%">
          <el-input v-model.number="depositForm.amount"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="depositDiaVisible = false">{{ $t('canceled') }}</el-button>
        <el-button type="primary" @click="handleMyshit(depositForm.depositType)">{{ $t('confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import qrCode from 'qrcodejs2'
import { setTimeout } from 'timers'
import { coin2currency, currency2coin, submitIn } from '../../../api/wallet'
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'TradeAssets',
  data() {
    return {
      loading: true,
      currentCoin: { coinName: 'BTC', address: '',coinId: '' },
      transferDiaVisible: false,
      depositDiaVisible: false,
      QRCODE: '',
      depositForm: {
        depositType: '',
        coinId: '',
        amount: 0
      }
    }
  },
  computed: {
    ...mapGetters([
      'getSupportCoin',
      'getCoinBalance',
      'getSupportCash'
    ]),
    ...mapState([
      'wallet'
    ])
    // getBalance() {
    //   return 
    //   let all = this.$store.state.wallet.coinBalance 
    //   let list = []  
    //     for(let coin of all){
    //       for(let item of this.getSupportCoin){
    //         if(item.coinId === coin.coinId){
    //           list.push(coin)
    //         }
    //       }
    //     }
    //   return list
    // }
  },
  created() {
    this.loading = true
    this.$store.dispatch('GetCoinBalanceBoth').then(_ => {
      this.loading = false
    }).catch(_ => {})
  },
  methods: {
    submitIIn(){
      this.$prompt(this.$t('userOptions.tradePwdRequire'), this.$t('wallet.confirm'), {
          confirmButtonText: this.$t('confirm'),
          cancelButtonText: this.$t('canceled'),
        }).then(({ value }) => {
          submitIn(this.currentCoin.coinId, value).then(res=>{
            if(res.code === '200'){
              this.$notify.success(this.$t('wallet.submited'))
            }else{
              this.$notify.success(this.$t('wallet.failed'))              
            }
            this.transferDiaVisible = false
          })
        }).catch(_=>{console.log(_)})
    },
    shi(id){
      for(let item of this.getSupportCash){
        if(item.id === id){
          return false
        }
      }
      return true
    },
    handleMyshit(type) {
      if (type == 1) {
        // console.log("币币到法币")
        coin2currency(this.depositForm.coinId, this.depositForm.amount).then(res => {
          if (res.code === '200') {
            this.$notify.success(this.$t('wallet.transferSuccess'))
          } else {
            this.$notify.error(this.$t('wallet.transferFailed'))
          }
          this.depositDiaVisible = false
          this.$store.dispatch('GetCoinBalanceBoth')
        }).catch(_ => {})
      }
      if (type == 0) {
        // console.log("法币到币币")
        currency2coin(this.depositForm.coinId, this.depositForm.amount).then(res => {
          if (res.code === '200') {
            this.$notify.success(this.$t('wallet.transferSuccess'))
          } else {
            this.$notify.error(this.$t('wallet.transferFailed'))
          }
          this.depositDiaVisible = false
          this.$store.dispatch('GetCoinBalanceBoth')
        }).catch(_ => {})
      }
      // console.log(type+' '+this.depositForm.coinId +" "+ this.depositForm.amount)
    },
    handleTransfer(item) {
      this.currentCoin = item
      setTimeout(() => {
        this.qrcode()
      }, 0)
      this.transferDiaVisible = true
    },
    handleDeposit(item) {
      this.depositDiaVisible = true
      this.depositForm.coinId = item.coinId
    },
    handledepositClose(done) {
      this.$confirm(this.$t('confirmToClose'))
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    qrcode() {
      // console.log(this.currentCoin.address)
      document.getElementById('qrcode').innerHTML =''
      this.QRCODE = new qrCode('qrcode', {
        width: 130, // 设置宽度，单位像素
        height: 130, // 设置高度，单位像素
        text: this.currentCoin.address // 设置二维码内容或跳转地址
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .trade-assets {
    .list-wrapper {
      p{
        line-height: 24px;
        font-size: 14px;
      }
      .account-title {
        margin-bottom: 10px;
      }
      border-bottom: 1px solid hsla(0, 0%, 85%, .5);
      .to-withdraw {
        display: inline-block;
        font-size: 14px;
        margin-right: 20px;
        transition: .2s;

      }
      .coin-list {
        padding: 25px 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        .account-detail {
          @media (max-width: 768px) {
            // width: 100%;
          }
        }
        .account-option {
          width: 200px;
        }
      }
    }
    .d-content {
      text-align: center;
      padding: 20px 0;
      .address {
        margin: 10px;
      }
      #qrcode {
        height: 130px;
        width: 130px;
        margin: auto
      }

    }
    .d-footer {
      border-top: 1px solid #eee;
      font-size: 12px;
      li{
        list-style: unset;
        margin-top: 20px;
        line-height: 20px;
      }
    }
    .el-form /deep/ {
      .el-form-item__label {
        padding: 0;
        line-height: 10px;
        color: #999
      }
    }
  }
</style>
