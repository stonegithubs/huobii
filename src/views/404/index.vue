<template>
  <div class="no-found">
    <div class="inner">
      <div>{{$t('nofound.t1')}}</div>
      <router-link :to="{ name: 'index'}">{{$t('nofound.t2')}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index"
};
</script>

<style lang="scss" scoped>
.no-found {
  background-color: #fff;
  padding: 200px 0;
  .inner {
    margin: auto;
    width: 1200px;
    text-align: center;
    min-height: 400px;
    font-size: 30px;
    display: flex;
    // justify-content: center;
    // align-content: center;
    flex-direction: column
  }
}
</style>
