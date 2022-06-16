<template>
    <div>
        <!--备案车辆企业  -->
        <div :id="id" :ref="id" class="chart"></div>
    </div>
</template>
<script>
import lifeCycle from '@/components/echarts/mixins/lifecycle'
import {subStringFormatter} from '@/utils/echartsUtils'

export default {
    name: 'Record',
    mixins: [lifeCycle()],

    props: {
        id: {
            type: String,
            default: "Record"
        },
        labels: {
            type: Array,
            default: () => ['深圳市新达源物流有限公司','深圳市九四三建设工程有限公司','深圳市国汇中天运输有限公司','深圳市坤桥实业有限公司']
        },
        values: {
            type: Array,
            default: () => [2000, 800, 600, 400, 100]
        },
        // yFormatter: {
        //     type: Function,
        //     default: function(val){
        //         if(val===0){
        //             return "个"
        //         }else{
        //             return val;
        //         }
        //     }
        // },
        barColors: {
            type: Array,
            default: () => ['#458886', '#5ebc88']
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
            eData: [],
            // yDataArr:[90,20,40,60]
        }
    },
    watch: {
        values: {
            handler: function (vals){
                this.eData = vals
                if(vals.length !== 0){
                    this.maxArr = [...vals]
                }else{
                    this.maxArr = []
                }
                this.initChart()
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart()
            this.chart.on('click', (params) => {
                this.$emit('onClick', params)
                // console.log(params,'是什么');
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
                    bottom: '0%',
                    top: '8%',
                    // height:"88px",
                    containLabel: true
                },
                tooltip: {
                    formatter: "{b0}: {c0}辆",
                    confine: true
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
                        textStyle: {
                            fontSize: 12,
                            color: '#86B3B8'
                        },
                         formatter : subStringFormatter,
                    },
                },
                yAxis:[
                    {
                        name: '个',
                        title: '个',
                        minInterval:1,
                        type:'value',
                        axisLabel: {
                            formatter: '{value}辆' ,
                            color: '#86B3B8',
                        },
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(0,242,152,.2)'
                            }
                        },
                    }
                ],
                series: [
                    {
                        data: this.eData,
                        type: 'bar',
                        barWidth: '20%',//柱子宽度
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
                        },
                    }
                ]
            })
        },
    },
}
</script>
<style lang="scss" scoped>
    .chart{
        height: 160px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>