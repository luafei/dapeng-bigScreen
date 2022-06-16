<template>
  <div>
    <!-- <el-row type="flex" class="wu-title" align='middle' >
      <el-col :span="6">排名</el-col>
      <el-col :span="18">路段名称</el-col>
      <el-col :span="5">辆</el-col>
    </el-row> -->
    
    <div :id="id" :ref="id" class="chart"></div>
  </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'

export default {
  name: "wu-number",
  mixins: [lifeCycle()],
  props: {
    id: {
      type: String,
      default: "wu-number",
    },
    labels: {
      type: Array,
      default: () => [
        "01 葵涌收费站",
        "02 土洋收费站",
        "03 溪涌收费站",
        "04 坪葵路",
        "05 背仔角收费站",
      ],
    },
    values: {
      type: Array,
      default: () => [2000, 800, 600, 400, 200],
    },
    // height: {
    //   type: Number,
    //   default: 110,
    // },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      chart: null,
      maxArr: [],
      eData: [],
      cData: [],
    };
  },
  watch: {
    values: {
      // handler: function (vals){
      //     console.log(vals,'vals')
      //     this.eData = vals
      //     if(vals.length !== 0){
      //         this.maxArr = []
      //         let max = Math.max(...vals)
      //         console.log(max,'max') // 19700
      //         vals.forEach(() => {
      //             this.maxArr.push(max)
      //         })
      //     }
      //     this.initChart()
      // },
      handler: function (vals) {
        this.eData = vals;
        this.cData = [...vals].map((value) => {
          return parseInt(value);
        });
        if (vals.length !== 0) {
          this.maxArr = [];
          let max = Math.max(...this.cData);
          vals.forEach(() => {
            this.maxArr.push(max);
          });
        }else{
          this.maxArr = []
        }
        this.initChart();
      },
    },
    labels:{
      handler:function(data){
        var arr = [];
        for (let index = 0; index < data.length; index++) {
          arr.push(data[index].length);
        }
        this.maxLen = Math.max(...arr);
      }
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
    initChart() {
      this.chart = this.chart || this.$echarts.init(this.$refs[this.id]);
      this.chart.resize({ height: this.height });
      this.chart.setOption({
        animationDuration: 1500,
        grid: {
          left: "1%",
          right: "0%",
          bottom: "0%",
          top: "0%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: "{b0}: {c0}",
        },
        xAxis: {
          show: false, //是否显示x轴
          type: "value",
        },
        yAxis: [
          {
            type: "category",
            inverse: true, //让y轴数据逆向
            // offset:this.maxLen <=3 ? 50:65,
            offset:80,
            axisLabel: {
              show: true,
              margin:20,
              textStyle: {
                color: "#41FFEA", //y轴字体颜色
                align:'left'
              },
              formatter: function (val, index) {
                return "{" + (index + 1) + "|" + (index + 1) + " }  " + val;
              },
              //定义富文本标签
              rich: {
                1: {
                  color: "#fff",
                  backgroundColor: "#FF3602",
                  padding: [1, 1, 2, 2],
                  fontSize: 12,
                  align: "center",
                  verticalAlign: "middle",
                },
                2: {
                  color: "#fff",
                  backgroundColor: "#EFC500",
                  padding: [1, 1, 2, 2],
                  fontSize: 12,
                  align: "center",
                  verticalAlign: "middle",
                },
                3: {
                  color: "#fff",
                  backgroundColor: "#7DFF00",
                  padding: [1, 1, 2, 2],
                  fontSize: 12,
                  align: "center",
                  verticalAlign: "middle",
                },
                4: {
                  color: "#fff",
                  backgroundColor: "#7CFF00",
                  padding: [1, 1, 2, 2],
                  fontSize: 12,
                  align: "center",
                  verticalAlign: "middle",
                },
                5: {
                  color: "#fff",
                  backgroundColor: "#7CFF00",
                  padding: [1, 1, 2, 2],
                  fontSize: 12,
                  align: "center",
                  verticalAlign: "middle",
                },
                lg: {
                  fontWeight: "bold",
                  fontSize: 12, //字体默认12
                  color: "#08C",
                  padding: [0, 5, 0, 0],
                },
                title: {
                  color: "#fff",
                  fontWeight: "lighter",
                },
              },
            },
            splitLine: { show: false }, //横向的线
            axisTick: { show: false }, //y轴的端点
            axisLine: { show: false }, //y轴的线
            data: this.labels,
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              textStyle: {
                color: function (value, index) {
                  if (index === 0) return "#FF3600";
                  if (index === 1) return "#EFC500";
                  if (index === 2) return "#7DFF00";
                  if (index === 3) return "#7DFF00";
                  if (index === 4) return "#7DFF00";
                },
                fontSize: "12",
              },
              // formatter: function(value) {
              //     if (value >= 10000) {
              //         return (value / 10000).toLocaleString();
              //     } else {
              //         return value.toLocaleString();
              //     }
              // },
            },
            data: this.eData,
          },
        ],
        series: [
          {
            name: "数据内框",
            type: "bar",
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgba(71,181,255,0.6)",
                  },
                  {
                    offset: 1,
                    color: "rgba(65,255,234,0.7)",
                  },
                ]),
              },
            },
            barWidth: 11,
            data: this.cData,
          },
          {
            name: "外框",
            type: "bar",
            itemStyle: {
              normal: {
                borderColor: "rgba(115,255,254,1)",
                borderWidth: 0.5,
                barBorderRadius: 15,
                color: "rgba(102, 102, 102,0)",
              },
            },
            barGap: "-100%",
            z: 0,
            barWidth: 11,
            data: this.maxArr,
          },
        ],
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#chart>div>canvas:hover{
        cursor: default;
}
.chart {
  height: 95px;
  margin-top: 10px;
}
.wu-title{
  font-size:14px ;
  color: #ffffff;
  background: rgba(27,241,170, .2);
  height: 32px;
  margin-top: 10px;
  text-indent: 1em;
  }
</style>