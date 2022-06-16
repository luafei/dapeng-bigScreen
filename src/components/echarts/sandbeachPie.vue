<template>
<div>
    <!-- <p style="fontSize:12px">{{driveInOut}}</p> -->
    <!-- <p>{{showlength}}</p> -->
    <div :id="id" :ref="id" class="chart"></div>
</div>
</template>

<script>
import lifeCycle from './mixins/lifecycle'
import { merge } from 'lodash'

export default {
    name: "wu-pie",
    mixins: [lifeCycle()],
    props: {
        id: {
            type: String,
            default: "wu-pie",
        },
        values: {
            type: Array,
            default: () => [5, 16, 11, 22]
        },
        labels: {
            type: Array,
            default: () => ['有使用权', '无使用权，不开放', '安全等问题不开放', '无使用权，开放']
        },
        typeName: {
           type:Array,
           default: () => []
        },
        showLegend: {
            type: Boolean,
            default: true
        },
        changeDriveType: {
            type: Number,
        },
        subtext: {
            type: String,
            default: '沙滩总数'
        },
        sourceOp: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            chart: null,
            maxArr: [],
            outerRing: require("@/assets/images/outer_ring.png"),
            showLocalDriveType: "本地车辆驶入",
            showFieldDriveType: "外地车辆驶入",
            length: 0,
            length2: 0,
            showlength: -2,
            beachSum: 0,
            eData: [],
            textStyleArr: [{
                    borderColor: 'rgba(50,253,246,1)',
                    backgroundColor: 'rgba(50,253,246,0.2)',
                },
                {
                    borderColor: 'rgba(33,158,254,1)',
                    backgroundColor: 'rgba(33,158,254,0.2)',
                },
                {
                    borderColor: 'rgba(206,232,31,1)',
                    backgroundColor: 'rgba(206,232,31,0.2)',
                },
                {
                    borderColor: 'rgba(0,242,152,1)',
                    backgroundColor: 'rgba(0,242,152,0.2)',
                }
            ]
        };
    },
    watch: {
        values: {
            handler(newVal) {
                this.eData = newVal;
                this.initChart();
            },
        },
        changeDriveType: {
            handler(newVal) {
                this.showLocalDriveType =
                    newVal === 0 ? "本地车辆驶入" : "本地车辆驶出";
                this.showFieldDriveType =
                    newVal === 0 ? "外地车辆驶入" : "外地车辆驶出";
                this.initChart();
            },
        },
    },
    mounted() {
        this.$nextTick(() => {
            // if(!this.values) return;
            this.initChart();
            this.chart.on("click", (params) => {
                this.$emit("clickPie", params);
            });
        });
    },
    methods: {
        initChart() {
            this.chart = this.chart || this.$echarts.init(this.$refs[this.id]);
            this.chart.on("click", () => {});
            this.chart.resize();
            let circlePointCenter = ['24%', '50%']
            this.beachSum = this.getTotal(this.values)

            function radiusComputed(num) {
                return [`${43+num}%`, `${50+num}`]
            }
            var dataStyle = {
                normal: {
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false,
                    },
                    shadowBlur: 40,
                    borderWidth: 10,
                    shadowColor: "rgba(0, 0, 0, 0)", //边框阴影
                },
            };
            var placeHolderStyle = {
                normal: {
                    color: "rgba(255,255,255,.1)",
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false,
                    },
                },
                emphasis: {
                    color: "#393d50",
                },
            };
            let colorArr = ['#32F9EE', '#0E9CFF', "#B2E907", "#00F298"]
            let legendData = this.filterLegendData(this.labels, this.values, this.typeName)
            function _getSeries() {
                let series = []
                for (let i = 0; i < this.values.length; i++) {
                    series.push({
                        name: "Line " + i + 1,
                        type: "pie",
                        clockWise: true,    
                        radius: radiusComputed(i * 8),
                        center: circlePointCenter,
                        itemStyle: dataStyle,
                        hoverAnimation: false,
                        label: {
                            borderRadius: "10",
                        },
                        data: [{
                                value: this.values[i],
                                name: legendData[i].name,
                                typeName: legendData[i].typeName,
                                itemStyle: {
                                    normal: {
                                        color: colorArr[i]
                                    },
                                },
                            },
                            // 显示半圆的效果
                            {
                                value: this.beachSum - this.values[i],
                                name: "",
                                tooltip: {
                                    show: false,
                                },
                                itemStyle: placeHolderStyle,
                            },
                        ],
                    })
                }
                return series
            }

            let option = {
                title: {
                    text: `${this.beachSum}个`,
                    subtext: this.subtext,
                    left: '23%',
                    top: '40%',
                    itemGap: 6,
                    textAlign: 'center',
                    textStyle: {
                        fontSize: 16,
                        color: '#fff',
                    },
                    subtextStyle: {
                        fontSize: 12,
                        color: '#fff',
                    }
                },
                tooltip: {
                    trigger: "item",
                    show: true,
                    confine: true,
                    formatter: function (params, ticket, callback) {
                        return params.data.typeName
                    },
                    backgroundColor: "rgba(0,0,0,0.7)", // 背景
                    padding: [8, 10], //内边距
                    extraCssText: "box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);", //添加阴影
                },
                legend: {
                    orient: "vertical",
                    icon: 'none',
                    left: "41%",
                    top: "middle",
                    itemGap: 20,
                    data: legendData,
                    show: this.showLegend,
                    textStyle: {
                        width: '100%',
                        padding: [7, 10, 5, 5],
                        borderColor: '#32FDF6',
                        borderWidth: 0.5,
                        borderRadius: 2,
                        color: "#fff",
                        fontSize: 10,
                    }
                },
                series: _getSeries.apply(this)
            };
            merge(option, this.sourceOp)
            this.chart.setOption(option);
        },
        filterLegendData(labels, values , typeName) {
            let result = []
            labels.forEach((item, index) => {
                result.push({
                    name: `${item},${values[index]}个(${(values[index]/this.beachSum*100).toFixed(1)}%)`,
                    typeName:`${item}：${typeName[index]}`,
                    textStyle: {
                        ...this.textStyleArr[index]
                    }
                })
            })
            return result
        },
        getTotal(arr) {
            return arr.length ? arr.reduce((acc, val) => acc += val) : 0
        }
    },
};
</script>

<style lang="scss" scoped>
.chart {
    width: 100%;
    height: 200px;

    &>div {
        width: 100% !important;
    }
}
</style>
