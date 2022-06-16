<template>
    <div>
        <div :id="id" :ref="id" class="chart"></div>
    </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'
import { filterDate } from '@/utils/echartsUtils'
export default {
    name: 'QinVehicleThree',
    mixins: [lifeCycle()],
    props: {
        id: {
            type: String,
            default: "QinVehicleThree"
        },
        labels: {
            type: Array,
            default:  []
        },
        values: {
            type: Array,
            default: []
        },
        barColors:{
            type: Array,
            default: () => ['#2FE3EA', '#2FEA9C']
        },
        timeType: {
            type: String,
            default: ''
        }
        // height: {
        //     type: Number,
        //     default: 110
        // }
    },
    data(){
        return {
            chart: null,
            // maxArr: [],
            eData: [],
        }
    },
    watch: {
        values: {
            handler: function (vals){
                this.eData = vals
                this.initChart()
            },
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart()
            this.chart.on('click', (params) => {
                this.$emit('onClick', params)
            });
        })
    },
    methods: {
        initChart(){
            this.chart = this.chart || this.$echarts.init(this.$refs[this.id])
            this.chart.resize({height:this.height});
            const option = {
                tooltip: {
                    confine:true,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                },
                grid: {
                    top: '20%',
                    right: '0',
                    left: '0',
                    bottom: '6%',
                    // height:'100px',
                    containLabel: true
                },
                legend:{
                  show:false,
                    data:[],
                    left:"30%",
                    right:0,
                    icon: "circle",
                    itemWidth: 8,  // 设置宽度
                    itemHeight: 4, // 设置高度
                    itemGap: 1, // 设置间距
                    itemStyle:{
                        fontSize:4
                    },
                    textStyle: { //图例文字的样式
                            color: '#fff',
                            fontSize: 10
                        },
                    y:"top"
                },
                xAxis: [{
                    type: 'category',
                    offset:0,
                    data: this.labels,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,0.12)',
                        }
                    },
                    axisLabel: {
                        show:true,
                        interval:0,
                        margin: 10,
                        color: '#2FE3EA',
                        textStyle: {
                            fontSize: 12,
                            color: '#ffffff'
                        },
                        formatter: (value, index) => {
                            return filterDate(value, this.timeType)
                        }
                    },
                }],
                yAxis: [{
                    // name: '件',
                    minInterval:1,
                    axisLabel: {
                        formatter: '{value}',
                        color: '#86B3B8',
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(44,242,152,.2)'
                        }
                    },
                    splitLine: {
                            lineStyle: {
                                color: 'rgba(0,242,152,.2)'
                            }
                        }
                }],
                "dataZoom":[{
                       "show": true,
                       "height": 7,
                       maxSpan:50,
                       "xAxisIndex": [
                           0
                       ],
                       bottom: '1%',
                       "start": '100',
                       "end": 60,
                       handleSize: '110%',
                       handleStyle: {
                           color:'#d3dee5',
                       },
                       textStyle:{
                           color: "#fff"
                               },
                        borderColor:"#2FE3EA"
                    },{
                        "type":"inside",
                        "show": true,
                        "heght": 15,
                        "start": 0,
                        "end": 35
                    }
                    ],
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(0,242,152,.2)'
                        },
                    },  
                series: [
                    {
                    name:"总体业务量",
                    type:"bar",
                    barWidth: "30%",
                    data: this.values,
                     itemStyle: {
                       normal: {
                            color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: this.barColors[0]
                            }, {
                                offset: 1,
                                color: this.barColors[1]
                            }]),
                        }
                    }
                }
                ]
            };
            // const colorList = ["#00f298","#32fdf6","#efc500","#219efe"]
            // if(res.data.data.length > 0){
            //     for (const key in this.eData) {
            //         option.legend.data.push(this.eData[key].x);
            //         var color = Math.round(Math.random()*10);
            //         option.series.push({
            //             type: 'bar',
            //             name:this.eData[key].x,
            //             smooth: true,
            //             data: this.eData[key].y,
            //             barWidth: '4px',
            //             symbolSize:5,
            //             symbol:'circle',
            //             itemStyle:{
            //                 normal:{
            //                     color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //                         offset: 0,
            //                         color: 'rgba(47,234,156,1)' // 0% 处的颜色
            //                     }, {
            //                         offset: 1,
            //                         color: 'rgba(47,227,234,1)' // 100% 处的颜色
            //                     }], false),
            //                     barBorderRadius:[10, 10, 0, 0],
            //                 }
            //             }
            //         })
            //     }
            // }
            this.chart.setOption(option);
        }
    },
}
</script>
<style lang="scss" scoped>
    .chart{
        height: 165px;
    }
</style>