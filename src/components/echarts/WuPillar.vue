<template>
  <div>
    <div :id="id" :ref="id" class="chart"></div>
  </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'
export default {
    name: 'wu-piller',
    mixins: [lifeCycle()],
    props: {
        id: {
            type: String,
            default: "wu-piller"
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
                this.eData = vals
                if(vals.length !== 0){
                    this.maxArr = []
                    let max = Math.max(...vals)
                    vals.forEach(() => {
                        this.maxArr.push(max)
                    })
                }else{
                    this.maxArr = []
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
                animationDuration: 1500,
                grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '0%',
                    top: '0%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: "{b0}: {c0}"
                },
                xAxis: {
                    show: false,                //是否显示x轴
                    type: 'value',
                },
                yAxis:[ {
                    type: 'category',
                    inverse:true,               //让y轴数据逆向
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#86B3B8'       //y轴字体颜色
                        },
                        //定义富文本标签
                        rich: {
                            lg: {
                                fontWeight: 'bold',
                                fontSize: 12,       //字体默认12
                                color: '#08C',
                                padding: [0, 5, 0, 0]
                            },
                            title: {
                                color: '#fff',
                                fontWeight: 'lighter',
                            }
                        }
                    },
                    splitLine: {show: false},   //横向的线
                    axisTick: {show: false},    //y轴的端点
                    axisLine: {show: false},    //y轴的线
                    data: this.labels
                }, {
                    type: 'category',
                    inverse: true,
                    axisTick: 'none',
                    axisLine: 'none',
                    show: true,
                    axisLabel: {
                        textStyle: {
                            color:function(value,index){
                                if(index === 0) return '#FF3600';
                                if(index === 1) return '#FE8602';
                                if(index === 2) return '#EFC500';
                                if(index === 3) return '#7CFF00';
                                if(index === 4) return '#7CFF00';
                            },
                            fontSize: '12'
                        },
                    },
                    data: this.eData
                }],
                series: [
                    {
                        name: '数据内框',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                barBorderRadius: 30,
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: 'rgba(71,181,255,0.6)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(65,255,234,0.7)'
                                }]),
                            }
                        },
                        barWidth: 11,
                        data: this.eData
                    },
                    {
                        name: '外框',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                borderColor: 'rgba(115,255,254,1)',
                                borderWidth: 1,
                                barBorderRadius: 15,
                                color: 'rgba(102, 102, 102,0)'
                            },
                        },
                        barGap: '-100%',
                        z: 0,
                        barWidth: 11,
                        data: this.maxArr
                    },
                ]
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.chart {
  height: 95px;
  margin-top: 10px;
}
</style>