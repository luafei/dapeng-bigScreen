<template>
  <div>
    <div ref="myChart" id="qd" style="height:200px;width:100%;"></div>
  </div>
</template>
<script>
import lifeCycle from '@/components/echarts/mixins/lifecycle'
export default {
  name: "Qinbuss",
  mixins: [lifeCycle()],
  props: {
       soso: {
           type: String,
           default: "Qinbuss"
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
      values: (vals) => {
             console.log(vals,'vlasd')
          // this.initChart();
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
                 data:[
                     '男','女','5-9岁','20-24岁','25-29岁','30-34岁', '35-39岁','博士','硕士','大学本科','大专','高技','中专','未入学',
                     '教育学','文学','理学','管理学','其他','高级职称','高级技术等级','无','制造业','居民服务','教育',
                     '社会福利业','建筑业'
                     ],
                 selected:{'10-14岁': false,'45-49':false,'40-44岁':false,
                 '工学':false,'医学':false,'信息传输':false,'住宿':false,'金融业':false,'房地产业':false,'地质勘察业':false
                 ,'设施管理业':false
                 },
            //    show:false,
                // orient: 'vertical',
                top: "10%",
                right: "right",
                // bottom:"20%",
                // right: "5%",
                // data: this.labels,
                textStyle: {
                    color: "#fff",
                    fontSize: 8
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b0}: {c0}%",
                confine: true,
            },
            series: [{
                name: '人数',
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
                            color: "rgba(0, 255, 255, 400)",
                            // borderColor: "rgba(11,271,215,1)",
                            // borderWidth: 3
                        }
                    },
                    {
                        value: this.values[1],
                        name: this.labels[1],
                        itemStyle: {
                            color: "rgba(71, 210, 245, 400)",
                            // borderColor: "rgba(252,218,171,1)",
                            // borderWidth: 3
                        }
                    },
                    {
                        value: this.values[2],
                        name: this.labels[2],
                        itemStyle: {
                            color: "rgba(131, 170, 252, 100)",
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
                     {
                        value: this.values[4],
                        name: this.labels[4],
                        itemStyle: {
                            color: "rgba(250, 226, 113, 100)",
                            // borderColor: "rgba(122,60,235,1)",
                            borderWidth: 3
                        }
                    },
                     {
                        value: this.values[5],
                        name: this.labels[5],
                        itemStyle: {
                            color: "rgba(254, 4, 3, 400)",
                            // borderColor: "rgba(122,60,235,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: this.values[6],
                        name: this.labels[6],
                        itemStyle: {
                            color: "rgba(253, 984, 311, 400)",
                            // borderColor: "rgba(122,60,235,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: this.values[7],
                        name: this.labels[7],
                        itemStyle: {
                            color: "rgba(254, 884, 13, 400)",
                            // borderColor: "rgba(122,60,235,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: this.values[8],
                        name: this.labels[8],
                        itemStyle: {
                            color: "rgba(160, 240, 128, 400)",
                            // borderColor: "rgba(122,60,235,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: this.values[9],
                        name: this.labels[9],
                        itemStyle: {
                            color: "rgba(200, 128, 255, 400)",
                            // borderColor: "rgba(122,60,235,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: this.values[10],
                        name: this.labels[10],
                        itemStyle: {
                            color: "rgba(0,242,152,0.88)",
                            // borderColor: "rgba(122,60,235,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: this.values[11],
                        name: this.labels[11],
                        itemStyle: {
                            color: "rgba(11,180,171,1)",
                            // borderColor: "rgba(122,60,235,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: this.values[12],
                        name: this.labels[12],
                        itemStyle: {
                            color: "rgba(246, 68, 204, 400)",
                            // borderColor: "rgba(122,60,235,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: this.values[13],
                        name: this.labels[13],
                        itemStyle: {
                            color: "rgba(0, 128, 64, 400)",
                            // borderColor: "rgba(122,60,235,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: this.values[14],
                        name: this.labels[14],
                        itemStyle: {
                            color: "rgba(64, 0, 128, 400)",
                            // borderColor: "rgba(122,60,235,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: this.values[15],
                        name: this.labels[15],
                        itemStyle: {
                            color: "rgba(96, 15, 113, 400)",
                            // borderColor: "rgba(122,60,235,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: this.values[16],
                        name: this.labels[16],
                        itemStyle: {
                            color: "rgba(109, 68, 18, 400)",
                            // borderColor: "rgba(122,60,235,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: this.values[17],
                        name: this.labels[17],
                        itemStyle: {
                            color: "rgba(5, 84, 122, 400)",
                            // borderColor: "rgba(122,60,235,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: this.values[18],
                        name: this.labels[18],
                        itemStyle: {
                            color: "rgba(128, 128, 128, 400)",
                            // borderColor: "rgba(122,60,235,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: this.values[19],
                        name: this.labels[19],
                        itemStyle: {
                            color: "rgba(22, 128, 233, 400)",
                            // borderColor: "rgba(122,60,235,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: this.values[20],
                        name: this.labels[20],
                        itemStyle: {
                            color: "rgba(87, 158, 164, 400)",
                            // borderColor: "rgba(122,60,235,1)",
                            borderWidth: 3
                        }
                    },
                    {
                        value: this.values[21],
                        name: this.labels[21],
                        itemStyle: {
                            color: "rgba(0, 128, 64, 400)",
                            // borderColor: "rgba(122,60,235,1)",
                            borderWidth: 3
                        }
                    },
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