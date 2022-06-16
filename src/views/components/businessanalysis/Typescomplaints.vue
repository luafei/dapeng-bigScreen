<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title title="收件类型占比分析"
         :on-type="2"
         is-show-right
         :option="options"
         @onRoadChange="onRoadChange"
         :init-value="initVal">>
        </sub-title>
        <!-- barColors -->
        <!-- <time-road  class="time-road" :hour="false"  :day="false"  year :time-type="timeType" @onSelectTime="onSelectTime" ></time-road> -->
        <!-- :labels="labels" :values="values" :yFormatter="yFormatter" :barColors="barColors" -->
        <Qin-Two-Left-Down ref="qintoptow" :labels="labels" :values="values"></Qin-Two-Left-Down>>
    </div>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward, } from "@/utils/util";
import TimeRoad from '@/components/common/TimeRoad'
import callNumPercentagePie from '@/components/echarts/callNumPercentagePie'
import QinTwoLeftDown from "@/components/echarts/QinTwoLeftDown";
import businData from "@/utils/businData.js";
export default {
  name: "Typescomplaints",
  components: {
    SubTitle,
    TimeRoad,
    callNumPercentagePie,
    QinTwoLeftDown
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
      subTitleCom: null,
      timeType: 'day',
      labels: ['投诉类','求助类','举报类','其他类'],
      values: [],
      // barColors: ['#BBA02C', '#BBE03B']
      initVal: "第一季度",
      options:[
        {
          value: "第一季度",
          label: "第一季度",
        },
        {
          value: "第二季度",
          label: "第二季度",
        },
        {
          value: "第三季度",
          label: "第三季度",
        },
        {
          value: "第四季度",
          label: "第四季度",
        }
      ]
    };
  },
  mounted() {
    this.values = businData.quarterOne.type1,
    this.subTitleCom = findComponentDownward(this, "subTitle");
    // this.renderEcharts()
    // this.onRoadChange("第一季度")
  },
  methods: {
      // yFormatter(val){
      //   return val
      // },
      onSelectTime({type}){
         this.timeType = type
      },
      handleToggle({ index }) {
      this.showIndex = index;
      if (index == 1) {
        this.$nextTick(() => {
          this.$refs.qintoptow.initChart();
        })
      } 
      // this.getCurrentEchartsData();
    },
     renderEcharts (data) {
      this.values = data
      this.$refs.qintoptow.initChart();
    },
    onRoadChange(val){
      // businData
      switch (val.roadName) {
        case '第一季度':
          this.renderEcharts(businData.quarterOne.type1)
        break;
        case '第二季度':
          this.renderEcharts(businData.quarterTwo.type1)
        break;
        case '第三季度':
          this.renderEcharts(businData.quarterThree.type1)
        break;
        case '第四季度':
          this.renderEcharts(businData.quarterFour.type1)
        break;
      }
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
.title-time{
    position: relative;
    .time-road{
        position: absolute;
        right: 0;
        top: 0;
        margin-top:0;
    }
}
</style>


