<template>
    <div>
      <!-- <p style="fontSize:12px">{{driveInOut}}</p> -->
        <!-- <p>{{showlength}}</p> -->
        <div :id="id" :ref="id" class="chartass"></div>
    </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'
export default {
    name: 'wu-pie',
    mixins: [lifeCycle()],
    props: {
        id: {
            type: String,
            default: "wu-pie"
        },
        values: { //本地
            type: Number,
            default: 100
        },
        labels:{ //外地
            type: Number,
            default:100
        },
        changeDriveType:{
          type: Number
        }
    },
    watch:{
        values:{
            handler(){
              this.initChart()
            }
        },
        changeDriveType:{
          handler(newVal){
            this.showLocalDriveType = newVal === 0 ? '本地车辆驶入':'本地车辆驶出'
            this.showFieldDriveType = newVal === 0 ? '外地车辆驶入':'外地车辆驶出'
            this.initChart()
          },
          // immediate: true //使用初始监听会报错
        }
    },
    data(){
        return {
            chart: null,
            maxArr: [],
            outerRing:require("@/assets/images/outer_ring.png"),
            showLocalDriveType: '本地车辆驶入',
            showFieldDriveType:'外地车辆驶入',
            length:0,
            length2:0,
            showlength:-2
        }
    },
    mounted() {
        this.$nextTick(() => {
          // if(!this.values) return;
          this.initChart()
          this.chart.on('click', (params) => {
            if(params.componentSubType === 'pie'){
              this.$emit('clickPie', params)
            }else if(params.componentSubType === 'scatter'){
              this.$emit('clickScatter', params)
            }
          });
        })

        this.showLocalLength2()
        this.showOtherLength2()
        window.addEventListener("resize",()=>{
          if(!this.$refs[this.id]) return;
          if(this.$refs[this.id].clientWidth<300){
              this.option.series[1].data[0].label.fontSize = 10;
              this.option.series[1].data[0].label.rich['f'].fontSize = 10;
              this.option.series[1].labelLine.length = 10;
              this.option.series[1].data[0].label.rich['m'].fontSize = 14;
              this.option.series[2].data[1].label.fontSize = 10
              this.option.series[2].labelLine.length = 25;
              this.option.series[2].data[1].label.rich.a.fontSize = 14
              this.option.series[2].data[1].label.rich.f.fontSize = 10
            }else{
              this.option.series[1].data[0].label.fontSize = 14;
              this.option.series[1].labelLine.length = 25;
              this.option.series[1].data[0].label.rich['f'].fontSize = 16;
              this.option.series[1].data[0].label.rich['m'].fontSize = 20;
              this.option.series[2].labelLine.length = 25;
              this.option.series[2].data[1].label.fontSize = 14;
              this.option.series[2].data[1].label.rich.a.fontSize = 20
              this.option.series[2].data[1].label.rich.f.fontSize = 16
            }
            this.chart.setOption(this.option);
        })
    },
    methods: {
         
        //展示创建的第三圆的外地length2
        showOtherLength2(){
          let sum =this.values + this.labels;
          let otherRatio = this.labels/sum;
          if(otherRatio === 0){
            return -15
          }else if(otherRatio < 0.0385){
            return 0
          }else if(otherRatio < 0.0654){
            return -0.55
          }else if(otherRatio < 0.0741){
            return -0.95
          }else if(otherRatio < 0.0909){
            return -1.1
          }else if(otherRatio < 0.0991){
            return -1.5
          }else if(otherRatio < 0.1304){
            return -2
          }else if(otherRatio < 0.20){
            return -3
          }else if(otherRatio < 0.2063){
            return -5
          }else if(otherRatio < 0.2701){
            return -7
          }else if(otherRatio < 0.3197){
            return -8
          }else if(otherRatio < 0.3750){
            return -9
          }else if(otherRatio < 0.4118){
            return -10
          }else if(otherRatio < 0.7222){
            return -8
          }else if(otherRatio < 0.7436){
            return -6
          }else if(otherRatio < 0.800){
            return -4
          }else if(otherRatio < 0.8701){
            return -2
          }else if(otherRatio < 0.9091){
            return -1
          }else if(otherRatio < 1){
            return 0
          }
        },

        //展示创建的第三个圆的本地length2
        showLocalLength2(){
           let sum =this.values + this.labels;
           let localRatio = this.values/sum;
           if(localRatio === 0){
             return -16
           }else if(localRatio < 0.0295){
             return 0
           }else if(localRatio < 0.0386){
             return -0.25
           }else if(localRatio < 0.0655){
             return -0.5
           }else if(localRatio < 0.0742){
             return -0.9
           }else if(localRatio < 0.0827){
             return -1.3
           }else if(localRatio < 0.0992){
             return -1.8
           }else if(localRatio < 0.1074){
             return -2
           }else if(localRatio < 0.1526){
             return -3
           }else if(localRatio < 0.1804){
             return -4
           }else if(localRatio < 0.2909){
             return -6
           }else if(localRatio < 0.3507){
             return -8
           }else if(localRatio < 0.7144){
             return -6
           }else if(localRatio < 0.7562){
             return -4
           }else if(localRatio < 0.8572){
             return -2
           }else if(localRatio < 0.8796){
             return -1
           }else if(localRatio < 1){
             return 0
           }
        },

        initChart(){
           if(!this.$refs[this.id]) return;
            this.chart = this.chart || this.$echarts.init(this.$refs[this.id]);
            this.chart.on("click",()=>{
              
            })
            this.option = {
                tooltip: {
                  //trigger: 'item',
                  trigger: 'none',
                  formatter: "{a} <br/>{b}{c} ({d}%)"
                },
                legend: {
                    x: 'center',
                    y: 'bottom',
                    data: ['rose3', 'rose5', 'rose6', 'rose7', 'rose8']
                },
                calculable: true,
                xAxis: {
                    max: 16,
                    show: false,
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    max: 16,
                    show: false,
                    splitLine: {
                        show: false
                    }
                },
                series: [
                  {
                    type: 'scatter',
                    zlevel: 30,
                    itemStyle: {
                        opacity: 1 // 控制 满意icon的 透明度
                    },
                    data: [
                        { // 外圈 点状圈
                            value: 8,
                            symbol: 'image://' + this.outerRing,
                            symbolSize: 160, 
                            symbolOffset: [0, 0]
                        }
                    ]
                  },
                  {
                    name: this.showFieldDriveType,//控制展示外地驶入驶出
                    type: "pie",
                    radius: [30, 60],
                    center: ["50%", "50%"],
                    labelLine:{
                      length: 25
                    },
                    data: [
                        // 第一个饼 ，小饼
                      {
                        // value: 30, //对应透明value第一个 小环大小 传值地方
                        value:this.labels,
                        name: "",
                        itemStyle: {
                          color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                            {
                              offset: 0,
                              color: "#FFEA00",
                            },
                            {
                              offset: 1,
                              color: "#8AE54A",
                            },
                          ]),
                        },
                        label: {
                          color: "rgba(255,255,255,255)",
                          fontSize: 14,
                          formatter: "{a}\n{m|{c}}\n{f|{d}%}",
                          padding: [25, 0,-30,25],
                          rich: {
                            m: {
                              color:'#D7FF1C',
                              fontSize: 20,
                              lineHeight: 26,
                            },
                            f: {
                              color: "#D7FF1C",
                              fontSize: 16,
                              lineHeight: 20,//可以控制换行文字间距
                            }
                          }
                        },
                      },                    
                      {
                        // value: 70, //小环剩余透明区域
                        value:this.values,
                        name: "rose2",
                        itemStyle: {
                          color: "transparent", 
                        },
                      },
                    ],
                  },
                  //   第二个 左边的圆，大圆
                  {
                    name: `${this.showLocalDriveType}`,
                    type: "pie",
                    radius: [30, 60],
                    center: ["50%", "50%"],
                    labelLine:{
                      length: 25
                    },
                    data: [
                      {
                        // value: 30, //大环透明区域
                        value:this.labels,
                        name: "",
                        itemStyle: {
                          color: "transparent",
                        },
                      },
                      {
                        // value: 70, //大环大小  传值地方
                        value:this.values,
                        name: "",
                        itemStyle: {
                          color: new this.$echarts.graphic.LinearGradient(1, 1, 0, 0, [
                            {
                              offset: 0,
                             // color: "#06d3cd",
                              color: '#42FFEB'
                            },
                            {
                              offset: 1,
                              color: "#46B6FF",
                            },
                          ]),
                        },
                        label: {
                          color: "rgba(255,255,255,255)",
                          fontSize: 14,
                          padding: [25, 25,-25,0],
                          formatter: "{a}\n{a|{c}}\n{f|{d}%}",
                          rich: {
                            a: {
                              color: "#42F9ED",
                              fontSize: 20,
                              lineHeight: 26,//可以控制换行文字间距
                            },
                            f: {
                              color: "#42F9ED",
                              fontSize: 16,
                              lineHeight: 20,//可以控制换行文字间距
                            }
                          },
                        },
                      },
                    ],
                  },
                //   第三个 自己创造的透明圆用于写icon
                  {
                    //小环
                    type: "pie",
                    radius: [30, 70],
                    center: ["50%", "50%"],
                    data: [
                      {
                        // value: 30, //小环大小 传小环大小的值
                        value:this.labels,
                        itemStyle: {
                          color: "transparent",
                        },
                        labelLine: {
                          show: false,
                          length:0,
                          length2:this.showOtherLength2(),

                        },
                        label: {
                          formatter: "{c|外}",
                          rich: {
                            c: {
                              color: "#fff",
                              fontSize: 20,
                              borderWidth: 3,
                              borderColor: 'rgba(125,130,135)',
                              backgroundColor: "#C5E725",
                              padding: [4,4,4,4],
                              borderRadius: [50]
                            },
                          },
                        },
                      },
                      {
                        // value: 70, //大环大小 传大环大小的值
                        value:this.values,
                        itemStyle: {
                          color: "transparent",
                        },
                        labelLine: {
                          show: false,
                          length:0,
                          length2:this.showLocalLength2()
                        },
                        label: {
                          formatter: "{c|本}",
                          rich: {
                            c: {
                              color: "#fff",
                              fontSize: 20,
                              borderWidth: 3,
                              backgroundColor: "#46B6FF",
                              padding: [4, 4, 4, 4],
                              borderRadius: [50],
                              borderColor: 'rgba(125,130,135)'
                            }
                          }
                        }
                      }
                    ]
                  }
                ],
              };

              if(this.$refs[this.id].clientWidth<300){
                this.option.series[1].data[0].label.fontSize = 10;
                this.option.series[1].data[0].label.rich['f'].fontSize = 10;
                this.option.series[1].labelLine.length = 20;
                this.option.series[1].data[0].label.rich['m'].fontSize = 14;

                this.option.series[2].data[1].label.fontSize = 10
                this.option.series[2].labelLine.length = 20;
                this.option.series[2].data[1].label.rich.a.fontSize = 14
                this.option.series[2].data[1].label.rich.f.fontSize = 10
              }else{
                this.option.series[1].data[0].label.fontSize = 10;
                this.option.series[1].labelLine.length = 20;
                this.option.series[1].data[0].label.rich['f'].fontSize = 16;
                this.option.series[1].data[0].label.rich['m'].fontSize = 20;
                this.option.series[2].labelLine.length = 20;
                this.option.series[2].data[1].label.fontSize = 10;
                this.option.series[2].data[1].label.rich.a.fontSize = 20
                this.option.series[2].data[1].label.rich.f.fontSize = 16
              }
              this.chart.setOption(this.option);
              this.chart.resize()
        }
    }
}
</script>
<style lang="scss">
    .chartass{ 
          width: 100%;
          height: 1.2rem;
          & > div{
            width: 100%!important;
          }
    }
</style>