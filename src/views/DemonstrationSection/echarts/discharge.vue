<template>
  <div>
    <!--各工地排放情况  -->
    <div :id="id" :ref="id" class="chart"></div>
  </div>
</template>
<script>
import lifeCycle from '@/components/echarts/mixins/lifecycle'
import { subStringFormatter } from '@/utils/echartsUtils'

export default {
  name: 'Wu-Bar-R-Three',
  mixins: [lifeCycle()],

  props: {
    id: {
      type: String,
      default: 'wu-bar-r-three'
    },
    labels: {
      type: Array,
      default: () => ['坝光片区内', '坝光片区外']
    },
    values: {
      type: Array,
      default: () => [2000, 800, 600, 400, 100]
    },
    // yFormatter: {
    //     type: Function,
    //     default: function(val){
    //         if(val===0){
    //             return "个"
    //         }else{
    //             return val;
    //         }
    //     }
    // },
    barColors: {
      type: Array,
      default: () => ['#458886', '#5ebc88']
    }
    // height: {
    //     type: Number,
    //     default: 110
    // }
  },
  data () {
    return {
      chart: null,
      maxArr: [],
      eData: []
      // yDataArr: [12, 20]
    }
  },
  watch: {
    values: {
      handler: function (vals) {
        this.eData = vals
        if (vals.length !== 0) {
          this.maxArr = [...vals]
        } else {
          this.maxArr = []
        }
        this.initChart()
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
      this.chart.on('click', params => {
        this.$emit('onClick', params)
      })
    })
  },
  methods: {
    initChart () {
      this.chart = this.chart || this.$echarts.init(this.$refs[this.id])
      this.chart.resize({ height: this.height })
      var obj = {
        // 0: '2.25%',
        // 1: '41.54%',
        // 2: '32.88%',
        // 3: '16.77%',
        // 4: '5.43%',
        // 5: '0.36%',
        // 6: '0.03%',
      }
      this.chart.setOption({
        title: {
          text: '单位：方',
          show: true,
          right: 0,
          textStyle: {
            color: '#86b3b8',
            fontSize: 12
          }
        },
        animationDuration: 1500,
        grid: {
          left: '0%',
          right: '0%',
          bottom: '0%',
          top: '20%',
          // height:"88px",
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: function (params) {
            return params[0].name + ': ' + params[0].value + '方'
          }
        },
        xAxis: {
          type: 'category',
          show: true,
          data: this.labels,
          axisTick: 'none',
          // min:5,
          axisLine: {
            show: false
          },
          axisLabel: {
            interval: 5,
            margin: 10,
            color: '#e2e9ff',
            textStyle: {
              fontSize: 12,
              color: '#86B3B8'
            },
            formatter: subStringFormatter
          }
        },
        yAxis: [
          {
            // minInterval: 1,
            // type: 'value',
            type: 'log', //在这里，用'log'，不根据数据value定义刻度
            // position: 'left',
            // min: -1,
            // splitNumber: 10,
            min:1,
            logBase:10,

            axisLabel: {
              // formatter: '{value}%' ,
              color: '#86B3B8',
               formatter: (params) => {
                return params === 1 ? 0 : params;
              },

            },
            axisLine: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(0,242,152,.2)'
              }
            }
          }
        ],
        // yAxis: {
        //   splitLine: {
        //     show: false
        //   },
        //   axisTick: {
        //     show: false
        //   },
        //   axisLine: {
        //     show: false
        //   },
        //   axisLabel: {
        //     show: false
        //   }
        // },
        color: ['#e54035'],
        dataZoom: [
          {
            show: true,
            height: 7,
            maxSpan: 50,
            xAxisIndex: [0],
            bottom: '1%',
            start: 1,
            end: 40,
            handleSize: '110%',
            handleStyle: {
              color: '#d3dee5'
            },
            textStyle: {
              color: '#fff'
            },
            borderColor: '#2FE3EA'
          },
          {
            type: 'inside',
            show: true,
            heght: 15,
            start: 0,
            end: 35
          }
        ],
        series: [
          {
            barWidth: '130%',
            name: 'hill',
            type: 'pictorialBar',
            // barCategoryGap: '-140%',
            barMinWidth: 50,
            barMinHeight: 10,//柱子得最小高度是10
            symbol:
              'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            label: {
              show: false, // 不显示上面的数据
              position: 'top',
              distance: 4,
              color: '#fff',
              // fontWeight: 'bolder',
              fontSize: 12,
              formatter: function (params) {
                return obj[params.dataIndex]
              }
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  let colorList = [
                    'rgba(189, 63, 37,0.7)',
                    'rgba(180, 108, 59,0.7)',
                    'rgba(81, 156, 247,0.7)',
                    'rgba(106, 215, 251,0.7)',
                    'rgba(111, 238, 160,0.7)'
                  ]
                  let index = params.dataIndex % colorList.length
                  // return colorList[params.dataIndex]
                  return colorList[index]
                }
              },
              emphasis: {
                opacity: 1
              }
            },
            data: this.eData,
            z: 10
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.chart {
  height: 160px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
