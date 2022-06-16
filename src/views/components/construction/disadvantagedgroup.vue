<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title 
        title="困难人群的补贴分析"
        :on-type="2"
        >
        </sub-title>
        <!-- 下拉框
         is-show-right
         :option="options"
         @onRoadChange="onRoadChange"
         :init-value="beachName"
         -->
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
           week year 
           :time-type="timeType" 
           @onSelectTime="onSelectTime" 
           ></time-road>
          <QinTwoCenter 
          :values= 'values' 
          :labels= 'labels'
          :applyNums= 'applyNums' 
          :internetApplyNums= 'internetApplyNums'></QinTwoCenter>
        </div>
    </div>
    
    
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle2";
import { findComponentDownward, } from "@/utils/util";
// import QinTherrdown from "@/components/echarts/QinTherrdown";
import QinTwoCenter from "@/components/echarts/QinTwoCenter";
import TimeRoad from '@/components/common/TimeRoad'
import { getGovSatisfactionDiagram } from '@/api/gov'
import { getcitybusiness } from '@/api/citynew'


export default {
  name: "disadvantagedgroup",
  components: {
    SubTitle,
    QinTwoCenter,
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
       newlist: '4',
       values:[],
       labels:[],
       applyNums: [],
       internetApplyNums: [],
      //  beachName:'',
      //  options:[],
      //  list: []
       
    };
  },
  mounted() {
    // this.labels= ['申请数','网上申报数', '受理数']
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
    onSelectTime({type}){
        this.timeType = type
        this.getData();
    },
    // filterData(type){
    //   let list = this.list
    //   let result = []
    //   for(let i=0; i<list.length; i++){
    //     if(list[i].indexName === type){
    //       result.push(list[i].applyNum, list[i].internetApplyNum, list[i].acceptNum)
    //       break;
    //     }
    //   }
    //   return result
    //  },
    // onRoadChange({roadName}) {
    //   this.beachName = roadName;
    //   this.values = this.filterData(roadName)
    //    this.getData()
    // }
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
}
</style>


