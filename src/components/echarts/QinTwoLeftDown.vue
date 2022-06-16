<template>
  <div>
    <div ref="myChart" id="qd" style="height:200px;width:100%;"></div>
  </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'
export default {
  name: "Qin-Two-Left-Down",
  mixins: [lifeCycle()],
  props: {
       soso: {
           type: String,
           default: "Qin-Two-Left-Down"
       },
       labels: {
           type: Array,
           default: () => []
       },
       values: {
           type: Array,
           default: () => []
       }
  },
  data() {
    return {
        // option:null,
        chart: null,
    };
  },
  watch: {
      value: (vals) => {
             
          this.initChart();
      },

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
          this.chart = this.chart || this.$echarts.init(this.$refs.myChart)
         let myChart = this.$echarts.init(this.$refs.myChart)
            myChart.setOption({
            //  backgroundColor: "#0f375f",
             legend: {
                // orient: 'vertical',
                top: "10%",
                right: "right",
                // bottom:"20%",
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
                name: '投诉占比',
                type: 'pie',
                radius: ['20%', '90%'],
                center: ['40%', '60%'],
                // roseType: 'radius',
                // width:"90%",
                // height:"100%",
                top:'5%',
                left:'10%',
                right:'20%',
                bottom:'10%',
                label: {
                    show: true,
                    normal: {
                        show:false,
                        position: 'outside',
                        fontSize: 8
                    }
                },
                labelLine: {
                    // length: -10,
                    // length2:100,
                    smooth: false,
                    show:false
                },
                data: [
                    {
                        value: this.values[0],
                        name: this.labels[0],
                        itemStyle: {
                            color: "rgba(11,180,171,1)",
                            // borderColor: "rgba(11,271,215,1)",
                            // borderWidth: 3
                        }
                    },
                    {
                        value: this.values[1],
                        name: this.labels[1],
                        itemStyle: {
                            color: "rgba(0,242,152,0.88)",
                            // borderColor: "rgba(252,218,171,1)",
                            // borderWidth: 3
                        }
                    },
                    {
                        value: this.values[2],
                        name: this.labels[2],
                        itemStyle: {
                            color: "rgba(158, 45, 254, 100)",
                            // borderColor: "rgba(102,155,255,1)",
                            // borderWidth: 3
                        }
                    },
                    {
                        value: this.values[3],
                        name: this.labels[3],
                        itemStyle: {
                            color: "rgba(44, 158, 253, 100)",
                            // borderColor: "rgba(122,60,235,1)",
                            // borderWidth: 3
                        }
                    },
                    //  {
                    //     value: this.values[4],
                    //     name: this.labels[4],
                    //     itemStyle: {
                    //         color: "rgba(254, 134, 2, 100)",
                    //         // borderColor: "rgba(122,60,235,1)",
                    //         borderWidth: 3
                    //     }
                    // },
                    
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
    }
};
</script>
<style lang="scss" scoped>
#qd {
    height: 125px!important;
    width: 360px!important;
}
</style>