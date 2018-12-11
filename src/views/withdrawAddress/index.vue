<template>
  <div class="withdraw-address">
    <el-card class="box-card">
      <h2 style="font-size:20px">提币地址管理</h2>
    </el-card>
    <el-card class="box-card head-card">
      <el-form ref="addressForm" :model="addressForm" :inline="true" label-position="top">
        <el-form-item :rules="[{ required: true, message: '请选择币种', trigger: 'blur' }]" label="币种" prop="abbr">
          <el-select v-model="addressForm.abbr">
            <el-option v-for="(item, id) in coinList" :key="id" :value="item.abbr">{{ item.abbr }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item :rules="[{ required: true, message: '请填写地址', trigger: 'blur' }]" label="地址" prop="address" class="address">
          <el-input v-model="addressForm.address"/>
        </el-form-item>
        <el-form-item label="备注" class="remarks">
          <el-input v-model="addressForm.remarks"/>
        </el-form-item>
        <el-button class="address-btn" type="primary" @click="submit">添加</el-button>
      </el-form>
    </el-card>
    <el-card class="box-card body-card">
      <div slot="header" class="clearfix">
        <span class="font16">地址列表</span>
      </div>
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
      coinList: [{
        id: 'asvhabsbjxca576897812',
        abbr: 'BTC'
      },
      {
        id: 'asvhabsbjxc576897812',
        abbr: 'ETH'
      },
      {
        id: 'asvhabsxca576897812',
        abbr: 'USDT'
      },
      {
        id: 'asvhabs76897812',
        abbr: 'HT'
      }
      ],
      addressForm: {
        abbr: '',
        address: '',
        remarks: ''
      }
    }
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
