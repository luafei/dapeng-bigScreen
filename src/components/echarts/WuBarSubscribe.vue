<template>
    <div>
        <div :id="id" :ref="id" class="chart"></div>
    </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'

export default {
    name: 'Wu-Bar-Subscribe',
    mixins: [lifeCycle()],
    props: {
        id: {
            type: String,
            default: "wu-bar-subscribe"
        },
        labels: {
            type: Array,
            default: () => ['01 葵涌收费站','02 土洋收费站','03 溪涌收费站','04 坪葵路','05 背仔角收费站']
        },
        values: {
            type: Array,
            default: () => [1000, 800, 600, 400, 200]
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
            this.chart = this.chart || this.$echarts.init(this.$refs[this.id])
            this.chart.resize({height:this.height}); 
            this.chart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    top: '7%',
                    right: '0',
                    left: '0',
                    bottom: '0',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: this.labels,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,0.12)',
                        }
                    },
                    axisLabel: {
                        margin: 10,
                        color: '#e2e9ff',
                        textStyle: {
                            fontSize: 10,
                            color: 'rgba(255,255,255,.8)'
                        },
                    },
                }],
                yAxis: [{
                    name: '个',
                    axisLabel: {
                        formatter: '{value}',
                        color: '#86B3B8',
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(0,242,152,.2)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(0,242,152,.2)'
                        }
                    }
                }],
                series: [{
                    type: 'pictorialBar',
                    symbol: 'fixed',
                    symbolSize: [4, 1],
                    symbolMargin: 1,
                    symbolRepeat: 'repeat',
                    data: this.eData,
                    barWidth: '6px',
                    itemStyle: {
                        normal: {
                            color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: 'rgba(47,227,234,0.5)' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: 'rgba(47,234,156,0.81)' // 100% 处的颜色
                            }], false),
                        }
                    }
                }]
            })
        },
    },
}
</script>
<style lang="scss" scoped>
    .chart{
        height: 110px;
    }
</style>