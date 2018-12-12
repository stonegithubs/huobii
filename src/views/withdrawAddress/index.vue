<template>
  <div class="withdraw-address">
    <el-card class="box-card">
      <h2 style="font-size:20px">{{$t('withDraw.title')}}</h2>
    </el-card>
    <el-card class="box-card head-card">
      <el-form ref="addressForm" :model="addressForm" :inline="true" label-position="top">
        <el-form-item :rules="[{ required: true, message: $t('withDraw.coinRequire'), trigger: 'blur' }]" :label="$t('withDraw.coin')" prop="abbr">
          <el-select v-model="addressForm.abbr">
            <el-option v-for="(item, id) in coinList" :key="id" :value="item.abbr">{{ item.abbr.toUpperCase() }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item :rules="[{ required: true, message:  $t('withDraw.addRequire'), trigger: 'blur' }]" :label="$t('withDraw.address')" prop="address" class="address">
          <el-input v-model="addressForm.address"/>
        </el-form-item>
        <el-form-item :label="$t('withDraw.remark')" :rules="[{ required: true, message:  $t('withDraw.remarkRequire'), trigger: 'blur' }]" class="remarks">
          <el-input v-model="addressForm.remarks"/>
        </el-form-item>
        <el-button class="address-btn" type="primary" @click="submit">{{ $t('withDraw.add')}}</el-button>
      </el-form>
    </el-card>
    <el-card class="box-card body-card">
      <div slot="header" class="clearfix">
        <span class="font16">{{ $t('withDraw.addressList')}}</span>
      </div>
      <el-table
      :data="addressData"
      stripe
      style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>

      </el-table>
    </el-card>
  </div>
</template>

<script>
import { addressAdd } from '../../api/wallet'
//   import tradeAssets from './components/tradeAssets'
export default {
  name: 'TradeFinance',
  components: {},
  data() {
    return {
      coinList: [],
      addressForm: {
        abbr: '',
        address: '',
        remarks: ''
      },
      addressData: []
    }
  },
  created(){
    this.$store.dispatch('getSupportCoin').then(_ => {
      this.coinList = _.content.records
    }).catch(_ => {})  
    },
  computed: {},
  methods: {
    submit() {
      this.$refs['addressForm'].validate((valid) => {
        if (valid) {
          addressAdd(this.addressForm.abbr, this.addressForm.address, this.addressForm.remarks)
            .then(res => {
              if (res.code === '200') {
                this.$notify.success(res.message)
                // TDDO: 拉取一次钱包地址
              } else {
                this.$notify.error(res.message)
              }
            }).catch(_ => {})
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .withdraw-address {
        width: 1200px;
        margin: auto;
        .box-card {
            margin-top: 40px;
        }
        .head-card {
            .address {
                width: 530px;
            }
            .remarks {
                width: 370px;
            }
            .address-btn {
                float: right;
                width: 200px;
                height: 45px;
                margin-bottom: 30px;
                margin-right: 30px;
            }
        }
        .body-card {}
    }
</style>
