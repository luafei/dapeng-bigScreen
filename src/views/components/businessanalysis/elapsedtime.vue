<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title 
         title="耗时分析"
         :on-type="2"
         is-show-right
         :option="options"
         @onRoadChange="onRoadChange"
         :init-value="initVal"
         >
        </sub-title>
        <!-- <el-select
        class="dp-select"
        placeholder="请选择" 
        value=""
        >
        </el-select> -->
        <!-- <div class="bar-wrap"> -->
          <!-- <time-road  
          class="time-road"
           :hour="false"
            week year 
            :time-type="timeType" 
            @onSelectTime="onSelectTime" ></time-road> -->
         <QinLeftDown
         ref="qintoptow"
         :values="values002"  
         :labels="lables002"
         :selectItem="initVal"
         :tiplist="options"></QinLeftDown>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle2";
import { findComponentDownward, } from "@/utils/util";
// import EvaluationAnalyzeLine from "@/components/echarts/EvaluationAnalyzeLine";
// import QinTop from '@/components/echarts/QinTop'
import QinLeftDown from '@/components/echarts/QinLeftDown'
import TimeRoad from '@/components/common/TimeRoad'
import { getGovSatisfactionDiagram } from '@/api/gov'
import {getTimeanalysis} from "@/api/business"


export default {
  name: "elapsedtime",
  components: {
    SubTitle,
    // EvaluationAnalyzeLine,
    TimeRoad,
    // QinTop,
    QinLeftDown
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
      tiplist:[],   
      initVal:"事项平均耗时",
      options:[
        {
          value: "0",
          label: "事项环节",
        },
        {
          value: "1",
          label: "部门事项",
        },
        {
          value: "2",
          label: "即办件事项",
        },
        {
          value: "3",
          label: "事项平均耗时",
          }
      ],
      optionsMap: {
        "事项环节": "0",
        "部门事项": "1",
        "即办件事项": "2",
        "事项平均耗时": "3",
      },

    };
  },
  mounted() {
    this.values002 = [8,6,5,4],
    this.lables002 = ['政府投资项目','在职人才引进','保障性住房轮后申请','人才租房和生活补贴']
    // this.getCurrentEchartsData();
    this.getList("事项平均耗时")
   this.subTitleCom = findComponentDownward(this, "subTitle");
  },
  methods: {
    async onRoadChange({roadName}) {
      this.initVal = roadName
      this.getList(this.initVal)
    },
    async getList (val) {
      let postData = {
        type: this.optionsMap[val]
      }
       const res = await getTimeanalysis (postData)
        if(res) {
          this.values002= []
          this.lables002= []
          this.$nextTick(() => {
          res.data.data.forEach(item => {
            this.values002.push(item.num)
            this.lables002.push(item.commonName)
          })
          })
        }
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
    .bar-wrap {
    height: 200px;
  }
}
</style>


