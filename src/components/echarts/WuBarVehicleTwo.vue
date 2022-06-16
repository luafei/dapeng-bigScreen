<template>
    <div>
        <div :id="id" :ref="id" class="chart"></div>
    </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'

export default {
    name: 'wu-Bar-vehicle-two',
    mixins: [lifeCycle()],
    props: {
        id: {
            type: String,
            default: "wu-bar-vehicle-two"
        },
        labels: {
            type: Array,
            default: () => []
        },
        values: {
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
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                },
                grid: {
                    top: '25%',
                    right: '0',
                    left: '0',
                    bottom: '0',
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
                            color: '#ffffff'
                        },
                    },
                }],
                yAxis: [{
                    name: '个',
                    minInterval:1,
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
                series: []
            };
            const colorList = ["#00f298","#32fdf6","#efc500","#219efe"]
            if(this.eData.length > 0){
                for (const key in this.eData) {
                    option.legend.data.push(this.eData[key].name);
                    var color = Math.round(Math.random()*10);
                    option.series.push({
                        type: 'bar',
                        name:this.eData[key].name,
                        smooth: true,
                        data: this.eData[key].y,
                        barWidth: '4px',
                        symbolSize:5,
                        symbol:'circle',
                        itemStyle:{
                            normal:{
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(47,234,156,1)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(47,227,234,1)' // 100% 处的颜色
                                }], false),
                                barBorderRadius:[10, 10, 0, 0],
                            }
                        }
                    })
                }
            }
            this.chart.setOption(option);
        },
    },
}
</script>
<style lang="scss" scoped>
    .chart{
        height: 140px;
    }
</style>