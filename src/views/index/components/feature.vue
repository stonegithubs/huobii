<template>
  <div class="feature_wrap">
    <div class="section">
      <div class="feature">
        <div class="text-wrap fl">
          <h5> {{featureList[0].title}}</h5>
           <p v-html="featureList[0].description"> </p>
        </div>
        <div class="img-wrap fr "><img :src="featureList[0].image" ></div>
      </div >
      <div class="feature">
        <div class="img-wrap fl"><img :src="featureList[1].image" alt=""></div>
        <div class="text-wrap fr">
          <h5> {{featureList[1].title}}</h5>
          <p v-html="featureList[1].description"> </p>
        </div>
      </div>
      <div class="feature">
        <div class="text-wrap fl">
          <h5>{{featureList[2].title}}</h5>
          <p v-html="featureList[2].description"> </p>
        </div>
        <div class="img-wrap fr "><img :src="featureList[2].image" alt=""></div>
      </div>
    </div>
  </div>
</template>

<script>
import { waterFall } from '../../../api/cms'
export default {
  name: 'Feature',
  data(){
    return {
      baseUrl: 'https://api.hextec.cn:8443',
      featureList: [
        { title: '', description:'',image:''},
        { title: '', description:'',image:''},
        { title: '', description:'',image:''},

      ]
    }
  },
  created(){
    waterFall(0,5).then(res=>{
      if(res.code === '200'){
        this.featureList = res.content.records
      }
    }).catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style lang="scss">

  .feature_wrap {
    width: 100%;
    margin-top: 150px;
    position: relative;
      .section {
        min-height: 360px;
        height: 1500px;
        position: relative;
        font-size: 138%;
        margin: auto;
      }
      img {
        width: auto;
        height: 330px;
      }
      .feature {
        height: 500px;
        width: 1200px;
        margin: auto;
        overflow: hidden;
        text-overflow: ellipsis;
      h5 {
        padding-bottom: 25px;
        font-size: 34px;
        font-weight: 400;
        text-align: left;
        color: #263241;
      }
      pre {
        line-height: 32px;
        font-size: 18px;
        text-align: left;
        color:#7f8fa4
      }
      }
      .text-wrap {
        width: 600px;
      }
      .img-wrap {
        width: 500px;
        height: 330px;
        overflow: hidden;

      }
      .fl {
        float: left;
      }
      .fr {
        float: right;
      }
  }

</style>
