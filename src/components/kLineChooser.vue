<template>
  <div class="choice-filter-1">
    <el-radio-group v-model="period" size="medium">
      <el-radio-button label="1min" value="1min"></el-radio-button>
      <el-radio-button label="5min" value="5min"></el-radio-button>
      <el-radio-button label="15min" value="15min"></el-radio-button>
      <el-radio-button label="30min" value="30min"></el-radio-button>
      <el-radio-button label="60min" value="60min"></el-radio-button>
      <el-radio-button label="1day" value="1day"></el-radio-button>
      <!-- <el-radio-button label="1mon" value="1mon"></el-radio-button> -->
      <!-- <el-radio-button label="1year" value="1year"></el-radio-button> -->
    </el-radio-group>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
import { mapGetters, mapState } from "vuex";
export default {
  name: "kLineChooser",
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
      period: "15min"
    };
  },
  watch:{
    period() {
      this.$emit("periodChange", this.period);
    }
  }
};
</script>

<style lang='scss' scoped >
</style>
