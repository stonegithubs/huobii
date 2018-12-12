<template>
  <div class="main-body">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Mainbox'
}
</script>

<style>
  .main-body {
    min-height: 800px;
    background-color:#f2f3f8;
  }

  /*.main-body > div {*/
    /*width: 1560px;*/
    /*margin: auto;*/
    /*background-color: #262a42;*/

  /*}*/
</style>
