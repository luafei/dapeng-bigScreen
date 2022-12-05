<template>
    <div>
        <div :id="id" :ref="id" class="chart"> </div>
    </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'
export default {
    name: 'Wu-Bar-Vehicle',
    mixins: [lifeCycle()],
    props: {
        id: {
            type: String,
            default: "wu-bar-vehicle"
        },
        labels: {
            type: Array,
            default: () => ['01 葵涌收费站','02 土洋收费站','03 溪涌收费站','04 坪葵路','05 背仔角收费站']
        },
        values: {
            type: Array,
            default: () => [2000, 800, 600, 400, 200]
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
                if(vals.length !== 0){
                    this.maxArr = []
                    let max = Math.max(...vals)
                    vals.forEach(() => {
                        this.maxArr.push({
                            trueValue:max,
                            value:100
                        })
                    })
                    this.eData = vals.map((item)=>{
                        let value = (item / this.maxArr[0].trueValue).toFixed(2) * 100;
                        return {
                            value:value,
                            trueValue:item
                        }
                    })
                }else{
                    this.eData = this.maxArr = [];
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
            this.chart = this.chart || this.$echarts.init(this.$refs[this.id])
            this.chart.resize({height:this.height});
            const option = {
                grid: {
                    left: '-90px', // 距离dom间距
                    right: '3px',
                    top: '0%',
                    bottom: '1%',
                    containLabel: true,
                },
                xAxis: [{
                    type: "value",
                    axisPointer: {
                        type: "shadow"
                    },
                    // 横坐标 分割线等取消显示
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false,

                    }
                }],
                yAxis: [{
                        type: "category",
                        inverse: true,
                        axisLabel: {
                            verticalAlign: "bottom",
                            align: "left",
                            padding: [0, 10, 4, 6],
                            textStyle: {
                                fontSize: 14,
                                color: "white",
                                fontFamily: "Source Han Sans CN"
                            },
                            formatter(value,index) {
                                index += 1;
                                return value;
                                // return `{rank${index}|${index}} {text1|${value}}`;

                            },
                        },
                        // 纵坐标数据
                        data: this.labels,
                        yAxisIndex: 0,
                        // 横坐标 分割线等取消显示
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        }
                    },
                    {
                        type: "category",
                        inverse: true,
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            inside: false,
                            verticalAlign: "bottom",
                            padding: [0, 10, -22, -5],
                            lineHeight: "40",
                            textStyle: {
                                fontSize: 12,
                                color: "white",
                                fontFamily: "SourceHanSansCN-Regular"
                            },
                            formatter:  (val,key) => {
                                if(this.eData[key]){
                                    return `${this.eData[key].trueValue}辆`
                                }else{
                                    return '0辆'
                                }
                            }
                        },
                        // 统计的总量 用纵坐标模拟
                        data: this.eData,
                    },

                ],
                series: [
                    {
                        show: true,
                        type: 'pictorialBar',
                        symbol: 'fixed',
                        symbolSize: [2, 10],
                        symbolMargin: 1,
                        symbolRepeat: 'repeat',
                        barWidth: 6, // 统计条宽度
                        itemStyle: {
                            normal: {
                                color: {
                                    colorStops: [{
                                            offset: 0,
                                            color: '#57E9FF', // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: '#4BEBBB', // 100% 处的颜色
                                        },
                                    ],
                                    globalCoord: false, // 缺省为 false
                                }
                            },
                        },
                        z: 3,
                        data: this.eData,
                    },
                    {
                        show: true,
                        type: 'pictorialBar',
                        symbol: 'fixed',
                        symbolSize: [2, 10],
                        symbolMargin: 1,
                        symbolRepeat: 'repeat',
                        barGap: '-100%',
                        barWidth: 6, // 统计条宽度
                        itemStyle: {
                            normal: {
                                color: '#aaa',
                            },
                        },
                        z: 1,
                        data: this.maxArr,

                    }
                ]
            };
            this.chart.setOption(option)
        },
    },
}
</script>
<style lang="scss" scoped>
    .chart{
        height: 157px;
        margin-top: 10px;
    }
</style>