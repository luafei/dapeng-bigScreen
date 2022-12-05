<template>
  <div class="shark-Road">
      <sub-title  title="沙滩预警" subTitle="停车场车辆来源地分析"  @onToggle="handleToggle" @onRoadChange="onParkChange" :on-type="2" :option="parkList"  :init-value="parkName">
      </sub-title>
      <!-- <ul class="total-computed">
        <li v-for="item in carNumList" :key="item.direction" class="total-item">
          <span class="left">{{item.direction | filterDirectionLabel}}: </span>
          <span class="right">{{item.num}}</span>
        </li>
      </ul> -->
       <div class="block"  v-if="showIndex === 0">
        <el-timeline>
          <el-timeline-item
            v-for="(alarm, index) in alarmList"
            :key="index">
            <div @click="handleItem(alarm)">
              <!-- <span class="point" :class="alarm.type===1?'bg':(alarm.type===2?'bg2':'bg3')">{{index+1}}</span> -->
              <span class="busNumbers">
                {{alarm.alarmTime}} {{alarm.alarmTitle}}
              </span>
              <!-- <div class="busImg">
                <img v-if="activity.type===1" src="../../../assets/images/red.png">
                <img v-if="activity.type===2" src="../../../assets/images/yellow.png">
                <img v-if="activity.type===3" src="../../../assets/images/green.png">
              </div> -->
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
      <el-button-group v-show="showIndex === 1">
        <el-button
          size="mini"
          @click="handleComeInOut(0)"
          class="btn-mini"
          :class="btnIndexSel === 0 && 'btn-mini-sel'"
          type="primary"
        >驶入</el-button>
        <el-button
          size="mini"
          @click="handleComeInOut(1)"
          class="btn-mini"
          :class="btnIndexSel === 1 && 'btn-mini-sel'"
          type="primary"
        >驶出</el-button>
      </el-button-group>
      <WuPieOrigin v-show="showIndex === 1" @clickPie="handlePie" :values="values02"></WuPieOrigin>

  </div>
</template>

<script>
import { getTimeDistribution, getDriveInOutNum,queryDicBusStations } from '@/api/dumpTruck'
import SubTitle from '@/components/common/SubTitle'
import TimeRoad from '@/components/common/TimeRoad'
import WuPieOrigin from '@/components/echarts/WuPieOrigin'
// import busLinearGradient from "@/components/echarts/LinearGradient";
import { findComponentDownward, getCurrentTime, parseTime, getBeachRolesName} from '@/utils/util'
import { getParkFlowDistribution, getParkVehicleSourceRanking, getBeachAlarm } from '@/api/beach'

export default {
  name: "sharkRoadMointor",
  components: {
    SubTitle,
    TimeRoad,
    // busLinearGradient,
    WuPieOrigin
  },
  props: {
    carType: {
      type: String,
      default: ""
    },
    parkList: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      echart: null,
      labels: [],
      values: [],
      maxCar: 0,
      time: [],
      timeType: 'hour',
      timeHour: '',
      timeDay: [],
      timeMonth: [],
      drivingState: 'entrance',
      direction: 0,
      roadName: '',  //坝光收费站
      roadFlag: 2, //（0-道路，1-出入口，2-沙鱼涌）
      carNumList: [],
      subTitleCom: null,
      fishTitle:"",
      parkName: "",
      showIndex: 0,
      values02: [],
      btnIndexSel: 0,
      // busNameList:[]
      alarmList: []
    };
  },
  watch: {
    parkList(newVal){
      if(newVal.length > 0){
        this.parkName = this.parkList[0].value
        this.getList()
      }
    }
  },
  mounted(){
    // this.getList()
    // this.queryDicBusStations()
    this.getBeachAlarm()
    this.subTitleCom = findComponentDownward(this, 'subTitle')
  },
  computed:{
    dataType(){
      const typeMap = {
        hour: 'date',
        day: 'daterange',
        month: 'monthrange'
      }
      return typeMap[this.timeType]
    },
    dateClass(){
      const timeMap = {
        hour: 'dp-date',
        day: 'dp-date-picker',
        month: 'dp-date-picker'
      }
      return timeMap[this.timeType]
    },
  },
  methods:{
    handleToggle({ index }){
      this.showIndex = index
      if(index === 0){
        this.getBeachAlarm()
      }
      if(index === 1){
        this.getParkVehicleSourceRanking()
      }
    },
     handleComeInOut(index) {
      this.btnIndexSel = index;
      this.getParkVehicleSourceRanking()
    },
    async getBeachAlarm(){
      var data = getBeachRolesName();
      const res = await getBeachAlarm(data);
      this.alarmList = res.data.data
    },
    async getParkVehicleSourceRanking(){
      var val = getBeachRolesName();
      let postData = {
        park: this.parkName,
        direction: this.btnIndexSel,
        name: val.name
      }
      const res = await getParkVehicleSourceRanking(postData);
      if(res.data.data){
        this.values02 = res.data.data.map(item => {
          return {
            name: item.vehicleSource === 'other' ? '其它' : item.vehicleSource,
            value: item.num
          }
        })
      }
    },
    onSelectTime({type}){
      this.timeType = type;
      this.getList(null,type)
    },
    changeDatePicker(time){
      this.getList()
    },
    // getTime(){
    //   let result = []
    //   if(this.timeType === 'hour'){
    //     result[0] = this.timeHour || ''
    //     result[1] = this.timeHour ? this.timeHour.replace(/00$/,'23') : ''
    //   }else if(this.timeType === 'day'){
    //     result = this.timeDay || []
    //   }else {
    //     result = this.timeMonth || []
    //   }
    //   return result
    // },
    // async getList(){
    //   let postData = {
    //     park: this.parkName,
    //     timeType: this.timeType,
    //     direction: this.direction,
    //     beginTime: this.getTime()[0] || '',
    //     endTime: this.getTime()[1] || '',
    //     useTime: this.getTime()[0] ? true : false
    //   }
    //   const res = await getParkFlowDistribution(postData);
    //   if(res.data.data){
    //     let {maxNum, name, x, y} = res.data.data
    //     this.labels = x;
    //     this.values = y;
    //     this.maxCar = maxNum;
    //   }else{
    //     this.labels = []
    //     this.values = []
    //     this.maxCar= 0;
    //   }
    // },
    handleWuLine(params){
      let { beginTime, endTime} = getCurrentTime(this.timeType, params.name)
      params.beginTime = beginTime
      params.endTime = endTime
      params.direction = this.subTitleCom.btnIndexSel 
      this.$emit('onClickLine', params)
    },
    onParkChange({roadName:parkName}){
      this.parkName = parkName
      this.getList();
    },
    handlePie(params){
      let { beginTime, endTime} = getCurrentTime('day')
      params.beginTime = beginTime
      params.endTime = endTime
      params.direction = this.subTitleCom.btnIndexSel
      this.$emit('onClickBarTwo', params)
    },
  },
  filters: {
    filterDirectionLabel(val){
      const map = {
        '0': '驶入车辆',
        '1': '驶出车辆'
      }
      return map[val]
    }
  }
};
</script>

<style lang="scss" scoped>
  .shark-Road{
    font-size: 16px;
    .sub-title-left,.sub-title-right{
      display: inline-block;
      font-size: 11px;
      color:rgba(255,255,255,.5);
    }
    .sub-title-left{
      margin-right: 18px;
    }
    .sub-title-right{
      margin-left: 18px;
    }
    .time-road{
      width: 100%;
      margin: 12px 0 10px 0;
    }
    .tips{
      width: 240px;
      height: 22px;
      line-height: 22px;
      text-align: center;
      font-size: 12px;
      color: #fff;
      background: url("../../../assets/images/mudTruck/tips-bg.png") no-repeat;
      background-size: 100% 100%;
    }
    .total-computed{
      margin-top: 5px;
      overflow: hidden;
      .total-item{
        float: left;
        margin-right: 30px;
        .left,.right{
          font-size: 12px;
          color: #fff;
        }
        .right{
          color: #38CEDF
        }
      }
    }
    .dp-date{
      
    }
  }
  .el-button-group{
    margin-bottom: -20px;
    position: relative;
    z-index: 999;
  }
  .btn-mini {
    background: rgba(47, 234, 156, 0.06);
    border-radius: 1px 0px 0px 1px;
    width: 42px;
    height: 15px;
    line-height: 15px;
    font-size: 10px;
    border: none;
    padding: 0;
    span {
      height: 15px;
      line-height: 15px;
    }
  }
  .btn-mini--opacity {
    background: rgba(47, 234, 156, 0.06);
  }
  .btn-mini-sel {
    background: rgba(0, 242, 152, 1);
  }
  .block {
  height: 140px;
  margin: 10px 0;
  padding:5px 10px;
  .el-timeline-item__node--normal {
    background: red;
  }
  overflow-y: auto;
}
.point{
  display:inline-block;
  width:14px;
  height:14px;
  text-align:center;
  margin-right:5px;
  line-height:14px;
  color:#fff;
}
.point.bg{
  background:red;
}
.point.bg2{
  background:yellow;
}
.point.bg3{
  background:green;
}
.busNumbers {
  display: inline-block;
  // background: #ffffff;
  font-size: 12px;
  color:#fff;
}
.busImg{
  width: 20px;
  height: 20px;
  float: right;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
<style lang="scss">
.el-timeline-item{
  padding-bottom: 10px;
}
.el-timeline-item__node{
    background:#32FDF6;
    &::after{
      position: absolute;
      left:-3px;
      top:-3px;
      width:calc(100% + 4px);
      height:calc(100% + 4px);
      content:' ';
      border:1px solid #32FDF6;
      border-radius: 50%;
    }
  }
  .el-timeline-item__tail{
    border-left-color: rgba(50,253,246,0.5);
    border-left-width:4px;
    left:3px;
  }
</style>