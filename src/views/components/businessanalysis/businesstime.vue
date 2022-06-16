<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title title="业务办理时长分析">
        </sub-title>
        <time-road  class="time-road" :hour="false"  week year :time-type="timeType" @onSelectTime="onSelectTime" ></time-road>
        <Qinbusine :labels="labels" :values="values" :allTime="allTime" ></Qinbusine>>
    </div>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward, } from "@/utils/util";
import TimeRoad from '@/components/common/TimeRoad'
import callNumPercentagePie from '@/components/echarts/callNumPercentagePie'
import Qinbusine from "@/components/echarts/Qinbusine";
import { getbusinduration } from '@/api/business'

export default {
  name: "businesstime",
  components: {
    SubTitle,
    TimeRoad,
    callNumPercentagePie,
    Qinbusine
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
      allTime:[],
    };
  },
  mounted() {
    // this.values = [11, 12, 13, 24, 18 , 20],
    this.getData();
    this.subTitleCom = findComponentDownward(this, "subTitle");
  },
  methods: {
    //业务办理时长分析
      async getData() {
        let postData = {
          timeType: this.timeType
        }
        const res = await getbusinduration (postData);
        if(res.data.data) {
          this.labels = []
          this.values = []
          this.allTime = []
          this.$nextTick (() => {
            res.data.data.forEach(item => {
              this.labels.push(item.taskName)
              this.values.push(item.minutes)
              this.allTime.push(item)
            })
          })
        }
      },
      // yFormatter(val){
      //   return val
      // },
      onSelectTime({type}){
         this.timeType = type
         this.getData();
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


