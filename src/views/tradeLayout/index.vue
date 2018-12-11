<template>
  <div class="trade-layout">
    <tradeNavbar/>
    <tradeMain/>
    <tradeFooter/>
  </div>
</template>

<script>
import tradeNavbar from './components/tradeNavbar'
import tradeMain from './components/tradeMain'
import tradeFooter from './components/tradeFooter'
export default {
  name: 'Index',
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
