<template>
  <div>
    <div :id="id" :ref="id" class="chart"></div>
  </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'
import { merge } from 'lodash'
import "echarts-liquidfill"
export default {
  name: "wuliquid-fill",
  mixins: [lifeCycle()],
  props: {
    id: {
      type: String,
      default: "wuliquid-fill",
    },
    height: {
      type: Number,
      default: 150,
    },
    title: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "125,225,254",
    },
    num: {
      type: Number,
      default: 0,
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
      cData: [],
      valNumber: 0,
      newNum:0
    };
  },
  watch: {
    num: {
        handler:function (val) {
            this.newNum = val;
            if(val>0){
                this.valNumber = 0.4
            }else{
                this.valNumber = 0
            }
            this.initChart();
        },
        immediate:true
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
      if(!this.$refs[this.id]) return;
      // this.$refs[this.id].innerHTML = "";
      // this.$refs[this.id].removeAttribute("_echarts_instance_");
      
      this.chart = this.chart || this.$echarts.init(this.$refs[this.id]);
      this.chart.resize({ height: this.height });
      var data = [this.valNumber, this.valNumber, this.valNumber];
      var option = {
        grid: {
          left: "0%",
          right: "0%",
          bottom: "0%",
          top: "1%",
          containLabel: true,
        },
        title: {
          text: this.newNum,
          zlevel: 100,

          textStyle: {
            fontSize: 14,
            fontFamily: "Microsoft Yahei",
            fontWeight: "normal",
            color: "#FFF904",
          },
          x: "center",
          y: "50%",
        },
        graphic: [
          {
            type: "group",
            left: "center",
            top: "40%",
            children: [
              {
                type: "text",
                z: 100,
                left: "0",
                top: "10",
                style: {
                  fill: "#42F9ED",
                  text: this.title,
                  font: "10px Microsoft YaHei",
                  fontSize: 16,
                },
              },
            ],
          },
        ],
        series: [
          {
            type: "liquidFill",
            radius: "56%",
            center: ["50%", "50.5%"],
            waveAnimation: 10, // 动画时长
            amplitude: 5, // 振幅
            data: data,
            backgroundStyle: {
              color: "transparent",
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.1)",
              // opacity:0.1
            },
            outline: {
              show: false,
            },
            itemStyle: {
              shadowBlur: 10, //波浪的阴影范围
              color: "rgba(0,103,242,.25)",
            },
            label: {
              normal: {
                formatter: "",
              },
            },
            zlevel: 10,
          },
          {
            type: "pie",
            center: ["50%", "50%"],
            radius: ["65%", "65.5%"],
            zlevel: 10,
            animation: false,
            data: [
              {
                name: "",
                value: 100,

                labelLine: {
                  show: false,
                },
                itemStyle: {
                  color: "rgba(130,189,255,1)",
                },
              },
            ],
            label: {
              position: "center",
            },
          },
        ],
      };
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