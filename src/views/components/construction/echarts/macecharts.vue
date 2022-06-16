<template>
  <div>
    <div ref="myChart" id="qd" style="height:200px;width:100%;"></div>
  </div>
</template>
<script>
import lifeCycle from '@/components/echarts/mixins/lifecycle'
export default {
  name: "macecharts",
  mixins: [lifeCycle()],
  props: {
       id: {
            type: String,
            default: "macecharts"
        },
       labels: {
           type: Array,
           default: []
       },
       values: {
           type: Array,
           default:  []
       },
       subtext: {
           type: String,
           default: '总数:'
       }
  },
  data() {
    return {
        option:null,
        chart: null,
        beachSum:''
    };
  },
  watch: {
      values: function(vals) {
          this.eData = vals;
          this.initChart();
      }

  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      this.chart.on("click", (params) => {
        this.$emit("onClick", params);
      });
    });
  },
  methods: {
      initChart(){
          this.chart =this.chart|| this.$echarts.init(this.$refs.myChart)
          let myChart = this.$echarts.init(this.$refs.myChart)
          this.beachSum = this.getTotal(this.values)
            myChart.setOption( {
            //  backgroundColor: "#0f375f",
             title: {
                subtext: `${this.beachSum}个`,
                  text: this.subtext,
                 left: '34%',
                 top: '35%',
                    itemGap: 6,
                    textAlign: 'center',
                    textStyle: {
                        fontSize: 12,
                        color: '#fff',
                    },
                    subtextStyle: {
                        fontSize: 12,
                        color: '#fff',
                    }
             },
             legend: {
                // orient: 'vertical',
                top: "top",
                left:"60%",
                // right: "5%",
                data: this.labels,
                textStyle: {
                    color: "#fff",
                    fontSize: 12
                }
            },
            tooltip: {
                trigger: 'item',
                // formatter: '{a} <br/>{b} :  {d}个'
                confine: true,
            },
            series: [{
                name: '统计分析',
                type: 'pie',
                radius: ['50%', '85%'],
                center: ['20%', '50%'],
                // roseType: 'radius',
                // width:"90%",
                // height:"100%",
                top:'0%',
                left:'20%',
                right:'0%',
                bottom:'0',
                label: {
                    show: false,
                //     normal: {
                //         position: 'outside',
                //         fontSize: 8
                //     }
                },
                labelLine: {
                    // length: -10,
                    // length2:100,
                    // smooth: true,
                    show:false
                },
                data: [{
                        value: this.values[1],
                        name: '办理',
                        itemStyle: {
                            color: "rgba(44,158,253,1)",
                            // borderColor: "rgba(11,271,215,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: this.values[3],
                        name: '预约',
                        itemStyle: {
                            color: "#9F29FE",
                            // borderColor: "rgba(252,218,171,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: this.values[2],
                        name: '打印',
                        itemStyle: {
                            color: "rgba(0,244,149,1)",
                            // borderColor: "rgba(102,155,255,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: this.values[0],
                        name: '查询',
                        itemStyle: {
                            color: "rgba(50,253,246,1)",
                            // borderColor: "rgba(122,60,235,1)",
                            borderWidth: 3
                        }
                    },
                    // {
                    //     value: 5,
                    //     name: 'rose5',
                    //     itemStyle: {
                    //         color: "rgba(15,197,243,0.7)",
                    //         borderColor: "rgba(15,197,243,1)",
                    //         borderWidth: 3
                    //     }
                    // }
                ]
            }]
        })
      },
      getTotal(arr) {
          return arr.length?arr.reduce((acc, val) => acc += val):0
      }
  }
};
</script>
<style lang="scss" scoped>
#qd {
    height: 130px!important;
    width: 350px!important;
}
</style>