<template>
    <div>
        <div :id="id" :ref="id" class="chart"></div>
    </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'
import {subStringFormatter} from '@/utils/echartsUtils'
export default {
    name: 'Qinbusine',
    mixins: [lifeCycle()],

    props: {
        id: {
            type: String,
            default: "Qinbusine"
        },
        labels: {
            type: Array,
            default: () => []
        },
        values: {
            type: Array,
            default: () => []
        },
        allTime:{
          type:Array,
          default:() => []
        },
        selectItem:{
            type: String,
            default: ''
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
            default: () => ['#2FE3EA', '#2FEA9C']
        },
        // height: {
        //     type: Number,
        //     default: 110
        // }
    },
    data(){
        return {
            chart: null,
            // maxArr: [],
            eData: []
        }
    },
    watch: {
        values: {
            handler: function (vals){
                // this.eData = vals
                // if(vals.length !== 0){
                    // this.maxArr = [...vals]
                // }else{
                    // this.maxArr = []
                // }
                this.initChart()
            }
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
                animationDuration: 1500,
                grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '20%',
                    top: '13%',
                    containLabel: true
                },
                tooltip: {
                    formatter: this.selectItem === '事项平均耗时' ? "{b0}:{c0}小时" : "{b0}:{c0}分钟",
                    confine: true,
                },
                xAxis: {
                    type: 'category',
                    data: this.labels,
                    axisTick: "none",
                    offset:5.5,
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        interval: 0,
                        margin: 5,
                        color: '#e2e9ff',
                        textStyle: {
                            fontSize: 12,
                            color: '#86B3B8'
                        },
                         formatter : subStringFormatter
                    }  
                },
                yAxis:[
                    {
                        // name: 'min',
                        // title: 'min',
                        minInterval:1,
                        type:'value',
                        axisLabel: {
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
                "dataZoom":[{
                       "show": true,
                       "height": 7,
                       maxSpan:30,
                       "xAxisIndex": [
                           0
                       ],
                       bottom: '1%',
                       "start": '0',
                       "end": 90,
                       handleSize: '110%',
                       handleStyle: {
                           color:'#d3dee5',
                       },
                       textStyle:{
                           color: "#fff"
                               },
                        borderColor:"#2FE3EA"
                    },{
                        "type":"inside",
                        "show": true,
                        "heght": 15,
                        "start": 0,
                        "end": 35
                    }
                    ],
                series: [
                    {
                        type: 'bar',
                        barWidth: 10,
                         data: this.values,
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
        height: 165px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>