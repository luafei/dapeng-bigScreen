<template>
    <div>
        <div :id="id" :ref="id" class="chart"></div>
    </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'
export default {
    name: 'wu-line-r',
    mixins: [lifeCycle()],
    props: {
        id: {
            type: String,
            default: "wu-line-r"
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
                        shadowStyle:{
                            color:new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(255,255,255,.08)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(29,235,255,.08)' // 100% 处的颜色
                                }], false),
                        },
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
                    data:[],
                    left:"right",
                    right:0,
                    icon: "circle",
                    top:12,
                    bottom:8,
                    itemWidth: 8,  // 设置宽度
                    itemHeight: 6, // 设置高度
                    itemGap: 2, // 设置间距
                    itemStyle:{
                        fontSize:4
                    },
                    textStyle: { //图例文字的样式
                            color: '#fff',
                            fontSize: 10
                        },
                    // y:"top"
                },
                xAxis: [{
                    type: 'category',
                    data: this.labels,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,0.12)'
                        }
                    },
                    axisLabel: {
                        margin: 10,
                        interval: 'auto',
                        color: '#e2e9ff',
                        textStyle: {
                            fontSize: 10,
                            color: '#86B3B8'
                        },
                    },
                }],
                yAxis: [{
                    name: '个',
                    minInterval:1,
                    splitNumber:3,

                    axisLabel: {
                        formatter:(val)=>{
                                if(val===0){
                                    return "个"
                                }else{
                                    return val;
                                }
                            },

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
                    option.legend.data.push(this.eData[key].name);//图例数组 名字需和series的name相同
                    var color = Math.round(Math.random()*10);
                    option.series.push({
                        type: 'line',
                        name:this.eData[key].name,
                        smooth: true,//是否平滑
                        data: this.eData[key].y,
                        smooth:'true',
                        symbol:'circle',
                        symbolSize:5,
                        itemStyle:{
                            normal:{
                                color:colorList[key],
                            }
                        }
                    })
                }
            }
            this.chart.setOption(option)
        },
    },
}
</script>
<style lang="scss" scoped>
    .chart{
        height: 165px;
        margin-top: 8px;
        margin-bottom: 10px;
        // width: 20.89rem;
        // height: 6.88rem;
        // margin-top: 0.4rem;
    }
</style>