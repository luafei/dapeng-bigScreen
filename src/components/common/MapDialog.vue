<template>
  <div class="map-dialog">
    <el-dialog
      @close="closeMapDialog"
      :visible.sync="value.isShow"
      :title="newTitle"
      top="5vh"
      width="670px"
      :append-to-body="true"
      class="map-dialog-container">
      <!-- <p style="color:#fff;margin-bottom:5px;font-size:14px;">
        <span style="margin-right:40px;">地图编号：{{$attrs.url}}</span>
        <span>当前驶过的车辆总数：{{tempImgArr.length}}</span>
      </p> -->
      <ul class="video-tab" v-show="videoList.length > 1">
        <li v-for="(item, index) in videoList.length" :key="index" :class="{'active': index === curVideoIndex}" @click="changeVideo(index)"></li>
      </ul>
      <haikanPlayer v-if="value.isShow && videoShow && multi" :width="670" :height="402" ref="haikanPlayer"  :layout="layout" :cameraIndexCode="videoList[curVideoIndex]"></haikanPlayer>
      <haikanPlayer v-if="value.isShow && videoShow && !multi" :width="670" :height="402" ref="haikanPlayer"  :layout="layout" :cameraIndexCode="videoId"></haikanPlayer>
      <!-- <div class="map-box"> 
        <div id="label"></div>
      </div> -->
      <div class="mapConnect">
        <div class="mapIndex">
          <div v-for="(item,index) in vehicleInfo" :key="index" class="mapTempImgArr">
            <!-- <el-image style="width:150px;" :src="item.url"></el-image> -->
            <!-- <img width="150px" style="min-height:50px;" :src="item.url" alt=""> -->
            <!-- <iframe style="z-index: 9999"> -->
              <el-image 
                style="width: 150px;min-height:50px;"
                :src="item.url"
                :preview-src-list="creatArr(item.url)">
              </el-image>
            <!-- </iframe> -->
            <!-- <span>车牌号：{{item.plateNo}}</span> -->
            <div v-if="carType === 'dangerCar'" class="car-info">
              <span>{{item.captureTime}}</span>
              <div>车辆颜色:{{item.vehicleColorName}}</div>
              <div>车辆类型:{{item.vehicleTypeName}}</div>
              <!-- <div>危险品状态:{{item.dangMark}}</div> -->
            </div>
            <div v-if="carType === 'dumpTruck'">
              <span>{{item.captureTime}}</span>
              <div>车辆：泥头车</div>
            </div>
            <div v-if="carType === 'people'">
              <div>{{item.startTime}}</div>
              <div>人数：{{item.framesPeopleCountingNum}}</div>
            </div>
             <div v-if="carType === 'xwjcVideo'">
              <div>{{item.alarmTime}}</div>
              <div>预警内容：{{item.actionName}}</div>
            </div>
          </div>
        </div>
      </div>
     </el-dialog>
  </div>
</template>
<script>
// import HlsLive from '@/components/common/HlsLive.vue'
import haikanPlayer from '@/components/common/haikanPlayer/index'
import { getLiveUrl } from "@/api/video";

export default {
    name:'mapDialog',
    props:{
      layout: {
        type:String,
        default: "1x1"
      },
      value:{
        type:Object
      },
      videoId:{
        type: String,
        default:''
      },
      videoFrame: {
        type: Array,
        default: () => []
      },
      videoList:{
        type: Array,
        default: () => []
      },
      mapTitle:{
        type:String,
        default:"视频标题名"
      },
      carType: {
        type: String,
        default: ''
      },
      multi: {
        type: Boolean,
        default: false
      },
    },
    components: {
      // HlsLive,
      haikanPlayer
    },
    data() {
      return {
        player: null,
        id: 'videoLive',
        tempImgArr: [],
        videoShow: true,
        curVideoIndex: 0
      };
    },
    
    watch: {
      videoFrame(newVals){
        if(newVals.length === 0){
          this.tempImgArr = []
        }else{
          this.tempImgArr.unshift(newVals[0])
          // if(newVals.length > 6){
          //   this.tempImgArr = this.tempImgArr.splice(0, 6)
          // }
        }
      },
      'value.isShow'(newVal, oldVal){
        if(newVal){
          // this.getLiveUrl()
          // this.$nextTick(() => {
          //   openVideoWeb({
          //     // id: '44031251001320002647',
          //     id: this.videoId,
          //     label: 'label'
          //   })
          //   $('.map-box').append($('#label'))
          // })
        }else {
          // closeVideoWeb()
          // $('.map-box #label .longmap-video-dialog').remove()
        }
      },
    },   
    computed: {
      newTitle(){
        return this.mapTitle
        // return this.mapTitle + "当前驶过的车辆总数：" + this.tempImgArr.length
      },
      vehicleInfo(){
        return this.tempImgArr.length > 6 ? this.tempImgArr.slice(0, 6) : this.tempImgArr
      }
    },
    methods: {
      closeMapDialog(){
        this.$refs.haikanPlayer.$destroy();
        this.$emit('input', this.value)
        this.$emit('close')
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
      creatArr (val) {
        let arr = []
        arr.push(val)
        return arr
      },
      // async getLiveUrl(){
      //   const res = await getLiveUrl({
      //     videoCode: this.videoId
      //   });
      // }
    },
    beforeDestroy(){
      // this.$socketApi.closeSocket()
    }
  }
</script>
<style lang="scss" scoped>
   .map-dialog{
     font-size: 12px;
     pointer-events:auto;
   }
   .map-box{
      width:100%;
      height: auto;
      overflow: hidden;
      .map-video{
        width:100%;
        height:100%;
        //  object-fit:contain"
      } 
   }
   .mapConnect{
     overflow:auto;max-height:190px;padding:10px;
     .mapIndex{
       display:flex; white-space:nowrap; text-align: center;
       .mapTempImgArr{
         width: 180px;
         display:flex;flex-direction:column;color: #fff;font-size:14px;text-align:left;margin-right:20px;
         .car-info{
           font-size: 12px;
           &:nth-child(3){
            // width: 150px;
            overflow:hidden;text-overflow: ellipsis;
           }
         }
       }
     }
   }
</style>
<style lang="scss">

   .map-dialog-container{
     .el-dialog{
       background: transparent;
     }
    .el-dialog__header {
      font-size:0;
      background: rgba(15, 75, 99, 1);
      padding-bottom:20px;
      .el-dialog__title{
        color:#fff;
      }
    }
    .el-dialog__body {
      padding: 0;
      background: rgba(15, 75, 99, 0.7);
    }
    .el-dialog__headerbtn .el-dialog__close{
      position: relative;
      z-index: 999;
      color:#fff;
    }
   }
  #label{
    width:100%;
    height:350px;
    .longmap-video-dialog{
      width: 100%;
      height: auto;
    }
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