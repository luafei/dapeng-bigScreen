<template>
  <div class="map-dialog">
    <el-dialog
      @close="closeMapDialog"
      :visible.sync="value.isShow"
      :modal="false"
      top="10vh"
      width="52%"
      :append-to-body="true"
      class="map-dialog-containerexter"
    >
      <div style="overflow-y:auto;">
        <div style="white-space:nowrap; text-align: center;">
          <div class="mpbox">
            <div class="mpTitle">企业信息</div>
            <div class="mpCenterBox">
              <el-row v-if="enterprise.dangerCompanyName" type="flex">
                <el-col :span="2">企业名称：</el-col>
                <el-col :span="22">{{enterprise.dangerCompanyName}}</el-col>
              </el-row>
              <el-row v-if="enterprise.address">
                <el-col :span="2">企业地址：</el-col>
                <el-col :span="22">{{enterprise.address }}</el-col>
              </el-row>
              <el-row v-if="enterprise.manageZone">
                <el-col :span="2">经营范围：</el-col>
                <el-col :span="22">{{enterprise.manageZone}}</el-col>
              </el-row>
            </div>
          </div>
          <div class="mpboxs">
            <div class="mpTitle">危化企业安全生产状态</div>
            <div class="mpCenterBox" style="display:flex;">
              <div
                v-for="item in tempImgArr"
                :key="item.name"
                style="margin-right:30px;"
              >
                <div @click="showPage(item.url, item.name)">
                  <div>
                    <span>{{item.name}}</span>
                  </div>
                </div>
              </div>
              <div @click="showCarStatistic">
                车流量分析
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible"
      width="90%"
      top="2vh"
      :title="currentTitle"
      :append-to-body="true"
      :before-close="closeIframeDialog"
      class="map-dialog-container iframe-dialog"
    >
      <iframe :src="currentUrl" width="100%" height="1080px" frameborder="0"></iframe>
    </el-dialog>
    <el-dialog
      :visible.sync="carFlowDialogVisible"
      width="30%"
      :title="'危化企业车流量时间分布'"
      :append-to-body="true"
      :before-close="() => carFlowDialogVisible = false"
      class="map-dialog-container vehicle-flow"
    >
      <div class="time-direction">
        <TimeRoad :hour="false" week year :timeType="timeType" @onSelectTime="selectTime"  class="time-tab"></TimeRoad>
        <SwitchBtn v-model="direction" @change="changeDirection"></SwitchBtn>
      </div>
      <wu-bar-two :labels="labels" :values="values" :height="200"></wu-bar-two>
    </el-dialog>
  </div>
</template>
<script>
import { queryDangerDetail, getDangerCompanyFlowDistribution } from "@/api/dumpTruck";
import WuBarTwo from "@/components/echarts/WuBarTwo";
import TimeRoad from "@/components/common/TimeRoad";
import SwitchBtn from '@/components/common/switchBtn'
import { getCurrentTime } from '@/utils/util'

export default {
  name: "mapDialog",
  components: {
    WuBarTwo,
    TimeRoad,
    SwitchBtn
  },
  props: {
    value: {
      type: Object,
    },
  },
  data() {
    return {
      player: null,
      id: "videoDialog",
      dialogVisible: false,
      carFlowDialogVisible: false,
      currentUrl: "",
      currentTitle: "",
      tempImgArr: [
        {
          name: "危化品动态监测",
          url: "http://113.105.69.185:6868/dist/#/loginzfByZHZX",
        },
        {
          name: "企业内部视频",
          url: "http://113.105.69.185:6868/dist/#/loginzfByZHZXSXT",
        },
        {
          name: "危化品辅助决策",
          url: "http://113.105.69.185:6868/dist/#/loginzfByZHZXDP",
        },
        {
          name: "预警列表",
          url: "http://113.105.69.185:6868/dist/#/loginzfByZHZXBJ",
        },
      ],
      name: "",
      pointName: "",
      enterprise: {},
      labels: [],
      values: [],
      timeType: 'day',
      time: {
        beginTime: '',
        endTime: ''
      },
      direction: 0
    };
  },
  methods: {
    closeIframeDialog() {
      this.dialogVisible = false;
    },
    showPage(url, name) {
      this.dialogVisible = true;
      this.currentUrl = url;
      this.currentTitle = name;
    },
    closeMapDialog() {
      this.$emit("close");
    },
    async queryDangerDetail(name) {
      let data = {
        name: name,
      }; 
      const res = await queryDangerDetail(data);
      this.enterprise = res.data.data || {};
    },
    showCarStatistic(){
      this.carFlowDialogVisible = true
      this.getDangerCompanyFlowDistribution()
    },
    async getDangerCompanyFlowDistribution(){
      let postData = {
        timeType: this.timeType,
        direction: String(this.direction),
        name: this.enterprise.dangerCompanyName
      }
      const res = await getDangerCompanyFlowDistribution(postData)
      if(res.data.data){
        let {x, y} = res.data.data
        this.labels = x,
        this.values = [{
          name: '',
          x,
          y
        }]
      }
    },
    selectTime({type}){
      this.timeType = type;
      this.getDangerCompanyFlowDistribution()
    },
    changeDirection(){
      this.getDangerCompanyFlowDistribution()
    },
    showCurrentDetail(row){
      let { name } = row
      // if(this.timeType === 'day'){
      //   this.time = getCurrentTime('hour', name)
      // }else if(this.timeType === 'week' || this.timeType === 'month'){
      //   this.time = getCurrentTime('day', name)
      // }else if(this.timeType === 'year'){
      //   this.time = getCurrentTime('month', name)
      // }
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val.isShow) {
          this.queryDangerDetail(val.name);
        }
      },
      deep: true,
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
.time-direction{
  display: flex;
  .time-tab{
    margin-right: 20px;
  }
}
</style>
<style lang="scss">
.map-dialog-containerexter {
  .el-dialog {
    background: transparent;
  }
  .el-dialog__header {
    font-size: 0;
    background: rgba(15, 75, 99, 0.7);
    padding-bottom: 20px;
    .el-dialog__title {
      color: #fff;
    }
  }
  .el-dialog__body {
    background: rgba(15, 75, 99, 0.7);
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .mpbox {
    margin: 30px 20px;
    color: #fff;
    text-align: left;
    border-bottom: 1px dashed #fff;
    margin-bottom: 10px;
    .mpTitle {
      font-size: 25px;
      line-height: 50px;
      height: 50px;
      margin-left: 20px;
    }
    .mpCenterBox {
      white-space: pre-wrap;
      font-size: 14px;
      padding: 15px;
      line-height: 40px;
    }
  }
  .mpboxs {
    margin: 30px 20px;
    color: #fff;
    text-align: left;
   
    border-radius: 10px;
    margin-bottom: 10px;
    vertical-align:middle;
    .mpTitle {
      font-size: 25px;
      line-height: 50px;
      height: 50px;
      margin-left: 20px;
    }
    .mpCenterBox {
      white-space: pre-wrap;
       text-decoration: underline;
      font-size: 14px;
      padding: 15px;
      line-height: 40px;
    }
  }
}
.iframe-dialog {
  .el-dialog {
    height: 90%;
    .el-dialog__body {
      height: 100%;
      padding: 20px;
      overflow: scroll;
    }
  }
}
.vehicle-flow{
  .el-dialog__body{
    padding: 20px;
  }
  .time-tab{
    position: static;
  }
} 
</style>