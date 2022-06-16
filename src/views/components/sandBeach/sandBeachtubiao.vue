<template>
  <div>
    <div :id="id" :ref="id" class="chart"></div>
  </div>
</template>
<script>
import lifeCycle from '@/components/echarts/mixins/lifecycle'
import { merge } from 'lodash'

export default {
  name: "wu-bar",
  mixins: [lifeCycle()],
  props: {
    id: {
      type: String,
      default: "wu-bar",
    },
    labels: {
      type: Array,
      default: () => ["01 葵涌收费站","02 土洋收费站", "03 溪涌收费站","04 坪葵路"], 
    },
    values: {
      type: Array,
      default: () => [2000, 800, 600, 400],
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
        } else {
          this.maxArr = [];
        }
        this.initChart();
      },
    },
    sourceOp:{
      handler: function(newVal){
        this.initChart()
      },
      deep: true
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
      this.chart.resize({ height: this.height });
      let option = {
        tooltip: {
          trigger: "axis",
          show: true,
        },
        legend: {
          show: true,
          icon: "circle",
          itemWidth: 5,
          top: 20,
          textStyle: {
            fontSize: 12,
            color: "#86B3B8",
          },
        },
        grid: {
          left: "5%",
          right: "5%",
          top: "35%",
          bottom: "6%",
          containLabel: true,
        },
        xAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: "rgba(134,179,184,1)",
            },
          },
          // x轴的值
          data: this.labels,
        },
        yAxis: [
        {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          min: 0,
          max: 85,
          axisLabel: {
            // formatter: function (value) {
              // var texts = [];
              // if (value == 0) {
              //   texts.push("差");
              // } else if (value <= 40) {
              //   texts.push("中");
              // } else if (value <= 60) {
              //   texts.push("良");
              // } else {
              //   texts.push("优");
              // }
              // return texts;
            // },
            textStyle: {
              color: "rgba(134,179,184,1)",
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgba(0,242,152,.2)",
            },
          },
        },
        {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          min: 0,
          max: 3500,
          // 负离子
          axisLabel: {
            // formatter: function (value) {
            //   var texts = [];
              // if (value == 0) {
              //   texts.push("差");
              // } else if (value <= 1500) {
              //   texts.push("中");
              // } else if (value <= 2000) {
              //   texts.push("良");
              // } else {
              //   texts.push("优");
              // }
              // return texts;
            // },
            textStyle: {
              fontSize: 15,
              color: "rgba(134,179,184,1)",
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgba(0,242,152,.2)",
            },
          },
        }
        ],
        series: [
          
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
  height: 150px;
  margin-top: 10px;
}
</style>