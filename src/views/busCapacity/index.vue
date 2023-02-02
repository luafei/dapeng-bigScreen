<template>
  <div class="danger">
    <DpHeader :active-on="0">
      <span>公交运力保障</span>
    </DpHeader>
    <div class="daner-left-filter"></div>
    <div class="daner-right-filter"></div>
    <div class="danger-chart">
      <div class="danger-left">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col>
            <bus-come-in-out class="place"></bus-come-in-out>
          </el-col>
          <el-col>
            <busRankingDistribution
              class="rankingdis"
            />
          </el-col>
          <el-col>
            <busGuarantee @onClickAlarm="handleAlarmItem" class="rankingdis" />
          </el-col>
        </el-row>
      </div>
      <div class="danger-right">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col>
            <busStatistics
              :time="autoTime"
              class="com-item"
              :runingNum="busNum"
            ></busStatistics>
          </el-col>
          <el-col>
            <busDispatch :car-type="carType" class="com-item"></busDispatch>
          </el-col>
          <el-col>
            <RankingDistributionBus class="com-item"></RankingDistributionBus>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- <water-fill-box :car-type="carType"></water-fill-box> -->
    <Warning sub-type="busCapacity"></Warning>
    <CarInfoDialog  :Dialongright = "'1'" :show.sync="showBusStationDialog" :carInfo="busStationInfo"></CarInfoDialog>
  </div>
</template>

<script>
import DpHeader from "@/components/content/DpHeader";
import Warning from "@/components/content/Warning";
import busRankingDistribution from "@/views/components/busCapacity/busRankingDistribution";
import busGuarantee from "@/views/components/busCapacity/busGuarantee";
import busComeInOut from "@/views/components/busCapacity/busComeInOut";
import { findComponentsDownward, getStreetName } from "@/utils/util";
import waterFillBox from "@/views/components/waterFillBox";
import busStatistics from "@/views/components/busCapacity/busStatistics";
import busDispatch from "@/views/components/busCapacity/busDispatch";
import RankingDistributionBus from "@/views/components/RankingDistributionBus";
import { queryDicBusStations, queryBusPassengerAlarmOrder, queryBusPassengerAlarmList } from '@/api/dumpTruck'
import { pollingTime } from '@/config/config'
import CarInfoDialog from '@/views/components/carInfoDialog/index.vue'

const CAR_TYPE = "dangerCar"; //公交运力

export default {
  name: "busCapacity",
  components: {
    DpHeader,
    Warning,
    busComeInOut,
    waterFillBox,
    busRankingDistribution,
    busGuarantee,
    busStatistics,
    busDispatch,
    RankingDistributionBus,
    CarInfoDialog
  },
  inject: ['mapPageVm'],
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
      showBusStationDialog: false,
      busStationInfo: [],
      orderMap: {
        orderIssue: '指令',
        orderFeedBack: '反馈'
      },
      alarmstatMap: {
        0: '未处理',
        10: '已处理'
      },
      busNum: 0
    };
  },
  mounted() {
     console.log('busCapacity moounted')
    let wuBarArr = findComponentsDownward(this, "wu-bar");
    let wuPie = findComponentsDownward(this, "wu-pie");
    this.compArr = wuBarArr.concat(wuPie);
    this.getDicBusStations()
    this.getBusStationsList()
    this.polling();
    this.$on('on-click-busStations', this.showBusStationInfo)
    this.getBusNum()   //获取公交车数量，保持统计统计的实时运营车辆数量一致
  },
  methods: {
    getBusNum(){
      map.getPositioning({
          cluster: {
              clusterUrl: '',
              color: new LongMap.Color('#ffffff'),
              fontSize: 20,
              scale: .6,
              ImgMaxSize: 128,
              depth: false,
              offset: {
                  x: 125,
                  y: 65
              }
          },
          scale: .4,
          time: 60, //单位秒
          imageURL: '',
          type: '公交车',
      }, (e) => {
          this.busNum = e.DPCount
      })
    },
    showBusStationInfo(info){
      this.showBusStationDialog = true;
      this.busStationInfo = []
      let {busStationName, pathwayBus, num, alarmTitle} = info
      this.busStationInfo.push({
        id: 1,
        label: '站点名称：',
        value: busStationName
      },{
        id: 2,
        label: '途经公交车及线路：',
        value: pathwayBus
      },{
        id: 3,
        label: '最新客流量：',
        value: !num ? 0  : num,
        // !num > 0 && num !== 0 
        //!num && num !== 0
        // hide:  !num && num !== 0
      },{
        id: 4,
        label: '公交站预警信息：',
        value: alarmTitle ? alarmTitle : '无'
      })
    },
    async handleAlarmItem({id,time, alarmstat}){
      let postData = {
        alarmId: id
      }
      const res = await queryBusPassengerAlarmOrder(postData)
      //orderType: orderIssue-指令，orderFeedBack-反馈
      let { operateTime, orderType, remark, userName} = res.data.data
      this.showBusStationDialog = true;
      this.busStationInfo = []
      this.busStationInfo.push({
        id:1,
        label: '预警时间：',
        value: time
      },{
        id:2,
        label: '预警状态：',
        value: this.alarmstatMap[alarmstat]
      },{
        id:3,
        label: orderType ? `${this.orderMap[orderType]}：` : '处理结果：',
        value: remark ? remark : '无'
      })
    },
    async getDicBusStations(){
      let postData = {
        existVideo: 1,
        streetName: getStreetName()
      }
      const res = await queryDicBusStations(postData);
      res.data.data.forEach((item) => {
        item.pointType = 'videoBus'
        item.pointCode = item.videoCode,
        item.pointName = item.busStationName
      })
      this.mapPageVm.busStationVideoList = res.data.data
    },
     async getBusStationsList(){
      let postData = {
        existVideo: 0,
        streetName: getStreetName()
      }
      const res = await queryDicBusStations(postData);
      res.data.data.forEach((item) => {
        item.pointType = 'busStations'
        // item.pointCode = item.videoCode
      })
      this.mapPageVm.busStationsList = res.data.data
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
    //刷新公交站人数
    async refreshBusStationPeople(){
      await this.getBusStationsList()
      if(this.mapPageVm.checkFeatures.includes('busStations')){
        // 先清除掉地图图层再添加，防止相同图层叠加
        this.mapPageVm.handleAddBusStations(false)
        this.$nextTick(() => {
          this.mapPageVm.handleAddBusStations(true)
        })
      }
    },
    polling() {
      let busComeInOut = findComponentsDownward(this, "busComeInOut")[0];
      busComeInOut.queryBusStationPassengerRanking();

      this.refreshBusStationPeople()

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
    this.mapPageVm.removeBusLayer()
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
.danger-right {
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
.danger-left {
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
.rankingdis{
  margin-top: 20px;
}
.com-item{
  margin-top: 20px;
}
.Dialongright{
  width: 500px;
  height: 100px;
  border:1px red   ;
}
</style>