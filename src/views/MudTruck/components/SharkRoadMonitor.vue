<template>
  <div class="shark-Road">
      <ul class="total-computed">
        <li v-for="item in carNumList" :key="item.direction" class="total-item">
          <span class="left">{{item.direction | filterDirectionLabel}}: </span>
          <span class="right">{{item.num}}</span>
        </li>
      </ul>
      <time-road class="time-road" :is--right="false" :time-type="timeType"  @onSelectTime="onSelectTime">
        <template slot="tips">
          <div class="tips">
            近
            <span v-if="timeType === 'hour'">1小时</span>
            <span v-else-if="timeType === 'day'">24小时</span>
            <span v-else>1个月</span>
            车辆变化  / 最高车流量 {{maxCar}}辆
          </div>
        </template>
      </time-road>
      <wu-line :labels="labels" :values="values" @onClick="handleWuLine"></wu-line>
  </div>
</template>

<script>
import { getTimeDistribution, getDriveInOutNum } from '@/api/dumpTruck'
import TimeRoad from '@/components/common/TimeRoad'
import WuLine from '@/components/echarts/WuLine'
import { findComponentDownward, getCurrentTime, parseTime} from '@/utils/util'

export default {
  name: "sharkRoadMointor",
  components: {
    TimeRoad,
    WuLine
  },
  props: {
    carType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      echart: null,
      styles: "",
      labels: [],
      values: [],
      maxCar: 0,
      timeType: 'day',
      drivingState: 'entrance',
      direction: 0,
      roadName: '',  //坝光收费站
      roadFlag: 2, //（0-道路，1-出入口，2-沙鱼涌）
      carNumList: [],
      subTitleCom: null,
      fishTitle:"",
    };
  },
  mounted(){
    this.direction = this.$parent.direction;
    if(this.carType === "dangerCar"){
      this.fishTitle = "危化品"
    }else if(this.carType === "dumpTruck"){
      this.fishTitle = "泥头车"
    }
    // this.getList()
    this.getDriveInOutNum()
    this.subTitleCom = findComponentDownward(this.$parent, 'subTitle')
  },
  methods:{
    onSelectTime({type}){
      this.timeType = type;
      // this.getList()
      this.getDriveInOutNum()
    },
    // async getList(){
    //   let postData = {
    //     timeType: this.timeType,
    //     carType: this.carType,
    //     direction: this.direction,
    //     roadName: "all",
    //     roadFlag: this.roadFlag,
    //   }
    //   const res = await getTimeDistribution(postData);
    //   if(res.data.data.length > 0){
    //     this.labels = res.data.data[0].x;
    //     this.values = res.data.data;
    //     this.maxCar = res.data.data[0].maxNum;
    //     for(let i = 1; i< res.data.data.length; i++){
    //       if(this.maxCar<res.data.data[i].maxNum) {
    //         this.maxCar=res.data.data[i].maxNum;
    //       }
    //     }
    //   }else{
    //     this.labels = []
    //     this.values = []
    //     this.maxCar= 0;
    //   }
    // },
    async getDriveInOutNum(){
      let postData = {
        timeType: this.timeType,
        direction: this.direction
      }
      const res = await getDriveInOutNum(postData)
       if(res.data.data){
        this.labels = res.data.data.x;
        this.values = [{name:'',y:res.data.data.y}];
        this.maxCar = res.data.data.maxNum;
      }else{
        this.labels = []
        this.values = []
        this.maxCar= 0;
      }
    },
    handleWuLine(params){
      let { beginTime, endTime} = getCurrentTime(this.timeType, params.name)
      params.beginTime = beginTime
      params.endTime = endTime
      params.direction = this.subTitleCom.btnIndexSel 
      this.$emit('onClickLine', params)
    }
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
      position: static;
      margin-top: 8px;
    }
    .tips{
      width: 240px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 12px;
      color: #fff;
      background: url('../../../assets/images/mudTruck/tips-bg.png') no-repeat;
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
  }
</style>
