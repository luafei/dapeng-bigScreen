<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title 
        title="人才引进分析 "
        >
        </sub-title>
         <div class="bar-wrap">
          <!-- <time-road  class="time-road" :hour="false" week year :time-type="timeType" @onSelectTime="onSelectTime" ></time-road> -->
          <qinuse
          :values= 'values' 
          :labels= 'labels'
          :internetApplyNums= 'internetApplyNums'></qinuse>
        </div>
    </div>
    
    
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward, } from "@/utils/util";
import qinuse from "./echarts/qinuse";
import TimeRoad from '@/components/common/TimeRoad'
import { getGovSatisfactionDiagram } from '@/api/gov'
import { getcitybusiness } from '@/api/citynew'

export default {
  name: "userindicators",
  components: {
    SubTitle,
    TimeRoad,
    qinuse
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
       newlist:'1',
       values:[170,167,39,41,66,10,22,315,134],
       labels:['接收应届毕业生','调进干部(核准)','招调公务员','招调职员雇员','引进留学归国人员','干部夫妻分居','干部子女随迁','招调技术人员(核准)','工人子女随迁'],
       internetApplyNums: [230,33,1,9,14,0,8,185,56],
    };
  },
  mounted() {
    //  this.getData()
  },
  methods: {
    init () {
      this.$refs.qinplay0.initChart();
    },
    // async getData(){
    //   let postData = {
    //     timeType : this.timeType,
    //     indexType: this.newlist
    //   }
    //    getcitybusiness(postData).then(res => {
    //     if(res) {
    //     let addList = res.data.data
    //       this.values= []
    //       this.labels= []
    //       this.applyNums= []
    //       this.internetApplyNums = []
    //     this.$nextTick(() => {
    //       addList.forEach(item => {
    //         this.labels.push(item.indexName)
    //         this.values.push(item.acceptNum)
    //         this.applyNums.push(item.applyNum)
    //         this.internetApplyNums.push(item.internetApplyNum)
    //       })
    //     })
    //   }
    //   })
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


