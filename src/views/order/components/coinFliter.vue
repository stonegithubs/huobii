<template>
  <div class="coin-fliter">
    <!-- <el-popover popper-class="m-popover" placement="bottom" width="375" trigger="click"> -->
      <el-form :inline="true" label-position='top' v-model="newChoose" class="select-from" label-width="120">
        <el-form-item >
          <el-select style="width:200px" v-model="newChoose.direction" :placeholder="$t('fb.direction')">
            <el-option
              v-for="item in directionOption"
              :key="item.name"
              :label="item.name"
              :value="item.direction"
            >{{ item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-select style="width:130px"  v-model="newChoose.targetCoin">
            <el-option 
              v-for="item in getSupportCoin"
              :key="item.abbr"
              :label="getCoinNameByIDUp(item.id)"
              :value="item.abbr"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          /
          <el-select style="width:130px" v-model="newChoose.mainCoin">
            <el-option 
              v-for="item in getSupportCoin"
              :key="item.abbr"
              :label="getCoinNameByIDUp(item.id)"
              :value="item.abbr"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select style="width:200px" v-model="newChoose.state">
            <el-option 
              v-for="item in stateList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
          <el-form-item>
          <el-date-picker
            v-model="newChoose.time"
            type="daterange"
            :range-separator="$t('fb.to')"
            :start-placeholder="$t('fb.startDate')"
            :end-placeholder="$t('fb.endDate')"
            align="left"
            value-format="yyyy-MM-dd"
            :default-time="['2018-12-14', '2030-12-12']"
          ></el-date-picker>
          </el-form-item>

        <el-form-item>
        <div class="search-box">
          <el-button type="primary" @click="search()">{{$t('search')}}</el-button>
        </div>
        </el-form-item>
      </el-form>
      <!-- <el-input slot="reference"> -->
        <!-- <template slot="suffix"> -->
          <!-- <img style="margin-top: 6px;width: 32px;" :src="require('@/assets/imgs/search.png')"> -->
        <!-- </template> -->
      <!-- </el-input> -->
    <!-- </el-popover> -->
  </div>
</template>

<script type="text/ecmascript-6" scoped>
import { mapGetters, mapState } from "vuex";

export default {
  name: "coin-fliter",
  computed: {
    ...mapGetters([
      'getSupportCoin',
      'getCoinNameByIDUp'
    ])
  },
  data() {
    return {
      directionOption: [
        {
          direction: "0",
          name: this.$t('buy')
        },
        {
          name: this.$t('sell'),
          direction: "1"
        },
        {
          name: this.$t('fb.status10'),
          direction: "10"
        }
      ],
      stateList: [
        { id: "0", name: this.$t('fb.status0') },
        { id: "1", name: this.$t('fb.status1') },
        { id: "2", name: this.$t('fb.status2') },
        { id: "3", name: this.$t('fb.status3') },
        { id: "8", name: this.$t('fb.status8') },
        // { id: "9", name: "交易中" },
        // { id: "10", name: "全部" },
        // { id: "11", name: "交易中" }
      ],
      newChoose: {
        direction: "10",
        targetCoin: "usdt",
        mainCoin: 'btc',
        state: '0',
        time: ["2018-09-15","2022-09-15"],
        order: "1"
      },
    };
  },
  methods: {
    search() {
      this.$emit("makeChange", this.newChoose);
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
