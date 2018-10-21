<template>
  <div class="index-notice el-row--flex">
    <span class="notice-item" v-for="(item,index) in notice">
      <a :href="item.link">{{item.description}}</a>
      <span class="notice-slicer"  v-if="index!==2"></span>
    </span>
  </div>
</template>

<script >
export default {
  name: "index-notice",
  created() {
    if(this.$store.state.siteCMS.notice.length === 0){
      this.$store.dispatch('getNoticeRemote').then(() => {
        this.notice =  this.$store.getters.getMyNotice(3);
      })
    }
    else {
      this.notice =  this.$store.getters.getMyNotice(3);
    }


  },
  mounted() {

  },
  data () {
    return {
      notice: [],
    }
  }
}
</script>

<style>
  .index-notice {
    display: inline-block;
    width: 100%;
    min-width: 1526px;
    height: 60px;
    background-color: #181b2a ;
    text-align: center;
    position: absolute;
    top:448px;
    z-index: 10;
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
