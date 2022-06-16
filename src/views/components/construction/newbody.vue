<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title title="人才结构分析"
         :on-type="2"
         is-show-right
         :option="options"
         @onRoadChange="onRoadChange"
         :init-value="initVal">>
        </sub-title>
        <!-- barColors -->
        <!-- <time-road  class="time-road" :hour="false"  :day="false"  year :time-type="timeType" @onSelectTime="onSelectTime" ></time-road> -->
        <!-- :labels="labels" :values="values" :yFormatter="yFormatter" :barColors="barColors" -->
        <Qinbuss ref="qintoptow" :labels="labels" :values="values"></Qinbuss>>
         <!-- <Qin-Two-Left-Down ref="qintoptow" :labels="labels" :values="values"></Qin-Two-Left-Down>> -->
    </div>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward, } from "@/utils/util";
import TimeRoad from '@/components/common/TimeRoad'
import callNumPercentagePie from '@/components/echarts/callNumPercentagePie'
// import QinTwoLeftDown from "@/components/echarts/QinTwoLeftDown";
import subjectDtata from "@/utils/subjectDtata.js";
import Qinbuss from './echarts/Qinbuss'
export default {
  name: "newbody",
  components: {
    SubTitle,
    TimeRoad,
    callNumPercentagePie,
    // QinTwoLeftDown,
    Qinbuss
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
      labels: [],
      values: [],
      // dawang:[],
      // barColors: ['#BBA02C', '#BBE03B']
      initVal: "文化程度",
      options:[
        {
          value:"性别",
          label:"性别"
        },
        {
         value: "年龄结构",
         label: "年龄结构",
        },
        {
          value: "文化程度",
          label: "文化程度",
        },
        {
          value: "专业所属学科",
          label: "专业所属学科",
        },
        {
          value: "技术职称",
          label: "技术职称",
        },
        {
          value: "行业结构",
          label: "行业结构",
        }
      ]
    };
  },
  mounted() {
    // this.values = subjectDtata.quarterOne.type2.num,
    // this.dawang = subjectDtata.quarterOne.type2
    // this.labels = subjectDtata.quarterOne.type2.label,
    this.subTitleCom = findComponentDownward(this, "subTitle");
    // this.onRoadChange("文化程度")
  },
  created() {
    this.onRoadChange({roadName:"文化程度"})
  },
  methods: {
      // yFormatter(val){
      //   return val
      // },
      // onSelectTime({type}){
      //    this.timeType = type
      // },
    //   handleToggle({ index }) {
    //   this.showIndex = index;
    //   if (index == 2) {
    //     console.log(index,'sdaf')
    //     this.$nextTick(() => {
    //       this.$refs.qintoptow.initChart();
    //     })
    //   } 
    //   // this.getCurrentEchartsData();
    // },
      renderEcharts (data) {
      //  this.values = data
      this.labels = []
      this.values = []
      // this.dawang= []
      if(data.length > 0) {
        this.$nextTick(() => {
          data.forEach(item => {
          this.labels.push(item.label)
          this.values.push(item.num)
          // this.dawang.push(item)
        })
          this.$refs.qintoptow.initChart();
        })
      }
      
    },
     onRoadChange(val){
      // subjectDtata
      switch (val.roadName) {
        case '性别':
          this.renderEcharts(subjectDtata.quarterOne.type0)
        break;
        case '年龄结构':
          this.renderEcharts(subjectDtata.quarterOne.type1)
        break;
        case '文化程度':
          this.renderEcharts(subjectDtata.quarterOne.type2)
        break;
        case '专业所属学科':
          this.renderEcharts(subjectDtata.quarterOne.type3)
        break;
         case '技术职称':
          this.renderEcharts(subjectDtata.quarterOne.type4)
        break;
         case '行业结构':
          this.renderEcharts(subjectDtata.quarterOne.type5)
        break;
      }
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


