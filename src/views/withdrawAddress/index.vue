<template>
  <div class="withdraw-address">
    <el-card class="box-card">
      <h2 style="font-size:20px">{{$t('withDraw.title')}}</h2>
    </el-card>
    <el-card class="box-card head-card">
      <el-form ref="addressForm" :model="addressForm" :inline="true" label-position="top">
        <el-form-item
          :rules="[{ required: true, message: $t('withDraw.coinRequire'), trigger: 'blur' }]"
          :label="$t('withDraw.coin')"
          prop="coinId"
        >
          <el-select v-model="addressForm.coinId">
            <el-option
              v-for="(item, id) in getSupportCoin"
              :key="id"
              :value="item.abbr.toUpperCase()"
            >{{ item.abbr.toUpperCase() }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :rules="[{ required: true, message:  $t('withDraw.addRequire'), trigger: 'blur' }]"
          :label="$t('withDraw.address')"
          prop="address"
          class="address"
        >
          <el-input v-model="addressForm.address"/>
        </el-form-item>
        <el-form-item
          :label="$t('withDraw.remark')"
          :rules="[{ required: true, message:  $t('withDraw.remarkRequire'), trigger: 'blur' }]"
          class="remarks"
        >
          <el-input v-model="addressForm.remarks"/>
        </el-form-item>
        <el-button class="address-btn" type="primary" @click="submit">{{ $t('withDraw.add')}}</el-button>
      </el-form>
    </el-card>
    <el-card class="box-card body-card">
      <div slot="header" class="clearfix">
        <span class="font16">{{ $t('withDraw.addressList')}}</span>
      </div>
      <el-table :data="addressData" stripe style="width: 100%">
        <el-table-column prop="coinId" label="币种">
          <template slot-scope="scope">{{ getCoinNameByIDUp(scope.row.coinId) }}</template>
        </el-table-column>
        <el-table-column prop="address" label="地址">
          <template slot-scope="scope">{{ scope.row.address }}</template>
        </el-table-column>
        <el-table-column prop="remarks" label="备注">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleDeposit(scope.row.id)">提币</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { addressAdd, address, addressDel } from "../../api/wallet";
import { mapGetters } from "vuex";
//   import tradeAssets from './components/tradeAssets'
export default {
  name: "TradeFinance",
  components: {},
  data() {
    return {
      coinList: [],
      addressForm: {
        coinId: "USDT",
        address: "",
        remarks: ""
      },
      page: 0,
      size: 10,
      addressData: []
    };
  },
  created() {
    if (this.getSupportCoin.length === 0) {
      this.$store
        .dispatch("getSupportCoin")
        .then(_ => {
          this.coinList = _.content.records;
        })
        .catch(_ => {});
    }
    this.initList(this.page, this.size, this.addressForm.coinId);
  },
  computed: {
    ...mapGetters(["getSupportCoin", "getCoinNameByIDUp"]),
    curCoin() {
      return this.addressForm.coinId;
    }
  },
  methods: {
    submit() {
      this.$refs["addressForm"].validate(valid => {
        if (valid) {
          addressAdd(
            this.addressForm.coinId,
            this.addressForm.address,
            this.addressForm.remarks
          )
            .then(res => {
              this.initList(this.page, this.size, this.addressForm.coinId);
            })
            .catch(_ => {});
        }
      });
    },
    initList(page, size, coinId) {
      this.addressData = []
      address(0, 20, this.addressForm.coinId).then(res => {
        if (res && res.code === "200" && res.content.records instanceof Array) {
          this.addressData = res.content.records;
        }
      });
    },
    handleDelete(id) {
      addressDel(id)
        .then(res => {
          this.initList(this.page, this.size, this.addressForm.coinId);
          if (res && res.code === "200") {
            this.$notify.success("删除成功");
          } else {
            this.$notify.error("删除失败");
          }
        })
        .catch(_ => {
         this.initList(this.page, this.size, this.addressForm.coinId);
          this.$notify.error("删除失败");
        });
    },
    handleDeposit(id){
      this.$notify.error("提币未对接")
    }
  },
  watch: {
    curCoin(val) {
      this.addressData = [];
      address(0, 20, val).then(res => {
        if (res && res.code === "200" && res.content.records instanceof Array) {
          this.addressData = res.content.records;
        }
      });
    }
  }
};
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
  .body-card {
  }
}
</style>
