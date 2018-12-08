<template>
  <div class="trade-assets">
    <el-card>
      <div slot="header" class="clearfix">
        <span class="font16">{{$t('wallet.propertyDetail')}}</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <router-link class="to-withdraw" :to="{ name: 'withdraw_address'}" style="color: #638bd4!important;">{{$t('wallet.withDrawAddr')}}</router-link>
        </el-button>
      </div>
      <div v-for="item in getBalance" v-bind:key="item.coinId" class="list-wrapper">
        <div class="coin-list">
          <div class="coin-avatar">
            <i :class="'iconfont icon-'+ item.coinName.toUpperCase()" style="font-size: 24px !important;"></i>
            <p>{{item.coinName.toUpperCase()}}</p>
          </div>
          <div class="account-detail">
            <p class="account-title">{{$t('wallet.cashBalance')}}</p>
            <div class="asset-list">
              <p><span class="font-gray">{{$t('wallet.available')}}:</span> {{ item.currencyBalance.toFixed(6)}}</p>
              <p><span class="font-gray">{{$t('wallet.frozen')}}:</span> {{ item.currencyFrozen.toFixed(6)}}</p>
            </div>
          </div>
          <div class="account-detail">
            <p class="account-title">{{$t('wallet.coinBalance')}}</p>
            <div class="asset-list">
              <p><span class="font-gray">{{$t('wallet.available')}}:</span> {{ item.coinBalance.toFixed(6)}}</p>
              <p><span class="font-gray">{{$t('wallet.frozen')}}:</span> {{ item.coinFrozen.toFixed(6)}}</p>
            </div>
          </div>
          <div class="account-option">
            <el-button @click="handleTransfer(item)">{{$t('wallet.getStronger')}}</el-button>
            <el-button type="primary" @click="handleDeposit(item)">{{$t('wallet.deposit')}}</el-button>
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog width='500px' :title="$t('wallet.getStronger')+ currentCoin.coinName.toUpperCase()" :modal-append-to-body="false" :visible.sync="transferDiaVisible">
      <div class="d-content">
        <p class="font-gray font12">{{$t('wallet.strongTip')}}{{ currentCoin.coinName.toUpperCase()}}{{$t('wallet.strongTip1')}}</p>
        <p class="font16 address">{{ currentCoin.address}}</p>
        <div id="qrcode" ref="qrcode"></div>
      </div>
      <div class="d-footer">
      <li style="color: red">{{$t('wallet.share')}}{{ currentCoin.coinName.toUpperCase() }}
        {{$t('wallet.share1')}}{{ currentCoin.coinName.toUpperCase() }}
        {{$t('wallet.listTip')}}</li>
      <li>{{$t('wallet.info')}}{{ currentCoin.coinName.toUpperCase() }}{{$t('wallet.info1')}}</li>
      <li>{{$t('wallet.finishTip')}}</li>
      </div>
    </el-dialog>
    <el-dialog :title="$t('wallet.transfer')" :modal-append-to-body="false" :visible.sync="depositDiaVisible" :before-close="handledepositClose" width="50%">
        <el-form label-position="top" label-width="80px" :model="depositForm" ref="depositForm">
          <el-form-item label="币种">
            <el-select v-model="depositForm.coinId" style="width: 100%" :placeholder="$t('wallet.chooseCoin')">
              <el-option v-for="item in getBalance" v-bind:key="item.id" :label="item.coinName.toUpperCase()" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('wallet.from')">
            <el-select v-model="depositForm.depositType" style="width: 100%" :placeholder="$t('wallet.chooseWallet')">
              <el-option :label="$t('wallet.cashBalance')" value="0"></el-option>
              <el-option :label="$t('wallet.coinBalance')" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('wallet.to')">
            <el-select v-model="depositForm.depositType" style="width: 100%" :placeholder="$t('wallet.chooseWallet')">
              <el-option :label="$t('wallet.coinBalance')" value="1"></el-option>
              <el-option :label="$t('wallet.cashBalance')" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('exchange.main.amount')" style="width: 100%">
            <el-input v-model.number="depositForm.amount"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="depositDiaVisible = false">{{$t('canceled')}}</el-button>
        <el-button type="primary" @click="handleMyshit(depositForm.depositType)">{{$t('confirm')}}</el-button>
      </span>
      </el-dialog>
  </div>
</template>

<script>
    import qrCode from 'qrcodejs2'
import { setTimeout } from 'timers'
import { coin2currency, currency2coin} from '../../../api/wallet'

  export default {
    name: "trade-assets",
    data() {
      return {
        loading: true,
        currentCoin: { coinName: 'BTC', address: ''},
        transferDiaVisible : false,
        depositDiaVisible: true,
        QRCODE: '',
        depositForm: {
          depositType: '',
          coinId: '',
          amount: 0,
        }
      }
    },
    methods: {
      handleMyshit(type){
        if(type == 1){
          // console.log("币币到法币")
          coin2currency(this.depositForm.coinId, this.depositForm.amount).then(res=>{
              if(res.code === '200'){
                this.$notify.success(this.$t('wallet.transferSuccess'))
              }else{
                this.$notify.error(this.$t('wallet.transferFailed'))  
              }
          }).catch(_=>{})
        }
        if(type ==0){
            // console.log("法币到币币")
            currency2coin(this.depositForm.coinId, this.depositForm.amount).then(res=>{
              if(res.code === '200'){
                this.$notify.success(this.$t('wallet.transferSuccess'))
              }else{
                this.$notify.error(this.$t('wallet.transferFailed'))  
              }
          }).catch(_=>{})

        }
        // console.log(type+' '+this.depositForm.coinId +" "+ this.depositForm.amount)

      },
      handleTransfer(item) {
        if(this.QRCODE instanceof Object){
          // this.QRCODE.clear()
          console.log(document.getElementById('qrcode').innerHTML = '')
          // document.getElementById('qrcode').html('')
        }
        this.currentCoin = item
        setTimeout(()=>{
          this.qrcode()
        },0)
        this.transferDiaVisible = true
        
      },
      handleDeposit(item) {
        this.depositDiaVisible = true
        this.depositForm.coinID = item.coinId
      },
      handledepositClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      qrcode() {
        console.log(this.currentCoin.address)
            this.QRCODE = new qrCode('qrcode', {
                width: 130, // 设置宽度，单位像素
                height: 130, // 设置高度，单位像素
                text: this.currentCoin.address // 设置二维码内容或跳转地址
            })
        },
    },
    created() {
      this.loading = true
      this.$store.dispatch('GetCoinBalanceBoth').then(_ => {
        this.loading = false
      }).catch(_ => {})
    },
    computed: {
      getBalance() {
        return this.$store.state.wallet.coinBalance
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
