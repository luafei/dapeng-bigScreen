<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title 
        title="人才引进环节 "
        subTitle="人才引进后续补贴"
        @onToggle="handleToggle"
        >
        </sub-title>
         <div class="bar-wrap">
          <time-road  class="time-road" v-show="showindex === 0" :hour="false" week year :time-type="timeType" @onSelectTime="onSelectTime" ></time-road>
          <QinTherrdowntwo
          :values= 'values' 
          :labels= 'labels'
          :applyNums= 'applyNums' 
          :internetApplyNums= 'internetApplyNums'
          v-show="showindex === 0"
          ></QinTherrdowntwo>
        </div>
        <div class="bar-wrap">
          <time-road  class="time-road" v-show="showindex === 1" :hour="false" week year :time-type="timeType2" @onSelectTime="onSelectTime01" ></time-road>
          <QinTherrdownThree
          v-if="showindex === 1"
          :values= 'values01' 
          :labels= 'labels01'
          :applyNums= 'applyNums01' 
          :internetApplyNums= 'internetApplyNums01'></QinTherrdownThree>
        </div>
    </div>
    
    
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward, } from "@/utils/util";
import QinTherrdowntwo from "@/components/echarts/Qintherrdowntwo";
import QinTherrdownThree from "@/components/echarts/QinTherrdownThree";
import TimeRoad from '@/components/common/TimeRoad'
import { getGovSatisfactionDiagram } from '@/api/gov'
import { getcitybusiness} from '@/api/citynew'

export default {
  name: "accept",
  components: {
    SubTitle,
    QinTherrdowntwo,
    TimeRoad,
    QinTherrdownThree
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
      timeType2:'year',
       subTitleCom: null,
       echart: null,
       newlist:'1',
       newtwolist:'2',
       values:[],
       labels:[],
       applyNums: [],
       internetApplyNums: [],
       values01:[],
       labels01:[],
       applyNums01: [],
       internetApplyNums01: [],
       showindex:0
    };
  },
  mounted() {
     this.getData()
     this.getList()
  },
  methods: {
    init () {
      this.$refs.qinplay0.initChart();
    },
    handleToggle({index}) {
      this.showindex  = index
    },
    async getData(){
      let postData = {
        timeType : this.timeType,
        indexType: this.newlist
      }
       getcitybusiness(postData).then(res => {
        if(res) {
        let addList = res.data.data
          this.values= []
          this.labels= []
          this.applyNums= []
          this.internetApplyNums = []
        this.$nextTick(() => {
          addList.forEach(item => {
            this.labels.push(item.indexName)
            this.values.push(item.acceptNum)
            this.applyNums.push(item.applyNum)
            this.internetApplyNums.push(item.internetApplyNum)
          })
        })
      }
      })
    },
    async getList(){
      let postData = {
        timeType : this.timeType2,
        indexType: this.newtwolist
      }
       getcitybusiness(postData).then(res => {
        if(res) {
        let addList = res.data.data
          this.values01= []
          this.labels01= []
          this.applyNums01= []
          this.internetApplyNums01 = []
        this.$nextTick(() => {
          addList.forEach(item => {
            this.labels01.push(item.indexName)
            this.values01.push(item.acceptNum)
            this.applyNums01.push(item.applyNum)
            this.internetApplyNums01.push(item.internetApplyNum)
          })
        })
      }
      })
    },
    onSelectTime({type}){
        this.timeType = type
        this.getData();
    },
    onSelectTime01({type}){
      this.timeType2 = type
      this.getList()
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


