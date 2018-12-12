<template>
  <div class="feature_wrap">
    <div class="section">
      <div class="feature">
        <div class="text-wrap fl">
          <h5> {{ $t('index.feature.first.title') }}</h5>
          <pre>
              {{ $t('index.feature.first.dsc') }}
          </pre>
        </div>
        <div class="img-wrap fr "><img :src="require('../../../assets/imgs/feature_1.png')" ></div>
      </div >
      <div class="feature">
        <div class="img-wrap fl"><img :src="require('../../../assets/imgs/feature_2.png')" alt=""></div>
        <div class="text-wrap fr">
          <h5> {{ $t('index.feature.second.title') }}</h5>
          <pre> {{ $t('index.feature.second.dsc') }}</pre>
        </div>
      </div>
      <div class="feature">
        <div class="text-wrap fl">
          <h5>{{ $t('index.feature.thrid.title') }}</h5>
          <pre>{{ $t('index.feature.thrid.dsc') }}</pre>
        </div>
        <div class="img-wrap fr "><img :src="require('../../../assets/imgs/feature_3.png')" alt=""></div>
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
      featureList: []
    }
  },
  created(){
    waterFall('12','1',20).then(res=>{
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
      }
      .fl {
        float: left;
      }
      .fr {
        float: right;
      }
  }

</style>
