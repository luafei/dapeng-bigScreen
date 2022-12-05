<template>
  <div class="danger">
    <DpHeader :active-on="1">
      <span>旅游-沙滩</span>
    </DpHeader>
    <div class="daner-left-filter"></div>
    <div class="daner-right-filter"></div>
    <div class="danger-chart">
      <div class="danger-left">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col>
            <sandBeachStatistics
              class="today-flow"
              :time="autoTime"
              :car-type="carType"
            ></sandBeachStatistics>
          </el-col>
          <el-col>
            <sandBeachTime :car-type="carType" class="place"  ></sandBeachTime>
          </el-col>
          <el-col>
            <sandBeachRankingDistribution
              :beachList="app.beachList"
              :car-type="carType"
              class="rankingdis"
            />
          </el-col>
        </el-row>
      </div>
      <div class="danger-right">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col>
            <sandBeachEnvironment
              :car-type="carType"
              class="rankingdis"
              :parkList="app.parkingList"
            />
          </el-col>
          <el-col>
            <sandBeachCartCall :car-type="carType" class="cart-call"></sandBeachCartCall>
          </el-col>
          <el-col>
            <sandBeachPark
              :car-type="carType"
              class="place"
            ></sandBeachPark>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- <water-fill-box :car-type="carType"></water-fill-box> -->
    <Warning sub-type="sandBeach"></Warning>
    <TabDialog
      :show="showDialog"
      :init-params="initDailogParams"
      @onClose=" () => showDialog = false"
    ></TabDialog>
    <CarInfoDialog :show.sync="beachInfoDialog" :carInfo="infoList" :Dialongright = "'0'" >
    </CarInfoDialog>
    <el-dialog
        width="670px"
        top="15vh"
        :title="videoTitle"
        class="innerDialog"
        v-if="isShowVideoList"
        :visible.sync="isShowVideoList"
        append-to-body
    >
      <ul class="video-tab" v-show="videoListArr.length > 1">
        <li v-for="(item, index) in videoListArr.length" :key="index" :class="{'active': index === curVideoIndex}" @click="changeVideo(index)"></li>
      </ul>
      <!-- 海康视频窗口 -->
      <haikanPlayer :width="670" :height="402" :cameraIndexCode="videoListArr[curVideoIndex]" :layout="layout" v-if="videoShow"></haikanPlayer>
        
    </el-dialog>
    <!-- 用这个放大图片 -->
    <!-- <template slot="imagePath" slot-scope="scope">
            <el-image 
              style="width: 80px;"
              :src="scope.row.imagePath" 
              :preview-src-list="currentListImgs">
            </el-image>
    </template> -->
    <!-- <el-upload
      class="upload-demo"
      style="width: 100px;height: 50px;position:absolute;z-index:999;left:400px;top:300px; pointer-events: auto;"
      action=""
      :before-upload="beforeUpload">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload> -->
  </div>
</template>

<script>
import sandBeachStatistics from "@/views/components/sandBeach/sandBeachStatistics";
import sandBeachTime from "@/views/components/sandBeach/sandBeachTime";
import sandBeachPark from '@/views/components/sandBeach/sandBeachPark'
import sandBeachEnvironment from "@/views/components/sandBeach/sandBeachEnvironment";
import sandBeachCartCall from "@/views/components/sandBeach/sandBeachCartCall";
// import waterFillBox from "@/views/components/waterFillBox";
import TabDialog from "@/components/common/TabDialog";
import DpHeader from "@/components/content/DpHeader";
import Warning from "@/components/content/Warning";
import sandBeachRankingDistribution from "@/views/components/sandBeach/sandBeachRankingDistribution";
import CarInfoDialog from '@/views/components/carInfoDialog/index.vue'
import haikanPlayer from '@/components/common/haikanPlayer/index'
import { pollingTime } from '@/config/config'
import { findComponentsDownward, getBeachRolesName } from "@/utils/util";
import { getBeachVideoList, getBeachDicList, getBeachDicDetail, getParkVideoData, getParkMapData, getBeachNearbyOrRoadVideo} from '@/api/beach'
import store from '@/store'
import {mapGetters} from 'vuex'
import request from '@/utils/request'
import XLSX from 'xlsx'

const CAR_TYPE = "sandBeach"; //旅游-沙滩

export default {
  name: "sandBeach",
  components: {
    sandBeachStatistics,
    sandBeachTime,
    sandBeachEnvironment,
    sandBeachCartCall,
    // waterFillBox,
    TabDialog,
    DpHeader,
    Warning,
    sandBeachRankingDistribution,
    sandBeachPark,
    CarInfoDialog,
    haikanPlayer
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
      beachInfoDialog: false,
      infoList: [],
      videoListStr: '',
      isShowVideoList: false,
      layout: '1x1',
      source: null,
      videoTitle: '周边视频',
      videoShow: false,
      curVideoIndex: 0,
      videoListArr: []
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
    this.getBeachVideoAnalysisList()
    this.fetchBeachVideoList()
    this.getBeachList()
    this.getParkVideoData()
    this.fetchParkVideo()
    this.getParkMapData()
    // this.polling();
    this.$on('on-click-beach', this.showBeachInfo)
    this.$on('on-click-beachPark', this.showBeachParkInfo)
  },
  methods: {
    readXLSX (file) {
      let nameSplit = file.name.split('.')
      let format = nameSplit[nameSplit.length - 1]
      if (!['xlsx', 'csv'].includes(format)) {
        return false
      }
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.readAsBinaryString(file)
        reader.onload = function (evt) {
          let data = evt.target.result // 读到的数据
          var workbook = XLSX.read(data, { type: 'binary' })
          resolve(workbook)
        }
      })
    },
    // async beforeUpload(file){
    //   const workbook = await this.readXLSX(file)
    //   let {SheetNames, Sheets} = workbook
    //   let result = {}
    //   SheetNames.forEach(item => {
    //     result[item] = []
    //     let num = Sheets[item]['!ref'].match(/\d+/g)[1]
    //     console.log(num)
    //     for(let i=2; i<num; i++){
    //       result[item].push({
    //         time: Sheets[item][`A${i}`].w,
    //         value: Sheets[item][`B${i}`].w,
    //         // name: Sheets[item][`C${i}`].w
    //       })
    //     }
    //   })
    //   console.log(JSON.stringify(result),'result')
    //   console.log(workbook,'workbook')
    //   XLSX.utils.sheet_to_json(workbook.Sheets[wsname])
    //   return false
    // },
    async getParkMapData(){
      var val = getBeachRolesName();
      const res = await getParkMapData(val)
      let data = res.data.data
      data.forEach((item) => {
        item.pointType = 'beachPark'
        item.pointName = item.parkName
      })
      this.mapPageVm.beachParkList = data
    },
    async getParkVideoData(){ //停车场视频分析点
      var val = getBeachRolesName();
      const res = await getParkVideoData(val)
      let data = res.data.data
      data.forEach((item) => {
        item.pointType = 'videoBeachPark'
        item.pointCode = item.videoCode,
        item.pointName = item.videoName
      })
      this.mapPageVm.videoBeachParkList = data
    },
    async fetchParkVideo(){ //停车场视频点
      var val = getBeachRolesName();
      let postData = {
        typeName: '停车场',
        name: val.name
      }
      const res = await getBeachNearbyOrRoadVideo(postData)
      let data = res.data.data
      data.forEach((item) => {
        item.pointType = 'videoPark'
        item.pointCode = item.videoCode,
        item.pointName = item.videoName
      })
      this.mapPageVm.videoParkList = data
    },
    async getBeachVideoAnalysisList(){   //沙滩视频分析点
      var val = getBeachRolesName();
      const res = await getBeachVideoList(val);
      let data = res.data.data
      data.forEach((item) => {
        item.pointType = 'videoAnalysisBeach'
        item.pointCode = item.videoCode,
        item.pointName = item.beach
      })
      this.mapPageVm.beachVideoAnalysisList = data
    },
    async fetchBeachVideoList(){ //沙滩视频点
       var val = getBeachRolesName();
      let postData = {               
        typeName: '沙滩',
        name: val.name
      }
      const res = await getBeachNearbyOrRoadVideo(postData)
      let data = res.data.data
      data.forEach((item) => {
        item.pointType = 'videoBeach'
        item.pointCode = item.videoCode,
        item.pointName = item.videoName
      })
      this.mapPageVm.videoBeachList = data
    },
    async getBeachList(){
      const res = await getBeachDicList()
      let data = res.data.data
      data.forEach((item) => {
        item.pointType = 'beach'
        item.pointName = item.beachName
        delete item.type   //type属性与图层点的type属性冲突 影响落点
      })
      this.mapPageVm.beachList = data
    },
    // 沙滩点击点
    async showBeachInfo({id}){
      this.source && this.source.cancel('取消请求')
      this.source = request.CancelToken.source()
      this.beachInfoDialog = true;
      this.infoList = []
      const res = await getBeachDicDetail(id, this.source.token)
      if(!res || !res.data.data) return 
      let {beach, longitude, latitude, beachType, beachTypeName, beachPassengerNum, alarmTitle} = res.data.data
      this.infoList.push({
        id: 1,
        label: '沙滩名称：',
        value: beach
      },{
        id: 2,
        label: '经度：',
        value: longitude
      },{
        id: 3,
        label: '纬度：',
        value: latitude,
      },{
        id: 4,
        label: '类别：',
        value: beachType
      },{
        id: 5,
        label: '类别名称：',
        value: beachTypeName
      },{
        id: 6,
        label: '实时客流量：',
        value: beachPassengerNum || '无'
      },{
        id: 7,
        label: '预警信息：',
        value: alarmTitle || '无'
      },{
          id: 8,
          label: '周边视频',
          name: beach,
          icon: 'el-icon-video-play',
          style: 'width: 45%; border: 1px solid #0ab8eb; float:left;margin:0.04rem 0.04rem 0.02rem 0.045rem;',
          onClick: (item) => {
            this.showAroundVideo(item)
          }
      },{
          id: 9,
          label: '道路视频',
          name: beach,
          icon: 'el-icon-video-play',
          style: 'width: 45%; border: 1px solid #0ab8eb; float:left;margin:0.04rem 0 0.02rem 0;',
          onClick: (item) => {
            this.showAroundVideo(item)
          }
      })
    },
    showBeachParkInfo(info){
      this.beachInfoDialog = true;
      this.infoList = []
      let {parkName, address, longitude, latitude} = info
      this.infoList = [{
          id: 1,
          label: '停车名称：',
          value: parkName
        },{
          id: 2,
          label: '停车地址：',
          value: address
        },{
          id: 3,
          label: '经度：',
          value: longitude,
        },{
          id: 4,
          label: '纬度：',
          value: latitude
        },{
          id: 5,
          label: '周边视频',
          name: parkName,
          icon: 'el-icon-video-play',
          style: 'width: auto; border: 1px solid #0ab8eb; float:left;margin:0.04rem 0.04rem 0.02rem 0.045rem;',
          onClick: (item) => {
            this.showAroundVideo(item)
          }
        }]
    },
    async showAroundVideo({name, label}){
      label = label.replace('：暂无','')
      this.videoTitle = label;
      var val = getBeachRolesName();
      let postData = {
        beach: name,
        videoType: label,
        name: val.name
      }
      const res = await getBeachNearbyOrRoadVideo(postData) 
      let data = res.data.data
      this.videoListStr = ''
      this.videoListArr = []
      this.curVideoIndex = 0
      // data = [data[4]]
      // this.videoTitle = data[0].videoCode
      if(data && data.length > 0){
        
        let baseNum = Math.ceil(Math.sqrt(data.length))
        if (data.length === 2) {
          this.layout = '1x2'
        } else if (data.length === 3) {
          this.layout = '1+2'
        } else if (data.length > 3) {
          this.layout = '2x2'
        }
        data.forEach((item, index) => {
          this.videoListStr += `${item.videoCode},`
          if ((index + 1) % 4 === 0) {
            this.videoListStr = this.videoListStr.replace(/(\,$)/g,'')
            this.videoListArr.push(this.videoListStr)
            this.videoListStr = ''
          } else if (index === data.length - 1 && this.videoListStr !== '') {
            this.videoListStr = this.videoListStr.replace(/(\,$)/g,'')
            this.videoListArr.push(this.videoListStr)
          }
        })
        this.videoShow = true
        this.isShowVideoList = true
      }else {
        this.infoList.forEach(item => {
          if(item.label === label) {
            item.label = `${item.label}：暂无`
          }
        })
      }
    },
    changeVideo (index) {
      this.videoShow = false
      this.$nextTick(() => {
        setTimeout(() => {
          this.curVideoIndex = index
          this.videoShow = true
        }, 300)
      })
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

.video-tab {
  position: relative;
  top: -20px;
  text-align: center;
  font-size: 0;

  li {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin: 0 6px;
    border-radius: 8px;
    background: #fff;
    opacity: 0.48;
    transition: 0.3s;
    cursor: pointer;

    &.active {
      opacity: 1;
    }
  }
}
</style>
