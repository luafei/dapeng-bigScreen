<template>
  <div class="entrance">
      <sub-title :title="carTitle+'预约数量'"></sub-title>
      <div class="bar-wrap">
        <WuBarSubscribe @onClick="clickWuBar" :labels="lables02" :values="values02"></WuBarSubscribe>
      </div>
  </div>
</template>

<script>
import WuBarSubscribe from '@/components/echarts/WuBarSubscribe'
import SubTitle from '@/components/common/SubTitle'
import {  getTimeDistribution } from '@/api/dumpTruck'
import {  findComponentDownward, getCurrentTime } from '@/utils/util'
import { mapGetters } from 'vuex'

export default {
  name: "SubscribeNumber",
  components: {
    SubTitle,
    WuBarSubscribe,
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
      lables02: [],
      values02: [],
      direction: 0,
      roadFlag: 1, //（0-道路，1-出入口，2-沙鱼涌）
      timeType:"day",
      roadName: 'all',
      subTitleCom: null
    };
  },
  created(){
    if(this.carType === "all"){
      this.carTitle = "车辆监测";
    }
  },
  mounted(){
    this.getTimeDistribution()
    this.subTitleCom = findComponentDownward(this, 'subTitle')
  },
  computed: {
    ...mapGetters(['app']),
    initRoadValue(){
      return this.app.direactionRoadList.length !== 0 ? this.app.direactionRoadList[0].label : ''
    }
  },
  methods:{
    async getTimeDistribution(){
      let postData = {
        timeType: this.timeType,
        carType: this.carType,
        direction: this.direction,
        roadName: this.roadName,
        roadFlag: this.roadFlag,
      }
      const res = await getTimeDistribution(postData)
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
    clickWuBar(params){
      let { beginTime, endTime} = getCurrentTime(this.timeType, params.name)
      params.beginTime = beginTime
      params.endTime = endTime
      this.$emit('onClickBar', params)
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
      height: 120px;
    }
  }
</style>
