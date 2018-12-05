<template>
    <div class="main-body">
        <router-view/>
    </div>
</template>

<script>
export default {
  name: "mainbox"
}
</script>

<style>
  .main-body {
    min-height: 800px;
    background-color:#fcfdfd;

  }

  /*.main-body > div {*/
    /*width: 1560px;*/
    /*margin: auto;*/
    /*background-color: #262a42;*/

  /*}*/
</style>
