<template>
    <div class="trade-assets">
      <el-card>
        <div v-for="item in accountList"  class="list-wrapper">
          <div class="coin-list">
            <div class="coin-avatar">
              <i :class="'iconfont icon-'+ getCoinNameByID(item.coinID)" style="font-size: 24px !important;"></i>
              <p>{{getCoinNameByID(item.coinID)}}</p>
            </div>
            <div class="account-detail">
              <p class="account-title">法币钱包</p>
              <div class="asset-list">
                <p><span class="font-gray">可用:</span>{{ item.otcAccount.available}}</p>
                <p><span class="font-gray">可用:</span>{{ item.otcAccount.frozen}}</p>
              </div>
            </div>
            <div class="account-detail">
              <p class="account-title">币币钱包</p>
              <div class="asset-list">
                <p><span class="font-gray">可用:</span>{{ item.exchangeAccount.available}}</p>
                <p><span class="font-gray">可用:</span>{{ item.exchangeAccount.frozen}}</p>
              </div>
            </div>
            <div class="account-option">
              <el-button @click="handleTransfer(item)">充值</el-button>
              <el-button type="primary" @click="handleDeposit(item)">划转提现</el-button>
            </div>
          </div>
        </div>
      </el-card>
      <el-dialog
        :title="'充值'+ this.currentCoinName"
        :modal-append-to-body="false"
        :visible.sync="transferDiaVisible"
        width="50%"
        >
        <transferDialog :coinInfo="currentCoin"></transferDialog>

      </el-dialog>
      <el-dialog
        title="资产互转"
        :modal-append-to-body="false"
        :visible.sync="depositDiaVisible"
        :before-close="handledepositClose"
        width="50%">
        <el-form label-position="top" label-width="80px" :model="depositForm" ref="depositForm" >
          <el-form-item label="币种">
            <el-select v-model="depositForm.coinID" style="width: 100%">
              <el-option v-for="item in accountList" :label="item.coinName" :value="item.coinID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="从">
            <el-select v-model="depositForm.type" style="width: 100%">
              <el-option label="法币账户" value="0"></el-option>
              <el-option label="币币账户" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转至">
            <el-select v-model="depositForm.type" style="width: 100%">
              <el-option label="法币账户" value="1"></el-option>
              <el-option label="币币账户" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数量" style="width: 100%">
            <el-input v-model="depositForm.type"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="depositDiaVisible = false">取 消</el-button>
    <el-button type="primary" @click="depositDiaVisible = false">确 定</el-button>
  </span>
      </el-dialog>
    </div>
</template>

<script>
import transferDialog from './transferDialog'
export default {
  name: "trade-assets",
  components: {
    transferDialog,
  },
  data(){
    return {
      transferDiaVisible: false,
      depositDiaVisible: false,
      currentCoinName: "BTC",
      currentAddress: "1tcyvbjnklm2lklhg",
      min_amount: "测试数量",
      accountList: [
        {
          coinID: 0,
          coinName: "BTC",
          otcAccount: {
            available: "0.000000",
            frozen: "0.000000",
          },
          exchangeAccount: {
            available: "0.000000",
            frozen: "0.000000",
          }
        },
        {
          coinID: 1,
          coinName: "ETC",
          otcAccount: {
            available: "0.000000",
            frozen: "0.000000",
          },
          exchangeAccount: {
            available: "0.000000",
            frozen: "0.000000",
          }
        },
        {
          coinID: 2,
          coinName: "USDT",
          otcAccount: {
            available: "0.000000",
            frozen: "0.000000",
          },
          exchangeAccount: {
            available: "0.000000",
            frozen: "0.000000",
          }
        },
        {
          coinID: 3,
          coinName: "EOS",
          otcAccount: {
            available: "0.000000",
            frozen: "0.000000",
          },
          exchangeAccount: {
            available: "0.000000",
            frozen: "0.000000",
          }
        },
        {
          coinID: 4,
          coinName: "HT",
          otcAccount: {
            available: "0.000000",
            frozen: "0.000000",
          },
          exchangeAccount: {
            available: "0.000000",
            frozen: "0.000000",
          }
        }
        ],
      currentCoin: {
        name:"BTC",
        address: "aasdasdsd",
        min_amount: "12",
      },
      depositForm: {
        depositType: 0, //0法币-》币币   1：币币-》法币
        coinID: null,
        number: 0,
      }

    }
  },
  methods: {
    getCoinNameByID(id){
      switch (id){
        case 0: return "BTC"
        case 1: return "ETH"
        case 2: return "USDT"
        case 3: return "EOS"
        case 4: return "HT"
        default: return "NONE"
      }
    },
    handleTransfer(item){
      this.transferDiaVisible = true
      this.currentCoinName = item.coinName
    },
    handleDeposit(item){
      this.depositDiaVisible = true
      this.depositForm.coinID = item.coinID
    },
    handledepositClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
}
</script>

<style lang="scss" scoped>
  .trade-assets {
    .list-wrapper {
      border-bottom: 1px solid hsla(0,0%,85%,.5);
      .coin-list {
        @media (min-width: 768px) {
          padding: 32px 60px;
        }
        @media (max-width: 768px) {
          padding: 32px 0;
          .coin-avatar{
            margin: auto;
          }
          p {
            display: flex;
            justify-content: space-around;
          }
        }
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        .account-detail {
          @media (max-width: 768px) {
            width: 100%;
          }
        }
        .account-option {
          width: 200px;

          @media (max-width: 768px) {
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
        }
      }

    }
  }
</style>
