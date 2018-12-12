<template>
  <router-view/>
</template>

<script>

export default {
  name: 'Advertisement',
  data() {
    return {

    }
  },
  mounted() {
    // if (this.$store.state.user.verifyInfo === {}) {
    //   this.$store.dispatch('GetVerifyInfo').then(_ => {
    //     if (_.content === null || _.auditFlag !== '4') {
    //       this.$router.push({ name: 'advAuth' })
    //     }
    //   })
    // }
    // if (this.$store.state.user.verifyInfo.auditFlag !== '4') {
    //   this.$router.push({ name: 'advAuth' })
    // }
     this.$store.dispatch('GetUserPayway')
  }
}
</script>

<style lang="scss" scoped>

</style>
