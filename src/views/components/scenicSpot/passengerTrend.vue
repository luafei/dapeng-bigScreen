<template>
  <div class="entrance">
    <sub-title title="客流量变化趋势">
    </sub-title>
    <Environment :labels="labels" :values="values" :sourceOp="sourceOp"></Environment>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward, } from "@/utils/util";
import Environment from "@/components/echarts/Environment";
export default {
  name: "busComeInOut",
  components: {
    SubTitle,
    Environment,
  },
  props: {
    subTitleAlign: {
      type: String,
      default: "left",
    },
    carType: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      echart: null,
      labels: ["较尾场", "官湖", "杨梅坑", "西涌"],
      values: [2000, 800, 600, 400, 100],
      subTitleCom: null,
      sourceOp: {
        yAxis: {
          max: null,
          axisLabel: {
            formatter(val){
              return val
            }
          }
        },
        series: []
      }
    };
  },
  mounted() {
    this.subTitleCom = findComponentDownward(this, "subTitle");
    this.getData();
  },
  methods: {
    getData(){
      let colors = ['#14FEF7', '#5397FF', '#FBBA10', '#00F495']
      let data = [{
        name: '一日游游客',
        data: [400,200,550,660,770,880,500],
      },{
        name: '过夜游客',
        data: [660,770,880,500,400,200,550],
      },{
        name: '入境游客',
        data: [550,660,770,400,200,880,500],
      },{
        name: '国内游客',
        data: [770,400,200,400,200,880,500],
      }]
      data = data.map((item, index) => {
        return {
          ...item,
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 0,
          lineStyle: {
            normal: {
              width: 1,
              shadowColor: "rgba(155, 18, 184, .4)",
              shadowBlur: 5,
              shadowOffsetY: 40,
              shadowOffsetX: 0,
              color: colors[index],
            },
          },
          itemStyle: {
            color: colors[index],
            borderColor: "#fff",
            borderWidth: 2,
          },
        }
      })
      this.sourceOp.series = data
    }
  },
};
</script>

<style lang="scss" scoped>
.entrance {
  position: relative;
  .sub-title-left,
  .sub-title-right {
    display: inline-block;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
  }
  .sub-title-left {
    margin-right: 18px;
  }
  .sub-title-right {
    margin-left: 18px;
  }
  .time-road {
    margin-top: 12px;
  }
}
</style>


