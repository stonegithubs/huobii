<template>
    <el-container class="trade">
      <tradeSelect/>
      <tradeContent/>
    </el-container>
</template>

<script>
import tradeContent from './components/tradeContent'
import tradeSelect from './components/tradeSelect'
import ElContainer from "element-ui/packages/container/src/main";
  export default {
    name: "trade",
    components: {
      ElContainer,
      tradeSelect,
      tradeContent
    }
  }
</script>

<style lang="scss">
  .trade {
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .trade-select{

    }
  }
</style>
