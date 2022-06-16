<template>
  <div class="entrance">
    <div class="title-wrap">
      <sub-title
        :on-type="2"
        title="实时客流变化趋势"
        is-show-right
        :option="beachList"
        @onRoadChange="onRoadChange"
        :init-value="beachName"
      >
      </sub-title>
      <TimeRoad week month year :timeType="timeType" :hour="false"  @onSelectTime="handleSelectTime" class="time-road"></TimeRoad>
    </div>
    <div class="bar-wrap">
      <busLinearGradient :labels="labels02" :values="values02"></busLinearGradient>
    </div>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import TimeRoad from '@/components/common/TimeRoad'
// import {  queryDicBusStations } from "@/api/dumpTruck";
import { getBeachPassengerDiagram } from '@/api/beach'
import { findComponentDownward, } from "@/utils/util";
import busLinearGradient from "@/components/echarts/busLinearGradient";
export default {
  name: "busRankingDistribution",
  components: {
    SubTitle,
    busLinearGradient,
    TimeRoad
  },
  props: {
    carType: {
      type: String,
      default: "",
    },
    beachList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      echart: null,
      values02: [],
      labels02: [],
      subTitleCom: null,
      beachName: '',
      timeType: 'day'
    };
  },
  mounted() {
    this.subTitleCom = findComponentDownward(this, "subTitle");
  },
  watch: {
    beachList(newVal){
      if(newVal.length > 0){
         this.beachName = this.beachList[1].label
        this.queryPassengerDiagram()
      }
    },
  },
  methods: {
    async queryPassengerDiagram() {
       let postData = {
         beach: this.beachName,
         timeType: this.timeType
       }
       const res = await getBeachPassengerDiagram(postData)
       if(res.data.data){
        let {x,y} = res.data.data
        const values = [{"x":x,"y":y,"maxNum":0,"name":this.beachName}]
        this.values02 = []
        this.$nextTick(() => {
          this.labels02 = x
          this.values02 = values
        })
       }
    },
    handleSelectTime({type}){
      this.timeType = type
      this.queryPassengerDiagram()
    },
    onRoadChange({ roadName }) {
      this.beachName = roadName;
      this.queryPassengerDiagram()
    },
  },
};
</script>

<style lang="scss" scoped>
.entrance {
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
  .title-wrap{
    position: relative;
    .time-road {
      position: absolute;
      left: 55%;
      top: 3px;
      transform: translateX(-50%);
    }
  }
  .bar-wrap {
    height: 120px;
  }
}
</style>
