<template>
    <div>
        <div :id="id" :ref="id" class="chart"></div>
    </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'

export default {
    name: 'wu-Bar-Two',
    mixins: [lifeCycle()],

    props: {
        id: {
            type: String,
            default: "wu-bar-two"
        },
        labels: {
            type: Array,
            default: () => ['01 葵涌收费站','02 土洋收费站','03 溪涌收费站','04 坪葵路','05 背仔角收费站']
        },
        values: {
            type: Array,
            default: () => []
        },
        height: {
            type: Number,
            default: 110
        }
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
                // if(vals.length !== 0){
                //     this.maxArr = []
                //     let max = Math.max(...vals)
                //     vals.forEach(() => {
                //         this.maxArr.push(max)
                //     })
                // }else{
                //     this.maxArr = []
                // }
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
                    // formatter: function (params) {
                    //     console.log(params); // 当我们想要自定义提示框内容时，可以先将鼠标悬浮的数据打印出来，然后根据需求提取出来即可
                    // }
                },
                grid: {
                    top: '25%',
                    right: '0',
                    left: '0',
                    bottom: '0',
                    containLabel: true
                },
                legend:{
                    data:[],
                    left:"35%",
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
                        type: 'line',
                        name:this.eData[key].name,
                        smooth: true,
                        data: this.eData[key].y,
                        barWidth: '4px',
                        symbolSize:5,
                        symbol:'circle',
                        itemStyle:{
                            normal:{
                                color:colorList[key],
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
    // .chart{
    //     height: 110px;
    // }
</style>