<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title title="部门受理量分析" 
         :on-type="2"
         is-show-right
         :option="options"
         @onRoadChange="onRoadChange"
         :init-value="initVal">
        </sub-title>
        <!-- barColors -->
        <!-- <time-road  class="time-road" :hour="false"  :day="false" year :time-type="timeType" @onSelectTime="onSelectTime" ></time-road> -->
        <!-- <Wu-bar-r-three  ref="qintoptow" :labels="labels" :values="values" :yFormatter="yFormatter" :barColors="barColors"></Wu-bar-r-three>> -->
        <newQinmanager ref="qintoptow" :labels="labels" :values="values" :yFormatter="yFormatter" :barColors="barColors" ></newQinmanager>
    </div>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import newQinmanager from "@/views/components/businessanalysis/echarts/newQinmanager"
import { findComponentDownward, } from "@/utils/util";
import businData from "@/utils/businData.js";
import TimeRoad from '@/components/common/TimeRoad'
import callNumPercentagePie from '@/components/echarts/callNumPercentagePie'
// import WuBarRThree from "@/components/echarts/WuBarRThree";

export default {
  name: "Complaintanalysis",
  components: {
    SubTitle,
    TimeRoad,
    callNumPercentagePie,
    // WuBarRThree,
    newQinmanager
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
      timeType: 'month',
      labels: ['葵涌办事处','市生态环境局大鹏管理局','大鹏办事处','南澳办事处','教育和卫生健康局'],
      values: [],
      barColors: ['#BBA02C', '#BBE03B'],
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
    // this.values = businData.quarterOne.type3,
    this.subTitleCom = findComponentDownward(this, "subTitle");
    this.onRoadChange({roadName:'第一季度'})
  },
  methods: {
      yFormatter(val){
        return val
      },
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
      let propList = []
      switch (val.roadName) {
        case '第一季度':
          propList.push(
            businData.quarterOne.type3,
            businData.quarterOne.type4,
            businData.quarterOne.type5
            )
          this.renderEcharts(propList)
          break;
        case '第二季度':
          propList.push(
            businData.quarterTwo.type3,
            businData.quarterTwo.type4,
            businData.quarterTwo.type5
          )
          this.renderEcharts(propList)
          break;
        case '第三季度':
           propList.push(
            businData.quarterThree.type3,
            businData.quarterThree.type4,
            businData.quarterThree.type5
           )
            this.renderEcharts(propList)
          break;
        case '第四季度':
          propList.push(
            businData.quarterFour.type3,
            businData.quarterFour.type4,
            businData.quarterFour.type5
          )
          this.renderEcharts(propList)
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


