<template>
  <div>
    <el-row type="flex" class="wu-title" align="middle">
      <el-col :span="12">分析内容</el-col>
      <el-col :span="12">分析结果</el-col>
    </el-row>
    <div :id="id" :ref="id" class="chart"></div>
  </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'

export default {
  name: "wu-bar",
  mixins: [lifeCycle()],
  props: {
    id: {
      type: String,
      default: "wu-bar-r-three",
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
    //     type: Number,
    //     default: 110
    // }
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
          this.maxArr = [...vals];
          // let max = Math.max(...vals)
          // vals.forEach(() => {
          //     this.maxArr.push(max)
          // })
        } else {
          this.maxArr = [];
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
      this.chart.resize({ height: this.height });
      this.chart.setOption({
        animationDuration: 1500,
        grid: {
          left: "0%",
          right: "0%",
          bottom: "0%",
          top: "7%",
          containLabel: true,
        },
        tooltip: {
          formatter: "{b0}: {c0}个",
        },
        xAxis: {
          type: "category",
          data: this.labels,
          axisTick: "none",
          axisLine: {
            lineStyle: {
              color: "#86B3B8",
            },
          },
          axisLabel: {
            interval: 0,
            margin: 10,
            color: "#e2e9ff",
            textStyle: {
              fontSize: 10,
              color: "#86B3B8",
            },
          },
        },
        yAxis: [
          {
            name: "个",
            title: "个",
            minInterval: 1,
            type: "value",
            axisLabel: {
              formatter: (val) => {
                if (val === 0) {
                  return "个";
                } else {
                  return val;
                }
              },
              color: "#86B3B8",
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "rgba(0,242,152,.2)",
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(0,242,152,.2)",
              },
            },
          },
        ],
        series: [
          {
            data: this.eData,
            type: "bar",
            barWidth: 24,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "#ba9f38",
                  },
                  {
                    offset: 1,
                    color: "#bcde4a",
                  },
                ]),
              },
            },
          },
        ],
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.chart {
  height: 107px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>