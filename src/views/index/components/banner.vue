<template>
  <div class="banner">
      <el-carousel trigger="click" height="390px">
        <el-carousel-item v-for="item in bannerList" :key="item">
          <img :style="{background: 'url('+ item +') center no-repeat'}">
        </el-carousel-item>
      </el-carousel>
  </div>
</template>

<script>
export default {
  name: "banner",
  data(){
    return {
      bannerList: {
        1: require('../../../assets/banner/banner1.jpg'),
        2: require('../../../assets/banner/banner2.jpg'),
        3: require('../../../assets/banner/banner3.jpg'),
        4: require('../../../assets/banner/banner4.jpg'),
        5: require('../../../assets/banner/banner5.jpg'),
        }
    }
  }
}
</script>

<style>
  .banner img{
    height: 390px;
    width: 100%;
    margin-top: -1px;
    margin-bottom: -10px;
  }

</style>
