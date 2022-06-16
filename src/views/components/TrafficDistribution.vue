<template>
  <div class="traffic-distribution">
    <sub-title :title="showAll ? title : ''" :subTitle="timeRoadTitle + '主要路段通行量时间分布'" :selTitleIndex="index" @onToggle="handleToggle"></sub-title>
    <time-road v-show="showIndex === 1" class="time-road" :option="app.roadList" :time-type="timeType" :init-value="initRoadValue" @onSelectTime="onSelectTime" @onRoadChange="onRoadChange"></time-road>
    <div v-if="carType === 'dangerCar'">
      <WuBarBlocks v-show="showIndex === 0" :values="WuBarBlocksData"></WuBarBlocks>
    </div>
    <div v-if="carType === 'all'">
        <WuBarSubscribe  v-show="showIndex === 0" :labels="lables02" :values="values02"></WuBarSubscribe>
    </div>
    <wu-line-r  v-show="showIndex === 1" @onClick="clickWuBarTwo" :labels="labels" :values="values"></wu-line-r>
  </div>
</template>

<script>
import SubTitle from '@/components/common/SubTitle'
import WuLineR from '@/components/echarts/WuLineR.vue'
import TimeRoad from '@/components/common/TimeRoad'
import WuBarBlocks from '@/components/echarts/WuBarBlocks'
import WuBarSubscribe from '@/components/echarts/WuBarSubscribe'

import { getTimeDistribution, getRoadFlowAllRanking } from '@/api/dumpTruck'
import { getCurrentTime, parseTime } from '@/utils/util'
import { mapGetters } from 'vuex'

export default {
  name: "trafficDistribution",
  components: {
    SubTitle,
    WuLineR,
    TimeRoad,
    WuBarBlocks,
    WuBarSubscribe
  },
  props: {
    title: {
      type: String,
      default: '主要路段通行量'
    },
    carType: {
      type: String,
      default: ""
    },
    showAll: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 1
    },
  },
  data() {
    return {
      echart: null,
      timeType: 'day',
      roadName: 'all',
      direction: 2,
      roadFlag: 0, //（0-道路，1-出入口，2-沙鱼涌）
      labels: [],
      values: [],
      lables02: [],
      values02: [],
      timeRoadTitle:"",
      showIndex: 1,
      WuBarBlocksData: []
    };
  },
  mounted(){
    this.showIndex = this.index
    if(this.carType === "dangerCar"){
      this.timeRoadTitle = "危化品"
    }else if(this.carType === "dumpTruck"){
      this.timeRoadTitle = "泥头车"
    }else if(this.carType === "all"){
      this.timeRoadTitle = "车辆监测"
    }
    this.showIndex === 0 ?  this.getRoadFlowAllRanking() : this.getList()
  },
  computed: {
    ...mapGetters(['app']),
    initRoadValue(){
      return this.app.roadList.length !== 0 ? this.app.roadList[0].label : ''
    }
  },
  methods:{
    async getList(){
      let postData = {
        timeType: this.timeType,
        carType: this.carType,
        direction: this.direction,
        roadName: this.roadName,
        roadFlag: this.roadFlag,
      }
      const res = await getTimeDistribution(postData);
      if(res.data.data.length > 0){
        this.labels = []
        this.values = []
        this.$nextTick(() => {
          this.labels = res.data.data[0].x;
          this.values = res.data.data;
        })
      }
      
    },
    async getReservationNumVehicle(){
      let postData = {
        timeType: this.timeType,
        carType: this.carType,
        direction: this.direction,
        roadName: this.roadName,
        roadFlag: this.roadFlag,
      }
      const res = await getTimeDistribution(postData);
      if(res){
        let result = []
        let data = res.data.data
        this.lables02 = data[0].x
        let length = data[0].y.length
        for(let i = 0; i<length; i++){
          result.push(data.reduce((acc, val) => {
            return acc + val.y[i]
          },0))
        }
        this.values02 = result
      }
    },
    onSelectTime({type}){
      this.timeType = type
      this.getList()
    },
    async getRoadFlowAllRanking(){
      let postData = {
        dataTime: parseTime(new Date().getTime(), '{y}{m}{d}')
      }
      const res = await getRoadFlowAllRanking(postData);
      if(res.data.data){
        this.WuBarBlocksData = []
        this.$nextTick(() => {
          this.WuBarBlocksData = res.data.data
        })
      }
    },
    onRoadChange(){
      // this.roadName = roadName
      // this.getList()
    },
    clickWuBarTwo(params){
      let { beginTime, endTime} = getCurrentTime(this.timeType, params.name)
      params.beginTime = beginTime
      params.endTime = endTime
      params.name = this.roadName;
      this.$emit('onClickBarTwo', params)
    },
    handleToggle({ index }) {
      this.showIndex = index;
      this.getCurrentEchartsData();
    },
    getCurrentEchartsData() {
      if(this.showIndex === 0){
        if(this.carType === 'dangerCar'){
          this.getRoadFlowAllRanking()
          return
        }
        if(this.carType === 'all'){
          this.getReservationNumVehicle()
        }
      }else {
        this.getList();
      }
    },
  }
};
</script>

<style lang="scss">
  .traffic-distribution{
    .time-road{
      margin-top: 0px;
      margin-left: 250px;
      // top:50px;
      // right: 5px;
    }
  }
     
</style>
