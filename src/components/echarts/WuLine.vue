<template>
    <div>
        <div :id="id" :ref="id" class="chart"></div>
    </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'

export default {
    name: 'wu-line',
    mixins: [lifeCycle()],
    props: {
        id: {
            type: String,
            default: "wu-line"
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
    watch:{
        values:{
            handler(newVal){
                this.eData = newVal
                this.initChart()
            }
        }
    },
    data(){
        return {
            chart: null,
            eData: []
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart()
            this.chart.on('click', (params) => {
                this.$emit('onClick', params)
            })
        })
    },
    methods: {
        initChart(){
            this.chart = this.chart || this.$echarts.init(this.$refs[this.id])
            var option = {
                color: ["#69f1ff"],
                /* 鼠标悬浮时显示数据 */
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                grid: {
                    top: 12,
                    bottom: '0',
                    left: '0',
                    right: '0',
                    show:'true',
                    borderWidth:'0',
                    containLabel: true
                },
                xAxis: {
                    type: "category",
                    data: this.labels,
                    //设置轴线的属性
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "rgba(0,242,152,.3)"
                        }
                    },
                    //调整x轴的lable
                    axisLabel: {
                        textStyle: {
                            fontSize: 12, // 让字体变小
                            color: "#86B3B8"
                        }
                    },
                    axisTick: {
                        show: true,
                        alignWithLabel: true
                    }
                },
                yAxis: {
                    name: "个",
                    nameTextStyle: {
                        color: "#86B3B8",
                        fontSize: 14,
                        align: 'left',
                        padding: [0, 0, 5, 0]
                    },
                    type: "value",
                    // 控制网格线是否显示
                    splitLine: {
                        show: true,
                        //  改变轴线颜色
                        lineStyle: {
                            // 使用深浅的间隔色
                            color: 'rgba(0,242,152,.3)'
                        }
                    },
                    //设置轴线的属性
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#3d5269"
                        }
                    },
                    //调整x轴的lable
                    axisLabel: {
                        textStyle: {
                            fontSize: 12, // 让字体变小
                            color: "#86B3B8"
                        }
                    }
                },
                /* 数据配置，若有多条折线则在数组中追加{name: , data: } */
                series: []
            };
            if(this.eData.length > 0){
                for (const key in this.eData) {
                    var color = Math.round(Math.random()*10);
                    option.series.push({
                        name:this.eData[key].name,
                        smooth: true,
                        data: this.eData[key].y,
                        type: "line",
                        symbol: "circle",
                        // 设置折点大小
                        symbolSize: 6,
                        // 设置为光滑曲线
                        smooth: false,
                        itemStyle: {
                            //折线拐点标志的样式
                            color: "#00F298"
                        },
                        areaStyle: {
                            normal: {
                                type: "default",
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,
                                    [{
                                            offset: 0,
                                            color: "rgba(0,242,152,0.5)" // 区域颜色
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(0,242,152,0.19)' // 区域颜色
                                        }
                                    ],
                                    false
                                ),
                                opacity: 0.4
                            }
                        }
                    })
                }
            }
            this.chart.setOption(option);
        }
    },
}
</script>
<style lang="scss" scoped>
    .chart{
        height: 120px;
        // width: 20.89rem;
        // height: 6.88rem;
        // margin-top: 0.4rem;
    }
</style>