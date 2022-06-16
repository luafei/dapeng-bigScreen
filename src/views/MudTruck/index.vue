<template>
  <div class="danger" id="MudTruck">
    <DpHeader :active-on="2">
      <!-- <div>泥头车</div> -->
      <span>泥头车</span>
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
              @handleTodayFlow="handleTodayFlow"
              :car-type="carType"
              :time="autoTime"
            ></TodayFlow>
          </el-col>
          <el-col>
            <come-in-out
              @onClickBar="handleComInOutBar"
              @onClickBarTwo="handleSharkRaodLine"
              @onClickBarYaxis="handleEntranceAndRoad"
              :car-type="carType"
            ></come-in-out>
          </el-col>
          <el-col>
            <!-- <shark-road-monitor
              :car-type="carType"      
              @onClickLine="handleComInOutBarTwo"
              class="shark-road-monitor"
            ></shark-road-monitor> -->
            <PlaceOrigin
              :car-type="carType"      
              @onClickLine="handleComInOutBarTwo"
              subTitle="车辆来源地驶入、驶出分析"
              class="place-origin"
              >
            </PlaceOrigin>
          </el-col>
        </el-row>
      </div>
      <div class="danger-right">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col>
            <carsection 
            :car-type="carType" 
            @onClick="clickRoadAccess"   
            @onClickRoadYaxis="handleEntranceAndRoad">
            </carsection>
          </el-col>
          <el-col>
            <TrafficDistribution
              :car-type="carType"
              @onClickBarTwo="handleDistributionBarTwo"
              class="traffic-distribution"
            ></TrafficDistribution>
          </el-col>
          <el-col>
            <CartCall :car-type="carType" initSelectType="疲劳驾驶" class="cart-call" @onClick="getAlarmStatisticInfo"></CartCall>
          </el-col>
          <el-col>
            <TrackQuery :car-type="carType" :carCode="mapPageVm.originCarInfo.vehicleno" @removeTrack="handleRemoveTrack" @onTrack="getTrackByPlateNo" class="track-query"></TrackQuery>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- <water-fill-box :car-type="carType"></water-fill-box> -->
    <Warning sub-type="泥头车"></Warning>
    <!-- <ThreeNav></ThreeNav> -->

    <TabDialog
      :show="showDialog"
      :init-params="initDailogParams"
      @onClose=" () => showDialog = false"
      :car-type="carType"
    ></TabDialog>
    <CarInfoDialog :show.sync="showCarInfo" :carInfo="carInfo" :Dialongright = "'0'">
        
    </CarInfoDialog>
  </div>
</template>

<script>
// import { getMapVideoPoint } from "@/api/dumpTruck";

import DpHeader from "@/components/content/DpHeader";
import Warning from "@/components/content/Warning";
// import ThreeNav from "@/components/content/ThreeNav";

import TodayFlow from "@/views/components/TodayFlow";
import ComeInOut from "@/views/components/ComeInOutMud";
import PlaceOrigin from '@/views/components/PlaceOrigin'

// import RoadAccess from "@/views/components/RoadAccess";
import carsection from "./components/carsection"
import TrafficDistribution from "@/views/components/TrafficDistribution";
import CartCall from "@/views/components/CartCall";
import TrackQuery from "@/views/components/TrackQuery";
// import SharkRoadMonitor from "./components/SharkRoadMonitor";
import TabDialog from "@/components/common/TabDialog";
import { findComponentsDownward, parseTime } from "@/utils/util";
import mapInteractive from '@/views/mixins/mapInteractive.js'

import waterFillBox from "@/views/components/waterFillBox";
import CarInfoDialog from '@/views/components/carInfoDialog/index.vue'
// import { vehicleAlarmType } from '@/const/dicData' 
import { pollingTime } from '@/config/config'
import { getVehicleAlarmAnalyseDetail } from '@/api/vehicle'

// import WuPieSmall from '@component/echarts/WuPieSmall'
const CAR_TYPE = "dumpTruck"; //车辆类型：危化品

export default {
  name: "DumpTruck",
  components: {
    DpHeader,
    Warning,
    // ThreeNav,
    TodayFlow,
    ComeInOut,
    // RoadAccess,
    TrafficDistribution,
    CartCall,
    TrackQuery,
    // SharkRoadMonitor,
    TabDialog,
    waterFillBox,
    PlaceOrigin,
    CarInfoDialog,
    carsection
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
        direction: "all",
        roadName: "all",
        vehicleType: "all",
        videoName: "all",
        roadFlag: "",
      },
      latitude: "",
      longitude: "",
      showIconUrl: "",
      result: [],
      video: require("@/assets/images/video.png"),
      dumper: require("@/assets/images/dumper.png"),
      dangerous: require("@/assets/images/dangerous.png"),
      compArr: [],
      timer: null,
      autoTime: pollingTime,
      dialogTitleName: "",
      carInfo: [],
      // originCarInfo: {
      //   carCode: ''
      // },
      showCarInfo: false
    };
  },
  created() {
    this.$on('on-click-car',this.onListenerCarGpsClick)
  },
  mounted() {
    let wuBarArr = findComponentsDownward(this, "wu-bar");
    let wuLine = findComponentsDownward(this, "wu-line");
    this.compArr = wuBarArr.concat(wuLine);

    this.polling();

    this.mapPageVm.getElectriFanceList('dumpTruck') //获取电子围栏列表
  },
  methods: {
    async getAlarmStatisticInfo({name}){
      this.showCarInfo = true
      let postData = {
          plateNo: name
      }
      const res = await getVehicleAlarmAnalyseDetail(postData);
      const {vehicleColo, comName} = res.data.data || {}
      this.carInfo = [{
          id: 1,
          label: '车牌号：',
          value: name
      },{
          id: 2,
          label: '车辆颜色：',
          value: vehicleColo || '无'
      },{
          id: 3,
          label: '所属企业：',
          value: comName || '无'
      }]
    },
    handleRemoveTrack(){
      this.mapPageVm.handleRemoveTrack('trackQuery')
    },
    getTrackByPlateNo(params){
      this.mapPageVm.getTrackByPlateNo(params)
    },
    // 车辆详情11
    clickRoadAccess(params) {
      this.reSet();
      this.showDialog = true;
      params.dialogTitleName = "泥头车" + params.name + "车辆详情";
      // params.name = ""
      // params.columnType = 3;
      // this.setDialogParams(params);
       if(params.seriesName === "全部车辆"){
        params.columnType = 1;
      }
      //  params.seriesName = ""
      this.setDialogParams(params);
    },
    handleComInOutBar(params) {
      this.reSet();
      this.showDialog = true;
      params.roadFlag = 1;
      params.tollName = params.name.split(" ")[1];
      params.name = "";    
      params.dialogTitleName = "泥头车"+params.tollName+"车辆详情";
      params.columnType = 2;
      this.setDialogParams(params);
    },
    handleComInOutBarTwo(params) {
      this.reSet();
      this.showDialog = true;
      params.name = "";
      params.roadFlag = 1;
      params.dialogTitleName = "泥头车"+params.seriesName+"车辆详情";
      params.tollName = params.seriesName;
      params.columnType = 2;
      this.setDialogParams(params);
    },
    handleDistributionBarTwo(params) {
      this.showDialog = true;
      this.reSet();
      params.dialogTitleName = "泥头车" + params.seriesName + "车辆详情";
      params.name = params.seriesName;
      params.columnType = 3;
      params.seriesName = ""
      this.setDialogParams(params);
    },
    handleSharkRaodLine(params) {
      this.showDialog = true;
      this.reSet();
      params.name = "";
      params.roadFlag = 2;
      params.seriesName = ""
      params.dialogTitleName = "泥头车" + params.seriesName + "沙鱼涌监测";
      this.setDialogParams(params);
    },
    // 详情222
    handleTodayFlow(params) {
      this.showDialog = true;
      this.reSet();
      params.dialogTitleName = "泥头车今日" + params.seriesName + "详情";
      if(params.seriesName === "全部车辆"){
        params.columnType = 1;
      }
      params.seriesName = ""
      this.setDialogParams(params);
    },
    setDialogParams(params) {
      let {
        name,
        direction,
        beginTime,
        endTime,
        nativeLocation,
        tollName,
        roadFlag,
        dialogTitleName,
        columnType
      } = params;
      this.initDailogParams.roadFlag = roadFlag;
      this.initDailogParams.beginTime = beginTime;
      this.initDailogParams.endTime = endTime;
      this.initDailogParams.direction =
        direction === 0 ? direction : direction || "2";
      this.initDailogParams.roadName = name || "";
      this.initDailogParams.tollName = tollName || "";
      // this.initDailogParams.nativeLocation = nativeLocation || 2
      if (nativeLocation === 0 || nativeLocation === 1) {
        this.initDailogParams.nativeLocation = nativeLocation;
      } else {
        this.initDailogParams.nativeLocation = "";
      }
      this.initDailogParams.dialogTitleName = dialogTitleName;
      this.initDailogParams.columnType = columnType;
    },
    reSet() {
      this.initDailogParams = {
        plateNo: undefined,
        beginTime: "",
        endTime: "",
        direction: "",
        roadName: undefined,
        vehicleType: "",
        videoName: undefined,
        tollName: "",
        roadFlag: "",
      };
    },
    polling() {
        let comeInOut = findComponentsDownward(this, "comeInOut")[0];
        if(ComeInOut.showIndex === 1){
          comeInOut.timeChange = new Date().getTime();
        }else{
          comeInOut.getList()
        }

        // let sharkRoadMointor = findComponentsDownward(
        //   this,
        //   "sharkRoadMointor"
        // )[0];
        // sharkRoadMointor.getList();

        let roadAccess = findComponentsDownward(this, "roadAccess")[0];
        roadAccess.getList();

        let trafficDistribution = findComponentsDownward(
          this,
          "trafficDistribution"
        )[0];
        trafficDistribution.getList();

        let carCall = findComponentsDownward(this, "carCall")[0];
        carCall.getList();

        // let waterFillBox = findComponentsDownward(this, "waterFillBox")[0];
        // waterFillBox.getList();

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

        //刷新地图出入口数据
        this.mapPageVm.refreshEntranceAndRoadData()

      clearTimeout(this.timer)
      this.timer = setTimeout(this.polling, this.autoTime)
    },
  },
  beforeDestroy() {
    maplayers["dumpTrucksguiji"] && removeImportRoad(map)
    clearInterval(this.timer);
  },
  beforeRouteLeave (to, from, next) {
    this.mapPageVm.removeCarGps()
    next()
  }
};
</script>

<style lang="scss">
.danger,
#MudTruck {
  position: absolute;
  height: 100%;
  width: 100%;
}
@media screen and (max-width: 1400px) {
  .danger {
    height: 100%;
  }
}
.danger-chart {
  height: calc(100% - 70px);
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0 26px;
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
.danger-left {
  width: 360px;
  pointer-events: auto;
  .today-flow {
    margin-bottom: 20px;
  }
  .shark-road-monitor {
    // margin-top: 20px;
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
  .danger-center {
    width: 200px;
    height: 200px;
    background: red;
  }
}
</style>
<style lang="scss">
.mudTruck-alarm-info .el-dialog{
    margin-left: auto;
}
</style>
