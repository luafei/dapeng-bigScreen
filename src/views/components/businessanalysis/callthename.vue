<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title title="叫号类型占比分析">
        </sub-title>
        <time-road  class="time-road" :hour="false"  week  year :time-type="timeType" @onSelectTime="onSelectTime" ></time-road>
        <!-- :labels="labels" :values="values" :yFormatter="yFormatter" -->
        <Qin-Three-Top-Zero :value="values" :label="labels"></Qin-Three-Top-Zero>>
    </div>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward, } from "@/utils/util";
import TimeRoad from '@/components/common/TimeRoad'
import callNumPercentagePie from '@/components/echarts/callNumPercentagePie'
import QinThreeTopZero from "@/components/echarts/QinThreeTopZero";
import { getbusincalling } from '@/api/business'

export default {
  name: "callthename",
  components: {
    SubTitle,
    TimeRoad,
    callNumPercentagePie,
    QinThreeTopZero
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
      timeType: 'year',
      labels: [],
      values: [],
    };
  },
  mounted() {
    // this.values = [10, 7, 12, 7, 6],
    this.subTitleCom = findComponentDownward(this, "subTitle");
    this.getData();
  },
  methods: {
    async getData() {
      let postData = {
        timeType : this.timeType
      }
      const res = await getbusincalling(postData)
      if(res.data.data ) {
        this.labels = []
        this.values = []
         res.data.data.forEach (item => {  
            this.labels.push(item.commonName)
            this.values.push(item.num) 
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


