<template>
<div class="danger">
    <DpHeader :active-on="2">
        <!-- <div>危化品</div> -->
        <span>危化品</span>
    </DpHeader>
    <div class="daner-left-filter"></div>
    <div class="daner-right-filter"></div>
    <div class="danger-chart">
      <div class="danger-left">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col>
            <TodayFlow
              class="today-flow"
              :time="autoTime"
              timeTab
              @handleTodayFlow="handleTodayFlow"
              :car-type="carType"
            ></TodayFlow>
          </el-col>
          <el-col>
            <come-in-out
              @onClickBar="handleComInOutBar"
              @clickPie="handlePlaceOrigin"
              :car-type="carType"
              @onClickBarYaxis="handleEntranceAndRoad"
              class="place"
            ></come-in-out>
          </el-col>
          <el-col>
            <PlaceOrigin
              :car-type="carType"          
              @onClickBarTwo="handleComInOutBarTwo"
              :subTitle="'危险源企业车流量排名分析'"
              class="place-origin"
            ></PlaceOrigin>
          </el-col>
        </el-row>
      </div>
      <div class="danger-right">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col>
            <RoadAccess
              :car-type="carType"
              @onClick="clickRoadAccess"
              @onClickRoadYaxis="handleEntranceAndRoad"
              class="traff"
            ></RoadAccess>
          </el-col>
          <el-col>
            <TrafficDistribution
              show-all
              :index="0"
              :car-type="carType"
              @onClickBarTwo="handleDistributionBarTwo"
              class="traffic-distribution"
            ></TrafficDistribution>
          </el-col>
          <el-col>
            <CartCall
              :car-type="carType"
              initSelectType="疲劳驾驶"
              class="cart-call"
              @onClick="getAlarmStatisticInfo"
            ></CartCall>
          </el-col>
          <el-col>
             <TrackQuery :car-type="carType" :carCode="mapPageVm.originCarInfo.carCode" @removeTrack="handleRemoveTrack" @onTrack="getTrackByPlateNo" class="track-query"></TrackQuery>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- <water-fill-box :car-type="carType"></water-fill-box> -->
    <!-- <Warning></Warning>
    <ThreeNav></ThreeNav>-->
    <Warning sub-type="危化品车辆"></Warning>
    <TabDialog 
    :show="showDialog" 
    :car-type="carType" 
    :init-params="initDailogParams" 
    @onClose=" () => showDialog = false">
    </TabDialog>
    <CarInfoDialog :show.sync="showCarInfo" :carInfo="carInfo"  :Dialongright = "'0'"></CarInfoDialog>
</div>
</template>

<script>
import TabDialog from "@/components/common/TabDialog";
// import MapDialog from '@/components/common/MapDialog'
import DpHeader from "@/components/content/DpHeader";
import Warning from "@/components/content/Warning";

import TodayFlow from "@/views/components/TodayFlow";
import PlaceOrigin from "@/views/components/PlaceOrigin";

import RoadAccess from "@/views/components/RoadAccess";
import TrafficDistribution from "@/views/components/TrafficDistribution";
import CartCall from "@/views/components/CartCall";
import TrackQuery from "@/views/components/TrackQuery";
import ComeInOut from "@/views/components/ComeInOutDanger";
import {
    findComponentsDownward,
    getCurrentTime,
    parseTime
} from "@/utils/util";
import waterFillBox from "@/views/components/waterFillBox";
import CarInfoDialog from '@/views/components/carInfoDialog/index.vue'
import {
    getVehicleList
} from '@/api/dicData'
import { getVehicleAlarmAnalyseDetail } from '@/api/vehicle'
import mapInteractive from '@/views/mixins/mapInteractive.js'
import { carInteractive } from '@/views/mixins/carInteractive.js'
import { pollingTime } from '@/config/config'

const CAR_TYPE = "dangerCar"; //车辆类型：危化品
export default {
    name: "DangerousChemicals",
    components: {
        // MapDialog,
        TabDialog,
        DpHeader,
        Warning,
        TodayFlow,
        PlaceOrigin,
        RoadAccess,
        TrafficDistribution,
        CartCall,
        TrackQuery,
        ComeInOut,
        waterFillBox,
        CarInfoDialog,
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
                tollName: "",
                dialogTitleName: "",
            },
            compArr: [],
            timer: null,
            autoTime: pollingTime,
            carInfo: [],
            originCarInfo: {},
            showCarInfo: false,
            vehicleList: []
        };
    },
    created() {
        this.$on('on-click-car', this.onListenerCarGpsClick)
    },
    mounted() {
        let wuBarArr = findComponentsDownward(this, "wu-bar");
        let wuPie = findComponentsDownward(this, "wu-pie");
        this.compArr = wuBarArr.concat(wuPie);
        this.polling();

        this.mapPageVm.getElectriFanceList('dangerCar') //获取电子围栏列表
    },
    methods: {
        handleRemoveTrack(){
            this.mapPageVm.handleRemoveTrack('trackQuery')
        },
        getTrackByPlateNo(params){
            this.mapPageVm.getTrackByPlateNo(params)
        },
        clickRoadAccess(params) {
            console.log(params,'paramss555')
            this.reSet();
            this.showDialog = true;
            // params.name = ""
            params.dialogTitleName = "危化品" + params.name + "车辆详情";
            // params.columnType = 3;
            if(params.seriesName === "全部车辆"){
                params.columnType = 1;
            }
            this.setDialogParams(params);
        },
        handleComInOutBar(params) {
            this.reSet();
            this.showDialog = true;
            params.roadFlag = 1;
            params.tollName = params.name.split(" ")[1];
            params.name = "";
            // params.tollName = ""
            params.dialogTitleName = "危化品" + params.tollName + "车辆详情";
            params.columnType = 2;
            this.setDialogParams(params);
        },
        handleComInOutBarTwo(params) {
            this.reSet();
            this.showDialog = true;
            params.name = "";
            params.roadFlag = 1;
            // params.seriesName = ""
            params.dialogTitleName = "危化品" + params.seriesName + "车辆详情";
            params.tollName = params.seriesName;
            params.columnType = 2;
            this.setDialogParams(params);
        },
        handleDistributionBarTwo(params) {
            this.showDialog = true;
            this.reSet();
            // params.seriesName = ""
            params.dialogTitleName = "危化品" + params.seriesName + "车辆详情";
            params.name = params.seriesName;
            params.columnType = 3;
            this.setDialogParams(params);
        },
        handleTodayFlow(params) {
            this.showDialog = true;
            this.reSet();
            params.dialogTitleName = "危化品今日" + params.seriesName + "详情";
            if (params.seriesName === "全部车辆") {
                params.columnType = 1;
            }
            this.setDialogParams(params);
        },
        async getAlarmStatisticInfo({name}){
            this.showCarInfo = true
            let postData = {
                plateNo: name
            }
            const res = await getVehicleAlarmAnalyseDetail(postData);
            const {businessName, materiaLName} = res.data.data || {}
            console.log(res.data.data,'res.data.data')
            this.carInfo = [{
                id: 1,
                label: '车牌号：',
                value: name
            },{
                id: 2,
                label: '所属企业：',
                value: businessName || '无'
                
            },{
                id: 3,
                label: '物质名称：',
                value: materiaLName  || '无'
            }]
        },
        handlePlaceOrigin(pieInfo) {
            let {
                componentSubType,
                seriesName
            } = pieInfo;
            // console.log(seriesName,'3')
            if (componentSubType === "pie") {
                this.showDialog = true;
                this.reSet();
                let {
                    beginTime,
                    endTime
                } = getCurrentTime("day");
                let params = {
                    direction: seriesName.indexOf("驶入") !== -1 ? 0 : 1,
                    nativeLocation: seriesName.indexOf("本地") !== -1 ? 0 : 1,
                    beginTime,
                    endTime,
                };
                params.dialogTitleName = "危化品";
                if (seriesName.indexOf("本地") !== -1) {
                    params.dialogTitleName += "本地"
                } else {
                    params.dialogTitleName += "外地"
                }
                if (seriesName.indexOf("驶入") > -1) {
                    params.dialogTitleName += "驶入";
                } else {
                    params.dialogTitleName += "驶出";
                };
                params.dialogTitleName += "车辆详情"
                this.setDialogParams(params);
            }
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
                columnType
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
            this.initDailogParams.columnType = columnType;
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
                vehicleType: "",
                videoName: undefined,
                tollName: "",
                dialogTitleName: "",
            };
        },
        polling() {
            let comeInOut = findComponentsDownward(this, "comeInOut")[0];
            comeInOut.getList();
            comeInOut.getTimeDistribution();

            let placeOrigin = findComponentsDownward(this, "placeOrigin")[0];
            placeOrigin.getList();

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
        maplayers["dangerGoodsguiji"] && removeImportRoad(map)
        clearInterval(this.timer);
    },
    beforeRouteLeave (to, from, next) {
        this.mapPageVm.removeTruckGps()
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
<style lang="scss">
.danger-car-alarm-info .el-dialog{
    margin-left: auto;
}
</style>