<template>
  <div>
    <div ref="myChart" id="qd" style="height:200px;width:100%;"></div>
  </div>
</template>
<script >
import lifeCycle from './mixins/lifecycle'
import  echarts from 'echarts'
import { filterDate } from '@/utils/echartsUtils'

export default {
  name: "Qin-Right-Down",
  mixins: [lifeCycle()],
  props: {
      soso: {
          type: String,
          default: "Qin-Right-Down"
      },
      labels: {
          type: Array,
          default: () => []
      },
      values: {
          type: Array,
          default: () => []
      },
      stayNum: {
        type: Array,
        default: () => []
      },
      timeType: {
          type: String,
          default: ''
      }
  },
  data() {
    return {
        // option:null,
        chart: null,
        // city: ["1", "2", "3", "4", "5", "6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"],
        // num: ["40", "60", "22", "85", "50", "40","60", "22", "85", "50", "40","60", "22", "85", "50", "40","60", "22", "85", "50", "40","60", "22", "85", "50", "40", "22", "85", "50", "40"],
      //  echarts:null,
    };
  },
  watch: {
      values: function(vals) {
          this.initChart();
      }

  },
  mounted() {
      this.initChart()
    // this.$nextTick(() => {
    //   this.initChart();
    //   this.chart.on("click", (params) => {
    //     this.$emit("onClick", params);
    //   });
    // });
  },
  methods: {
    initChart(){
      this.chart = this.chart || this.$echarts.init(this.$refs.myChart)
      // this.chart.resize({height: this.height});
      let myChart = this.$echarts.init(this.$refs.myChart)
    
      myChart.setOption ( {
        // backgroundColor:'#0e1c47',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
              lineStyle: {
                    color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                      colorStops: [{
                        offset: 0,
                        color: 'rgba(255,255,255,0)' // 0% 处的颜色
                     }, {
                        offset: 0.5,
                        color: 'rgba(255,255,255,1)' // 100% 处的颜色
                     }, {
                        offset: 1,
                        color: 'rgba(255,255,255,0)' // 100% 处的颜色
                      }],
                    global: false // 缺省为 false
                  }
              },
          },
        },
        grid: {
            top: '10%',
            left: '10%',
            right: '10%',
            bottom: '40%',
            // containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: true,
          axisLine: { //坐标轴轴线相关设置。数学上的x轴
            show: false,
            lineStyle: {
                // color: "#092b5d"
            },
          },
          axisLabel: { //坐标轴刻度标签的相关设置
              textStyle: {
                  color: 'rgba(134,179,184,1)',
                  margin: 5,
              },
              interval:0,
              formatter: (value, index) => {
                return filterDate(value, this.timeType)
              }
          },
          axisTick: {
              show: true,
          },
          showMinLabel: true,
          showMaxLabel: true,
          data: this.labels
        }],
        yAxis: [{
          min: 0,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#092b5d'
            },
          },
          splitLine: {
            show: true,
            lineStyle:{
                  color:"rgba(0,242,152,.1)"
            }
          },
          axisLine: {
              show: false,
              lineStyle: {
                // color: "#092b5d"
              }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: 'rgba(134,179,184,1)',

            },
              // formatter: function(value) {
              //   if (value === 0) {
              //       return value
              //   }
              //   return value + ''
              // }
          },
          axisTick: {
            show: false,
          },
        }],
        series: [{
          name: '免费刻章企业数量',
          type: 'line',
          symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
          showAllSymbol: true,
          symbolSize: 0,
          itemStyle: {
              //折线拐点标志的样式
              color: "rgba(8,254,209,.1)",
          },
          lineStyle: {
              normal: {
                color: "#08FED1", // 线条颜色
                width:0.5,
              },
              borderColor: 'rgba(0,0,0,.4)',
          },
          label: {
            normal: {
                show: true,
                position: "top",
                formatter: [
                    // ' {a|{c}%}',
                ].join(','),
                rich: {
                    a: {
                        color: '#fff',
                        align: 'center',
                    },
                }
            }
          },
          tooltip: {
            show: true
          },
          areaStyle: { //区域填充样式
            normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "rgba(8,254,209,.5)"
                    },
                    {
                        offset: 1,
                        color: "rgba(8,254,209,0)"
                    }
                ], false),
                shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            }
          },
            data: this.values
        },{
          name: '滞留数量',
          type: 'line',
          symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
          showAllSymbol: true,
          symbolSize: 0,
          itemStyle: {
              //折线拐点标志的样式
              color: "rgba(8,254,209,.1)",
          },
          lineStyle: {
              normal: {
                color: "#08FED1", // 线条颜色
                width:0.5,
              },
              borderColor: 'rgba(0,0,0,.4)',
          },
          label: {
            normal: {
                show: true,
                position: "top",
                formatter: [
                    // ' {a|{c}%}',
                ].join(','),
                rich: {
                    a: {
                        color: '#fff',
                        align: 'center',
                    },
                }
            }
          },
          tooltip: {
            show: true
          },
          lineStyle: {
            opacity: 0
          },
          areaStyle: { //区域填充样式
            normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "rgba(8,254,209,.5)"
                    },
                    {
                        offset: 1,
                        color: "rgba(8,254,209,0)"
                    }
                ], false),
                shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            }
          },
            data: this.stayNum
        }]
      }); 
      // this.chart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
#qd {
    height: 160px!important;
    width: 400px!important;
}
</style>