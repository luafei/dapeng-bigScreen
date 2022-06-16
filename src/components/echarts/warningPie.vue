<template>
  <div>
    <div :id="id" :ref="id" class="chart"></div>
    <div class="warningPie" style="font-size: 14px;">
      <p>{{title}}</p>
      <div class="warningConnect">
        <div class="warningNct" v-for="item in trafficWay" :key="item.name">
          <div class="color-text">
             <div class="warningColor" :style="{'backgroundColor':item.color}"></div>
             <span class="warningText">{{item.name}}</span>
          </div>
          <div class="warningNum-wrap">
            <div class="warningNum">{{item.value}}个</div>
            <div class="warningNum" v-show="showPercentage">{{valueToPercentage(item.value)}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { component } from 'vue/types/umd';
import lifeCycle from './mixins/lifecycle'

export default {
  name: "wu-bar",
  mixins: [lifeCycle()],
  props: {
    id: {
      type: String,
      default: "wu-bar",
    },
    title: {
      type: String,
      default: '各等级预警统计'
    },
    statisticName: {
      type: String,
      default: '总数'
    },
    showPercentage: {
      type: Boolean,
      default: false
    },
    labels: {
      type: Array,
      default: () => [
        "葵涌",
        "土洋",
        "溪涌",
        "坪葵路",
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
      warningLinst: [
        {
          text: "蓝色",
          color: "#4D83FF",
        },
        {
          text: "黄色",
          color: "#FDCC1E",
        },
        {
          text: "橙色",
          color: "#FF9901",
        },
        {
          text: "红色",
          color: "#F13535",
        },
      ],
      trafficWay: [],
      max: 0,
    };
  },
  watch: {
    values: {
      handler: function (vals) {
        var max = 0;
        if (vals.length > 0) max = vals.reduce((acc,val) => acc+=val)
        this.max = max;
        this.initChart();
      },
      immediate: true
    },
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
      var data = [];
      // var color=[']
      var trafficWay = [];
      var spaceNumber = Math.ceil(this.max * 0.05)==0?1:Math.ceil(this.max * 0.05);
      for (var i = 0; i < this.labels.length; i++) {
        trafficWay[i] = {};
        trafficWay[i].value = this.values[i];
        trafficWay[i].name = this.labels[i];
        trafficWay[i].color = this.warningLinst[i].color;
        data.push(
          {
            value: trafficWay[i].value,
            name: trafficWay[i].name,
            itemStyle: {
              normal: {
                borderWidth: 7,
                borderColor: trafficWay[i].color,
              },
            },
          },
          {
            value: spaceNumber,
            name: "",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
                color: "rgba(0, 0, 0, 0)",
                borderColor: "rgba(0, 0, 0, 0)",
                borderWidth: 0,
              },
            },
          }
        );
      }
      this.trafficWay = trafficWay;
      var seriesOption = [
        {
          name: "",
          type: "pie",
          clockWise: false,
          roundCap: true,
          radius: [62, 67],
          center: ["center", "center"],
          hoverAnimation: false,
          itemStyle: {
            normal: {
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
          },
          data: data,
        },
        {
          type: "pie",
          name: "内层细圆环",
          radius: ["62%", "75%"],
          hoverAnimation: false,
          clockWise: false,
          itemStyle: {
            normal: {
              color: "#fff",
              opacity:0.1,
              borderWidth: 10,
            },
          },
          label: {
            show: false,
          },
          data: [100],
        },
      ];

      this.chart.setOption({
        title: {
          text: this.max,
          subtext: this.statisticName,
          itemGap: 6,
          top: "35%",
          textAlign: "center",
          left: "45%",
          textStyle: {
            color: "#fff",
            fontSize: 16,
            fontWeight: "400",
          },
          subtextStyle: {
            //副标题文本样式
            fontSize: 12,
            color: "#efefef",
            fontStyle: "normal",
            fontWeight: "normal",
          },
        },
        tooltip: {
          show: false,
        },
        legend: {
          show: false,
        },
        toolbox: {
          show: false,
        },
        series: seriesOption,
      });
    },
    valueToPercentage(val){
      let result = (val/this.max*100).toFixed(2)
      return `${result}%`
    }
  },
};
</script>
<style lang="scss" scoped>
.chart {
  width: 50%;
  height: 150px;
  float: left;
}
.warningPie {
  font-size: 0;
  width: 45%;
  color: #fff;
  float: right;
}
.warningColor {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -5px;
}
.warningConnect {
  font-size: 12px;
}
.warningText {
  justify-content: center;
  flex-direction: column;
  margin-left: 15px;
}
.warningNct {
  position: relative;
  display: flex;
  width: 150px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(2,255,255,0.2);
  height: 32px;
  color: #fff;
  text-align: center;
  line-height: 40px;
}
.color-text{
  display: flex;
}
.warningNum-wrap{
  display: flex;
  .warningNum {
    margin-left: 10px;
  }
}
</style>