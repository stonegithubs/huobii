<template>
  <div class="choice-filter">
      <el-form label-position='top' :inline="true" v-model="newChoose" class="select-from">
        <el-form-item style="width:140px" :label="$t('fb.direction')" :placeholder="$t('main.exchange.direction')">
          <el-select style="width:100%" v-model="newChoose.direction" placeholder="交易方向">
            <el-option
              v-for="item in directionOption"
              :key="item.name"
              :label="item.name"
              :value="item.direction"
            >{{ item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width:140px" :label="$t('fb.coinType')">
          <el-select style="width:100%" v-model="newChoose.coinId" :placeholder="$t('order.coinType')">
            <el-option 
              v-for="item in getSupportCoin"
              :key="item.abbr"
              :label="getCoinNameByIDUp(item.id)"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width:140px" :label="$t('fb.cashType')">
          <el-select style="width:100%" v-model="newChoose.cashId" placeholder="法币类型">
            <el-option
              v-for="item in getSupportCash"
              :key="item.abbr"
              :label="getCashNameById(item.id)"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width:160px" :label="$t('exchange.main.status')">
          <el-select style="width:100%" v-model="newChoose.state" :placeholder="$t('exchange.main.status')">
            <el-option v-for="item in stateList" :key="item.status" :label="item.name" :value="item.status"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('exchange.main.time')"> 
          <el-date-picker 
            v-model="newChoose.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="left"
            value-format="yyyy-MM-dd"
            :default-time="['2018-12-14', '2030-12-12']"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('confirm')" style="width:120px">
          <el-button type="primary" @click="search()">{{$t('search')}}</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
import { mapGetters, mapState } from "vuex";
import { advStateList } from '@/utils'

export default {
  name: "choicer",
  // props: ["Choose"],
  computed: {
    ...mapGetters([
      "getCoinNameByIDUp",
      "getCashNameById",
      "getSupportCoin",
      "getSupportCash"
    ]),
    stateList(){
      return advStateList(this)
    }
  },
  data() {
    return {
      directionOption: [
        {
          direction: "0",
          name: this.$t('buy')
        },
        {
          name:this.$t('sell'),
          direction: "1"
        },
        // {
        //   name:this.$t('exchange.main.checkAll'),
        //   direction: "10"
        // }
      ],
      newChoose: {
        direction: "",
        page: 0,
        size: 10,
        coinId: "2",
        cashId: "3",
        status: '10',
        time: ["2018-09-15","2022-09-15"],
        order: "1"
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

<style lang='scss' scoped>
  .choice-filter {
    // width: 200px;
  }
</style>
