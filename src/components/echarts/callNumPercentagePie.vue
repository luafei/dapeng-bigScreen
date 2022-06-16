<template>
  <div>
    <div :id="id" :ref="id" class="chart"></div>
  </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'
export default {
    name: "callNumPercentagePie",
    mixins: [lifeCycle()],
    props: {
        id: {
            type: String,
            default: "callNumPercentagePie",
        },
        list: {
            type: Array,
            default: () => []
        }
    },
    data(){
        return {
            
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
    watch: {
        list(){
            this.initChart()
        }
    },
    methods: {
        initChart() {
            if (!this.$refs[this.id]) return;
            this.chart = this.chart || this.$echarts.init(this.$refs[this.id]);
           
            let datas = [
                { value: 335, name: '失业登记', percent: '23' },
                { value: 310, name: '残疾人补助', percent: '15' },
                { value: 104, name: '招牌审批', percent: '15' },
                { value: 235, name: '房屋租赁', percent: '17' },
                { value: 200, name: '计划生育', percent: '18' },
                { value: 250, name: '养犬登记', percent: '15' },
            ]

            let colors = ['#32FDF6', '#2CDAFF', '#00F298', '#FE8602', '#9E2DFE', '#2C9EFD']
            let objData = array2obj(datas, 'name')

            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                color: colors,
                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                grid: {
                    left: '0',
                    right: '0',
                    bottom: '0',
                    top: '0',
                    containLabel: true
                },
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: '80%',
                    center: ['50%', '55%'],
                    data: this.list,
                    roseType: 'radius',
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: '#52FFFF'
                            }
                        }
                    },
                    label: {
                        normal: {
                            fontSize: 12,
                            formatter: '{b}\n{d}%',
                            color: '#fff'
                        }
                    },
                }]
            }
            /**
             * @introduction 把数组中key值相同的那一项提取出来，组成一个对象
             * @description 详细描述
             * @param {参数类型} array 传入的数组 [{a:"1",b:"2"},{a:"2",b:"3"}]
             * @param {参数类型} key  属性名 a
             * @return {返回类型说明}
             * @exception [违例类型] [违例类型说明]
             */
            function array2obj (array, key) {
                var resObj = {}
                for (var i = 0; i < array.length; i++) {
                    resObj[array[i][key]] = array[i]
                }
                return resObj
            }
            this.chart.setOption(option)
        }
    }
}
</script>
<style lang="scss" scoped>
.chart {
  height: 190px;
  padding-top: 10px;
}
</style>