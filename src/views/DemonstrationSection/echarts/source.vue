<template>
  <div>
    <!--坝光片区内外来源对比  -->
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
      default: () => [
        '安居君兰湾府',
        '土洋河综合整治工程',
        '坝光水生态公园',
        '坑尾山塘水道治理工程',
        '彭年企业家度假村工程'
      ]
    },
    values: {
      type: Array,
      default: () => [2000, 800, 600, 400, 100]
    },
    values2: {
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
      eData: [],
      yDataArr: [18, 20, 19, 16, 18],
      yDataArrTwo: [10, 8, 9, 11, 8],
      arrTwoColors: ['#f59a23', '#f8b862']
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
      this.chart.setOption({
        animationDuration: 1500,
        grid: {
          left: '0%',
          right: '0%',
          bottom: '0%',
          top: '18%',
          // height:"88px",
          containLabel: true
        },
        legend: {
          // 图例
          data: ['电子联单数', '今日电子联单数'],
          right:0,
          itemWidth:14,
          itemHeight: 14, 
          textStyle:{
           color: '#fff',
           fontSize:12
          }
        },
        tooltip: {
           show: true,
          trigger: "axis", //axis , item
          backgroundColor: "RGBA(0, 49, 85, 1)",
          borderColor: "rgba(0, 151, 251, 1)",
          borderWidth: 1,
          borderRadius: 0,
          textStyle: {
            color: "#BCE9FC",
            fontSize: 16,
            align: "left"
          }
          // formatter: '{b0}: {c0}',
          // confine: true
        },
        xAxis: {
          type: 'category',
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
            name: '个',
            title: '个',
            minInterval: 1,
            type: 'value',
            axisLabel: {
              // formatter: '{value}%' ,
              color: '#86B3B8'
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
         dataZoom: [
          {
            show: true,
            height: 7,
            maxSpan: 50,
            xAxisIndex: [0],
            bottom: '1%',
            start: 1,
            end: 30,
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
            name:'电子联单数',
            data: this.values,
            type: 'bar',
            barWidth: '30%', //柱子宽度
            // barGap:'30%',/*多个并排柱子设置柱子之间的间距*/
  	        // barCategoryGap:'50%',/*多个并排柱子设置柱子之间的间距*/
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: this.arrTwoColors[0]
                  },
                  {
                    offset: 1,
                    color: this.arrTwoColors[1]
                  }
                ])
              }
            }
          },
          {
            name:'今日电子联单数',  
            data:  this.values2,
            type: 'bar',
            barWidth: '30%', //柱子宽度
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: this.barColors[0]
                  },
                  {
                    offset: 1,
                    color: this.barColors[1]
                  }
                ])
              }
            }
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
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
