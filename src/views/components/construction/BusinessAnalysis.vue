<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title 
        title="城市更新"
        >
        </sub-title>
         <div class="bar-wrap">
          <time-road  class="time-road" :hour="false" week year :time-type="timeType" @onSelectTime="onSelectTime" ></time-road>
          <QinOneTop 
          :values ="values" 
          :labels="labels"
          :applyNums= 'applyNums' 
          :internetApplyNums= 'internetApplyNums'></QinOneTop>
        </div>
    </div>
    
    
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward, } from "@/utils/util";
import QinOneTop from "@/components/echarts/QinOneTop";
import TimeRoad from '@/components/common/TimeRoad'
import { getcitybusiness } from '@/api/citynew'


export default {
  name: "BusinessAnalysis",
  components: {
    SubTitle,
    QinOneTop,
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
      timeType: 'year',
       subTitleCom: null,
       echart: null,
       labels:[],
       values:[],
       applyNums: [],
       internetApplyNums: [],
       newlist:"0"
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData (){
     let postData = {
       timeType : this.timeType,
       indexType: this.newlist
     }
     const res = await getcitybusiness(postData)
     if(res) {
       this.labels= []
       this.values= []
       this.applyNums= []
       this.internetApplyNums = []
       this.$nextTick (() => {
         res.data.data.forEach(item => {
           this.labels.push(item.indexName)
           this.values.push(item.acceptNum)
           this.applyNums.push(item.applyNum)
           this.internetApplyNums.push(item.internetApplyNum)
         })
       })
     }
    },
    init () {
      this.$refs.qinplay0.initChart();
    },
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
  //   .bar-wrap {
  //   height: 200px;
  // }
}
</style>


