<template>
  <div class="index-notice el-row--flex">
    <span v-for="(item,index) in notice" :key="index" class="notice-item">
      <a :href="item.link">{{ item.description }}</a>
      <span v-if="index != notice.length-1" class="notice-slicer"/>
    </span>
  </div>
</template>

<script >
export default {
  name: 'IndexNotice',
  data() {
    return {
      notice: []
    }
  },
  created() {
    this.$store.dispatch('getNoticeRemote').then(response => {
      // console.log(response)
      if (response.code) {
        this.notice = response.content.records.slice(0, 3)
      }
    })
  },
  mounted() {

  }
}
</script>

<style>
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
