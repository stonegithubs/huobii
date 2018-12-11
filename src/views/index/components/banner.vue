<template>
  <div class="banner">
    <el-carousel trigger="click" height="390px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <a :href="item.link">
          <img :style="{background: 'url('+ item.image +') center  no-repeat'}" style="background-size:cover">
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getBanner }from '../../../api/cms';
export default {
  name: 'Banner',
  data() {
    return {
      bannerList: []
    }
  },
  created(){
    getBanner(0,5).then(res=>{
      // console.log(res)
      if(res.code === '200'){
        this.bannerList = res.content.records;
      }
    })
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
