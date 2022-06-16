<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title 
        title="考核指标分析"
        >
        </sub-title>
        <!-- <time-road  class="time-road" :hour="false" week year :time-type="timeType" @onSelectTime="onSelectTime" ></time-road> -->
    </div>
    <QinTopOneZero 
     ref="qinplay0"
     :values = 'values'
     :lables = 'lables'
    
    ></QinTopOneZero>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward, } from "@/utils/util";
import QinTopOneZero from "@/components/echarts/QinTopOneZero";
import TimeRoad from '@/components/common/TimeRoad'
import { getGovSatisfactionDiagram, gettarget} from '@/api/gov'


export default {
  name: "indexanalysis",
  components: {
    SubTitle,
    QinTopOneZero,
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
      // echart: null,
      // x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
      // series: [],
      // subTitleCom: null,
      // timeType: 'day',
      // yFormatter: function(val, index){
      //   return `${val.toFixed(2)}%`
      // }
      lables:[],
      values:[],
      // aise:[],
      // negat:[],
      // busin:[],
      // Manage:[],
    };
  },
  mounted() {
    // this.subTitleCom = findComponentDownward(this, "subTitle");
    // this.getData();
    // this.lables02= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
    // this.values02= []
    this.getList()
  },
  methods: {
    init () {
      this.$refs.qinplay0.initChart();
    },
    async getList() {
     const res = await gettarget()
     let arrList = res.data.data
     if(res) {
       let valList = []
       this.values = []
       this.lables = []
      //  this.aise = []
      //  this.negat = []
      //  this.busin = []
      //  this.Manage = []
       for(let key in arrList) {
         valList.push(arrList[key])
       }
       this.$nextTick(() => {
          this.values = valList
          // this.lables= valList[1]
          // this.aise= valList[2]
          // this.negat= valList[3]
          // this.busin= valList[4]
          // this.Manage= valList[5]
       })
     }

    },
    // async getData(){
    //   let postData = {
    //     timeType: this.timeType
    //   }
    //   const res = await getGovSatisfactionDiagram(postData);
    //   if(!res.data.data) return
    //   this.series = []
    //   let {x, y, appraise, negative} = res.data.data
    //   this.x = x
    //   y = y.map(item => item*100)
    //   this.series.push({
    //       name: '满意度评价',
    //       type: 'line',
    //       smooth: false,
    //       cursor: "pointer",
    //       showSymbol: false,
    //       lineStyle: {
    //         normal: {
    //           color: '#F0C600'
    //         }
    //       },
    //       data: y
    //   })
    // },
    // onSelectTime({type}){
    //     this.timeType = type
    //     this.getData();
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


