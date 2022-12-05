<template>
  <div class="entrance">
    <sub-title title="沙滩预警排名" :subTitle="subTitle" @onToggle="handleToggle" :is-show-right="showIndex === 1" @onComeInOut="onComeInOut"></sub-title>
     <Wu-Number-bus
        :labels="labels02"
        v-show="showIndex === 0"
        :values="values02"
        @onClick="clickWuBar"
      ></Wu-Number-bus>
    <Wu-bar-r-three v-show="showIndex === 1 && showPark" :labels="labels" :values="values"></Wu-bar-r-three>
  </div>
</template>
<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward, getBeachRolesName} from "@/utils/util";
import WuBarRThree from "@/components/echarts/WuBarRThree";
import WuNumberBus from "@/components/echarts/WuNumberBus";
import { getTodayParkFlow, getBeachAlarmRanking } from '@/api/beach'
import { parseTime } from '@/utils/util'

export default {
  name: "sandBeachCall",
  components: {
    SubTitle,
    WuBarRThree,
    WuNumberBus
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
      labels: ['西涌停车场','东涌停车场','较场尾停车场','杨梅坑停车场'],
      values: [],
      subTitleCom: null,
      direction: '0',
      showIndex: 0,
      labels02: [],
      values02: [],
      subTitle: '沙滩停车场今日累计流量',
      showPark: true,
    };
  },
  mounted() {
    this.values = [180,140,120,190,100]
    this.labels=['西涌停车场','东涌停车场','较场尾停车场','杨梅坑停车场']
    this.subTitleCom = findComponentDownward(this, "subTitle");
    var data = getBeachRolesName();
    if (!data.name == '') {
      this.subTitle = '';
      this.showPark = false;
    }
    this.getAlarmRanking()
    this.getData()
  },
  methods: {
    async getAlarmRanking(){
      var val = getBeachRolesName();
      const res = await getBeachAlarmRanking(val)
      this.labels02 = []
      this.values02 = []
      res.data.data.forEach(item => {
        this.labels02.push(item.alarmParam)
        this.values02.push(item.num)
      })
    },
    async getData(){
      let postData = {
        direction: this.direction,
        dataTime: parseTime(new Date().getTime(), '{y}{m}{d}')
      }
      const res = await getTodayParkFlow(postData)
      if(res.data.data){
        // this.labels = []
        this.values = []
        this.$nextTick(() => {
          res.data.data.forEach(item => {
            // this.labels.push(item.park)
            this.values.push(item.num)
          })
        })
      }
    },
    onComeInOut({ index }){
      this.direction = index;
      this.getData()
    },
    handleToggle({index}){
      this.showIndex = index
      if(index === 0){
        this.getAlarmRanking()
      }else{
        this.getData()
      }
    },
    clickWuBar(){

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
  .bus-wrap {
    height: 150px;
    overflow-y: auto;
    .busText {
      float: left;
      font-size: 12px;
      width: 100%;
      text-align: center;
      color: white;
      margin-top: 15px;
      .busTextUl {
        width: 100%;
        li {
          width: 98%;
          margin:1%;
          background:rgba(50,253,246,0.22);
          display: inline-block;
          border: 2px solid rgba(50,253,246,1);
          line-height: 25px;
            cursor:pointer;
            border-radius: 6px;
        }
      }
    }
  }
}
.blockCar {
  height: 150px;
  .el-timeline-item__node--normal {
    background: red;
  }
}
</style>
<style lang="scss">
.entradialog{
  .el-dialog{
    background:rgba(13,69,92,0.7);
    border:2px solid rgba(10,184,235,1);
  }
  .timeMsg{
    text-align:left;color:#fff;
    margin-bottom:10px;
    line-height:16px;
  }
}
</style>
