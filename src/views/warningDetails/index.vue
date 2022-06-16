<template>
  <div class="danger">
    <DpHeader :active-on="2">
      <span>预警</span>
    </DpHeader>
    <div class="daner-left-filter"></div>
    <div class="daner-right-filter"></div>
    <div class="danger-chart">
      <div class="danger-right">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col>
            <warningStatistics :car-type="carType" class="place"></warningStatistics>
          </el-col>
          <el-col>
            <warningBranch
              :car-type="carType"
              class="rankingdis"
            >
            </warningBranch>
          </el-col>
        </el-row>
      </div>
      <div class="danger-left">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col style="height: 100%;">
            <warningTable
              class="today-flow"
              :time="autoTime"
              :car-type="carType"
              @onTableData="onTableData"
              @onCellClick="onCellClick"
            ></warningTable>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- <water-fill-box :car-type="carType"></water-fill-box> -->
    <!-- <Warning sub-type="all"></Warning> -->
    <CarInfoDialog :show.sync="showCarInfo" :carInfo="carInfo" width="450px" :Dialongright = "'0'"></CarInfoDialog>
     <el-carousel height="60px" class="carousel-tips" :indicator-position="'none'" :interval="10*1000">
      <el-carousel-item v-for="item in 3" :key="item">
          <div class="tips">
            <i class="el-icon-warning"></i>
            <span>此超速数据来自于交通局，不能作为交警的执法依据，如需作为交警执法处罚依据，需要接入交警部门的车辆卡口测速数据</span>
          </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import warningStatistics from '@/views/components/warning/warningStatistics';
import warningBranch from '@/views/components/warning/warningBranch';
import warningTable from '@/views/components/warning/warningTable'
import DpHeader from "@/components/content/DpHeader";
// import Warning from "@/components/content/Warning";
import waterFillBox from "@/views/components/waterFillBox";
import { findComponentsDownward,} from "@/utils/util";
import { queryAlarmDetailLngLat } from '@/api/dumpTruck';
import CarInfoDialog from '@/views/components/carInfoDialog/index.vue'
import { levelAlarmMap } from '@/const/dicData'
import { pollingTime } from '@/config/config'
const CAR_TYPE = "all"; //预警

export default {
  name: "warningDetails",
  components: {
    DpHeader,
    // Warning,
    waterFillBox,
    warningStatistics,
    warningBranch,
    warningTable,
    CarInfoDialog
  },
  inject: ['mapPageVm'],
  data() {
    return {
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
      tableData: {},
      levelList: ['10','20','30','40'],
      showCarInfo: false,
      carInfo: []
    };
  },
  mounted() {
    let wuBarArr = findComponentsDownward(this, "wu-bar");
    let wuPie = findComponentsDownward(this, "wu-pie");
    this.compArr = wuBarArr.concat(wuPie);
    // this.polling();
    this.$on('on-show-Vehicle', this.onHandlShowVehicle)
    this.$on('on-click-car', this.onListenerAlarmVehicleClick)
  },
  methods: {
    onTableData(tableData){
      this.tableData = {}
      tableData.forEach(item => {
        item.alarmlevel = String(item.alarmlevel) //在数据源头转换alarmlevel的数据类型，避免其它地方重复转换
        if(!item.lng || !item.lat) return  //过滤点没有经纬度的点
        item.pointType = `level${item.alarmlevel}` //自定义点类型获取相应的图标 getIconByPointType
        if(this.tableData[item.alarmlevel]){
          this.tableData[item.alarmlevel].push(item)
        }else {
          this.tableData[item.alarmlevel] = [item]
        }
      })

      this.refreshDataForLayerSelected(this.tableData)
    },
    onHandlShowVehicle(data){ //监听选中的图层并渲染车辆坐标点
      let {isShow, level} = data
      this.mapPageVm.removePoints(level)
      isShow && this.mapPageVm.renderPoints(level, this.tableData[level])
    },
    refreshDataForLayerSelected(tableData){
      let levelKeyLayers = Object.keys(this.tableData) //获取当前数据的图层key
      this.levelList.forEach(level => {
        if(levelKeyLayers.includes(level)){ 
          this.mapPageVm.checkFeatures.includes(level) && this.onHandlShowVehicle({isShow: true, level})   //如果该图层还存在则更新数据
        }else {
          this.mapPageVm.removePoints(level) //删除图层

          let index = this.mapPageVm.checkFeatures.indexOf(level)
          index !== -1 && this.mapPageVm.removeCheckFeature(index) //关闭左侧高亮的图标
        }
      })
    },
    onCellClick(row,column){
      let {lng, lat, alarmlevel} = row
      if(!lng || !lat) return
      this.mapPageVm.moveMap(lng, lat, 1000, false)
      maplayers[alarmlevel] || this.onHandlShowVehicle({isShow: true, level: alarmlevel}) //如果有该图层就不再创建,否则创建
      !this.mapPageVm.checkFeatures.includes(alarmlevel) && this.mapPageVm.checkFeatures.push(alarmlevel) //点亮侧边栏图标

      this.onListenerAlarmVehicleClick(row) //车辆信息
    },
    onListenerAlarmVehicleClick(feature){
      let {id, alarmtime, alarmtitle, alarmlevel, alarmobject, alarmpart, lng, lat, alarmaddress, info, alarmtype, levelStandard} = feature 
      this.showCarInfo = true
      this.carInfo = [
        // {label: '预警流水号：', value: id},
        {label: '预警时间：',value: alarmtime},
        {label: '预警标题：', value: alarmtitle},
        {label: '预警源（预警对象）：', value: alarmobject}, 
        {label: '预警级别：', value: `${levelAlarmMap[alarmlevel]}${levelStandard || ''}`}, 
        {label: '预警部门：', value: alarmpart},
        {label: '经度：', value: lng},
        {label: '纬度：', value: lat},
        {label: '预警位置：', value: alarmaddress},
        {label: '预警类型：', value: alarmtype},
        // {label: '处理原因：', value: info},
      ]
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
      this.timer = setInterval(() => {
        // let comeInOut = findComponentsDownward(this, "comeInOut")[0];
        // comeInOut.getList();
        // comeInOut.getTimeDistribution();

        // this.compArr.forEach((item) => {
        //   if (item) {
        //     item.eData = [];
        //     item.initChart();
        //     const timer02 = setTimeout(() => {
        //       item.eData = item.values;
        //       item.initChart();
        //       clearTimeout(timer02);
        //     }, 200);
        //   }
        // });
      }, this.autoTime);
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
  // overflow: hidden;
}
@media screen and (max-width: 1400px) {
  .danger {
    height: 100%;
  }
}
.danger-chart {
  position: absolute;
  height: calc(100% - 70px);
  top:70px;
  width:100%;
  display: flex;
  justify-content: space-between;
  padding: 0 26px;
}
.danger-left {
  position: absolute;
  right:20px;
  height:100%;
  width: 630px;
  pointer-events: auto;
  overflow: hidden;
  .today-flow {
    justify-content: space-between;
    margin-bottom: 30px;
    position: relative;
    height:95%;
  }
  .row-bg {
    // flex-direction: column;
    height: 100%;
  }
}
.danger-right {
  position: absolute;
  left:20px;
  width: 360px;
  height:100%;
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
.carousel-tips{
  width: 50%;
  position: fixed;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
}
.tips{
  text-align: center;
  color: #FF6F6F;
  font-size: 16px;
  .el-icon-warning{
    margin-right: 5px;
    color: #ffbc00
  }
}
</style>