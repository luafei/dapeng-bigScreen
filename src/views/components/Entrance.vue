<template>
  <div class="entrance">
      <sub-title :title="title" :subTitle="subTitle" :sel-title-index="$attrs.index" is-show-right>
      </sub-title>
      <time-road class="time-road"></time-road>
      <wu-bar-two></wu-bar-two>
  </div>
</template>
<script>
import WuBarTwo from '@/components/echarts/WuBarTwo'
import SubTitle from '@/components/common/SubTitle'
import TimeRoad from '@/components/common/TimeRoad'

export default {
  name: "Entrance",
  components: {
    WuBarTwo,
    SubTitle,
    TimeRoad
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    subTitleAlign: {
      type: String,
      default: 'left'
    }
  },
  data() {
    return {
      echart: null,
      styles: "",
      list: []
    };
  },
  mounted(){
    if(this.carType === "dangerCar"){
      this.comTitle = "危化品"
    }else if(this.carType === "dumpTruck"){
      this.comTitle = "泥头车"
    }
  },
  methods:{
    
  },
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
  }
</style>
