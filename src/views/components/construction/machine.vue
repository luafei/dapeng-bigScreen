<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title title="一体机业务类型统计分析">
        </sub-title>
        <!-- barColors -->
        <!-- <time-road  class="time-road" :hour="false"  week  year :time-type="timeType" @onSelectTime="onSelectTime" ></time-road> -->
        <!-- :labels="labels" :values="values" :yFormatter="yFormatter" :barColors="barColors" -->
        <macecharts :values="values"  :labels="labels"></macecharts>>
    </div>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward, } from "@/utils/util";
import TimeRoad from '@/components/common/TimeRoad'
import callNumPercentagePie from '@/components/echarts/callNumPercentagePie'
import {getbusinessType} from '@/api/citynew'
import macecharts from './echarts/macecharts'

export default {
  name: "professionTimeRightDown",
  components: {
    SubTitle,
    TimeRoad,
    callNumPercentagePie,
    macecharts
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
      labels: ['A类事项','B类事项','C类事项','D类事项'],
      values: [],
      // barColors: ['#BBA02C', '#BBE03B']
    };
  },
  mounted() {
    // this.values = [10, 7, 12, 7, 6],
    this.subTitleCom = findComponentDownward(this, "subTitle");
    this.getData()
  },
  methods: {
    async getData () {
      const res= await getbusinessType()
      let allList = res.data.data.commonResult
      if(res) {
         this.values = []
         this.labels = []
         this.$nextTick(() => {
           allList.forEach(item => {
             this.labels.push(item.commonName)
             this.values.push(item.num)
           })
         })
      }
    },
      // yFormatter(val){
      //   return val
      // },
      onSelectTime({type}){
         this.timeType = type
         this.getData()
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


