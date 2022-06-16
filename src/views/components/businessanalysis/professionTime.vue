<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title title="部门业务量">
        </sub-title>
        <!-- barColors -->
        <time-road  class="time-road" :hour="false"  week  year :time-type="timeType" @onSelectTime="onSelectTime" ></time-road>
        <Wu-bar-r-three :labels="labels" :values="values" :yFormatter="yFormatter" :barColors="barColors"></Wu-bar-r-three>>
    </div>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward, } from "@/utils/util";
import TimeRoad from '@/components/common/TimeRoad'
import callNumPercentagePie from '@/components/echarts/callNumPercentagePie'
import WuBarRThree from "@/components/echarts/WuBarRThree";

export default {
  name: "professionTime",
  components: {
    SubTitle,
    TimeRoad,
    callNumPercentagePie,
    WuBarRThree
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
      labels: ['市场监管局','水务局','住房建设局','教育卫建局','组织建设局'],
      values: [],
      barColors: ['#BBA02C', '#BBE03B']
    };
  },
  mounted() {
    this.values = [10, 7, 12, 7, 6],
    this.subTitleCom = findComponentDownward(this, "subTitle");
  },
  methods: {
      yFormatter(val){
        return val
      },
      onSelectTime({type}){
         this.timeType = type
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


