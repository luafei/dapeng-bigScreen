<template>
  <div>
    <div :id="id" :ref="id" class="chart"></div>
  </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'

export default {
  name: "wu-pie6",
  mixins: [lifeCycle()],
  props: {
    id: {
      type: String,
      default: "wu-pie6",
    },
    changeDriveType: {
      type: Number,
    },
  },
  data() {
    return {
    };
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
      const grayBar = [100, 100, 100];
      this.option = {
        backgroundColor: "black",
        grid: {
          left: "-50px", // 距离dom间距
          right: "31px",
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
              padding: [0, 10, 10, 6],
              textStyle: {
                fontSize: 14,
                color: "white",
                fontFamily: "Source Han Sans CN",
              },
              formatter(value, index) {
                index += 1;
                return `{rank${index}|No.${index}} {text1|${value}}`;
              },
              rich: {
                rank1: {
                  width: 36,
                  height: 20,
                  color: "#FD4844",
                  align: "center",
                },
                rank2: {
                  width: 36,
                  height: 20,
                  color: "#FBA13A",
                  align: "center",
                },
                rank2: {
                  width: 36,
                  height: 20,
                  color: "#56E7FD",
                  align: "center",
                },
                rank4: {
                  // padding: [0, 0, 0, 4],
                },
              },
            },
            // 纵坐标数据
            data: ["威锋网", "当时的", "是的"],

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
              padding: [0, 10, 2, -40],
              lineHeight: "40",
              textStyle: {
                fontSize: 16,
                color: "white",
                fontFamily: "SourceHanSansCN-Regular",
              },
            },
            // 统计的总量 用纵坐标模拟
            data: [61, 6, 8],
          },
        ],
        series: [
          {
            show: true,
            type: "pictorialBar",
            symbol: "fixed",
            symbolSize: [7, 10],
            symbolMargin: 5,
            symbolRepeat: "repeat",

            barWidth: 6, // 统计条宽度
            itemStyle: {
              normal: {
                color: "black",
              },
            },
            z: 3,

            data: [61, 62, 18],
          },

          {
            show: true,

            type: "pictorialBar",
            symbol: "fixed",
            symbolSize: [10, 10],
            symbolMargin: 5,
            symbolRepeat: "repeat",
            barGap: "-100%",

            barWidth: 6, // 统计条宽度
            itemStyle: {
              normal: {
                color: "#274882",
              },
            },
            z: 1,

            data: grayBar,
          },
          {
            show: true,

            type: "bar",

            barGap: "-100%",
            barWidth: "10px", // 统计条宽度
            max: 1,
            labelLine: {
              show: false,
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
              },
            },
            data: [61, 62, 18],
          },
        ],
      };
      this.chart.setOption(this.option);
    },
  },
};
</script>
<style lang="scss" scoped>
.chart {
  // textStyle
  width: 100%;
  height: 1.2rem;
  & > div {
    width: 100% !important;
  }
}
</style>