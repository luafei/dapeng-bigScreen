<template>
    <div>
        <div :id="id" :ref="id" class="chart"></div>
    </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'

export default {
    name: 'Qinsand',
    mixins: [lifeCycle()],

    props: {
        id: {
            type: String,
            default: "Qinsand"
        },
        labels: {
            type: Array,
            default: () => ['01 葵涌收费站','02 土洋收费站','03 溪涌收费站','04 坪葵路','05 背仔角收费站']
        },
        values: {
            type: Array,
            default: () => [2000, 800, 600, 400, 100]
        },
        yFormatter: {
            type: Function,
            default: function(val){
                if(val===0){
                    return "个"
                }else{
                    return val;
                }
            }
        },
        barColors: {
            type: Array,
            default: () => ['#ba9f38', '#bcde4a']
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
                this.eData = vals
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
                    bottom: '0%',
                    top: '7%',
                    height:"88px",
                    containLabel: true
                },
                tooltip: {
                    formatter: "{b0}: {c0}%"
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
                            fontSize: 10,
                            color: '#86B3B8'
                        },
                         formatter : function(params){
                   var newParamsName = "";// 最终拼接成的字符串
                            var paramsNameNumber = params.length;// 实际标签的个数
                            var provideNumber = 4;// 每行能显示的字的个数
                            var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                            /**
                             * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                             */
                            // 条件等同于rowNumber>1
                            if (paramsNameNumber > provideNumber) {
                                /** 循环每一行,p表示行 */
                                for (var p = 0; p < rowNumber; p++) {
                                    var tempStr = "";// 表示每一次截取的字符串
                                    var start = p * provideNumber;// 开始截取的位置
                                    var end = start + provideNumber;// 结束截取的位置
                                    // 此处特殊处理最后一行的索引值
                                    if (p == rowNumber - 1) {
                                        // 最后一次不换行
                                        tempStr = params.substring(start, paramsNameNumber);
                                    } else {
                                        // 每一次拼接字符串并换行
                                        tempStr = params.substring(start, end) + "\n";
                                    }
                                    newParamsName += tempStr;// 最终拼成的字符串
                                }

                            } else {
                                // 将旧标签的值赋给新标签
                                newParamsName = params;
                            }
                            //将最终的字符串返回
                            return newParamsName
                }
                    },
                },
                yAxis:[
                    {
                        name: '个',
                        title: '个',
                        minInterval:1,
                        type:'value',
                        axisLabel: {
                            formatter: this.yFormatter,
                            color: '#86B3B8',
                        },
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(0,242,152,.2)'
                            }
                        }
                    }
                ],
                series: [
                    {
                        data: this.eData,
                        type: 'bar',
                        barWidth: 24,
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
        height: 107px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>