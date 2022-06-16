<template>
    <div>
        <div :id="id" :ref="id" class="chart"> </div>
    </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'
import echarts from 'echarts'
import {subStringFormatter} from '@/utils/echartsUtils'
export default {
    name: 'QinTherrdowntwo',
    mixins: [lifeCycle()],
    props: {
        id: {
            type: String,
            default: "QinTherrdowntwo"
        },
        labels: {
            type: Array,
            default: () => ['葵涌收费站','土洋收费站','溪涌收费站','坪葵路','背仔角收费站']
        },
        values: {
            type: Array,
            default: () => [2000, 800, 600, 400, 200]
        },
        applyNums: {
            type: Array,
            default: ()=> []
        },
        internetApplyNums: {
            type: Array,
            default: () => []
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
        values: {
            handler: function (vals){
                this.eData = vals
                if(vals.length !== 0){
                    this.maxArr = []
                    let max = Math.max(...vals)
                    vals.forEach(() => {
                        this.maxArr.push(max)
                    })
                }
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
            this.chart= this.chart || this.$echarts.init(this.$refs[this.id]) 
            this.chart.setOption ({
                grid: {
                    top: "20%",
                    bottom: "20%",
                    right:"0%",
                    left:"5%",
                    containLabel: true,
                },
                // backgroundColor:"#0f375f",
                tooltip: {
                    trigger: "axis",
                    confine:true,
                    axisPointer: {
                    type: "shadow",
                    label: {
                        show: false
                    }
                    }
                },
                legend: {
                    data: [ "申请数","受理数", "网上申报数"],
                    icon: "circle",
                    itemHeight:10,
                    top: "0%",
                    right:'10%',
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
                         show: true,
                        color: '#e2e9ff',
                        formatter : subStringFormatter,
                        textStyle: {
                            fontSize: 12,
                            color: '#86B3B8'
                        },
                    },
                },
                yAxis: [
                    {
                        type: "value",
                        /*name: "亿元",*/
                        nameTextStyle: {
                            color: "#ebf8ac",
                            fontSize: 12
                        },
                        splitLine: {
                            show: true,
                            lineStyle:{
                                color:"rgba(0,242,152,.1)"
                            }
                        },
                        axisTick: {
                            show: true
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                // color: '#26D9FF',
                                // width:2
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "rgba(250,250,250,0.6)",
                                fontSize: 12
                            }
                        },

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
                        color: "rgba(0,242,152,.5)",
                        //   borderColor: "#3D7EEB",
                        //   width: 2,
                        //   shadowColor: "#3D7EEB",
                        //   shadowBlur: 4,
                    
                    },
                    // lineStyle: {
                    //     color: "#00F298",
                    //     width:1,
                    //     shadowColor: "#00F298",
                    //     shadowBlur: 4
                    // },
                    areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "rgba(0,242,152,.5)"
                    },
                        {
                        offset: 1,
                        color: "rgba(0,242,152,.3)"
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
            }); 
        },
    },
}
</script>
<style lang="scss" scoped>
    .chart{
        height: 170px;
        margin-top: 10px;
    }
</style>