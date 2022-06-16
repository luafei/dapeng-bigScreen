<template>
  <div>
    <div ref="myChart" id="qd" style="height:200px;width:100%;"></div>
  </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'
export default {
  name: "Qin-Right-Down",
  mixins: [lifeCycle()],
  props: {
       id: {
            type: String,
            default: "Qin-Right-Down"
        },
       labels: {
           type: Array,
           default: []
       },
       values: {
           type: Array,
           default:  []
       }
  },
  data() {
    return {
        option:null,
        chart: null,
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
            myChart.setOption( {
            //  backgroundColor: "#0f375f",
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
                formatter: '{a} <br/>{b} :  {d}%'
            },
            series: [{
                name: '事项清单',
                type: 'pie',
                radius: ['40%', '70%'],
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
                        name: 'B类事项',
                        itemStyle: {
                            color: "rgba(11,180,171,1)",
                            // borderColor: "rgba(11,271,215,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: this.values[3],
                        name: 'D类事项',
                        itemStyle: {
                            color: "rgba(250,140,91,1)",
                            // borderColor: "rgba(252,218,171,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: this.values[2],
                        name: 'C类事项',
                        itemStyle: {
                            color: "rgba(119,191,255,1)",
                            // borderColor: "rgba(102,155,255,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: this.values[0],
                        name: 'A类事项',
                        itemStyle: {
                            color: "rgba(0,108,255,0.7)",
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
      a(val) {
          let values = []
          val.forEach(item => {
            values.push({
                        value: item,
                        name: 'C类事项',
                        itemStyle: {
                            color: "rgba(119,191,255,1)",
                            borderWidth: 3
                        }
                    })
          })
      }
    }
};
</script>
<style lang="scss" scoped>
#qd {
    height: 180px!important;
    width: 350px!important;
}
</style>