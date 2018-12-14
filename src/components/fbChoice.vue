<template>
  <div class="choice-filter">
    <el-popover popper-class="m-popover" placement="bottom" width="375" trigger="click">
      <el-form label-position="top" v-model="newChoose" class="select-from" label-width="120">
        <el-form-item :label="$t('exchange.main.direction')">
          <el-select style="width:100%" v-model="newChoose.direction" :placeholder="$t('exchange.main.direction')">
            <el-option
              v-for="item in directionOption"
              :key="item.name"
              :label="item.name"
              :value="item.direction"
            >{{ item.name}}</el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="支付方式">
          <el-select style="width:100%" v-model="newChoose.payments" placeholder="选择支付方式">
            <el-option
              v-for="item in this.$store.state.Common.supportPayway"
              :key="item.id"
              :label="item.payName"
              :value="item.id"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item :label="$t('fb.cashType')">
          <el-select style="width:100%" v-model="newChoose.cashId">
            <el-option
              v-for="item in getSupportCash"
              :key="item.abbr"
              :label="getCashNameById(item.id)"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('fb.coinType')">
          <el-select style="width:100%" v-model="newChoose.coinId">
            <el-option
              v-for="item in getSupportCoin"
              :key="item.abbr"
              :label="getCoinNameByIDUp(item.id)"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="法币类型">
          <el-select style="width:100%" v-model="newChoose.cashId" placeholder="法币类型">
            <el-option
              v-for="item in getSupportCash"
              :key="item.abbr"
              :label="getCashNameById(item.id)"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <div class="search-box">
          <el-button style="width:100%" type="primary" @click="search()">{{$t('search')}}</el-button>
        </div>
        <!-- </el-form-item> -->
      </el-form>
      <el-input slot="reference">
        <template slot="suffix">
          <img style="margin-top: 6px;width: 32px;" :src="require('../assets/imgs/search.png')">
        </template>
      </el-input>
    </el-popover>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
import { mapGetters, mapState } from "vuex";
export default {
  name: "fb-choice",
//   props: ["orderChange"],
  computed: {
    ...mapGetters([
      "getCoinNameByIDUp",
      "getCashNameById",
      "getSupportCoin",
      "getSupportCash"
    ])
  },
  data() {
    return {
      directionOption: [
        {
          direction: "1",
          name: this.$t('buy')
        },
        {
          name: this.$t('sell'),
          direction: "0"
        }
      ],
      
      newChoose: {
        direction: "1",
        coinId: "2",
        cashId: "3",
        payments: "all",
      },
    };
  },
  methods: {
    search() {
      this.$emit("orderChange", this.newChoose);
    }
  }
};
</script>

<style lang='scss' scoped >
.choice-filter {
  width: 200px;
  .el-button {
      width: 100%;
  }
}
</style>
