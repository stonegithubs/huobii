<template>
  <div class="right-component">
    <div class="right-module">
      <div class="moudle-header">快讯</div>
      <div class="module-list">
        <div class="sub-time">8分钟前</div>
        <div class="body">
          <a class="title">
            <span>媒体：区块链相关专利主要来自中国和美国</span>
          </a>
        <div class="item-inner">
          据外媒近日报道，根据《计算机世界》最近发表的文章，区块链技术相关专利主要来自中国和美国。其中，中国有1520项，美国有773项，中国占报告中确定专利总数近50％。
        </div>
        <span>来源：
          <span>btcmanager</span>
        </span> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "right-component",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.right-component {
  min-height: 800px;
  .right-module {
    margin-bottom: 48px;
    background: #f8f8f8;
    padding: 24px;
    border-radius: 4px;
    transition: all 0.3s ease;
    .moudle-header {
      font-size: 20px;
      line-height: 28px;
      color: rgba(0, 0, 0, 0.88);
      font-weight: 700;
      margin-bottom: 16px;
      position: relative;
      padding-left: 12px;
    }
    .sub-time {
          font-size: 12px;
    line-height: 20px;
    color: rgba(0,0,0,.56);
    }
    .module-list {
            list-style: none;
    position: relative;
    padding-left: 24px;
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 16px;
    }
    .title {
        color: rgba(0,0,0,.88);
    font-weight: 700;
    transition: all .3s ease;
    display: inline;
    }
    .item-inner {
        list-style: none;
    position: relative;
    line-height: 22px;
    margin-bottom: 16px;
    }
   
  }
}
</style>
