<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title 
        title="疫情业务分析"
        >
        </sub-title>
         <div class="bar-wrap">
          <time-road  class="time-road" :hour="false" week year :time-type="timeType" @onSelectTime="onSelectTime" ></time-road>
          <Qinepidemicdown :values= 'values' :labels= 'labels' :applyNums= 'applyNums' :internetApplyNums= 'internetApplyNums'></Qinepidemicdown>
        </div>
    </div>
    
    
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward, } from "@/utils/util";
import Qinepidemicdown from "@/components/echarts/Qinepidemicdown";
import TimeRoad from '@/components/common/TimeRoad'
import { getGovSatisfactionDiagram } from '@/api/gov'
import { getcitybusiness } from '@/api/citynew'


export default {
  name: "Rankinganalysis",
  components: {
    SubTitle,
    Qinepidemicdown,
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
       newlist: '5',
       values:[],
       labels:[],
       applyNums: [],
       internetApplyNums: []
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
        timeType : this.timeType,
        indexType: this.newlist
      }
      // const res = getcitybusiness (postData)
      getcitybusiness(postData).then(res => {
        if(res) {
        this.labels = []
        this.values = []
        this.applyNums = []
        this.internetApplyNums = []
        this.$nextTick(() => {
          res.data.data.forEach(item => {
            this.labels.push(item.indexName)
            this.values.push(item.acceptNum)
            this.applyNums.push(item.applyNum)
            this.internetApplyNums.push(item.internetApplyNum)
          })
        })
      }
      })
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
    .bar-wrap {
    height: 200px;
  }
}
</style>


