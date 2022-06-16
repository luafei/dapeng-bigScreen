<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title 
         title="投诉类型排名"
         :on-type="2"
         is-show-right
         :option="options"
         @onRoadChange="onRoadChange"
         :init-value="initVal"
         >
        </sub-title>
        <div class="bar-wrap">
        
          <!-- <time-road  
          class="time-road"
           :hour="false"
           :day="false"
            year
            :time-type="timeType" 
            @onSelectTime="onSelectTime" ></time-road> -->
        <!-- <el-select
          class="dp-select"
          placeholder="请选择" 
          value=""
        >
        </el-select> -->
         <QinTwoLeftTop
         ref="qintoptow"
         :values="values002"  
         :labels="lables002"></QinTwoLeftTop>
      </div>
    </div>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward, } from "@/utils/util";
import businData from "@/utils/businData.js";
import QinTwoLeftTop from "@/components/echarts/QinTwoLeftTop"
// import EvaluationAnalyzeLine from "@/components/echarts/EvaluationAnalyzeLine";
// import QinTop from '@/components/echarts/QinTop'
import QinLeftDown from '@/components/echarts/QinLeftDown'
import TimeRoad from '@/components/common/TimeRoad'
import { getGovSatisfactionDiagram } from '@/api/gov'


export default {
  name: "complaint",
  components: {
    SubTitle,
    // EvaluationAnalyzeLine,
    TimeRoad,
    // QinTop,
    QinLeftDown,
    QinTwoLeftTop
  },
  props: {
      subTitleAlign: {
      type: String,
      default: 'left'
    },
    carType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      echart: null,
      timeType: 'day',
      values002:[],
      lables002:[],
      initVal: "第一季度",
      options:[
        {
          value: "第一季度",
          label: "第一季度",
        },
        {
          value: "第二季度",
          label: "第二季度",
        },
        {
          value: "第三季度",
          label: "第三季度",
        },
        {
          value: "第四季度",
          label: "第四季度",
        }
      ]
    };
  },
  mounted() {
    this.values002 = businData.quarterOne.type2,
    this.lables002 = ['污染防治','城市建设与住房保障','公共事业','卫生医疗','交通出行']
    // this.getCurrentEchartsData();
    // this.getList()
    // this.renderEcharts()
   this.subTitleCom = findComponentDownward(this, "subTitle");
  },
  methods: {
    onSelectTime({type}){
      this.timeType = type
      // this.getList()
    },
    handleToggle({ index }) {
      this.showIndex = index;
      if (index == 1) {
        this.$nextTick(() => {
          this.$refs.qintoptow.initChart();
        })
      } 
      // this.getCurrentEchartsData();
    },
    renderEcharts (data) {
      this.values002 = data
      this.$refs.qintoptow.initChart();
    },
    onRoadChange(val){
      // businData
      switch (val.roadName) {
        case '第一季度':
          this.renderEcharts(businData.quarterOne.type2)
        break;
        case '第二季度':
          this.renderEcharts(businData.quarterTwo.type2)
        break;
        case '第三季度':
          this.renderEcharts(businData.quarterThree.type2)
        break;
        case '第四季度':
          this.renderEcharts(businData.quarterFour.type2)
        break;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.entrance {
  color: red;
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
  //   .bar-wrap {
  //   height: 100px;
  // }
}
</style>


