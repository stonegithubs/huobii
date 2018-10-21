<template>
  <div class="sidebar-img">
    <router-link :to="{ name: 'invite' }"><img :src="require('../../../assets/imgs/invite.jpg')" style="width: 100%;height: auto"></router-link>
  </div>
</template>

<script>

export default {
    name: "siderbar-img"
}
</script>

<style lang="scss">
  @import "../../../assets/custom-theme/theme";
  .sidebar-img a {
    margin: 0;
  }

</style>
