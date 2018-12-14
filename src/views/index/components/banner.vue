<template>
<div>
  <div class="banner">
    <el-carousel trigger="click" height="390px">
      <el-carousel-item v-for="item in getterBanner" :key="item.id">
        <a :href="item.link">
          <img :style="{background: 'url('+ item.image +') center  no-repeat'}" style="background-size:cover">
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="index-notice el-row--flex">
    <span v-for="(item,index) in getterBanner" :key="index" class="notice-item">
      <a :href="item.link">{{ item.title }}</a>
      <span v-if="index != getterBanner.length-1" class="notice-slicer"/>
    </span>
  </div>
</div>
</template>

<script>
import { getBanner }from '../../../api/cms';
import { mapGetters } from 'vuex';
export default {
  name: 'Banner',
  data() {
    return {
      bannerList:  [],
    }
  },
  created(){
    this.$store.dispatch('getBanners')
    // getBanner(0,5).then(res=>{
    //   // console.log(res)
    //   if(res.code === '200'){
    //     this.bannerList = res.content.records;
    //   }
    // })
  },
  computed:{
    ...mapGetters(['getterBanner'])
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
  .index-notice {
    display: inline-block;
    width: 100%;
    min-width: 1200px;
    height: 60px;
    background-color: #181b2a ;
    text-align: center;
    position: absolute;
    top:448px;
    z-index: 10;
    
    box-shadow: 48px 9px 20px 4px rgba(1,1,1,0.1);
    border: 1px solid #EEE;
  }
  .index-notice .notice-item {
    flex-wrap: wrap;
    font-size: 14px;
    line-height: 60px;
  }
  .index-notice .notice-item a{
    color: #c7cce6;
    transition: all .2s ease-in-out;
  }
  .index-notice .notice-item a:hover{
    color: #7a98f7;
    text-decoration: none;
  }

 .index-notice  .notice-slicer:after {
    content: "/";
    margin: 0 25px;
  }


</style>
