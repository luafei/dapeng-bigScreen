<template>
  <div class="entrance">
    <div class="title-time">
       <sub-title 
        title="服务大厅视频"
        >
        </sub-title>
    </div>
        <ul class="video-tab"  v-show="dapengGovVideoList.length > 1">
          <li v-for="(item, index) in dapengGovVideoList.length" :key="index" :class="{'active': index === curDapengVideoIndex}" @click="changeDapengVideo(index)"></li>
        </ul>
        <div class="outline">
          <div class="interior">
            <!-- 视频位 -->
            <div class="interior_1">
              <div class="video-wrap">
                <haikanPlayer :width="380" :height="180" :showToolbar="1" @onSuccess="onSuccess" v-if="sortPlayer[0] && isShowDapengVideo" :index="0" :cameraIndexCode="dapengGovVideoList[curDapengVideoIndex].videoCode" :layout="layout"></haikanPlayer>
              </div>
            </div>
          </div>
          <div class="interior-two">
            <h2>{{dapengGovVideoList[curDapengVideoIndex].beachName}}</h2>
          </div>
        </div>
        <div class="outline_two">
          <div class="guichet_one-wrap">
            <div class="guichet_one">
                <div class="guichet_one_inter">
                  <!-- 视频位 -->
                  <div class="guichet_one_inter_video" v-if="sortPlayer[1] && isShowOthersVideo">
                    <haikanPlayer :width="192" :height="110" :showToolbar="1" @onSuccess="onSuccess" :index="1" :cameraIndexCode="othersGovVideoList[curOthersVideoIndex][0].videoCode" :layout="layout"></haikanPlayer> 
                  </div>
                </div>
                <div class="guichet_one_interdown">
                  <h2>{{othersGovVideoList[curOthersVideoIndex][0].beachName}}</h2>
                </div>
            </div>
            <div class="guichet_one" v-if="othersGovVideoList[curOthersVideoIndex][1]">
              <div class="guichet_one_inter">
                <!-- 视频位 -->
                  <div class="guichet_one_inter_video" v-if="sortPlayer[2] && isShowOthersVideo">
                    <haikanPlayer :width="192" :height="110" :showToolbar="1" :index="2" :cameraIndexCode="othersGovVideoList[curOthersVideoIndex][1].videoCode" :layout="layout"></haikanPlayer>
                  </div>
                </div>
                <div class="guichet_one_interdown">
                  <h2>{{othersGovVideoList[curOthersVideoIndex][1].beachName}}</h2>
                </div>
            </div>
          </div>
          <ul class="video-tab bottom-tab"  v-show="othersGovVideoList.length > 1">
            <li v-for="(item, index) in othersGovVideoList.length" :key="index" :class="{'active': index === curOthersVideoIndex}" @click="changeOthersVideo(index)"></li>
          </ul>
        </div>
  </div>
</template>
 
<script>

import SubTitle from "@/components/common/SubTitle";
import haikanPlayer from '@/components/common/haikanPlayer/index'
import { getGovNetWorkVideoCodes } from '@/api/video'
import { chunk } from 'lodash'

export default {
  name: "cameravideo",
  components: {
    SubTitle,
    haikanPlayer
  },
  props: {
    
  },
  data() {
    return {
      layout:'1x1',
      sortPlayer: [true,false,false], //由于一个页面同时加载多个海康视频插件时只能穿行调用JS_StartService()启动服务,
      isShowDapengVideo: true,
      isShowOthersVideo: true,
      dapengGovVideoList: [],
      othersGovVideoList: [],
      curDapengVideoIndex: 0,
      curOthersVideoIndex: 0
    };
  },
  created(){
    this.getGovNetWorkVideoCodes()
  },
  mounted() {
  },
  methods: {
    async getGovNetWorkVideoCodes(){
      const res = await getGovNetWorkVideoCodes()
      this.dapengGovVideoList = []
      this.othersGovVideoList = []
      res.data.data.forEach(item => {
        if(item.beachName === '大鹏新区行政服务大厅'){
          this.dapengGovVideoList.push(item)
        }else {
          this.othersGovVideoList.push(item)
        }
      })
      this.othersGovVideoList = chunk(this.othersGovVideoList,2)
    },
    onSuccess({index}){
      this.$set(this.sortPlayer, index+1, true)
    },
    changeDapengVideo(index){
      this.isShowDapengVideo = false
      this.$nextTick(() => {
        setTimeout(() => {
          this.curDapengVideoIndex = index
          this.isShowDapengVideo = true
        }, 300)
      })
    },
    changeOthersVideo(index){
      this.isShowOthersVideo = false
      this.$nextTick(() => {
        setTimeout(() => {
          this.curOthersVideoIndex = index
          this.isShowOthersVideo = true
        }, 300)
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.entrance {
  position: relative;
  display: flex;
  flex-direction: column;
  .el-col-24 {
    width: 100%;
    height: 220px;
}
  .sub-title-left,
  .sub-title-right {
    display: inline-block;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
  }
  .sub-title-left {
    margin-right: 18px;
  }
  .sub-title-right {
    margin-left: 18px;
  }
  .time-road {
    margin-top: 12px;
  }
}
.title-time{
    position: relative;
    margin-bottom: 10px;
    .time-road{
        position: absolute;
        right: 0;
        top: 0;
        margin-top:0;
    }
}
.outline{
  width: 395px;
  // height: 249px;
  // border: 1px solid #0AB8EB;
  background: rgba(22,70,88,.3);
  // box-sizing: border-boxs;
  .interior{
    border: 1px solid  rgba(255,255,255,.3);
    // box-sizing: border-box; 
    padding: 3px;
    min-height: 240px;
    .interior_1{
      position: relative;
      width: 386px;
      // height: 202px;
      border: 1px solid rgba(255,255,255,0);
      .video-wrap{
        position: relative;
        width: 386px;
        // height: 160px;
      }
    }
  }
  .interior-two{
      width: 395px;
      height:38px;
      border: 1px solid  rgba(255,255,255,.3);
      h2{
        color: #fff;
        text-align: center;
        line-height: 35px;
        font-size: 16px;
      }
  }

}
.outline_two{
  position: relative;
  width: 390px;
  height: 130px;
  // background: #164658;
  margin-top: 10px;
  .guichet_one-wrap{
    display: flex;
  }
  .guichet_one{
    // width: 192px;
    // height: 103px;
    // border: 1px solid #0AB8EB;
    box-sizing: border-box;
    .guichet_one_inter{
      width: 197px;
      height: 120px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      background: rgba(22,70,88,.3);
      padding:2px ;
      .guichet_one_inter_video{
        // width: 186px;
        // height: 101px;
        // border: 1px solid rgba(255, 255, 255, 0.5);
      }
    }
    .guichet_one_interdown{
      width: 197px;
      height: 28px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-top: 0;
      background: rgba(22,70,88,.3);
      h2{
        color: #fff;
        text-align: center;
        font-size: 13px;
        line-height: 25px;
      }
    }
  }
}
.video-tab{
  width:100%;
  // height:25px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  text-align:center;
  font-size:0;
  z-index:999;
  top: 0;
  margin-bottom: 10px;
  li{
    display:inline-block;
    width:10px;
    height:10px;
    margin:2px 4px;
    border-radius: 50%;
    background:#fff;
    opacity:.5;
    transition:.3s;
    flex-shrink: 0;
    cursor:pointer;
    &.active{
      opacity:1;
    }
  }
}
.bottom-tab{
  position:absolute;
  left:0;
  top:0;
  height:auto;
  top: auto;
  bottom: -50px;
  flex-wrap: wrap;
  li{
    margin-bottom: 5px;
  }
}
</style>


