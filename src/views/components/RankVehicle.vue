<template>
  <div class="entrance">
      <sub-title :title="carTitle + '车型排名'" :subTitle="carTitle + '来源地'" @onToggle="handleToggle" @onComeInOut="onComeInOut" is-show-right>
      </sub-title>
      <el-select
          class="dp-select"
          popper-class="dp-select-popper"
          v-model="entranceName"
          @change="selectEntrance"
          v-show="showIndex === 0"
          placeholder="请选择"
        >
          <el-option
            v-for="item in app.direactionRoadList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
      </el-select>
      <div class="time-entrance">
        <TimeRoad :hour="false" week year :timeType="timeType" @onSelectTime="selectTime" v-show="showIndex === 1" class="time-tab"></TimeRoad>
        <el-select
            class="dp-select"
            popper-class="dp-select-popper"
            v-model="entranceNameSource"
            @change="selectEntrance"
            placeholder="请选择"
            v-show="showIndex === 1"
          >
            <el-option
              v-for="item in app.direactionRoadList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
        </el-select>
      </div>
      <div class="bar-wrap">
        <WuBarRank v-show="showIndex === 0" @onClick="clickWuBar" :labels="labels" :values="values"></WuBarRank>
        <WuPieOrigin v-show="showIndex === 1" @clickPie="clickWuBarTwo" :values="values02"></WuPieOrigin>
      </div>
      <el-pagination
        class="dp-el-pagination"
        v-show="showIndex === 0"
        small
        layout="prev, pager, next"
        @current-change="currentChange"
        :total="20">
      </el-pagination>
  </div>
</template>

<script>
import WuBarRank from '@/components/echarts/WuBarRank'
import WuPieOrigin from '@/components/echarts/WuPieOrigin'
import SubTitle from '@/components/common/SubTitle'
import TimeRoad from "@/components/common/TimeRoad";
import { queryTodayVehicleTypeRanking,queryTodayVehicleSourceRanking, getTodayVehicleTypeStaticRanking} from '@/api/dumpTruck'
import { parseTime, findComponentDownward, getCurrentTime } from '@/utils/util'
import { mapGetters } from 'vuex'

export default {
  name: "rankVehicle",
  components: {
    WuBarRank,
    SubTitle,
    WuPieOrigin,
    TimeRoad
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
      carTitle:'',
      labels: [],
      values:[],
      showIndex: 0,
      values02: [],
      direction: 0,
      subTitleCom: null,
      entranceName: 'all',
      entranceNameSource: 'all',
      currentPage: 1,
      timeType: 'day'
    };
  },
  created(){
    if(this.carType === "all"){
      this.carTitle = "车辆监测";
    }
  },
  mounted(){
    this.getCurrentEchartsData();
    this.subTitleCom = findComponentDownward(this, 'subTitle')
  },
  computed: {
    ...mapGetters(['app']),
  },
  methods:{
    // 车辆监测  车型数量排名
    async getList(){
      // if(!this.entranceName){
      //   await this.$store.dispatch('GetDirectionRaodList',1)
      // } 
      let postData = {
        dataTime: parseTime(new Date(), '{y}{m}{d}'),
        direction: this.direction,
        tollName: this.entranceName
      }
      let res = await queryTodayVehicleTypeRanking(postData);
      if(res.data.data){
        this.labels = [];
        this.values = [];
        this.labels = res.data.data.map((item)=>{ return item.vehicleTypeName})
        this.values = res.data.data.map((item)=>{ 
          return {
            value:item.num,
            vehicleType:item.vehicleType
        }})
      }
    },
    async getTodayVehicleTypeStaticRanking(){
      let postData = {
        dataTime: parseTime(new Date(), '{y}{m}{d}'),
        direction: this.direction,
        tollName: this.entranceName,
      }
      const res = await getTodayVehicleTypeStaticRanking(postData)
      if(res.data.data){
        this.labels = [];
        this.values = [];
        this.labels = res.data.data.map((item)=>{ return item.vehicleTypeName})
        this.values = res.data.data.map((item)=>{ 
          return {
            value:item.num,
            vehicleType:item.vehicleType
        }})
      }
    },
    currentChange(val){
      this.currentPage = val
      if(val == 1){
        this.getList()
      }else {
        this.getTodayVehicleTypeStaticRanking()
      }
    },
    selectEntrance(val){
      if(this.showIndex === 0){
        this.currentPage === 1 ? this.getList() : this.getTodayVehicleTypeStaticRanking()
      }else {
        this.getOrigin()
      }
    },
    selectTime({type}){
      this.timeType = type
      this.getOrigin()
    },
    // 车辆监测 车辆来源地数量排名
    async getOrigin(){
      let postData = {
        // dataTime: parseTime(new Date(), '{y}{m}{d}'),
        // carType:this.carType,
        direction: this.direction,
        tollName: this.entranceNameSource,
        timeType:  this.timeType,
        vehicleType: this.carType
      }
      const res = await queryTodayVehicleSourceRanking(postData);
      if(res.data.data){
        this.values02 = [];
        let values02 = res.data.data.map((item)=>{
          return {
            name:item.vehicleSource,
            value:item.num
          }
        });
        values02 = values02.sort((itema,itemb)=>{
          if(itema.value > itemb.value){
            return -1;
          }else if(itema.value < itemb.value){
            return 1;
          }else{
            return 0;
          }
        });
        this.values02 =values02;
      }
    },
    handleToggle({index}){
      this.showIndex = index
      this.getCurrentEchartsData()
    },
    // 驶入驶出按钮
    onComeInOut({index}){
      this.direction = index
      this.getCurrentEchartsData()
    },
    // 如果是车辆监测 车辆来源地 
    getCurrentEchartsData(){
      this.showIndex === 1 ? this.getOrigin() : this.getList()
    },
    clickWuBar(params){
      let { beginTime, endTime} = getCurrentTime('day')
      params.beginTime = beginTime
      params.endTime = endTime
      params.direction = this.subTitleCom.btnIndexSel 
      this.$emit('onClickBar', params)
    },
    clickWuBarTwo(params){
      let { beginTime, endTime} = getCurrentTime('day')
      params.beginTime = beginTime
      params.endTime = endTime
      params.direction = this.subTitleCom.btnIndexSel
      this.$emit('onClickBarTwo', params)
    }
  }
};
</script>

<style lang="scss" scoped>
  .entrance{
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
      margin-top: 12px;
    }
    .bar-wrap{
      // height: 120px;
    }
  }
  .dp-el-pagination{
    position: relative;
    z-index: 999;
    margin-top: -30px;
  }
  .dp-select{
    margin-top: 10px;
  }
  .time-entrance{
    display: flex;
    .time-tab{
      position: static;
      margin-right: 20px;
    }
  }
</style>
