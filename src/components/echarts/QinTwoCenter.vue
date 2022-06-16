<template>
    <div>
        <div :id="id" :ref="id" class="chart"></div>
    </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'
import {subStringFormatter} from '@/utils/echartsUtils2'
import echarts from 'echarts'
export default {
    name: 'QinTwoTop',
    mixins: [lifeCycle()],

    props: {
        id: {
            type: String,
            default: "QinTwoTop"
        },
        labels: {
            type: Array,
            default:  () => []
        },
        values: {
            type: Array,
            default:  () => []
        },
        applyNums: {
            type: Array,
            default: ()=> []
        },
        internetApplyNums: {
            type: Array,
            default: () => []
        },
        barColors: {
            type: Array,
            default: () => ['#ba9f38', '#bcde4a']
        },
        barColors:{
            type: Array,
            default: () => ['#2FE3EA', '#2FEA9C']
        },
        // height: {
        //     type: Number,
        //     default: 110
        // }
    },
    data(){
        return {
            chart: null,
            maxArr: [],
            eData: []
        }
    },
    watch: {
            values: function (vals){
                this.eData = vals
                this.initChart()
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
            this.chart.setOption({
                animationDuration: 1500,
                grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '10%',
                    top: '17%',
                    containLabel: true
                },
                tooltip: {
                        trigger: "axis",
                        confine:true,
                        axisPointer: {
                        type: "shadow",
                        label: {
                            show: true
                        },
                        // formatter:'{b0}：{c0}'
                    }
                },
                legend: {
                    data: ["申请数","受理数",  "网上申报数"],
                    top: "0%",
                    icon: "circle",
                    right:'10%',
                    itemHeight:10,
                    textStyle: {
                    color: "rgba(250,250,250,0.6)",
                    fontSize: 12
                    }
                },
                xAxis: {
                    type: 'category',
                    data: this.labels,
                    axisTick: "none",
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        interval: 0,
                        margin: 10,
                        color: '#e2e9ff',
                        formatter : subStringFormatter,
                        textStyle: {
                            fontSize: 12,
                            color: '#86B3B8'
                        },
                    },
                },
                yAxis:[
                    {
                        name: '',
                        title: '个',
                        minInterval:1,
                        type:'value',
                        axisLabel: {
                            // formatter: this.yFormatter,
                            color: '#86B3B8',
                        },
                        axisLine: {
                            show: true,
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(0,242,152,.2)'
                            }
                        }
                    },
                    {
                        type: "value",
                        /*name: "同比",*/
                        nameTextStyle: {
                            color: "#ebf8ac",
                            fontSize: 16
                        },
                        position: "right",
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false,
                            // formatter: "{value} %", //右侧Y轴文字显示
                            textStyle: {
                                color: "rgba(250,250,250,0.6)",
                                fontSize: 16
                            }
                        }
                    }
                ],
                series: [
                    // {
                    //     data:  this.values,
                    //     type: 'bar',
                    //     barWidth: 24,
                    //     itemStyle: {
                    //         normal: {
                    //             // color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    //             //     offset: 0,
                    //             //     color: this.barColors[0]
                    //             // }, {
                    //             //     offset: 1,
                    //             //     color: this.barColors[1]
                    //             // }]),
                    //             color: function(params) {
                    //               var colorList = ['#43F5EE','#219EFE','#00F298'];
                    //               return colorList[params.dataIndex]
                    //             },
                    //             label:{
                    //               // 可在柱子内显示相应数量
                    //               // show:true,
                    //               // position:'top',
                    //               // formatter:'{b}\n{c}'
                    //             }
                    //         }
                    //     },
                    // }
                    {
                        name: "申请数",
                        type: "line",
                        yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                        smooth: false, //平滑曲线显示
                        showAllSymbol: true, //显示所有图形。
                        symbol: "circle", //标记的图形为实心圆
                        symbolSize: 0, //标记的大小
                        itemStyle: {
                            //折线拐点标志的样式
                            color: "#00F298",
                            //   borderColor: "#3D7EEB",
                            //   width: 2,
                            //   shadowColor: "#3D7EEB",
                            //   shadowBlur: 4,
                        
                        },
                        lineStyle: {
                            color: "#00F298",
                            width:1,
                            shadowColor: "#00F298",
                            shadowBlur: 4
                        },
                        areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: "rgba(0,242,152,.3)"
                        },
                            {
                            offset: 1,
                            color: "rgba(0,242,152,.5)"
                            }
                        ])
                        },
                        data: this.applyNums
                     },
                     {
                        name: "受理数",
                        type: "bar",
                        barWidth: 14,
                        itemStyle: {
                            normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: "rgba(0,242,152,1)"
                            },
                                {
                                offset: 1,
                                color: "rgba(0,242,152,1)"
                                }
                            ]),
                            // borderColor:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            //     offset: 0,
                            //     color: "rgba(160,196,225, 1)"
                            // },
                            //     {
                            //     offset: 1,
                            //     color: "rgba(61,126,235, 1)"
                            //     }
                            // ]),
                            // borderWidth: 2
                            }
                        },
                        data: this.values
                     },
                     {
                        name: "网上申报数",
                        type: "bar",
                        barWidth: 14,
                        itemStyle: {
                            normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: 'rgba(50,253,246,1)'}, {offset: 1, color: 'rgba(50,253,246,1)'}]),
                            // borderColor:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: 'rgba(180,240,255,1)'}, {offset: 1, color: 'rgba(15,197,243,1)'}]),
                            // borderWidth: 2
                            }
                        },
                        data: this.internetApplyNums
                     }
                ]
            })
        },
    },
}
</script>
<style lang="scss" scoped>
    .chart{
        height: 125px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>