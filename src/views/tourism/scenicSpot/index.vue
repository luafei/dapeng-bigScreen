<template>
  <div class="danger">
    <DpHeader :active-on="1">
      <span>旅游-景区</span>
    </DpHeader>
    <div class="daner-left-filter"></div>
    <div class="daner-right-filter"></div>
    <div class="danger-chart">
      <div class="danger-left">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col>
              <PassengerFlowStatistic ></PassengerFlowStatistic>
          </el-col>
          <el-col>
              <PassengerTrend></PassengerTrend>
          </el-col>
          <el-col>
              <PassengerChancePercentage></PassengerChancePercentage>
          </el-col>
        </el-row>
      </div>
      <div class="danger-right">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col>
              <TrafficSituation></TrafficSituation>
          </el-col>
          <el-col>
              <CongestionRanking></CongestionRanking>
          </el-col>
          <el-col>
              <VideoDistribution></VideoDistribution>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- <water-fill-box :car-type="carType"></water-fill-box> -->
  </div>
</template>

<script>
// import Overview from '@/views/components/scenicSpot/overview'
// import ScenicSpotDistribution from '@/views/components/scenicSpot/scenicSpotDistribution'
import PassengerFlowStatistic from '@/views/components/scenicSpot/passengerFlowStatistic'
import PassengerTrend from '@/views/components/scenicSpot/passengerTrend'
import PassengerChancePercentage from '@/views/components/scenicSpot/passengerChancePercentage'
import CongestionRanking from '@/views/components/scenicSpot/congestionRanking'
import TrafficSituation from '@/views/components/scenicSpot/trafficSituation'
import VideoDistribution from '@/views/components/scenicSpot/videoDistribution'
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
    PassengerFlowStatistic,
    PassengerTrend,
    PassengerChancePercentage,
    CongestionRanking,
    TrafficSituation,
    VideoDistribution
  },
  data() {
    return {
      timer: null,
      autoTime: pollingTime,
    };
  },
  inject: ['mapPageVm'],
  created(){
  },
  computed: {
    ...mapGetters(['app'])
  },
  mounted() {
    
  },
  methods: {
    onHandleTitle(){
      this.$router.push({
        name: 'scenicSpotDetail'
      })
    }
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
