<template>
  <div class="road-access">
    <sub-title 
    :title="roadTitle + '主要路段通行量排名'" 
    :subTitle="'工地'+roadTitle+'排名'"
     @onToggle="handleToggle">
    </sub-title>
    <TimeRoad :hour="false" week year :timeType="timeType" @onSelectTime="selectTime" v-if='carType === "dangerCar"' class="time-tab"></TimeRoad>
    <div class="wuNumber">
      <Wu-Number  v-show="showindex === 0" :allTime="allTime" :labels="labels" :values="values" v-on="$listeners" @onClick="clickWuBar" ></Wu-Number> 
    </div>
    <div class="gongdilist">
        <Rankings 
            v-show="showindex === 1"
            ref="chart1"
            :values="values001"  
            :labels="lables001">
        </Rankings>
    </div>
  </div>
</template>
<script>
import SubTitle from '@/components/common/SubTitle'
import { getMainRoadRank,getFlowRanking } from '@/api/dumpTruck'
import { parseTime, getCurrentTime, getStreetName } from '@/utils/util'
import WuNumber from '@/components/echarts/WuNumber'
import Rankings from '../echarts/rankings'
import TimeRoad from "@/components/common/TimeRoad";

export default {
  name: "carsection",
  components: {
    WuNumber,
    SubTitle,
    TimeRoad,
    Rankings
  },
  props: {
    carType: {
      type: String,
      default: ""
    },
    subTitleAlign: {
      type: String,
      default: "left",
    },
  },
  data() {
    return {
      echart: null,
      styles: "",
      labels: [],
      values: [],
      allTime:[],
      parentCom: null,
      roadTitle:"",
      timeType: 'day',
      showindex: 0,
      values001:[11],
      lables001:['asdasda']
    };
  },
  mounted() {
    if(this.carType === "dangerCar"){
      this.roadTitle = "危化品"
    }else if(this.carType === "dumpTruck"){
      this.roadTitle = "泥头车"
    }else if(this.carType === "all"){
      this.comTitle = "车辆监测"
    }
    this.getList()
    this.getData()
  },
  methods:{
    async getList(){
      let postData = {
        dataTime: this.carType === "dangerCar" ? this.timeType : parseTime(new Date(), '{y}{m}{d}'),
        carType: this.carType,
        streetName: getStreetName()
      }
      const res = await getMainRoadRank(postData);
      if(res){
        this.labels = []
        this.values = []
        this.allTime = []
        this.$nextTick(() => {
          res.data.data.forEach(item => {
            this.labels.push(item.roadName.slice(0,4))
            this.values.push(item.num )
            this.allTime.push(item);
          })
        })
      }
    },
    async getData() {
      let postData = {
        carType : this.carType
      }
      const res = await getFlowRanking(postData)
      this.values001 = []
      this.lables001 = []
       this.$nextTick(() => {
         res.data.data.forEach(item => {
          this.lables001.push(item.prjName)
          this.values001.push(item.flowNum)
         })
       })
    },
    clickWuBar(params){
      let { beginTime, endTime} = getCurrentTime('day')
      params.beginTime = beginTime
      params.endTime = endTime
      this.$emit('onClick', params)
    },
    selectTime({type}){
      this.timeType = type
      this.getList()
    },
    handleToggle({index}) {
      this.showindex = index
      if(this.carType === "dumpTruck") {
        
      }
      if (index == 1) {
        this.$nextTick(() => {
          this.$refs.chart1.initChart();
        })
      } 
    }
  }
};
</script>

<style lang="scss" scoped>
  .wuNumber{
    width: 100%;
    .uu{
      background: chocolate;
      height: 90px;
    }
  }
  .gongdilist{
    width: 100%;
  }
  .road-access{
    position: relative;
    .time-tab{
      position: absolute;
      right: 0;
      top: 0;
    }
  }
</style>
