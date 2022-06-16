<template>
  <div class="danger">
    <!-- 示范路段 -->
    <DpHeader :active-on="2">
      <!-- <div>危化品</div> -->
      <span>示范路段</span>
    </DpHeader>
    <div class="daner-left-filter"></div>
    <div class="daner-right-filter"></div>
    <div class="danger-chart">
      <div class="danger-left">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col>
            <!-- <TodayFlow
              class="today-flow"
              :time="autoTime"
              timeTab
              @handleTodayFlow="handleTodayFlow"
              :car-type="carType"
            ></TodayFlow> -->
            <!-- 车辆总体指标 -->
            <Target class="today-flow" />
          </el-col>
          <el-col>
            <!-- <come-in-out
              @onClickBar="handleComInOutBar"
              @clickPie="handlePlaceOrigin"
              :car-type="carType"
              @onClickBarYaxis="handleEntranceAndRoad"
              class="place"
            ></come-in-out> -->
            <!-- 备案车辆企业 -->
            <Enterprise @onClick="getEnterpriseInfo" />
          </el-col>
          <el-col>
            <!-- <PlaceOrigin
              :car-type="carType"          
              @onClickBarTwo="handleComInOutBarTwo"
              :subTitle="'危险源企业车流量排名分析'"
              class="place-origin"
            ></PlaceOrigin> -->
            <!-- 预警车辆列表 -->
            <Warn />
          </el-col>
        </el-row>
      </div>
      <div class="danger-right">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col>
            <!-- <RoadAccess
              :car-type="carType"
              @onClick="clickRoadAccess"
              @onClickRoadYaxis="handleEntranceAndRoad"
              class="traff"
            ></RoadAccess> -->
            <TargetTwo class="today-flow" />
          </el-col>
          <el-col>
            <!-- <TrafficDistribution
              show-all
              :index="0"
              :car-type="carType"
              @onClickBarTwo="handleDistributionBarTwo"
              class="traffic-distribution"
            ></TrafficDistribution> -->
            <!-- 各工地排放情况 -->
            <Emission @onClick="getEmissionInfo" />
          </el-col>
          <el-col>
            <!-- <CartCall
              :car-type="carType"
              initSelectType="疲劳驾驶"
              class="cart-call"
              @onClick="getAlarmStatisticInfo"
            ></CartCall> -->
            <!-- 工地电子联单分析 -->
            <Contrast />
          </el-col>
          <el-col>
            <!-- <TrackQuery :car-type="carType" :carCode="mapPageVm.originCarInfo.carCode" @removeTrack="handleRemoveTrack" @onTrack="getTrackByPlateNo" class="track-query"></TrackQuery> -->
          </el-col>
        </el-row>
      </div>
    </div>
    <InfoDialog
      :show.sync="showCarInfo"
      :carInfo="carInfo"
      :Dialongright="'0'"
    ></InfoDialog>
    <SiteDialog :carInfo='EmissionInfo' :show.sync="showCarSite" :Dialongright="'0'"></SiteDialog>
  </div>
</template>
<script>
import DpHeader from '@/components/content/DpHeader'
import Target from './components/Target'
import Enterprise from './components/Enterprise'
import TargetTwo from './components/targetTwo.vue'
import Warn from './components/Warn'
import Emission from './components/Emission'
import Contrast from './components/Contrast'
import mapInteractive from '@/views/mixins/mapInteractive.js'
import InfoDialog from './popup/InfoDialog.vue'
import SiteDialog from './popup/siteDialog'
import { getQueryNTCRecordsCompanyDetail,getQueryNTCSiteDischargeDetail } from '../../api/example.js'
const CAR_TYPE = 'demonstration' //车辆类型：危化品
export default {
  name: 'DemonstrationSection',
  components: {
    DpHeader,
    Target,
    Enterprise,
    TargetTwo,
    Warn,
    Emission,
    Contrast,
    InfoDialog,
    SiteDialog
  },
  inject: ['mapPageVm'],
  mixins: [mapInteractive()],
  data () {
    return {
      showCarInfo: false,
      showCarSite: false,
      carType: CAR_TYPE,
      carInfo: [],
      EmissionInfo:[],
    }
  },
  mounted () {
    this.polling()
    this.mapPageVm.getElectriFanceList('dangerCar') //获取电子围栏列表s
  },
  methods: {
    async getEnterpriseInfo ({ name }) {
      this.showCarInfo = true
      let postData = {
        companyName: name
      }
      const res = await getQueryNTCRecordsCompanyDetail(postData)
      this.carInfo = res.data.data
      // console.log(this.carInfo, '数据来了')
    },
    async getEmissionInfo ({name}) {
      let postData={
        siteName:name
      }
      this.showCarSite = true
      const res=await getQueryNTCSiteDischargeDetail(postData)
      this.EmissionInfo=res.data.data
      // console.log(name,'这是深么?');
      
    },
    polling () {
      let comeInOut = findComponentsDownward(this, 'comeInOut')[0]
      comeInOut.getList()
      comeInOut.getTimeDistribution()

      let placeOrigin = findComponentsDownward(this, 'placeOrigin')[0]
      placeOrigin.getList()

      let roadAccess = findComponentsDownward(this, 'roadAccess')[0]
      roadAccess.getList()

      let trafficDistribution = findComponentsDownward(
        this,
        'trafficDistribution'
      )[0]
      trafficDistribution.getList()

      let carCall = findComponentsDownward(this, 'carCall')[0]
      carCall.getList()

      // let waterFillBox = findComponentsDownward(this, "waterFillBox")[0];
      // waterFillBox.getList();

      let todayFlow = findComponentsDownward(this, 'todayFlow')[0]
      todayFlow.getTrafficFlow()

      let Warning = findComponentsDownward(this, 'Warning')[0]
      Warning.getWarningInfo()

      this.compArr.forEach(item => {
        if (item) {
          item.eData = []
          item.initChart()
          const timer02 = setTimeout(() => {
            item.eData = item.values
            item.initChart()
            clearTimeout(timer02)
          }, 200)
        }
      })

      //刷新地图出入口数据
      this.mapPageVm.refreshEntranceAndRoadData()

      clearTimeout(this.timer)
      this.timer = setTimeout(this.polling, this.autoTime)
    }
  },
  beforeDestroy () {
    maplayers['dangerGoodsguiji'] && removeImportRoad(map)
    clearInterval(this.timer)
  },
  beforeRouteLeave (to, from, next) {
    this.mapPageVm.removeTruckGps()
    next()
  }
}
</script>
<style lang="scss" scoped>
.danger {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: auto;
  z-index: 2;
  // background-color: #343633;
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
.danger-car-alarm-info .el-dialog {
  margin-left: auto;
}
</style>
