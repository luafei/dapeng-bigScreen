<template>
  <div class="place-origin">
    <sub-title :title="TimeTitle + '出入口通行量时间分布'" :subTitle="subTitle" @onComeInOut="onComeInOut" @onToggle="handleToggle" is-show-right :roadFlag="roadFlag"></sub-title>
    <time-road v-show="showIndex === 0"  :time-type="timeType" @onSelectTime="onSelectTime" class="time-road"></time-road>
    <wu-bar-two v-show="showIndex === 0" @onClick="clickWuBarTwo" :labels="lables02" :values="values02"></wu-bar-two>
    <!-- <wu-pie  v-show="showIndex === 1" :labels="labels" v-on="$listeners" :values="values" :changeDriveType="changeDriveType"  ></wu-pie> -->
    <div class="wuNumber" v-if="carType === 'dangerCar'">
      <time-road v-show="showIndex === 1" :hour="false" week year :time-type="rankTime" @onSelectTime="onSelectRankTime" class="time-road"></time-road>
      <Wu-Number v-if="showIndex === 1" :allTime="list" :labels="labels" :headers="['排名','公司名称','辆']"  :values="values" v-on="$listeners" id="dangerEnterpriseFlowRank" ></Wu-Number> 
    </div>
    <div v-if="carType === 'dumpTruck'" class="dump-pie-wrap">
      <time-road v-show="showIndex === 1" :hour="false" week year :time-type="rankTime" @onSelectTime="onSelectPieTime" class="time-road"></time-road>
      <wu-pie v-show="showIndex === 1"  :labels="lables03" :values="values03"></wu-pie>
    </div>
  </div>
</template>

<script>
import {getTimeDistribution, getDangerCompanyTrafficFLowRanking, getOriginPlace} from '@/api/dumpTruck'
import SubTitle from '@/components/common/SubTitle'
import WuPie from '@/components/echarts/WuPie'
import WuBarTwo from "@/components/echarts/WuBarTwo";
import TimeRoad from "@/components/common/TimeRoad";
import WuNumber from '@/components/echarts/WuNumber'

import { getCurrentTime,findComponentDownward } from '@/utils/util'
import { mapGetters } from 'vuex'
export default {
  name: 'placeOrigin',
  components:{
    WuPie,
    SubTitle,
    TimeRoad,
    WuBarTwo,
    WuNumber
  },
  props: {
    carType: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
      labels:[],
      values:[],
      changeDriveType:0,
      direction: 0,
      showIndex: 0,
      roadFlag:1,
      lables02:[],
      values02:[],
      timeType: "month",
      roadName: "all",
      TimeTitle: "",
      rankTime: 'day',
      subTitleCom:null,
      list: [],
      lables03: 0,
      values03: 0
    }
  },
  computed: {
      ...mapGetters(['app'])
  },
  mounted(){
    if (this.carType === "dangerCar") {
      this.TimeTitle = "危化品"
      this.getDangerCompanyTrafficFLowRanking()
    } else if (this.carType === "dumpTruck") {
      this.TimeTitle = "泥头车"
    } else if (this.carType === "all") {
      this.TimeTitle = "车辆监测"
    }
    if (this.roadName) {
      this.getList();
    }
    this.subTitleCom = findComponentDownward(this, "subTitle");
  },
  methods:{
    onComeInOut({index}){
      this.changeDriveType = index;
      this.direction = index
      if(this.showIndex === 0){
        this.getList()
      }else {
         if(this.carType === "dangerCar"){
            this.getDangerCompanyTrafficFLowRanking()
            return
          }
          if(this.carType === "dumpTruck"){
            this.getOriginPlace()
            return
          }
      }
    },
    handleToggle({index}){
       this.showIndex = index;
       if(index === 0){
         this.getList();
       }else {
          if(this.carType === "dangerCar"){
            this.getDangerCompanyTrafficFLowRanking()
            return
          }
          if(this.carType === "dumpTruck"){
            this.getOriginPlace()
            return
          }
       }
    },
    async getDangerCompanyTrafficFLowRanking(){
      let postData = {
        timeType: this.rankTime,
        direction: this.direction
      }
      const res = await getDangerCompanyTrafficFLowRanking(postData)
      if(res.data.data){
        this.labels = []
        this.values = []
        this.list = []
        this.$nextTick(() => {
          res.data.data.forEach(item => {
            this.labels.push(item.dangerCompany)
            this.values.push(item.num)
            this.list.push(item)
          })
        })
      }
    },
    async getList(){
      let postData = {
        timeType: this.timeType,
        carType: this.carType,
        direction: this.direction,
        roadName: this.roadName,
        roadFlag: this.roadFlag,
      };
      const res = await getTimeDistribution(postData);
      if (res.data.data.length > 0) {
          this.lables02 = [];
          this.values02 = [];
          // this.$nextTick(() => {
            res.data.data.forEach(item => {
              item.name = item.name.replace('出入口', '')
            })
            this.lables02 = res.data.data[1].x;
            this.values02 = res.data.data;
          // })
      }
    },
    async getOriginPlace(){
      let postData = {
        timeType: this.rankTime,
        direction: this.direction,
        carType: 'dumpTruck'
      }
      const res = await getOriginPlace(postData);
      this.$nextTick(() => {
        if(res.data.data){
            this.lables03 = res.data.data.otherPlace;
            this.values03 = res.data.data.nativeLocation;
        }else{
            this.lables03 = 0;
            this.values03 = 0;
        }
      })
    },
    onSelectTime({ type }) {
        if (this.carType !== "all") {
            this.timeType = type;
            this.getList();
        }
    },
    onSelectRankTime({type}){
      this.rankTime = type
      this.getDangerCompanyTrafficFLowRanking()
    },
    onSelectPieTime({type}){
      this.rankTime = type
      this.getOriginPlace()
    },
    clickWuBarTwo(params) {
      let {
          beginTime,
          endTime
      } = getCurrentTime(this.timeType, params.name);
      params.beginTime = beginTime;
      params.endTime = endTime;
      params.direction = this.subTitleCom.btnIndexSel;
      params.tollName = this.roadName;
      this.$emit("onClickBarTwo", params);
    },
  }
}
</script>

<style lang="scss" socped>
  .wuNumber, .dump-pie-wrap{
    width: 100%;
    .time-road{
      position: static;
      margin: 10px 0 -2px 0;
      height: 22px;
    }
  }
</style>
