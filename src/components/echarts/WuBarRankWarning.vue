<template>
  <div>
    <div :id="id" :ref="id" class="chart"></div>
  </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'
import { merge } from 'lodash'
export default {
  name: "wu-bar-rank-warning",
  mixins: [lifeCycle()],
  props: {
    id: {
      type: String,
      default: "wu-bar-rank",
    },
    labels: {
      type: Array,
      default: () => [ "葵涌收费站", "土洋收费站", "溪涌收费站","坪葵路","背仔角收费站", ]
    },
    values: {
      type: Array,
      default: () => [2000, 800, 600, 400, 200],
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
      eData: [],
    };
  },
  watch: {
    values: {
      handler: function (vals) {
        this.eData = vals;
        if (vals.length !== 0) {
          this.maxArr = [];
          let max = Math.max(...vals);
          vals.forEach(() => {
            this.maxArr.push(max);
          });
        }
        this.initChart();
      },
    },
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
      this.chart.resize();
      let option = {
        grid: {
          left: "-220px", // 距离dom间距
          right: "-55px",
          top: "7%",
          bottom: "1%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "value",
            axisPointer: {
              type: "shadow",
            },
            // 横坐标 分割线等取消显示
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLabel: {
              verticalAlign: "bottom",
              align: "left",
              padding: [0, 40, 10, 2],
              textStyle: {
                fontSize: 14,
                color: "white",
                fontFamily: "Source Han Sans CN",
              },
              formatter(value) {
                return value;
              },
            },
            // 纵坐标数据
            data: this.labels,

            yAxisIndex: 0,
            // 横坐标 分割线等取消显示
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
          },

          {
            type: "category",
            inverse: true,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
              inside: false,
              verticalAlign: "bottom",
              // 位置 上右下左
              padding: [-20, 0, -5, -75],
              lineHeight: "40",
              textStyle: {
                fontSize: 16,
                color: "white",
                fontFamily: "SourceHanSansCN-Regular",
              },
              formatter(value) {
                return value + '个';
              },
            },
            // 统计的总量 用纵坐标模拟
            data: this.values,
          },
        ],
        series: [
          {
            show: true,
            type: "bar",
            barGap: "-100%",
            barWidth: 10, // 统计条宽度
            itemStyle: {
              normal: {
                color: "rgba(0,0,0,0)",
                barBorderRadius: 30,
                borderColor: 'rgba(115,255,254,1)',
                borderWidth: 1,
              },
              
            },
            z: 1,
            data: this.maxArr,
          },
          {
            show: true,
            type: "bar",
            barGap: "-100%",
            barWidth: "10px", // 统计条宽度
            max: 1,
            labelLine: {
              show: false,
               barBorderRadius: 30,
               borderColor: 'rgba(115,255,254,1)',
                borderWidth: 1,
            },
            z: 2,
            itemStyle: {
              normal: {
                color: {
                  colorStops: [
                    {
                      offset: 0,
                      color: "#57E9FF", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#4BEBBB", // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
                 barBorderRadius: 30,
                 borderColor: 'rgba(115,255,254,1)',
                borderWidth: 1,
              },
            },
            data: this.values,
          },
        ],
      }
      merge(option, this.sourceOp)
      this.chart.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
.chart {
  height: 187px;
  margin-top: 10px;
}
</style>