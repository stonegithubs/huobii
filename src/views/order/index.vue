<template>
  <div class="order">
    <el-tabs v-model="activeName" type="border-card" >
      <el-tab-pane label="当前委托" name="first">
        <current-order/>
      </el-tab-pane>
      <el-tab-pane label="委托历史" name="second">
        <history-order/>
      </el-tab-pane>
      <el-tab-pane label="成交明细" name="third">
        <detail-order/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import currentOrder from './components/currentOrder'
import detailOrder from './components/detailOrder'
import historyOrder from './components/historyOrder'
import { ordersAll } from '../../api/wallet'
export default {
  name: 'Index',
  components: {
    currentOrder,
    detailOrder,
    historyOrder
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  created(){
    this.$store.dispatch('getOrderHistoryAll', ' ').catch(_=>{})
  }
}
</script>

<style lang="scss">
  @import "../../assets/custom-theme/theme";
  .order {
    width: 1200px !important;
    margin: 40px auto auto !important;
   
  }

</style>
