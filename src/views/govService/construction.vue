<template>
  <div class="service-analyzation">
    <DpHeader :active-on="3">
        <span>重点业务</span>
    </DpHeader>
    <div class="daner-left-filter"></div>
    
    <!-- <div class="daner-right-filter"></div> -->
    <div class="daner-left-busi">
        <div class="daner-left-busi01" >
        <div class="daner-left01-busishow01" >
            <div class="daner-left01-busiheard" ></div>
            <div class="daner-left01-busishow00 addition_gray addition-heard public_height" @click="rightlistfore(1)" :class="{addition_blue:clickblue==1}" >人才引进业务分析</div>
            <div class="daner-left02-busishow02 addition_gray addition-heard public_height" @click="rightlistfore(2)" :class="{addition_blue:clickblue==2}">惠民利企业业务分析</div>
            <div class="daner-left03-busishow03 addition_gray addition-heard " @click="rightlistfore(3)" :class="{addition_blue:clickblue==3}">便民业务</div>
            <div class="daner-left04-busishow04 addition_gray addition-heard public_height" @click="rightlistfore(4)" :class="{addition_blue:clickblue==4}">更新城市业务分析</div>   
            <div class="daner-left04-busishow05 addition_gray addition-heard public_height" @click="rightlistfore(4)" :class="{addition_blue:clickblue==4}">疫情专区</div>   
        </div>
      </div>
    </div>
    <div class="danger-chart">
      <div class="danger-left">
        <el-row type="flex" class="row-bg" justify="center">
          <!-- 点击考核指标分析与耗时分析会同时出现 -->
          <div v-if="busiindex === 1" class="newstr">
            <h3>政府机关人才引进占比:<span>2.8%</span></h3>
            <h3>企业人才引进占比:<span>97.2%</span></h3>
          </div>
          <!-- 用户指标卡分析 -->
          <el-col>
             <userindicators
               v-if="busiindex === 1"
               class="today-flow"
             >
             </userindicators>
          </el-col> 
          <!-- 新建 -->
          <el-col>
            <newbody
             class="today-flow"
             v-if="busiindex === 1"
            >
              </newbody>
          </el-col>
          <!-- 应届生接收 -->
          <el-col>
            <accept
              v-if="busiindex === 1"
              class="today-flow"
            ></accept>
          </el-col>
          <!-- 大鹏新区人才发表学术论文奖励 -->
          <el-col>
            <!-- <award
             class="today-flow"
             v-if="busiindex === 1"
            >
            </award> -->
          </el-col>
          <!-- 点击惠民利企业业务分析会出现  -->
            <el-col>
              <!-- 企业对就业困难 -->
            <subsidize
              class="today-flow"
              v-if="busiindex === 2"
            ></subsidize>
          </el-col>
          <el-col>
            <!-- 困难人群补贴 -->
           <disadvantagedgroup
            class="today-flow"
            v-if="busiindex === 2"
           >
             </disadvantagedgroup>
          </el-col>
          <el-col>
            <!-- 新开办企业免费刻印章 -->
            <stereotype
             class="today-flow"
             v-if="busiindex === 2"
            >
              </stereotype>
          </el-col>
          <el-col>
            <!-- 便民业务 -->
            <Machine
            v-if="busiindex === 3"
            class="today-flow"
            ></Machine>
          </el-col>
          <el-col>
            <!-- 一体机部门业务统计分析 -->
            <Businesstwo
             v-if="busiindex === 3"
             class="today-flow"
            ></Businesstwo>
          </el-col>
          <el-col>
            <!-- 一体机部门业务统计分析 -->
            <Businessone
             v-if="busiindex === 3"
             class="today-flow"
            ></Businessone>
          </el-col>
          <!-- 城市更新 -->
          <el-col>
            <BusinessAnalysis
              class="today-flow"
              v-if="busiindex === 4"
            ></BusinessAnalysis>
          </el-col>
           <!-- 疫情专区 -->
          <el-col>
            <!-- 疫情业务申报排名 -->
            <vaccination
            v-if="busiindex === 4"
             class="todat-flow"
            >
            </vaccination>
          </el-col>
          <el-col>
            <!-- 疫情业务分析 -->
            <Rankinganalysis
            v-if="busiindex === 4"
            class="today-flow"
            >
            </Rankinganalysis>
          </el-col>
        </el-row>
      </div>
      <div class="danger-right">
        <el-row type="flex" class="row-bg" justify="center">
          <cameravideo>
            
          </cameravideo>
        </el-row>
      </div>
    </div>
    <CarInfoDialog :show.sync="beachInfoDialog" :carInfo="infoList" width="400px" :Dialongright = "'0'"></CarInfoDialog>
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
import BusinessAnalysis from '@/views/components/construction/BusinessAnalysis'
import accept from '@/views/components/construction/accept'
import award from '@/views/components/construction/award'
import subsidize from '@/views/components/construction/subsidize'
import disadvantagedgroup from "@/views/components/construction/disadvantagedgroup"
import stereotype from '@/views/components/construction/stereotype'
import vaccination from '@/views/components/construction/vaccination'
import CallNumPercentage from '@/views/components/businessanalysis/callNumPercentage'
import Rankinganalysis from '@/views/components/construction/Rankinganalysis'
import businessdone from '@/views/components/businessanalysis/businessdone'
import cameravideo from '@/views/components/businessanalysis/cameravideo'
import CarInfoDialog from '@/views/components/carInfoDialog/index.vue'
import {getbusinNetwork , getbusinDetail, getTerminal } from '@/api/service'
import request from '@/utils/request'
import haikanPlayer from '@/components/common/haikanPlayer/index'
import Machine from '@/views/components/construction/machine'
import Businessone from '@/views/components/construction/Businessone'
import Businesstwo from '@/views/components/construction/Businesstwo'
import userindicators from '@/views/components/construction/userindicators'
import newbody from '@/views/components/construction/newbody'
import store from '@/store' 
const CAR_TYPE = "construction"
export default {
    name: 'construction',
    components: {
        DpHeader,
        BusinessAnalysis,
        CallNumPercentage,
        accept,
        award,
        disadvantagedgroup,
        stereotype,
        vaccination,
        Rankinganalysis,
        businessdone,
        cameravideo,
        subsidize,
        CarInfoDialog,
        haikanPlayer,
        Machine,
        Businessone,
        Businesstwo,
        userindicators,
        newbody
    },
    data(){
        return {
          busiindex:1,
          clickblue:1,
          carType: CAR_TYPE, 
          source:null,
          beachInfoDialog: false,
          infoList: [],
          videoListStr:'',  
          videoListArr:[],
          curVideoIndex:0,
          videoShow: false,
          isShowVideoList:false  
        }
    },
    inject:['mapPageVm'],
    created() {
      // store.dispatch('getServicList')
    }, 
    mounted() {
      this.getServicList()
      this.getmachinelist()
      this.$on('on-click-cityservic',this.showCityInfo)
      this.$on('on-click-machine', this.showMachine)
    },
    inject:['mapPageVm'],
    methods:{
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
      async getmachinelist () {//一体机分布 
        const res = await getTerminal()
        let data = res.data.data                                                                                                         
        data.forEach ((item) => {
          item.pointType = 'machine',
          item.pointName = item.networkName
        })
        this.mapPageVm.machinelist = data
      },
      rightlistfore(index){
        this.busiindex = index
        this.clickblue= index
     },
     async showCityInfo({id}) {
       console.log(id,'id')
         this.source && this.source.cancel('取消请求')
         this.source = request.CancelToken.source()
         console.log(this.source,'source')
         this.beachInfoDialog = true;
         this.infoList = []
         const res = await getbusinDetail(id, this.source.token) 
         if(!res || !res.data.data) return 
         let {address , minutes , networkName, } = res.data.data
         console.log(res,'dadasdasdas')
         console.log(address,'address')
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
           id:4,
           label:'周边视频',
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
        // 一体机信息获取
        async showMachine({id}) {
          console.log(id,'id')
          this.source && this.source.cancel('取消请求')
          this.source = request.CancelToken.source()
          this.beachInfoDialog = true;
          this.infoList = []
          let address = ''
          let networkName = ''
          const res = await getTerminal(id)
          if(!res || !res.data.data) return 
          console.log(res.data.data,'resssww')
           res.data.data.forEach(item => {
             address = item.address
             networkName =item.networkName
           })

          this.infoList.push({
           id:1,
           label: '名称: ',
           value: networkName
          },
          {
           id:2,
           label:'安装位置：',
           value: address
          })
        },
        async showAroundVideo(row, videoType,){
          
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
.newstr{
  border-bottom: 1px solid rgba(131,255,245);
  margin-bottom: 8px;
  h3{
    color: #fff;
    font-weight: normal;
  }
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
  width: 390px;
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
      background: url(../../assets/images/city0.png) no-repeat;
       position: absolute;
      top: 50%;
      transform:translateY(-50%)
 }
}
.daner-left01-busishow01{
    // height: 100%;
    // border: 1px solid red;
    position: absolute;
    left: 460px;
    top: 10px;
    
    .daner-left01-busishow00{
        position: absolute;
        top: 180px;
        right: 175px;
        font-size: 15px;
        text-align: center;
        line-height: 35px;
    }
    .daner-left01-busishow00.addition_blue:before{
        left: 100px;
        top: 200px;
    }
    .daner-left02-busishow02{
        position: absolute;
        top: 295px;
        right: 160px;
        font-size: 15px;
        text-align: center;
        line-height: 35px;
    }
     .daner-left02-busishow02.addition_blue:before{
       left: 128px;
        top: 318px;
    }
    .daner-left03-busishow03{
        width:150px;
        height: 35px;
        background-size: 150px 35px!important;
        position: absolute;
        top: 420px;
        right: 145px;
        font-size: 15px;
        text-align: center;
        line-height: 35px;
    }
     .daner-left03-busishow03.addition_blue:before{
        left: 143px;
        top: 440px;
    }
     .daner-left04-busishow04{
        position: absolute;
        top: 545px;
        right: 145px;
        font-size: 15px;
        text-align: center;
        line-height: 35px;
    }
    .daner-left04-busishow04.addition_blue:before{
        left: 140px;
        top: 565px;
    }
    .daner-left04-busishow05{
      position: absolute;
      top: 665px;
      right: 160px;
      font-size: 15px;
      text-align: center;
      line-height: 35px;
    }
     .daner-left04-busishow05.addition_blue:before{
       display: none;
    }
}
.addition_gray{
      cursor: pointer;
      color: #fff;
      background: url(../../assets/images/city1.png) no-repeat;
    }
.addition_blue{
      cursor: pointer;
      color: rgba(50,253,246,1);
      background: url(../../assets/images/city2.png) no-repeat;
    }
.addition_blue:before{
        content:'';
        background: no-repeat;
        width: 11px;
        height: 15px;
        background-size: 11px 15px!important ;
        position: fixed;
        background: url(../../assets/images/busiheard01.png) ;
    }
    .public_height{
        width:150px;
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