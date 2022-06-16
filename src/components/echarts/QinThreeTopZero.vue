<template>
  <div>
    <div ref="myChart" id="qd" style="height:200px;width:100%;"></div>
  </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'
export default {
  name: "Qin-Three-Top-Zero",
  mixins: [lifeCycle()],
  props: {
       soso: {
           type: String,
           default: "Qin-Three-Top-Zero"
       },
       label: {
           type: Array,
           default: () => []
       },
       value: {
           type: Array,
           default: () => []
       }
  },
  data() {
    return {
        chart: null,
        colorList: [
            "rgba(44, 218, 255, 100)",
            "rgba(0, 242, 152, 100)",
            "rgba(254, 134, 2, 100)",
            "rgba(158, 45, 254, 100)",
            "rgba(44, 158, 253, 100)",
            "rgba(50, 253, 246, 100)"
        ]
    };
  },
  watch: {
    value: function(vals) {
        this.initChart();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      this.chart.on("click", (params) => {
        this.$emit("onClick", params);
      });
    });
  },
  methods: {
      initChart(){
          this.chart = this.chart||this.$echarts.init(this.$refs.myChart)
         let myChart = this.$echarts.init(this.$refs.myChart)
            myChart.setOption( {
            //  backgroundColor: "#0f375f",
             legend: {
                icon: "circle",
                // orient: 'horizontal',
                top: "2",
                right:'5',
                itemHeight:8,
                // top:'top',
                // wight:'100%',
                // bottom:"10%",
                // right: "55%",
                // data: this.label,
                textStyle: {
                    color: "#fff",
                    fontSize: 13
                }
            },
            tooltip: {
                trigger: 'item',
                // formatter: '{a} <br/>{b} :  {d}%'
            },
            series: [{
                name: '业务类型',
                type: 'pie',
                radius: ['0%', '75%'],
                center: ['70%', '70%'],
                roseType:"area",
                // roseType: 'radius',
                // width:"90%",
                // height:"100%",
                // top:'0%',
                // left:'15%',
                // right:'25%',
                // bottom:'5%',
                label: {
                    show: false,
                    label: {
                      show: true,
                      position: 'outside',
                      formatter: function(params) {
                      const name = params.labke
                      // const percent = params.percent + '%'
                      const index = params.dataIndex
                      return [`{a${index}|${name}：${percent}}`, `{hr${index}|}`].join('\n')
            },
            // rich: this.tranArr()
        },
                },
                labelLine: {
                    length: 2,
                    length2:5,
                    smooth: true,
                    show:false
                },
                data: this.tranArr(this.value, this.label)
            }]
        })
      },
      sortId (a,b) {  
          return a.value-b.value  
      },
      tranArr (value, label) {
          let _arr = []
          value.forEach((item, index) => {
              _arr.push({
                    value: value[index],
                    name: label[index],
                    itemStyle: {
                        color: this.colorList[index],
                        borderWidth: 3
                    }
              })
          })
          _arr.sort(this.sortId)
          return _arr
      }
    }
};
</script>
<style lang="scss" scoped>
#qd {
    height: 300px!important;
    width: 300px!important;
}
</style>