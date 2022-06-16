<template>
    <div>
        <div :id="id" :ref="id" class="chart"> </div>
    </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'
export default {
    name: 'WuBarBlocks',
    mixins: [lifeCycle()],
    props: {
        id: {
            type: String,
            default: "wu-bar"
        },
        labels: {
            type: Array,
            default: () => ['01 葵涌收费站','02 土洋收费站','03 溪涌收费站','04 坪葵路','05 背仔角收费站']
        },
        values: {
            type: Array,
            default: () => [2000, 800, 600, 400, 200]
        },
        allTime:{
            type:Array,
            default:()=>[]
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
                this.initChart()
            },
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart()
            this.chart.on('click', (params) => {
                let { componentType } = params
                if(componentType === "yAxis"){
                    this.$emit('onClickBarYaxis', params)
                }else {
                    this.$emit('onClick', params)
                }
            });
        })
    },
    methods: {
        initChart(){
            if(!this.$refs[this.id])return;
            this.chart = this.chart || this.$echarts.init(this.$refs[this.id])
            this.chart.resize({height:this.height});
            const options = {
                color: [
                    "#00f298",
                    "#32fdf6",
                    "#efc500",
                ],
                grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '0%',
                    top: '7%',
                    containLabel: true
                },
                legend: {
                    
                    data: [
                        {
                            name: "危化品车辆",
                            icon: "circle"
                        },
                        {
                            name: "泥头车",
                            icon: "circle"
                        },
                        {
                            name: "其它",
                            icon: "circle"
                        }
                    ],
                    left:"right",
                    right:0,
                    icon: "circle",
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
                    y:"top"
                },
                grid: {
                    left: "4%",
                    right: "8%",
                    bottom: "10%",
                    top: "14%",
                    containLabel: true
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    },
                    textStyle: {
                        align: 'left'
                    }
                },

                xAxis: [{
                    type: "category",
                    data: [
                        // "深葵路",
                        // "坪西路",
                        // "鹏飞路",
                        // "葵鹏路",
                        // "坪葵路"
                    ],
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#86B3B8",
                            fontSize: 10
                        },
                        formatter: "{value}"
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#86B3B8'
                        }
                    },
                }],
                yAxis: [{
                    type: "value",
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#DFDFDF",
                            fontSize: 12
                        }
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
                // series: []
                series: [{
                        name: "危化品车辆",
                        type: "bar",
                        stack: "总量",
                        barWidth: "45%",
                        data: [
                            // 110,
                            // 70,
                            // 90,
                            // 89,
                            // 27
                        ]
                    },
                    {
                        name: "泥头车",
                        type: "bar",
                        stack: "总量",
                        barWidth: "70%",
                        data: [
                            // 120,
                            // 140,
                            // 160,
                            // 89,
                            // 27
                        ]
                    },
                    {
                        name: "其它",
                        type: "bar",
                        stack: "总量",
                        barWidth: "70%",
                        data: [
                            // 90,
                            // 160,
                            // 70,
                            // 89,
                            // 27
                        ]
                    },
                ]
            }
            let seriesData = {}
            this.eData.forEach(item => {
                options.xAxis[0].data.push(item.roadName);//图例数组 名字需和series的name相同
                for(let key in item){
                    if(key == 'dangerNum' || key == 'dumpNum' || key == 'otherNum' ) {
                        if(seriesData[key]){
                            seriesData[key].push(item[key])
                        }else {
                            seriesData[key] = [item[key]]
                        }
                    }
                }
            })
            options.series[0].data = seriesData.dangerNum
            options.series[1].data = seriesData.dumpNum
            options.series[2].data = seriesData.otherNum
            this.chart.setOption(options)
        },
    },
}
</script>
<style lang="scss" scoped>
    .chart{
        height: 130px;
        margin-top: 10px;
    }
</style>