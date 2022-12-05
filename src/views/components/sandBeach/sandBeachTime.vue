<template>
  <div class="entrance">
    <sub-title title="沙滩实时客流量"  @onToggle="handleToggle" :roadFlag="roadFlag" ></sub-title>
    <Qinsand v-if="showIndex === 0" :labels="labels" :values="values"></Qinsand>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward,getBeachRolesName } from "@/utils/util";
import Qinsand from "@/components/echarts/Qinsand";
import { getCurrentBeachPassengers } from '@/api/beach'

export default {
  name: "sandBeachTime",
  components: {
    SubTitle,
    Qinsand,
  },
  props: {
    subTitleAlign: {
      type: String,
      default: "left",
    },
    carType: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      echart: null,
      labels: [],
      values: [],
      roadFlag: 1, //（0-道路，1-出入口，2-沙鱼涌）
      // timeType: parseTime(new Date(), '{y}{m}{d}')
      subTitleCom: null,
      showIndex: 0,
      alarmList: [],
    };
  },
  watch: {
  },
  mounted() {
    this.subTitleCom = findComponentDownward(this, "subTitle");
    this.getData()
  },
  methods: {
    async getData(){
      var data = getBeachRolesName();
      const res = await getCurrentBeachPassengers(data);
      if(res.data.data){
        this.labels = []
        this.values = []
        res.data.data.forEach(item => {
          this.labels.push(item.beach)
          this.values.push(item.num)
        })
      }
    },
    handleToggle({index}){
      this.showIndex = index
      if(index === 0){
        this.getData()
      }
    },
    handleSelectTime({type}) {
      console.log(type,'typp')
     this.timeType = type
     this.getData()
    }
  }
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
  .time-road {
      position: absolute;
      left: 55%;
      top: -10px;
      transform: translateX(-50%);
    }
}

</style>

