<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title 
        title="为新开办企业免费刻制印章"
        >
        </sub-title>
        <!-- 
          popper-class="dp-select-popper"
          v-model="entranceName"
          @change="selectEntrance"
          v-show="showIndex === 0"
          -->
          <!-- 这里选择框 el-option 内写 value -->
        <!-- <el-select
        class="dp-select"
        placeholder="请选择" 
        value=''
        >
        </el-select> -->
         <div class="bar-wrap">
          <time-road  
           class="time-road" 
           :hour="false" 
           :day="false"
           :week="false" 
           year 
           :time-type="timeType" 
           @onSelectTime="onSelectTime" 
           ></time-road>
          <zhexianlefttwodown 
            :values="values"
            :labels="labels"
            :stayNum="stayNum"
            :timeType="timeType"
          ></zhexianlefttwodown>
        </div>
    </div>
    
    
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward, } from "@/utils/util";
// import QinTherrdown from "@/components/echarts/QinTherrdown";
import zhexianlefttwodown from "@/components/echarts/zhexianlefttwodown";
import TimeRoad from '@/components/common/TimeRoad'
import { getcitySeal } from '@/api/citynew'


export default {
  name: "stereotype",
  components: {
    SubTitle,
    zhexianlefttwodown,
    TimeRoad
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
      timeType: 'month',
      subTitleCom: null,
      echart: null,
      labels: ["2020-01","2020-02","2020-03","2020-04","2020-05","2020-06","2020-07","2020-08","2020-09","2020-10","2020-11","2020-12","2021-01","2021-02"],
      values:[0,0,1,2,4,39,53,61,56,43,60,82,58,13],
      stayNum: [0,0,0,0,0,0,1,3,1,2,3,0,0,1]
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    init () {
      this.$refs.qinplay0.initChart();
    },
    async getData(){
      let postData = {
        timeType : this.timeType
      }
      if(this.timeType === "month"){
        this.labels = ["2020-01","2020-02","2020-03","2020-04","2020-05","2020-06","2020-07","2020-08","2020-09","2020-10","2020-11","2020-12","2021-01","2021-02"],
        this.values = [0,0,1,2,4,39,53,61,56,43,60,82,58,13],
        this.stayNum = [0,0,0,0,0,0,1,3,1,2,3,0,0,1]
        return 
      }
      if(this.timeType === "year"){
        this.labels = [2020,2021],
        this.values = [401,71],
        this.stayNum = [10,1]
      }
      // const res = await getcitySeal (postData)
    },
    onSelectTime({type}){
      
      this.timeType = type
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
.entrance {
  position: relative;
  .el-col-24 {
    width: 100%;
    height: 220px;
}
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
    .bar-wrap {
    height: 100px;
  }
}
</style>


