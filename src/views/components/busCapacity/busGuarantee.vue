<template>
  <div class="entrance singleGuarantee">
    <sub-title title="公交站客流预警" :roadFlag="roadFlag"></sub-title>
    <div class="bar-wrap">
      <div class="block">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :size="activity.size">
            <div @click="handleItem(activity)">
              <span class="point" :class="activity.type===1?'bg':(activity.type===2?'bg2':'bg3')">{{index+1}}</span>
              <span class="busNumbers">
                {{activity.message}}
              </span>
              <div class="busImg">
                <img v-if="activity.type===1" src="../../../assets/images/red.png">
                <img v-if="activity.type===2" src="../../../assets/images/yellow.png">
                <img v-if="activity.type===3" src="../../../assets/images/green.png">
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { queryBusPassengerAlarmList } from "@/api/dumpTruck";
import { findComponentDownward } from "@/utils/util";
export default {
  name: "busGuarantee",
  components: {
    SubTitle,
  },
  props: {
    subTitleAlign: {
      type: String,
      default: "left",
    },
    carType: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      echart: null,
      styles: "",
      direction: 0,
      roadFlag: 1, //（0-道路，1-出入口，2-沙鱼涌）
      subTitleCom: null,
      activities: [],
    };
  },
  mounted() {
    this.queryBusPassengerAlarmList()
    this.subTitleCom = findComponentDownward(this, "subTitle");
  },
  methods: {
    async queryBusPassengerAlarmList() {
      const res = await queryBusPassengerAlarmList()
      if(res.data.data.length > 0){
        this.activities = res.data.data.map((item)=>{
          return {
            id: item.id,
            message : item.alarmtime + " " + item.alarmcontent,
            type:this.alarmlevel == 20 ? 1 : 2,
            alarmstat: item.alarmstat,
            time:item.alarmtime
          }
        })
      }else{
        this.activities = []
      }
    },
    async handleItem(item){
      this.$emit('onClickAlarm',item)
    }
  },
};
</script>

<style lang="scss" scoped>
.entrance {
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
  .bar-wrap {
    height: 150px;
    overflow-y: auto;
    padding: 10px;
  }
}
.block {
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
