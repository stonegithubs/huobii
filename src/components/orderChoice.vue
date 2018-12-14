<template>
  <div class="choice-filter">
    <el-popover popper-class="m-popover" placement="bottom" width="375" trigger="click">
      <el-form label-position='top' v-model="newChoose" class="select-from" label-width="120">
        <el-form-item label="交易方向">
          <el-select style="width:100%" v-model="newChoose.direction" placeholder="交易方向">
            <el-option
              v-for="item in directionOption"
              :key="item.name"
              :label="item.name"
              :value="item.direction"
            >{{ item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="货币类型">
          <el-select style="width:100%" v-model="newChoose.coinId" placeholder="货币类型">
            <el-option 
              v-for="item in getSupportCoin"
              :key="item.abbr"
              :label="getCoinNameByIDUp(item.id)"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="法币类型">
          <el-select style="width:100%" v-model="newChoose.cashId" placeholder="法币类型">
            <el-option
              v-for="item in getSupportCash"
              :key="item.abbr"
              :label="getCashNameById(item.id)"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="交易状态">
          <el-select style="width:100%" v-model="newChoose.state" placeholder="交易状态">
            <el-option v-for="item in stateList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item> -->
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

        <!-- <el-form-item> -->
        <div class="search-box">
          <el-button type="primary" @click="search()">搜索</el-button>
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
  name: "choicer",
  props: ["Choose"],
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
          direction: "0",
          name: "买入"
        },
        {
          name: "卖出",
          direction: "1"
        },
        {
          name: "全部",
          direction: "10"
        }
      ],
      newChoose: {
        direction: "10",
        page: 0,
        size: 10,
        direction: "10",
        coinId: "2",
        cashId: "3",
        // state: "10",
        time: ["2018-09-15","2022-09-15"],
        order: "1"
      },
      stateList: [
        { id: "0", name: "挂单中" },
        { id: "1", name: "部分完成" },
        { id: "3", name: "用户撤销" },
        { id: "8", name: "历史纪录" },
        { id: "9", name: "交易中" },
        { id: "10", name: "全部" }
      ],
    };
  },
  methods: {
    search() {
      this.$emit("directionChange", this.newChoose);
    }
  }
};
</script>

<style lang='scss'>
  .choice-filter {
    width: 200px;
  }
</style>
