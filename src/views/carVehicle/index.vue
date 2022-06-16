<template>
  <div class="danger">
    <DpHeader :active-on="0">
      <span>车辆监测</span>
    </DpHeader>
    <div class="daner-left-filter"></div>
    <div class="daner-right-filter"></div>
    <div class="danger-chart">
      <div class="danger-left">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col>
            <TodayFlow
              class="today-flow"
              timeTab
              :time="autoTime"
              @handleTodayFlow="handleTodayFlow"
              :car-type="carType"
            ></TodayFlow>
          </el-col>
          <el-col>
            <come-in-out
              @onClickBar="handleComInOutBar"
              @onClickBarTwo="handleComInOutBarTwo"
              :car-type="carType"
              class="place"
            ></come-in-out>
          </el-col>
          <el-col>
            <RankVehicle
              @onClickBar="handleRankVehicle"
              @onClickBarTwo="handleRankVehicleTwo"
              :car-type="carType"
            ></RankVehicle>
          </el-col>
        </el-row>
      </div>
      <div class="danger-right">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col>
            <RankingDistribution 
            :car-type="carType" 
            @onClickBar="onClickRankingDistribution"  
            @onClickYaxis="handleEntranceAndRoad"
            class="rankingdis"/>
          </el-col>
           <el-col>
            <TrafficDistribution
              :car-type="carType"
              @onClickBarTwo="handleDistributionBarTwo"
              :showAll="true"
              title="车辆监测预约数量"
              class="traffic-distribution"
            ></TrafficDistribution>
          </el-col>
           <!-- <el-col>
            <SubscribeNumber :car-type="carType" @onClickBar="handleSubNumber" class="sub-number"></SubscribeNumber>
          </el-col> -->
           <el-col>
             <TrackQuery :car-type="carType" :carCode="mapPageVm.originCarInfo.carCode || mapPageVm.originCarInfo.vehicleno" @removeTrack="handleRemoveTrack" @onTrack="getTrackByPlateNo" class="track-query"></TrackQuery>
          </el-col>
        </el-row>
      </div>
    </div>
    <water-fill-box :car-type="carType"></water-fill-box>
    <Warning sub-type="all"></Warning>
    <!-- 弹框内有图片 需要添加切换按钮 -->
    <TabDialog
      :car-type="carType"
      :show="showDialog"
      :init-params="initDailogParams"
      @onClose=" () => showDialog = false"
    ></TabDialog>
  </div>
</template>

<script>
import TabDialog from "@/components/common/TabDialog";
import DpHeader from "@/components/content/DpHeader";
import Warning from "@/components/content/Warning";
import TodayFlow from "@/views/components/TodayFlow";
import RankVehicle from "@/views/components/RankVehicle";
import RankingDistribution from "@/views/components/RankingDistribution";
import TrafficDistribution from "@/views/components/TrafficDistribution";
import ComeInOut from "@/views/components/ComeInOutVer";
import { findComponentsDownward, getCurrentTime} from "@/utils/util";
import waterFillBox from "@/views/components/waterFillBox";
// import SubscribeNumber from "@/views/components/SubscribeNumber";
import TrackQuery from "@/views/components/TrackQuery";
import mapInteractive from '@/views/mixins/mapInteractive.js'
import { pollingTime } from '@/config/config'
const CAR_TYPE = "all"; //车辆监测

export default {
  name: "carVehicle",
  components: {
    // MapDialog,
    TabDialog,
    DpHeader,
    Warning,
    TodayFlow,
    ComeInOut,
    waterFillBox,
    RankVehicle,
    RankingDistribution,
    // SubscribeNumber,
    TrackQuery,
    TrafficDistribution
  },
  inject: ['mapPageVm'],
  mixins: [mapInteractive()],
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
        locationName:'',
        columnType:null,
        tollName: "",
        dialogTitleName: "",
      },
      compArr: [],
      timer: null,
      autoTime: pollingTime,
    };
  },
  mounted() {
    let wuBarArr = findComponentsDownward(this, "wu-bar");
    let wuPie = findComponentsDownward(this, "wu-pie");
    this.compArr = wuBarArr.concat(wuPie);
    this.polling();
    this.$on('on-click-entrance', this.handleEntranceInfo)
  },
  methods: {
    handleRemoveTrack(){
        this.mapPageVm.handleRemoveTrack('trackQuery')
    },
    getTrackByPlateNo(params){
      this.mapPageVm.getTrackByPlateNo(params)
    },
    handleEntranceInfo(feature){
      let { pointName } = feature
      let data = {
        name: pointName,
        direction: 0,
        beginTime: getCurrentTime('day').beginTime,
        endTime: getCurrentTime('day').endTime,
      }
      this.handleComInOutBar(data);
    },
    // 出入口通行量排名
    handleComInOutBar(params) {
      this.reSet();
      this.showDialog = true;
      params.roadFlag = 1;
      params.tollName = params.name;
      params.dialogTitleName = "车辆监测" + params.name + "车辆详情";
      params.name = ""
      this.setDialogParams(params);
    },
    // 出入口通行量时间分布
    handleComInOutBarTwo(params) {
      this.reSet();
      this.showDialog = true;
      params.name = "";
      params.roadFlag = 1;
      params.dialogTitleName = "车辆监测" + params.seriesName + "车辆详情";
      params.tollName = params.seriesName;
      this.setDialogParams(params);
    },
    // 车型排名
    handleRankVehicle(params){
      this.reSet();
      this.showDialog = true;
      params.dialogTitleName = "车辆监测" + params.name + "车辆详情";
      params.tollName = "";
      params.name = '';
      params.vehicleType = params.data.vehicleType;
      this.setDialogParams(params);
    },
    // 车辆来源地
    handleRankVehicleTwo(params){
      this.reSet();
      this.showDialog = true;
      params.dialogTitleName = "车辆监测" + params.name + "车辆详情";
      params.tollName = "";
      params.locationName = params.name;
      params.columnType = 4;
      params.name = '';
      this.setDialogParams(params);
    },
    // 主要路段通行量排名
    onClickRankingDistribution(params){
      this.reSet();
      this.showDialog = true;
      params.roadFlag = 0;
      params.dialogTitleName = "车辆监测" + params.name + "车辆详情";
      params.tollName = "";
      params.direction = "";
      this.setDialogParams(params);
    },
    // 今日车流量
    handleTodayFlow(params) {
      this.showDialog = true;
      this.reSet();
      params.dialogTitleName = "车辆监测今日" + params.seriesName + "详情";
      this.setDialogParams(params);
    },
    // 主要路段通行量时间分布
    handleDistributionBarTwo(params) {
      this.showDialog = true;
      this.reSet();
      // params.seriesName = ""
      params.dialogTitleName = "车辆监测" + params.seriesName + "车辆详情";
      params.name = params.seriesName;
      params.columnType = 3;
      this.setDialogParams(params);
    },
    // 车辆监测预约数量
    handleSubNumber(){
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
        locationName,
        columnType
      } = params;
      if (roadFlag != undefined) {
        this.initDailogParams.roadFlag = roadFlag;
      }else {
        delete this.initDailogParams.roadFlag
      }
      this.initDailogParams.beginTime = beginTime;
      this.initDailogParams.endTime = endTime;
      this.initDailogParams.direction = direction === 0 ? direction : direction || "2";
      this.initDailogParams.roadName = name || "";
      this.initDailogParams.tollName = tollName || "";
      this.initDailogParams.locationName = locationName||'';
      this.initDailogParams.columnType = columnType||null;
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
        locationName:'',
        columnType:null
      };
    },
    polling() {
        let comeInOut = findComponentsDownward(this, "comeInOutVer")[0];
        comeInOut.getList();
        // comeInOut.getTimeDistribution();

        let rankVehicle = findComponentsDownward(this, "rankVehicle")[0];
        rankVehicle.getList();
        rankVehicle.getOrigin()

        let RankingDistribution = findComponentsDownward(this, "RankingDistribution" )[0];
        RankingDistribution.getList();

        let trafficDistribution = findComponentsDownward(this, "trafficDistribution" )[0];
        trafficDistribution.getList();

        // let SubscribeNumber = findComponentsDownward(this, "SubscribeNumber")[0];
        // SubscribeNumber.getTimeDistribution();

        let waterFillBox = findComponentsDownward(this, "waterFillBox")[0];
        waterFillBox.getList();

        let todayFlow = findComponentsDownward(this, "todayFlow")[0];
        todayFlow.getTrafficFlow();

        let Warning = findComponentsDownward(this, "Warning")[0];
        Warning.getWarningInfo();

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
  beforeRouteLeave (to, from, next) {
      this.mapPageVm.removeCarGps()  //删除泥头车图层
      this.mapPageVm.removeTruckGps() //删除危化品图层
      this.mapPageVm.removeBusLayer() //删除公交车图层
      this.mapPageVm.removeTaxiLayer() //删除出租车图层
      next()
  }
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
  // backdrop-filter: blur(1px) brightness(90%);
  // background-color: rgba(0, 0, 0, .1);
  backdrop-filter: brightness(100%) saturate(100%) grayscale(30%) blur(2px);
  box-shadow: 0px 150px 300px 2px rgba(0, 0, 0, 0.2);
}
.daner-left-filter {
  left: 0;
}
.daner-right-filter {
  right: 0;
}
</style>
