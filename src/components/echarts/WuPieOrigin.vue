<template>
    <div>
        <div :id="id" :ref="id" class="chart"></div>
    </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'

export default {
    name: 'wu-pie-origin',
    mixins: [lifeCycle()],
    props: {
        id: {
            type: String,
            default: "wu-pie-origin"
        },
        values: { //本地
            type: Array,
            default: ()=> []
        },
        labels:{ //外地
            type: Number,
            default:100
        },
        changeDriveType:{
          type: Number
        }
    },
    watch:{
        values:{
            handler(newVal){
                this.legendData = newVal.map((item)=> item.name);
              this.initChart()
            }
        },
        changeDriveType:{
          handler(){
            this.initChart()
          },
        }
    },
    data(){
        return {
            chart: null,
            maxArr: [],
            eData: [],
            legendData:[]
        }
    },
    mounted() {
        this.$nextTick(() => {
          // if(!this.values) return;
          this.initChart()
          this.chart.on('click', (params) => {
            this.$emit('clickPie', params)
          });
        })
        window.addEventListener("resize",()=>{
            this.chart.resize();
        })
    },
    methods: {
        initChart(){
            this.chart = this.chart || this.$echarts.init(this.$refs[this.id])
            var colorList = ['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF'];
            var option = {
                tooltip: {
                    trigger: 'item',
                    borderColor: 'rgba(255,255,255,.3)',
                    backgroundColor: 'rgba(13,5,30,.6)',
                    borderWidth: 1,
                    padding: 5,
                    formatter: function(parms) {
                        var str = parms.marker + "" + parms.data.name + "</br>" +
                            "数量：" + parms.data.value + "辆</br>" +
                            "占比：" + parms.percent + "%";
                        return str;
                    }
                },
                grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '0%',
                    top: '5%',
                    containLabel: true
                },
                legend: {
                    type: "scroll",
                    orient: 'vertical',
                    left: '53%',
                    align: 'auto',
                    top: 'middle',
                    textStyle: {
                        color: '#fff',
                        fontSize:10
                    },
                    formatter:(name)=>{
                      var total = 0;
                      var target;
                      for (var i = 0, l = this.values.length; i < l; i++) {
                        total += Number(this.values[i].value);
                        if (this.values[i].name == name) {
                          target = Number(this.values[i].value);
                        }
                      }
                      var arr = [
                          '{a|'+((target/total)*100).toFixed(2)+'%}',
                          '{b|'+name+'}',
                      ]
                      return name + ': ' + ((target/total)*100).toFixed(2)+'% ' + target + '辆';
                    },
                    data: this.legendData
                },
                series: [{
                    type: 'pie',
                    center: ['28%', '50%'],
                    radius: ['18%', '70%'],
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    label: {
                        show: false,
                    },
                    data: this.values
                }]
            };
              this.chart.setOption(option);
              this.chart.resize()
        }
    }
}
</script>
<style lang="scss" scoped>
    .chart{ 
          width: 100%;
          height: 200px;
          &>div{
            width: 100%!important;
          }
    }
</style>