<template>
    <div>
        <div :id="id" :ref="id" class="chart"> </div>
    </div>
</template>
<script>
import lifeCycle from '@/components/echarts/mixins/lifecycle'
import echarts from 'echarts'
import {subStringFormatter} from '@/utils/echartsUtils'
export default {
    name: 'newQinmanager',
    mixins: [lifeCycle()],
    props: {
        id: {
            type: String,
            default: "newQinmanager"
        },
        labels: {
            type: Array,
            default: () => []
        },
        values: {
            type: Array,
            default: () => []
        },
        goods: {
            type: Array,
            default: () =>[]
        },
        bads: {
            type: Array,
            default: () => []
        }
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
            let color = ["rgba(0,242,152,1)","rgba(50,253,246,1)","rgba(239,197,0,1)"]
            this.chart= this.chart || this.$echarts.init(this.$refs[this.id]) 
            // let chart = this.$echarts.init(this.$refs[this.id],{width:'880px',height:'300px'});
            this.chart.setOption ({
                 grid: {
                    top: "25%",
                    bottom: "0%",
                    left: "0%",
                    right: "0%",
                    width:"100%",
                    containLabel: true,
                },
                // backgroundColor:"#0f375f",
                tooltip: {
                    trigger: "axis",
                    confine:true,
                    formatter: '{a0}: {c0}%<br />{a1}: {c1}<br />{a2}: {c2}',
                    axisPointer: {
                    type: "shadow",
                    shadowStyle: {
                        //  color: '#ffffff',
                        // shadowColor: 'rgba(225,225,225,0.5)',
                        // shadowBlur: 80
                    }
                    }
                },
                legend: {
                    // data: this.labels,
                    icon: "circle",
                    // orient: 'horizontal',
                    color:color,
                    top: "2",
                    right:'10',
                    itemHeight:10,
                    textStyle: {
                    color: "rgba(250,250,250,0.6)",
                    fontSize: 12,    
                    }
                },
                xAxis: {
                    // data: [
                    // "城市更新\n单元计划\n审查申报\n业务",
                    // "城市更新\n项目建设\n用地的\n批准",
                    // "城市更新\n历史用地\n处置申报\n业务",
                    // "拆除重建\n城市更新\n项目实施",
                    // ],
                    data: this.labels,
                    axisLine: {
                     show: true, //隐藏X轴轴线
                        lineStyle: {
                            color: '#26D9FF',
                            // width:2
                        }
                    },
                    axisTick: {
                        show: false //隐藏X轴刻度
                    },
                    axisLabel: {
                        show: true,
                        interval: 0,
                        textStyle: {
                            color: "rgba(250,250,250,0.6)", //X轴文字颜色
                            fontSize: 12
                        },
                        formatter : subStringFormatter,
                    },
                    splitArea: {
                        show: false,
                        areaStyle: {
                            color: ["rgba(250,250,250,0.1)", "rgba(250,250,250,0)"]
                        }
                    }
                },
                yAxis: [{
                    type: "value",
                    // name: "亿元",
                    textStyle: {
                        color: "#ebf8ac",
                        fontSize: 40
                    },
                    splitLine: {
                        show: true,
                        lineStyle:{
                             color:"rgba(0,242,152,.5)"
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
                        fontSize: 12
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
                        show: true,
                        formatter: "{value} %", //右侧Y轴文字显示
                        textStyle: {
                            color: "rgba(250,250,250,0.6)",
                            fontSize: 12
                        }
                    },
                }
                ],
                series: [{
                    name: "办结率",
                    type: "line",
                    yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                    smooth: false, //平滑曲线显示
                    showAllSymbol: true, //显示所有图形。
                    symbol: "circle", //标记的图形为实心圆
                    symbolSize: 0, //标记的大小
                    itemStyle: {
                        //折线拐点标志的样式
                        color: "rgba(239,197,0,1)",
                        //   borderColor: "#3D7EEB",
                        //   width: 2,
                        //   shadowColor: "#3D7EEB",
                        //   shadowBlur: 4,
                    
                    },
                    lineStyle: {
                        color: "rgba(239,197,0,1)",
                        width:1,
                        shadowColor: "rgba(239,197,0,1)",
                        shadowBlur: 10,
                        shadowOffsetY: 15
                    },
                    areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "rgba(239,197,0,1)"
                    },
                        {
                        offset: 1,
                        color: "rgba(61,126,235, 0)"
                        }
                    ])
                    },
                    data: this.values[2]
                },
                {
                name: "当季办结",
                type: "bar",
                barWidth: 8,
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
                data: this.values[1]
                },
                {
                name: "事件总数",
                type: "bar",
                barWidth: 8,
                itemStyle: {
                    normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: 'rgba(50,253,246,1)'}, {offset: 1, color: 'rgba(50,253,246,1)'}]),
                    // borderColor:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: 'rgba(180,240,255,1)'}, {offset: 1, color: 'rgba(15,197,243,1)'}]),
                    borderWidth: 2
                    }
                },
                data: this.values[0]
                }
            ]
            }); 
        },
    },
}
</script>
<style lang="scss" scoped>
    .chart{
        height: 125px;
        margin-top: 10px;
    }
</style>