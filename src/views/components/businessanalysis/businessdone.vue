<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title 
         title="业务办结率排名"
          :on-type="2"
         is-show-right
         :option="options"
         @onRoadChange="onRoadChange"
         :init-value="'部门办结率'"
         >
        </sub-title>
        <div class="bar-wrap">
          <time-road  
          class="time-road"
           :hour="false"
           week
            year
            :time-type="timeType" 
            @onSelectTime="onSelectTime" ></time-road>
         <QinTherrTop
         :values="values002"  
         :labels="lables002"
         :allTime = allTime>
         </QinTherrTop>
        </div>
    </div>
    <div class="title-time">
        <sub-title 
         title="好差评分析"
         >
        </sub-title>
        <div class="bar-wrap">
          <!-- <el-select
            class="dp-select"
            placeholder="请选择" 
            value=""
          >
           </el-select> -->
          <time-road  
          class="time-road"
           :hour="false"
           week
            year
            :time-type="timeType1" 
            @onSelectTime="onSelectTime1" ></time-road>
         <QinTherrdown :values="values" :labels="labels" :goods="goods" :bads="bads"></QinTherrdown>
        </div>
    </div>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle2";
import { findComponentDownward, } from "@/utils/util";
import QinTwoLeftTop from "@/components/echarts/QinTwoLeftTop"
// import EvaluationAnalyzeLine from "@/components/echarts/EvaluationAnalyzeLine";
// import QinTop from '@/components/echarts/QinTop'
import QinTherrTop from '@/components/echarts/QinTherrTop'
import QinTherrdown from '@/components/echarts/QinTherrdown'
import TimeRoad from '@/components/common/TimeRoad'
import { getbusinranking, getbusingood ,getbusinOvertime, getbusinCompleted } from '@/api/business'


export default {
  name: "businessdone",
  components: {
    SubTitle,
    // EvaluationAnalyzeLine,
    TimeRoad,
    // QinTop,
    QinTherrTop,
    QinTwoLeftTop,
    QinTherrdown
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
      timeType1: 'year',
      values002:[],
      lables002:[],
      values:[],
      labels:[],
      goods:[],
      bads:[],
      allTime:[],
      beachName: "部门按时办结率",
      options: [
        // {
        //   value:'部门超时办结率',
        //   label:'部门超时办结率'
        // },
        {
          value:'部门办结率',
          label:'部门办结率'
        },
        {
          value:'部门按时办结率',
          label:'部门按时办结率'
        }
      ],
      beachName2:'',
      options2: [],
    };
  },
  mounted() {
    // this.values002 = [98.7,98.2,97.3,96.1,95.4],
    // this.lables002 = ['市市场监督局','水务局','住房建设局','教育卫健局','组织人事局']
    // this.getCurrentEchartsData();
    this.getList(this.beachName);
    this.getList1();
  //  this.subTitleCom = findComponentDownward(this, "subTitle");
  },
  watch:{
    // beachList(newVal){
    //   if(newVal.length > 0){
    //      this.beachName = this.beachList[0].value
    //     this.getList(this.beachName)
    //   }
    // },
  },
  methods: {
    //业务办结排名
    async getList(val) {
      let postData = {
       timeType : this.timeType
      }
      let res = null
      if (val === '部门办结率') {
        res = await getbusinranking(postData)
      } else if (val === '部门超时办结率') {
        res = await getbusinOvertime (postData)
      } else if (val === '部门按时办结率') {
        res = await getbusinCompleted(postData)
      }

      if(res.data.data.length > 0) {
        this.lables002 = []
        this.values002 = []
        this.allTime = []
        this.$nextTick (() => {
          res.data.data.forEach(item => {
            this.lables002.push(item.organizationName)
            this.values002.push(item.percent)
            this.allTime.push(item)
          })
        })
      }
    },
    // 好差评率
    async getList1 () {
      let postData = {
        timeType : this.timeType1
      }
      const res = await getbusingood (postData)
      if(res.data.data) {
        this.labels = []
        this.values = []
        this.goods = []
        this.bads = []
        this.$nextTick (() => {
           res.data.data.forEach(item => {
             this.labels.push(item.regionName)
             this.values.push(item.percent)
             this.goods.push(item.good)
             this.bads.push(item.bad)
           })
        })
      }
    },
    onSelectTime({type}){
      this.timeType = type
      this.getList(this.beachName)
    },
    onSelectTime1 ({type}){
      this.timeType1 = type
      this.getList1()
    },
    //下拉框数据
    onRoadChange ({roadName}) {
      this.beachName = roadName;
      this.getList(this.beachName)
    },
    onRoadChange2() {

    }
    // handleToggle({ index }) {
    //   this.showIndex = index;
    //   if (index == 1) {
    //     this.$nextTick(() => {
    //       this.$refs.qintoptow.initChart();
    //     })
    //   } 
      // this.getCurrentEchartsData();
    // },
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
         left: 55%;
         top: -9px;
         transform: translateX(-50%);
    }
    .bar-wrap {
    height: 200px;
  }
}
</style>


