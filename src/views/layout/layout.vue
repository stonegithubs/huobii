<template>
  <div class="lay-out">
    <navbar/>
    <div class="view-port">
      <mainbox/>
    </div>
    <!--<router-view/>-->
    <my-footer/>
  </div>
</template>

<script>
import '../../style/index.scss'
import navbar from './components/navbar'
import mainbox from './components/mainBox'
import myFooter from './components/myFooter'

export default {
  name: 'Layout',
  components: {
    navbar,
    mainbox,
    myFooter
  },
  created() {
    this.$nextTick(()=>{
      this.$store.dispatch('getSupportCash')
      this.$store.dispatch('getSupportCoin')
      this.$store.dispatch('getSupportedPayway')
    })
  }
}
</script>

<style lang="scss">
  @import "../../assets/custom-theme/theme.scss";
  a:hover {
    text-decoration: none;
    color: white;
  }
  .lay-out {
    min-width: 1200px;
    // color: #c7cce6;
    background-color: $hbBackgroundColor;
    margin: auto;
    .view-port {
      @media (max-width: 1200px) {
        width: 1200px;
      }
      margin: auto
    }
  }
  ::-webkit-scrollbar{
    /*height: 20px;*/
    width: 10px;

    background-color: transparent;
  }
  /*滚动条的轨道*/
  ::-webkit-scrollbar-track{
    background-color: $hbBackgroundColor;
    /*width: 1px;*/
  }
  /*滚动条的滑块按钮*/
  ::-webkit-scrollbar-thumb{
    background-color: rgba(97, 104, 138, .15);
    border-radius: 10px;

  }
  /*滚动条的上下两端的按钮*/
  // ::-webkit-scrollbar-button{
      /*display: none;*/
  // }

  .upper {
    text-transform: uppercase;
  }
</style>
