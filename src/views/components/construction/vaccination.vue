<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title 
         title="疫情业务申报排名"
         >
        </sub-title>
        <div class="bar-wrap">
        
          <time-road  
          class="time-road"
           :hour="false"
            week year 
            :time-type="timeType" 
            @onSelectTime="onSelectTime" ></time-road>
         <Qinthreetop
         ref="qintoptow"
         :values="values002"  
         :labels="lables002"></Qinthreetop>
      </div>
    </div>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward, } from "@/utils/util";
// import EvaluationAnalyzeLine from "@/components/echarts/EvaluationAnalyzeLine";
// import QinTop from '@/components/echarts/QinTop'
import Qinthreetop from '@/components/echarts/Qinthreetop'
import TimeRoad from '@/components/common/TimeRoad'
import { getcityOutbreak } from '@/api/citynew'


export default {
  name: "vaccination",
  components: {
    SubTitle,
    // EvaluationAnalyzeLine,
    TimeRoad,
    // QinTop,
    Qinthreetop
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
      timeType: 'year',
      values002:[],
      lables002:[],
    };
  },
  mounted() {
    // this.values002 = [8,6,5,4],
    // this.lables002 = ['大鹏新区应对新型冠状病毒肺炎疫情对文化、体育、旅游业等中小企业贷款利息支持申报','大鹏新区应对新型冠状病毒肺炎肺炎疫情对工业、酒店、餐饮业等中小企业贷款贴息支持','大鹏新区"新型冠状病毒感染应急防治"专项项目省、市配套扶持','大鹏新区规模以上企业复工复产购买防疫综合保险产品保费补贴申报']
    // this.getCurrentEchartsData();
    this.getList()
   this.subTitleCom = findComponentDownward(this, "subTitle");
  },
  methods: {
    async getList () {
      let postData = {
        timeType : this.timeType
      }
    const res = await getcityOutbreak (postData)
    if(res.data.data) {
      this.lables002 = []
      this.values002 = []
      this.$nextTick (() => {
        res.data.data.forEach (item => {
          this.lables002.push(item.commonName)
          this.values002.push(item.num)
        })
      })
    }
    },
    onSelectTime({type}){
      this.timeType = type
      this.getList()
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
    // onComeInOut({ index }) {
    //   this.direction = index;
    //   this.getCurrentEchartsData();
    // }
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
}
</style>


