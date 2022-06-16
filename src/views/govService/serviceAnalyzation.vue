<template>
  <div class="service-analyzation">
    <DpHeader :active-on="3"> 
        <span>总体业务</span>
    </DpHeader>
    <div class="daner-left-filter"></div>
    <!-- <div class="daner-right-filter"></div> -->
    <div class="danger-chart">
      <div class="danger-left">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col>
            <StatisEvaluationAna
              class="today-flow"
            ></StatisEvaluationAna>
          </el-col>
          <el-col>
            <CallNumPercentage
              class="today-flow"
            ></CallNumPercentage>
          </el-col>
          <el-col>
            <ProfessionTime
              class="today-flow"
            ></ProfessionTime>
          </el-col>
        </el-row>
      </div>
      <div class="danger-right">
        <el-row type="flex" class="row-bg" justify="center">
          <!-- 右侧企业生命周期分析 -->
          <el-col>
            <StatisEvaluationAnaTwo
              class="today-flow"
            ></StatisEvaluationAnaTwo>
          </el-col>
          <!-- 右侧业务来源业务量 -->
          <el-col>
            <CallNumPercentageRight
              class="today-flow"
            ></CallNumPercentageRight>
          </el-col>
          <!-- 权责清单业务 -->
          <el-col>
            <ProfessionTimeRightDown
              class="today-flow"
            ></ProfessionTimeRightDown>
          </el-col>
        </el-row>  
      </div>
    </div>
    <CarInfoDialog :show.sync="beachInfoDialog"  width="400px" :carInfo="infoList" :Dialongright = "'0'">
    </CarInfoDialog>
    <!-- <Footdownnav :activeindex="'1'"></Footdownnav> -->
    <el-dialog
        width="670px"
        top="15vh"
        :title="videoTitle"
        class="innerDialog"
        v-if="isShowVideoList"
        :visible.sync="isShowVideoList"
        append-to-body
        :close-on-click-modal="false"
    >
      <ul class="video-tab" v-show="videoListArr.length > 1">
        <li v-for="(item, index) in videoListArr.length" :key="index" :class="{'active': index === curVideoIndex}" @click="changeVideo(index)"></li>
      </ul>
      <haikanPlayer :width="670" :height="402" :cameraIndexCode="videoListArr[curVideoIndex]" :layout="layout" v-if="videoShow"></haikanPlayer>
        
    </el-dialog>
    <MapDialog v-model="visible" :videoList="videoListArr" multi @close="closeMapDialog" carType="xwjcVideo"  :layout="layout" :video-frame="videoFrame" :map-title="mapDialogTitle"></MapDialog>
  </div>
</template>

<script>
import DpHeader from "@/components/content/DpHeader";
import Footdownnav from "@/components/content/Footdownnav"
import StatisEvaluationAna from '@/views/components/serviceAnalyzation/statisEvaluationAna'
import CallNumPercentage from '@/views/components/serviceAnalyzation/callNumPercentage'
import CallNumPercentageRight from '@/views/components/serviceAnalyzation/callNumPercentageRight'
import ProfessionTime from '@/views/components/serviceAnalyzation/professionTime'
import ProfessionTimeRightDown from '@/views/components/serviceAnalyzation/professionTimeRightDown'
import StatisEvaluationAnaTwo from '@/views/components/serviceAnalyzation/statisEvaluationAnaTwo'
import {getbusinNetwork , getbusinDetail } from '@/api/service'
import {openGovNetWorkConstructionData} from '@/api/gov'
import CarInfoDialog from '@/views/components/carInfoDialog/index.vue'
import haikanPlayer from '@/components/common/haikanPlayer/index'
import store from '@/store'
import request from '@/utils/request'
import MapDialog from '@/components/common/MapDialog'
import {parseTime} from '@/utils/util'
import {
    startWebsocket,
    stopWebsocket
} from '@/api/websocket'

const CAR_TYPE = "serviceAnalyzation"
export default {
    name: 'serviceAnalyzation',
    components: {
        DpHeader,
        StatisEvaluationAna,
        CallNumPercentage,
        ProfessionTime,
        StatisEvaluationAnaTwo,
        CallNumPercentageRight,
        ProfessionTimeRightDown,
        Footdownnav,
        CarInfoDialog,
        haikanPlayer,
        MapDialog
    },
    data(){
        return {
           carType: CAR_TYPE, 
           source:null,
           beachInfoDialog: false,
           infoList: [],
           videoListStr:'',
           videoListArr:[],
           curVideoIndex:0,
           videoShow: false,
           isShowVideoList:false,
           layout: '1x1',
           mapDialogTitle:'',
           visible:{
              isShow: false
           },
           videoFrame:[],
           xwjcVideoList: []
        }
    },
    inject:['mapPageVm'],
    created() {
      // store.dispatch('getServicList')
    }, 
    mounted() {
     this.getServicList();
     this.$on('on-click-servic',this.showServicInfo)
     this.$on('on-click-voic',this.voiceclick)
    },
    methods:{
      voiceclick() {
        console.log(111)
      },
      async getServicList () {//服务网点
        const res = await getbusinNetwork ()
          let data = res.data.data
          data.forEach ((item) =>{
           item.pointType = 'servic',
           item.pointName = item.networkName
          //  delete item.type
           })
           this.mapPageVm.servicList = data
         },
         //  政务点击弹窗
        async showServicInfo({id}) {
            this.source && this.source.cancel('取消请求')
            this.source = request.CancelToken.source()
            this.beachInfoDialog = true;
            this.infoList = []
            const res = await getbusinDetail(id, this.source.token) 
            if(!res || !res.data.data) return 
            let {address , minutes , networkName, } = res.data.data
            this.infoList.push({
              id:1,
              label: '名称: ',
              value: networkName
            },{
              id:2,
              label:'地址：',
              value: address
            },{
              id:3,
              label:'平均等候时长: ',
              value: minutes ? `${minutes}分钟` : ''
            },{
              id: 4,
              label: '周边视频',
              name: networkName,
              icon: 'el-icon-video-play',
              style: 'width: 45%; border: 1px solid #0ab8eb; float:left;margin:0.04rem 0.04rem 0.02rem 0.045rem;',
              onClick: (item) => {
                this.showAroundVideo(res.data.data,'zbVideo')
              }
            },{
              id: 5,
              label: '行为监测',
              name: networkName ,
              icon: 'el-icon-video-play',
              style: 'width: 45%; border: 1px solid #0ab8eb; float:left;margin:0.04rem 0.04rem 0.02rem 0.045rem;',
              onClick: (item) => {
                this.showAroundVideo(res.data.data,'xwjcVideo')
              }
            }) 
        },
        //行为监测视频
        async showContructionVideo() {

        },
        closeMapDialog() {
             this.visible.isShow = false
             this.openGovNetWorkConstructionData('0')
        },
        async openGovNetWorkConstructionData(flag, hkVideo) {
          if(flag === '1') {
            await startWebsocket()
            this.visible.isShow =true
            await openGovNetWorkConstructionData(flag)
            this.$socketApi.sendSock((data) => {
              let mqData = JSON.parse(data)
              let item = {
                alarmTime: parseTime(mqData.alarmTime),
                actionName: mqData.actionName,
                url: mqData.snapPictureUrl
              }
              if(hkVideo.includes(mqData.camIndexCode)){
                  this.videoFrame.unshift(item)
              }
            })
          }else {
            await stopWebsocket()
            await openGovNetWorkConstructionData(flag)
          }
          
        },
        async showAroundVideo(row, videoType){
          this.videoTitle = row.networkName
          this.videoListStr = ''
          this.videoListArr = []
          this.curVideoIndex = 0
          let data = row[videoType]
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
             if(videoType ==='xwjcVideo'){
              this.openGovNetWorkConstructionData('1',row.hkVideo)
              return
            }
            this.videoShow = true
            this.isShowVideoList = true
           
          }else {
            this.infoList.forEach(item => {
              if(videoType === 'zbVideo'){
                if(item.id === 4) {
                   item.label = item.label.replace('：暂无','')
                  item.label = `${item.label}：暂无`
                }
              }
              if(videoType === 'xwjcVideo' ) {
                if(item.id === 5) {
                  item.label = item.label.replace('：暂无','')
                  item.label = `${item.label}：暂无`
                }
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
    }
  
}
</script>

<style lang="scss" scoped>
    .service-analyzation{
         position: absolute;
        height: 100%;
        width: 100%;
        overflow: auto;
        z-index: 2;
        font-size: 14px;
        // background: black;
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
    margin-bottom: 15px;
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