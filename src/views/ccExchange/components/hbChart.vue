<template>
  <div class="hb-chart">
    <div class="hb-tab hc-title">
      <span style="font-size: 20px;font-weight: 700;">{{ this.$store.state.coinData.targetCoin.toUpperCase() }}/{{ this.$store.state.coinData.mainCoin.toUpperCase() }}  {{ this.$store.state.coinData.symbolDetail.close }}</span>
      <div style="float:right">
        <!-- <span class="dis-item">涨幅 -96.20%</span> -->
        <span class="dis-item">{{ $t('index.tradeShow.high') }} {{ this.$store.state.coinData.symbolDetail.high }}</span>
        <span class="dis-item">{{ $t('index.tradeShow.low') }} {{ this.$store.state.coinData.symbolDetail.low }}</span>
        <span class="dis-item">{{ $t('index.tradeShow.vol24h') }} {{ this.$store.state.coinData.symbolDetail.vol }}</span>
      </div>
    </div>
    <div v-loading="this.loading" id="chart" class="hc-inner"/>
  </div>
</template>
<script>
import { getKlineBySymbolName } from '../../../api/coins'
// import echarts from "echarts";
export default {
  name: 'HbChart',
  data() {
    return {
      currentCoin: this.$store.state.coinData.symbolShow || 'btcsudt',
      loading: true
    }
  },
  computed: {
    targetCoin() {
      return this.$store.state.coinData.targetCoin
    }
  },
  watch: {
    targetCoin: function() {
      this.loading = true
      const symbol = this.$store.state.coinData.targetCoin + '' + this.$store.state.coinData.mainCoin

      this.initChart(symbol)
      // console.log(symbol)
    }
  },
  mounted() {
    const symbol = this.$store.state.coinData.targetCoin + '' + this.$store.state.coinData.mainCoin
    this.initChart(symbol)
  },
  methods: {
    calculateMA(dayCount, data) {
      var result = []
      for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-')
          continue
        }
        var sum = 0
        for (var j = 0; j < dayCount; j++) {
          sum += data.values[i - j][1]
        }
        result.push(+(sum / dayCount).toFixed(3))
      }
      return result
    },
    splitData(rawData) {
      var categoryData = []
      var values = []
      var volumes = []
      for (var i = rawData.length - 1; i > 0; i--) {
        categoryData.push(this.getLocalTime(rawData[i].id))
        // console.log(rawData[i].splice(0, 1)[0]+" "+i)
        values.push([
          rawData[i].open,
          rawData[i].close,
          rawData[i].low,
          rawData[i].high,
          rawData[i].vol
        ])
        volumes.push([
          i,
          rawData[i].high,
          rawData[i].open > rawData[i].close ? 1 : -1
        ])
      }

      return {
        categoryData: categoryData,
        values: values,
        volumes: volumes
      }
    },

    getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000)
        .toLocaleString()
        .replace(/:\d{1,2}$/, ' ')
    },
    putSymbol() {
      console.log(this.$store.state.coinData.targetCoin + '' + this.$store.state.coinData.mainCoin)
    },
    initChart(symbol) {
      var echarts = require('echarts')

      const dom = document.getElementById('chart')
      const myChart = this.$echarts.init(dom)
      const app = {}
      let option = null
      const upColor = '#f55858'
      const downColor = '#03c087'

      // TODO: 修改为可变
      getKlineBySymbolName(symbol, '15min', 150)
        .then(res => {
          const rawData = res.content.data
          var data = this.splitData(rawData)
          myChart.setOption(
            (option = {
              backgroundColor: '#fff',
              animation: false,
              legend: {
                bottom: 10,
                left: 'center',
                data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
                // inactiveColor: "#777",
                textStyle: {
                  color: '#fff'
                }
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  animation: false,
                  type: 'cross',
                  lineStyle: {
                    // color: "#376df4",
                    width: 2,
                    opacity: 1
                  }
                }
              },
              axisPointer: {
                link: { xAxisIndex: 'all' },
                label: {
                  // backgroundColor: "#777"
                }
              },
              toolbox: {
                feature: {
                  dataZoom: {
                    yAxisIndex: false
                  },
                  brush: {
                    type: ['lineX', 'clear']
                  }
                }
              },
              // brush: {
              //     xAxisIndex: 'all',
              //     brushLink: 'all',
              //     outOfBrush: {
              //         colorAlpha: 0.1
              //     }
              // },
              visualMap: {
                show: false,
                seriesIndex: 5,
                dimension: 2,
                pieces: [
                  {
                    value: 1,
                    color: downColor
                  },
                  {
                    value: -1,
                    color: upColor
                  }
                ]
              },
              grid: [
                {
                  left: '10%',
                  right: '8%',
                  height: '50%'
                },
                {
                  left: '10%',
                  right: '8%',
                  top: '63%',
                  height: '16%'
                }
              ],
              xAxis: [
                {
                  type: 'category',
                  data: data.categoryData,
                  scale: true,
                  boundaryGap: false,
                  axisLine: { onZero: false },
                  splitLine: { show: false },
                  splitNumber: 20,
                  min: 'dataMin',
                  max: 'dataMax',
                  axisLine: { lineStyle: { color: '#8392A5' }},
                  axisPointer: {
                    z: 100
                  }
                },
                {
                  type: 'category',
                  gridIndex: 1,
                  data: data.categoryData,
                  scale: true,
                  boundaryGap: false,
                  axisLine: { lineStyle: { color: '#8392A5' }},
                  axisLine: { onZero: false },
                  axisTick: { show: false },
                  splitLine: { show: false },
                  axisLabel: { show: false },
                  splitNumber: 20,
                  min: 'dataMin',
                  max: 'dataMax'
                }
              ],
              yAxis: [
                {
                  scale: true,
                  axisLine: { lineStyle: { color: '#8392A5' }}
                  // splitLine: { show: false }
                },
                {
                  scale: true,
                  gridIndex: 1,
                  splitNumber: 2,
                  axisLine: { lineStyle: { color: '#8392A5' }},
                  axisLabel: { show: false },
                  axisLine: { show: false },
                  axisTick: { show: false },
                  splitLine: { show: false }
                }
              ],
              dataZoom: [
                {
                  type: 'inside',
                  xAxisIndex: [0, 1],
                  start: 0,
                  end: 100
                },
                {
                  show: true,
                  xAxisIndex: [0, 1],
                  type: 'slider',
                  top: '85%',
                  start: 98,
                  end: 100
                }
              ],
              series: [
                {
                  name: 'Dow-Jones index',
                  type: 'candlestick',
                  data: data.values,
                  itemStyle: {
                    normal: {
                      color: upColor,
                      color0: downColor,
                      borderColor: null,
                      borderColor0: null
                    }
                  },
                  tooltip: {
                    formatter: function(param) {
                      param = param[0]
                      return [
                        'Date: ' +
                          param.name +
                          '<hr size=1 style="margin: 3px 0">',
                        'Open: ' + param.data[0] + '<br/>',
                        'Close: ' + param.data[1] + '<br/>',
                        'Lowest: ' + param.data[2] + '<br/>',
                        'Highest: ' + param.data[3] + '<br/>'
                      ].join('')
                    }
                  }
                },
                {
                  name: 'MA5',
                  type: 'line',
                  data: this.calculateMA(5, data),
                  smooth: true,
                  showSymbol: false,
                  lineStyle: {
                    normal: { opacity: 0.5 }
                  }
                },
                {
                  name: 'MA10',
                  type: 'line',
                  data: this.calculateMA(10, data),
                  smooth: true,
                  showSymbol: false,
                  lineStyle: {
                    normal: { opacity: 0.5 }
                  }
                },
                {
                  name: 'MA20',
                  type: 'line',
                  data: this.calculateMA(20, data),
                  smooth: true,
                  showSymbol: false,
                  lineStyle: {
                    normal: { opacity: 0.5 }
                  }
                },
                {
                  name: 'MA30',
                  type: 'line',
                  data: this.calculateMA(30, data),
                  smooth: true,
                  showSymbol: false,
                  lineStyle: {
                    normal: { opacity: 0.5 }
                  }
                },
                {
                  name: 'Volume',
                  type: 'bar',
                  xAxisIndex: 1,
                  yAxisIndex: 1,
                  data: data.volumes
                }
              ]
            }),
            true
          )
          // console.log(myChart);
          if (option && typeof option === 'object') {
            myChart.setOption(option, true)
          }
        }).then(() => {
          this.loading = false
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">
@import "../../../assets/custom-theme/theme";

.hb-chart {
  height: 528px;
  width: 1136px;
   .hc-inner {
    height: 480px;
  }
  #chart {
    height: 480px;
  }
}
</style>
