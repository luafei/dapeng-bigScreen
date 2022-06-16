<template>
  <div>
    <div :id="id" :ref="id" class="chart"></div>
  </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'
export default {
    name: "EvaluationAnalyzeLine",
    mixins: [lifeCycle()],
    props: {
        id: {
            type: String,
            default: "EvaluationAnalyzeLine",
        },
        x: {
            type: Array,
            default: () => []
        },
        series: {
            type: Array,
            default: () => []
        },
        yFormatter: {
            type: Function,
            default: function(val){
                return val
            }
        }
    },
    data(){
        return {
            
        }
    },
    watch: {
        series(){
            this.initChart();
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart();
            this.chart.on("click", (params) => {
                let { componentType } = params;
                if (componentType === "yAxis") {
                this.$emit("onClickBarYaxis", params);
                } else {
                this.$emit("onClick", params);
                }
            });
        });
    },
    methods: {
        initChart() {
            if (!this.$refs[this.id]) return;
            this.chart = this.chart || this.$echarts.init(this.$refs[this.id]);
            const option = {
                title: {
                    left: "18px",
                    top: "0",
                    textStyle: {
                        color: "#999",
                        fontSize: 12,
                        fontWeight: '400'
                    }
                },
                color: ['#73A0FA', '#73DEB3', '#FFB761'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line',
                        crossStyle: {
                            color: '#999'
                        },
                        lineStyle: {
                            type: 'dashed'
                        }
                    }
                },
                grid: {
                    left: '0',
                    right: '0',
                    bottom: '0',
                    top: '20',
                    containLabel: true
                },
                // legend: {
                //     data: ['订单总笔数', '钱包笔数', '借呗笔数'],
                //     orient: 'horizontal',
                //     icon: "rect",
                //     show: true,
                //     left: 20,
                //     top: 25,
                // },
                xAxis: {
                    type: 'category',
                    data: this.x,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        interval: 0,
                        textStyle: {
                            color: "rgba(134,179,184,1)",
                        },
                    },
                },
                yAxis: {
                    type: 'value',
                    max: 100,
                    axisLabel: {
                        color: 'rgba(134,179,184,1)',
                        textStyle: {
                            fontSize: 12
                        },
                        formatter: this.yFormatter
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(0,242,152,.2)",
                        },
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                },
                series: []
            };
            option.series = this.series
            this.chart.setOption(option)
        }
    }
}
</script>
<style lang="scss" scoped>
.chart {
  height: 150px;
  margin-top: 10px;
}
</style>