<template>
  <div class="danger">
    <DpHeader :active-on="1">
      <span>景区详情</span>
    </DpHeader>
    <div class="daner-left-filter"></div>
    <div class="daner-right-filter"></div>
    <div class="danger-chart">
      <div class="danger-left">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col>
              <Overview class="overview" :title="'各景区概览'" :subTitle="'各景区分布'"></Overview>
          </el-col>
          <el-col>
              <Overview class="overview" :title="'沙滩概览'" :subTitle="'沙滩概览分布'"></Overview>
          </el-col>
          <el-col>
              <Overview class="overview" :title="'酒店名宿概览'" :subTitle="'酒店名宿概览分布'"></Overview>
          </el-col>
        </el-row>
      </div>
      <div class="danger-right">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col>
              <ScenicSpotDistribution class="overview" :title="'景区视频概览'" :subTitle="'视频分布'" :subtext="'视频总数'"></ScenicSpotDistribution>
          </el-col>
          <el-col>
              <ScenicSpotDistribution class="overview" :title="'交通概览'" :subTitle="'车辆分布'" :subtext="'车辆总数'"></ScenicSpotDistribution>
          </el-col>
          <el-col>
              <ScenicSpotDistribution class="overview" :title="'酒店名宿视频分布'" :subTitle="'酒店民宿分布'" :subtext="'视频总数'"></ScenicSpotDistribution>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- <water-fill-box :car-type="carType"></water-fill-box> -->
  </div>
</template>

<script>
import Overview from '@/views/components/scenicSpot/overview'
import ScenicSpotDistribution from '@/views/components/scenicSpot/scenicSpotDistribution'
import DpHeader from "@/components/content/DpHeader";
import { pollingTime } from '@/config/config'
import { findComponentsDownward } from "@/utils/util";
import { getBeachVideoList } from '@/api/beach'
import store from '@/store'
import {mapGetters} from 'vuex'

const CAR_TYPE = "sandBeach"; //旅游-沙滩

export default {
  name: "sandBeach",
  components: {
    DpHeader,
    Overview,
    ScenicSpotDistribution
  },
  data() {
    return {
      showDialog: false,
      carType: CAR_TYPE,
      initDailogParams: {
        plateNo: "all",
        beginTime: "",
        endTime: "",
        roadFlag: "",
        direction: "all",
        roadName: "all",
        vehicleType: "all",
        videoName: "all",
        tollName: "",
        dialogTitleName: "",
      },
      compArr: [],
      timer: null,
      autoTime: pollingTime,
    };
  },
  inject: ['mapPageVm'],
  created(){
    store.dispatch('GetBeachList')
    store.dispatch('GetparkingList')
  },
  computed: {
    ...mapGetters(['app'])
  },
  mounted() {
    let wuBarArr = findComponentsDownward(this, "wu-bar");
    let wuPie = findComponentsDownward(this, "wu-pie");
    this.compArr = wuBarArr.concat(wuPie);
    this.getBeachVideoList()
    // this.polling();
  },
  methods: {
    async getBeachVideoList(){
      const res = await getBeachVideoList()
      res.data.data.forEach((item) => {
        item.pointType = 'videoAnalysisBeach'
        item.pointCode = item.videoCode,
        item.pointName = item.beach
      })
      this.mapPageVm.beachVideoAnalysisList = res.data.data
    },
    setDialogParams(params) {
      let {
        name,
        direction,
        beginTime,
        endTime,
        nativeLocation,
        roadFlag,
        tollName,
        dialogTitleName,
        vehicleType,
      } = params;
      this.initDailogParams.roadFlag = roadFlag;
      this.initDailogParams.beginTime = beginTime;
      this.initDailogParams.endTime = endTime;
      this.initDailogParams.direction =
        direction === 0 ? direction : direction || "2";
      this.initDailogParams.roadName = name || "";
      this.initDailogParams.tollName = tollName || "";
      if (nativeLocation === 0 || nativeLocation === 1) {
        this.initDailogParams.nativeLocation = nativeLocation;
      } else {
        this.initDailogParams.nativeLocation = "";
      }
      this.initDailogParams.vehicleType = vehicleType;
      this.initDailogParams.dialogTitleName = dialogTitleName;
    },
    reSet() {
      this.initDailogParams = {
        plateNo: undefined,
        beginTime: "",
        endTime: "",
        roadFlag: "",
        direction: "",
        roadName: undefined,
        vehicleType: "all",
        videoName: undefined,
        tollName: "",
        dialogTitleName: "",
      };
    },
    polling() {
      let comeInOut = findComponentsDownward(this, "comeInOut")[0];
      comeInOut.getList();
      comeInOut.getTimeDistribution();

      this.compArr.forEach((item) => {
        if (item) {
          item.eData = [];
          item.initChart();
          const timer02 = setTimeout(() => {
            item.eData = item.values;
            item.initChart();
            clearTimeout(timer02);
          }, 200);
        }
      });

      clearTimeout(this.timer)
      this.timer = setTimeout(this.polling, this.autoTime)
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
.danger {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: auto;
  z-index: 2;
}
@media screen and (max-width: 1400px) {
  .danger {
    height: 100%;
  }
}
.danger-chart {
  height: calc(100% - 70px);
  display: flex;
  justify-content: space-between;
  padding: 0 26px;
}
.danger-left {
  width: 360px;
  pointer-events: auto;
  .today-flow {
    justify-content: space-between;
    margin-bottom: 30px;
  }
  .row-bg {
    flex-direction: column;
    height: 100%;
  }
}
.danger-right {
  width: 360px;
  pointer-events: auto;
  .row-bg {
    flex-direction: column;
    height: 100%;
  }
}
.daner-left-filter,
.daner-right-filter {
  width: 400px;
  height: 100%;

  position: absolute;
  top: 0;
  backdrop-filter: brightness(100%) saturate(100%) grayscale(30%) blur(2px);
  box-shadow: 0px 150px 300px 2px rgba(0, 0, 0, 0.2);
}
.daner-left-filter {
  left: 0;
}
.daner-right-filter {
  right: 0;
}
.overview{
  // height: 180px;
}
</style>
