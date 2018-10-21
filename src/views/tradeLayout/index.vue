<template>
  <div class="trade-layout">
    <tradeNavbar> </tradeNavbar>
    <tradeMain> </tradeMain>
    <tradeFooter> </tradeFooter>
  </div>
</template>

<script>
import tradeNavbar from './components/tradeNavbar'
import tradeMain from './components/tradeMain'
import tradeFooter from './components/tradeFooter'
export default {
name: "index",
  components: {
  tradeNavbar,
  tradeMain,
  tradeFooter
  },
  methods: {

  }
}
</script>

<style>

</style>
