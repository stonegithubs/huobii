<template>
    <div class="trade-main">
      <router-view/>
    </div>
</template>

<script>
export default {
    name: "trade-main"
}
</script>

<style>
  .trade-main {
    z-index: 0;
    position: relative;
  }
</style>
