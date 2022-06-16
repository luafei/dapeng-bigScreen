<template>
  <div class="entrance">
    <sub-title
     title="公交站实时客流排名"
      :roadFlag="roadFlag"
    ></sub-title> 
    <div class="bar-wrap">
      <wu-bar @onClickBar="clickWuBar" @onClick="videoplay" :labels="busStationName" :values="num"></wu-bar>
    </div>
    <el-dialog
     width="670px"
     top="15vh"
     :title="currentVideoTitle"
     class="innerDialog"
     v-if="videoLiveDialog"
     :visible.sync="videoLiveDialog"
     append-to-body
    >
    <haikanPlayer :width="670" :height="402" :cameraIndexCode="currentVideoCode" :layout="layout"></haikanPlayer>
    </el-dialog>
  </div>
</template>

<script>
import WuBar from "@/components/echarts/WuBar";
import SubTitle from "@/components/common/SubTitle";
import { queryBusStationPassengerRanking } from "@/api/dumpTruck";
import { parseTime, getCurrentTime,} from "@/utils/util";
import haikanPlayer from '@/components/common/haikanPlayer/index'

export default {
  name: "busComeInOut",
  components: {
    WuBar,
    SubTitle,
    haikanPlayer
  },
  props: {
    carType: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      echart: null,
      direction: 2,
      roadFlag: 1, //（0-道路，1-出入口，2-沙鱼涌）
      busStationName:[],
      num:[1],
      time:parseTime(new Date(), '{y}-{m}-{d}'),
      currentVideoTitle:'',
      videoLiveDialog:false,
      currentVideoCode:'',
      layout:'1x1',
      sdd:''
    };
  },
  mounted() {
    this.queryBusStationPassengerRanking();
  },
  methods: {
    async queryBusStationPassengerRanking(){
        let postData = {
          time:this.time
        }
        const res = await queryBusStationPassengerRanking(postData)
        this.num = [];
        this.busStationName = [];
        // this.currentVideoCode= []
        if (res) {
          this.sdd = res.data.data
          res.data.data.forEach((item) => {
            this.busStationName.push(item.busStationName)
            this.num.push(Number(item.num))
          });
      }
    },
    clickWuBar(params) {
      let { beginTime, endTime } = getCurrentTime("day");
      params.beginTime = beginTime;
      params.endTime = endTime;
      params.direction = this.direction;
      this.$emit("onClickBar", params);
    },
    videoplay(val){
    let ass = this.sdd.filter((item) => {
      return  val.value === item.busStationName 
    })
    this.showVideoOfNotStructureData(ass[0].videoCode,val.value)
    },
    showVideoOfNotStructureData(videoCode,videoName) {
      this.videoLiveDialog= true
      this.currentVideoCode = videoCode
      this.currentVideoTitle = videoName
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
    height: 120px;
  }
}
</style>
