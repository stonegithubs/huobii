<template>
  <div>
    <banner></banner>
    <indexNotice></indexNotice>
    <tradeShow></tradeShow>
    <feature></feature>
    <client></client>
  </div>
</template>

<script>
import banner from './components/banner'
import client from './components/client'
import feature from './components/feature'
import indexNotice from './components/indexNotice'
import tradeShow from './components/tradeShow'
export default {
  name: "index",
  components: {
    banner,
    client,
    feature,
    indexNotice,
    tradeShow
  }
}
</script>

<style>

</style>
