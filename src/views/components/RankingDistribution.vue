<template>
  <div class="entrance">
      <sub-title :title="carTitle + '主要路段通行量排名'" @onToggle="handleToggle">
      </sub-title>
      <div class="bar-wrap">
        <Wu-Number :labels="labels" v-show="showIndex === 0" :values="values" @onClickRoadYaxis="onClickRoadYaxis" @onClick="clickWuBar" ></Wu-Number>
        <time-road v-show="showIndex === 1" class="time-road" :option="app.roadList" :time-type="timeType" :init-value="initRoadValue" @onSelectTime="onSelectTime" @onRoadChange="onRoadChange" is-show-right></time-road>
        <wu-line-r  v-show="showIndex === 1" @onClick="clickWuBarTwo" :labels="labels02" :values="values02"></wu-line-r>
      </div>
  </div>
</template>

<script>
import WuNumber from '@/components/echarts/WuNumber'
import WuLineR from '@/components/echarts/WuLineR.vue'
import SubTitle from '@/components/common/SubTitle'
import TimeRoad from '@/components/common/TimeRoad'
import { getMainRoadRank  } from '@/api/dumpTruck'
import { parseTime , findComponentDownward, getCurrentTime } from '@/utils/util'
import { mapGetters } from 'vuex'

export default {
  name: "RankingDistribution",
  components: {
    SubTitle,
    TimeRoad,
    WuNumber,
    WuLineR,
  },
  props: {
    subTitleAlign: {
      type: String,
      default: 'left'
    },
    carType: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      echart: null,
      carTitle:"",
      labels: [],
      values:[],
      showIndex: 0,
      labels02:[],
      values02: [],
      direction: 2,
      roadFlag: 0, //（0-道路，1-出入口，2-沙鱼涌）
      timeType:'day',
      roadName: '',
      subTitleCom: null
    };
  },
  created(){
    if(this.carType === "all"){
      this.carTitle = "车辆监测"
    }
  },
  mounted(){
    this.getList()
    this.subTitleCom = findComponentDownward(this, 'subTitle')
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
        dataTime: parseTime(new Date(), '{y}{m}{d}'),
        carType: this.carType,
      }
      const res = await getMainRoadRank(postData);
      if(res){
        this.labels = []
        this.values = []
        res.data.data.forEach(item => {
          this.labels.push(item.roadName.slice(0,4))
          this.values.push(item.num)
        })
      }
    },
    handleToggle({index}){
      this.showIndex = index
    },
    onSelectTime({type}){
      this.timeType = type
    },
    onRoadChange({roadName}){
      this.roadName = roadName
    },
    clickWuBar(params){
      let { beginTime, endTime} = getCurrentTime('day')
      params.beginTime = beginTime
      params.endTime = endTime
      this.$emit('onClickBar', params)
    },
    clickWuBarTwo(params){
      let { beginTime, endTime} = getCurrentTime(this.timeType, params.name)
      params.beginTime = beginTime
      params.endTime = endTime
      this.$emit('onClickLine', params)
    },
    onClickRoadYaxis(params){
      this.$emit('onClickYaxis', params)
    },
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
      height: 120px;
    }
  }
</style>
