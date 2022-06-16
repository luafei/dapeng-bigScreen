<template>
  <div class="service-analyzation">
    <DpHeader :active-on="3">
        <span>服务指标</span>
    </DpHeader>
    <div class="daner-left-filter"></div>
    
    <!-- <div class="daner-right-filter"></div> -->
    <div class="daner-left-busi">
        <div class="daner-left-busi01" >
        
          <div class="daner-left01-busishow01" >
              <!-- <div class="daner-left01-busiheard" ></div> -->
              <div class="daner-left01-busishow00 addition_gray addition-heard " @click="rightlistfore(3)" :class="{addition_blue:clickblue==3}" >考核指标分析</div>
              <div class="daner-left02-busishow02 addition_gray addition-heard public_height" @click="rightlistfore(3)" :class="{addition_blue:clickblue==3}">耗时分析</div>
              <div class="daner-left03-busishow03 addition_gray addition-heard public_height" @click="rightlistfore(2)" :class="{addition_blue:clickblue==2}">12345分析</div>
              <div class="daner-left04-busishow04 addition_gray addition-heard public_height" @click="rightlistfore(1)" :class="{addition_blue:clickblue==1}">叫号分析</div>
              <div class="daner-left05-busishow05 addition_gray addition-heard" @click="rightlistfore(4)" :class="{addition_blue:clickblue==4}">业务办理时效</div>
              <div class="daner-left06-busishow06 addition_gray addition-heard public_height" @click="rightlistfore(4)" :class="{addition_blue:clickblue==4}">好差评分析</div>
          </div>
        </div>
    </div>
    <div class="danger-chart">
      <div class="danger-left">
        <el-row type="flex" class="row-bg" justify="center">
          <!-- 点击考核指标分析与耗时分析会同时出现 -->
          <!-- 考核指标 -->
          <el-col>
            <IndexAnalySis
              class="today-flow"
              v-if="busiindex === 3"
            ></IndexAnalySis>
          </el-col>
          <!-- 耗时分析 -->
          <el-col>
            <elapsedtime
            v-if="busiindex === 3"
              class="today-flow"
            ></elapsedtime>
          </el-col>
          <!-- <el-col>
            <ProfessionTime
              class="today-flow"
              v-show="busiindex === 2"
            ></ProfessionTime>
          </el-col> -->
          <!-- 点击12345分析会出现  -->
          <el-col>
            <complaint
             class="today-flow"
             v-if="busiindex === 2"
            >
            </complaint>
          </el-col>
          <el-col>
           <Complaintanalysis
            class="today-flow"
            v-if="busiindex === 2"
           >
             </Complaintanalysis>
          </el-col>
          <el-col>
            <Typescomplaints
             class="today-flow"
             v-if="busiindex === 2"
            >
              </Typescomplaints>
          </el-col>
          <el-col>
            <overAll
            class="today-flow"
            v-if="busiindex === 2"
            >
            </overAll>
          </el-col>
          <!-- 叫号分析 -->
          <el-col>
            <callthename
            v-if="busiindex === 1"
             class="todat-flow"
            >
            </callthename>
          </el-col>
          <el-col>
            <businesstime
            v-if="busiindex === 1"
            class="today-flow"
            >
            </businesstime>
          </el-col>
          <!-- 业务办理时效，好差评分析界面 -->
          <el-col>
            <businessdone 
            v-if="busiindex===   4 "
             class="today-flow"
            >
              </businessdone> 
          </el-col>
          <el-col>
            
          </el-col>
        </el-row>
      </div>
      <div class="danger-right">
        <el-row type="flex" class="row-bg" justify="center">
          <cameravideo></cameravideo>
        </el-row>
      </div>
    </div>
     <!-- <Footdownnav :activeindex="'2'"></Footdownnav> -->
     <CarInfoDialog :show.sync="beachInfoDialog" width="400px" :carInfo="infoList" :Dialongright = "'0'">
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
    >
      <ul class="video-tab" v-show="videoListArr.length > 1">
        <li v-for="(item, index) in videoListArr.length" :key="index" :class="{'active': index === curVideoIndex}" @click="changeVideo(index)"></li>
      </ul>
      <haikanPlayer :width="670" :height="402" :cameraIndexCode="videoListArr[curVideoIndex]" :layout="layout" v-if="videoShow"></haikanPlayer>
        
    </el-dialog>
  </div>
</template>

<script>
import DpHeader from "@/components/content/DpHeader";
import Footdownnav from "@/components/content/Footdownnav"
import IndexAnalySis from '@/views/components/businessanalysis/indexanalysis'
import elapsedtime from '@/views/components/businessanalysis/elapsedtime'
import complaint from '@/views/components/businessanalysis/complaint'
import Complaintanalysis from "@/views/components/businessanalysis/Complaintanalysis"
import CallNumPercentage from '@/views/components/businessanalysis/callNumPercentage'
import Typescomplaints from '@/views/components/businessanalysis/Typescomplaints'
import callthename from '@/views/components/businessanalysis/callthename'
import businesstime from '@/views/components/businessanalysis/businesstime'
import businessdone from '@/views/components/businessanalysis/businessdone'
import cameravideo from '@/views/components/businessanalysis/cameravideo'
// import ProfessionTime from '@/views/components/businessanalysis/professionTime'
import {getbusinNetwork , getbusinDetail } from '@/api/service'
import CarInfoDialog from '@/views/components/carInfoDialog/index.vue'
import haikanPlayer from '@/components/common/haikanPlayer/index'
import store from '@/store'
import request from '@/utils/request'
import overAll from '@/views/components/businessanalysis/overAll'
import {getvioce} from "@/api/beach"
const CAR_TYPE = "businessanalysis"
export default {
    name: 'businessanalysis',
    components: {
        DpHeader,
        IndexAnalySis,
        CallNumPercentage,
        elapsedtime,
        complaint,
        Complaintanalysis,
        Typescomplaints,
        callthename,
        businesstime,
        businessdone,
        cameravideo,
        Footdownnav,
        CarInfoDialog,
        haikanPlayer,
        overAll
    },
    data(){
        return {
          busiindex:1,
          clickblue:1,
          carType: CAR_TYPE,  
          beachInfoDialog: false,
          infoList: [],
          videoListStr:'',
          videoListArr:[],
          curVideoIndex:0,
          videoShow: false,
          isShowVideoList:false
        }
    },
    created() {
      // store.dispatch('getServicList'),
      
    },
    mounted() {
      this.getServicList();
      this.$on('on-click-servicbusin',this.showBusinInfo)
      // this.getloos()
    },
    inject:['mapPageVm'],
    methods:{
      // async getloos() {
      //   let post ={
      //         "szvsud-license-key": "jK6k5QWQe8OrqkS2WTfkDWUOb7Ablkfr+T/NrBOweSIgAou3RBv+Cp2oQYrar2Fp"
       
      //   }
      //   const res = await getvioce(post)
      //   console.log(res,'89988res')
      // }, 
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
         async showBusinInfo({id}) {
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
              name: networkName,
              icon: 'el-icon-video-play',
              style: 'width: 45%; border: 1px solid #0ab8eb; float:left;margin:0.04rem 0.04rem 0.02rem 0.045rem;',
              onClick: (item) => {
                this.showAroundVideo(res.data.data,'xwjcVideo')
              }
            }) 
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
             if(videoType === 'hkVideo' ) {
                this.videoListStr += `${item},`
              } else {
                this.videoListStr += `${item.videoCode},`
              }
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
      rightlistfore(index){
        this.busiindex = index
        this.clickblue= index
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
    margin-bottom: 0px;
  }
  .row-bg {
    flex-direction: column;
    height: 100%;
  }
}
.danger-right {
  width: 390px;
  pointer-events: auto;
  .row-bg {
    flex-direction: column;
    height: 100%;
    margin-top: -40px;
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
.daner-left-busi{
    width: 150px;
    height: 100%;
    pointer-events: auto;
    // border:1px solid red;
    position: absolute;
    left: 420px;
    top: 50%;
    transform: translateY(-50%);

 .daner-left-busi01{
     width: 100%;
     height: 100%;
     background: no-repeat;
     background-size: 100%!important ;
     background: url(../../assets/images/busi01.png) no-repeat ;
     z-index: 0;
     position: absolute;
     top: 50%;
     transform:translateY(-50%)
  }

  .daner-left01-busishow01{
    // height: 100%;
    // width: 100%;
    // border: 1px solid red;
    position: absolute;
    left: 420px;
    top:70px;
    .daner-left01-busishow00{
        width:150px;
        height: 35px;
        background-size: 150px 35px!important;
        position: absolute;
        top: 105px;
        right: 155px;
        font-size: 15px;
        text-align: center;
        line-height: 35px;
    }
    .daner-left01-busishow00.addition_blue:before{
        left: -20px;
        top: 10px;
    }
    .daner-left02-busishow02{
        position: absolute;
        top: 230px;
        right: 120px;
        font-size: 15px;
        text-align: center;
        line-height: 35px;
    }
     .daner-left02-busishow02.addition_blue:before{
       display: none;
    }
    .daner-left03-busishow03{
        position: absolute;
        top:360px;
        right: 105px;
        font-size: 15px;
        text-align: center;
        line-height: 35px;
    }
     .daner-left03-busishow03.addition_blue:before{
        left: -25px;
        top: 10px;
    }
     .daner-left04-busishow04{
        position: absolute;
        top: 485px;
        right: 105px;
        font-size: 15px;
        text-align: center;
        line-height: 35px;
    }
    .daner-left04-busishow04.addition_blue:before{
        left: -25px;
        top: 8px;
    }
     .daner-left05-busishow05{
        width: 150px;
        height: 35px;
        background-size: 150px 35px!important;
        position: absolute;
        top: 612px;
        right: 125px;
        font-size: 15px;
        text-align: center;
        line-height: 35px;
    }
    .daner-left05-busishow05.addition_blue:before{
        left: -18px;
        top:8px;
    }
     .daner-left06-busishow06{
        position: absolute;
        top: 736px;
        right: 155px;
        font-size: 15px;
        text-align: center;
        line-height: 35px;
    }
     .daner-left06-busishow06.addition_blue:before{
        display: none;
    }
  }
}

.addition_gray{
      cursor: pointer;
      color: #fff;
      background: url(../../assets/images/busishow02.png) no-repeat;
    }
.addition_blue{
      cursor: pointer;
      color: rgba(50,253,246,1);
      background: url(../../assets/images/busishow01.png) no-repeat;
    }
.addition_blue:before{
        content:'';
        background: no-repeat;
        width: 11px;
        height: 15px;
        background-size: 11px 15px!important ;
        position: absolute;
        background: url(../../assets/images/busiheard01.png) ;
    }
    .public_height{
         width: 150px;
        height: 35px;
        background-size: 150px 35px!important;
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