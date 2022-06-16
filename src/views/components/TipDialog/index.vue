<template>
  <div class="map-dialog">
    <el-dialog
      @close="closeMapDialog"
      :visible.sync="value.isShow"
      :title="tipInfo.pointName"
      top="10vh"
      width="25%"
      :append-to-body="true"
      class="map-dialog-container"
    >
      <div class="map-dialog-container-body">
        <!-- 工地 -->
        <div v-if="loading" class="el-icon-loading-wrap">
          <i class="el-icon-loading"></i>
          <span>加载中...</span>
        </div>
        <template v-if="enterprise&&tipInfo.pointType==='3'"> 
          <div class="address">工地名称：{{enterprise.prjName||'无'}}</div>
          <div class="address">地址：{{enterprise.prjAddress||'无'}}</div>
          <div class="address">施工状态：{{enterprise.prjStatus||'无'}}</div>
          <div
            class="address"
          >计划开工日期：{{enterprise.planBeginDate||'无'}}</div>
          <div
            class="address"
          >计划结束日期：{{enterprise.planEndDate||'无'}}</div>
          <div class="address"> 当天泥头车数量: {{enterprise.flowNum||'0'}}</div>
          <div class="address"> 申报排放量: {{enterprise.declare||'0'}}</div>
          <div class="address"> 累计排放量: {{enterprise.accumulated||'0'}}</div>
          <div class="address"> 运输公司名称: {{enterprise.company||'无'}}</div>
          <div class="address"> 申报车辆数量: {{enterprise.carcount||'0'}}</div>
          <!-- <div class="address">扬尘浓度（PM2.5）：{{enterprise.pm25||'无'}}</div> -->
          <div>
            <el-button type="primary" @click="showConstructionVehicleStatistic(enterprise.prjName)" size="mini">工地车流量分析</el-button>
            <el-button type="primary" @click="showSiteDustData" size="mini">工地扬尘浓度分析</el-button>
          </div>
        </template>
        <!-- 消纳场 -->
        <template v-if="tipInfo.pointType==='3.1'">
          <div class="address">名称：{{tipInfo.pointNamelist||'无'}}</div>
          <div class="address">类型：{{tipInfo.address||'无'}}</div>
          <div class="address">运营单位名称：{{tipInfo.units ||'无'}}</div>
          <div class="address">备案消纳量：{{tipInfo.amount ||'无'}}</div>
          <div class="address">备案剩余消纳量：{{tipInfo.residue ||'无'}}</div>
          <div class="address">已消纳量：{{tipInfo.already ||'无'}}</div>
          <div class="address">消纳场地址：{{tipInfo.site ||'无'}}</div>
          <!-- <div
            class="address"
          >计划开工日期：{{'无'}}</div> -->
          <!-- <div
            class="address"
          >计划结束日期：{{'无'}}</div> -->
        </template>
        <!-- 加油站 -->
        <template v-if="tipInfo.pointType==='2' || tipInfo.pointType==='5'">  
          <div class="address" v-if="tipInfo.address">详细地址：{{tipInfo.address}}</div>
          <div class="address" v-if="tipInfo.pointType==='5'">路段名称：{{tipInfo.pointName}}</div>
          <el-button v-if="tipInfo.pointType==='2'" @click="showCarStatistic" type="primary" size="mini">车流量分析</el-button>
        </template>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="gasSiteDialogVisible"
      width="30%"
      :title="dialogTitle"
      :append-to-body="true"
      :before-close="() => gasSiteDialogVisible = false"
      class="map-dialog-container vehicle-flow"
    >
      <div class="time-direction">
        <TimeRoad :hour="false" week year :timeType="timeType" @onSelectTime="selectTime"  class="time-tab"></TimeRoad>
        <SwitchBtn v-model="direction" @change="changeDirection"></SwitchBtn>
      </div>
      <wu-bar-two :labels="labels" :values="values" :height="200" @onClick="showCurrentDetail"></wu-bar-two>
    </el-dialog>
    <el-dialog
      :visible.sync="dustDataVisible"
      width="30%"
      :title="'工地扬尘浓度分析'"
      :append-to-body="true"
      :before-close="() => dustDataVisible = false"
      class="map-dialog-container vehicle-flow"
    >
      <div class="time-direction">
        <TimeRoad hour day month :timeType="timeType02" @onSelectTime="selectTime02"  class="time-tab"></TimeRoad>
        <!-- <SwitchBtn v-model="direction" @change="changeDirection"></SwitchBtn> -->
      </div>
      <wu-bar-two :labels="labels02" :values="values02" :height="200"></wu-bar-two>
    </el-dialog>
    <el-dialog
      :visible.sync="dustVehicleVisible"
      width="30%"
      :title="'工地车流量分析'"
      :append-to-body="true"
      :before-close="() => dustVehicleVisible = false"
      class="map-dialog-container vehicle-flow"
    >
      <div class="time-direction">
        <TimeRoad hour day month :timeType="timeType03" @onSelectTime="selectTime03"  class="time-tab"></TimeRoad>
        <SwitchBtn v-model="direction03" @change="changeDirection03"></SwitchBtn>
      </div>
      <wu-bar-two :labels="labels03" :values="values03" :height="200"></wu-bar-two>
    </el-dialog>
    <el-dialog
      :visible.sync="vehicleDetailVisible"
      class="tab-dialog"
      :title="tipInfo.pointName"
      :append-to-body="true"
      :before-close="() => vehicleDetailVisible = false">
      <avue-crud class="dp-avue-del-menu dp-avue-pagination tabdialogform" :data="list" :option="vehicleDetailOption"></avue-crud>
    </el-dialog>
  </div>
</template>
<script>
import { queryBuildingSiteDetail, getDangerCompanyFlowDistribution, getPetrolStationFlowDistribution, getPetrolStationVehicleDetail, getSiteDustData } from "@/api/dumpTruck";
import { getBuildingSiteTrafficFlow } from '@/api/vehicle'
import WuBarTwo from "@/components/echarts/WuBarTwo";
import TimeRoad from "@/components/common/TimeRoad";
import SwitchBtn from '@/components/common/switchBtn'
import { getCurrentTime } from '@/utils/util'
import request from '@/utils/request'
import {vehicleDetailOption} from './option.js'

export default {
  name: "tipsDialog",
  components: {
    WuBarTwo,
    TimeRoad,
    SwitchBtn
  },
  props: {
    value: {
      type: Object,
    },
    tipInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      player: null,
      newArr:[
          {
          declare:'3.5万方',
          accumulated:'3553方',
          company:'深圳市万达建筑工程有限公司,深圳市凯意达实业有限公司',
          carcount:'119'
        },
        {
          declare:'4万方',
          accumulated:'297方',
          company:'深圳市恒利隆实业有限公司',
          carcount:'1'
        },
        {
          declare:'30万方',
          accumulated:'6325方',
          company:'深圳市正堡实业有限公司',
          carcount:'15'
        },
        {
          declare:'2.38万方',
          accumulated:'3421方',
          company:'深圳市深发园机械工程有限公司,深圳市鹏腾建设工程有限公司',
          carcount:'110'
        },
        {
          declare:'2.47万方',
          accumulated:'7645方',
          company:'深圳市深发园机械工程有限公司,深圳市灿埼工程有限公司,深圳市鹏腾建设工程有限公司',
          carcount:'58'
        },
        {
          declare:'0.06万方',
          accumulated:'374方',
          company:'深圳市金鹏运建筑工程有限公司',
          carcount:'32'
        },
        {
          declare:'7万方',
          accumulated:'61743方',
          company:'深圳市新达源物流有限公司,深圳市灿埼工程有限公司,深圳市金皖汽车运输服务有限公司,深圳市金鹏运建筑工程有限公司  ',
          carcount:'380'
        },
        {
          declare:'2万方',
          accumulated:'15455方',
          company:'中燚（深圳）建筑工程有限公司',
          carcount:'866'
        }
      ],
      enterprise:null,
      gasSiteDialogVisible: false,
      dustDataVisible: false,
      dustVehicleVisible: false,
      timeType: 'day',
      timeType02: 'hour',
      timeType03: 'hour',
      labels: [],
      values: [],
      time: {
        beginTime: '',
        endTime: ''
      },
      btnIndexSel: 0,
      direction: 0,
      direction03: 0,
      dialogTitle: '',
      labels02: [],
      values02: [],
      labels03: [],
      values03: [],
      source: null,
      loading: false,
      vehicleDetailVisible: false,
      vehicleDetailOption: vehicleDetailOption,
      list: []
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val.isShow) {
          this.timeType02 = 'hour'
          this.timeType = 'day'
          this.queryDetail(this.tipInfo.pointCode);
        }
      },
      deep:true
    },
  },
  methods: {
    closeMapDialog() {
      this.$emit("close");
    },
    async queryDetail(queryId) {
      try {
        this.source && this.source.cancel('取消请求')
        this.source = request.CancelToken.source()
        this.enterprise = null;
        let postData = { id: queryId };
        this.loading = true
        const res = await queryBuildingSiteDetail(postData, this.source.token);
        let newlist = this.newArr[Math.floor(Math.random() * this.newArr.length)];
        this.enterprise = { 
          ...res.data.data,
          ...newlist
        };
        console.log(newlist,'list')
        console.log(this.enterprise,'this.enterprise')
        this.loading = false
      } catch (error) {
      }
    },
    async getPetrolStationFlowDistribution(){  //getDangerCompanyFlowDistribution
      let postData = {
        timeType: this.timeType,
        direction: String(this.direction),
        name: this.tipInfo.pointName
      }
      if(this.tipInfo.pointType === '2'){
        const res = await getPetrolStationFlowDistribution(postData)
        if(res.data.data){
          let {x, y} = res.data.data
          this.labels = x,
          this.values = [{
            name: '',
            x,
            y
          }]
        }
      }else {
        //  const res = await getDangerCompanyFlowDistribution(postData)
        // if(res.data.data){
        //   let {x, y} = res.data.data
        //   this.labels = x,
        //   this.values = [{
        //     name: '',
        //     x,
        //     y
        //   }]
        // }
      }
    },
    showCarStatistic(){
      this.gasSiteDialogVisible = true
      this.dialogTitle = this.tipInfo.pointName+'车流量时间分布'
      this.getPetrolStationFlowDistribution()
    },
    selectTime({type}){
      this.timeType = type
      this.getPetrolStationFlowDistribution()
    },
    selectTime02({type}){
      this.timeType02 = type
      this.showSiteDustData()
    },
    selectTime03({type}){
      this.timeType03 = type
      this.showConstructionVehicleStatistic()
    },
    async showConstructionVehicleStatistic(name){ //工地車流量分析
      this.dustVehicleVisible = true
      let postData = {
        timeType: this.timeType03,
        direction: this.direction03,
        name
      }
      const res = await getBuildingSiteTrafficFlow(postData)
      if(res.data.data){
          let {x, y} = res.data.data
          this.labels03 = x,
          this.values03 = [{
            name: '',
            x,
            y
          }]
      }
    },
    async showSiteDustData(){ //工地扬尘浓度分析
      this.dustDataVisible = true
      let postData = {
        timeType: this.timeType02
      }
      const res = await getSiteDustData(postData)
      if(res.data.data){
        let {x, y} = res.data.data
        this.labels02 = x,
        this.values02 = [{
          name: '',
          x,
          y
        }]
      }
    },
    async showCurrentDetail(row){
      this.vehicleDetailVisible = true
      let {name} = row
      this.getCurrentTime(name)
      let postData = {
        page: 1,
        pageSize: 10,
        beginTime: this.time.beginTime,
        endTime: this.time.endTime,
        petrolStation: this.tipInfo.pointName,
        direction: String(this.direction)
      }
      const res = await getPetrolStationVehicleDetail(postData)
    },
    getCurrentTime(time){
      if(this.timeType === 'day'){
        this.time = getCurrentTime('hour', time)
      }else if(this.timeType === 'week' || this.timeType === 'month'){
        this.time = getCurrentTime('day', time)
      }else if(this.timeType === 'year'){
        this.time = getCurrentTime('month', time)
      }
    },
    changeDirection(){
      this.getPetrolStationFlowDistribution()
    },
    changeDirection03(){
      this.showConstructionVehicleStatistic()
    }
  },
};
</script>
<style lang="scss" scoped>
.map-dialog {
  font-size: 12px;
  pointer-events: auto;
}
.map-box {
  width: 100%;
  height: auto;
  overflow: hidden;
  .map-video {
    width: 100%;
    height: 100%;
  }
}

.map-dialog-container{
  .map-dialog-container-body {
    padding: 15px 20px;
    background: rgba(15, 75, 99, 0.7);
  }
}
.time-direction{
  display: flex;
  .time-tab{
    margin-right: 20px;
  }
}
.el-icon-loading-wrap{
  width: 100%;
  padding: 20px;
  text-align: center;
    color: #fff;
  .el-icon-loading{
    font-size: 18px;
    margin-right: 5px;
  }
}
</style>
<style lang="scss">
  .map-dialog-container{
      .el-dialog {
      background: transparent;
    }
    .address {
      color: #fff;
      line-height: 30px;
    }
    .el-dialog__header {
      font-size: 0;
      background: rgba(15, 75, 99, 1);
      padding-bottom: 20px;
      .el-dialog__title {
        color: #fff;
      }
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
  }
</style>