<template>
<div id="views">
    <div class="mask" :class="[isWayLeave?'nobg':'']">
        <!-- <MapDialog v-model="visible" @close="closeMapDialog" url="http://172.21.112.74:83/openUrl/X1wjJ7i/live.m3u8" :video-frame="videoFrame" :mapId="mapId"></MapDialog> -->
        <MapDialog v-model="visible" @close="closeMapDialog" :carType="videoDataType" :url="liveUrl" :video-id="videoId" :video-frame="videoFrame" :map-title="mapDialogTitle"></MapDialog>
        <DangerDialog v-model="dangerImgVisible" @close="closeDangerDialog" :danger-info='dangerInfo'></DangerDialog>
        <SlakedDialog :show.sync="showSlaked"/>
        <tip-dialog v-model="tipDialog" :tip-info="tipInfo" @close="closeTipDialog"></tip-dialog>
        <router-view />

        <!-- <RtmpLive src="rtmp://58.200.131.2:1935/livetv/hunantv"></RtmpLive> -->
        <!-- <HlsLive></HlsLive> -->
    </div>
    <div class="map-handle-wrap" :class="$route.path === '/warningDetails' ? 'map-handle-wrap-650':''" v-show="isMapHandle == true" ref="mapHandle">
        <map-handle v-if="isMapHandle" :type-page="carType"></map-handle>
    </div>
    <div id="threeDModel" :class="isSelect3DModel ? 'threeDModel-sel' : ''">三维模型</div>
    <el-dialog
        width="670px"
        top="15vh"
        :title="currentVideoTitle"
        class="innerDialog"
        v-if="videoLiveDialog"
        :visible.sync="videoLiveDialog"
        append-to-body
    >
        <haikanPlayer :width="670" :height="402" :cameraIndexCode="currentVideoCode"></haikanPlayer>
    </el-dialog>

     <el-dialog
        width="600px"
        top="26vh"
        margin-right='117vh'
        :title="电子联单详情"
        class="innerDialog"
        v-if="showVehicle"
        :visible.sync="showVehicle"
        append-to-body
        >
          <VehicleDialog :vehicleData='vehicleData'  /> 
            <!-- </template> -->
        </el-dialog>

    <CarInfoDialog 
    :show.sync="showCarInfo" 
    :carInfo="carInfo" 
    :Dialongright = "'0'">
        <CarHandleTab 
        :carInfo="originCarInfo" 
        :show="showCarInfo" 
        :showTail="showHandleTabTail" 
        :showExplosion="showHandleTabExplosion" 
        @onResetHandleTab="onResetHandleTab" 
        @onTail="onTail" 
        @onCloseTail="onCloseTail" 
        @onCloseTrack="onCloseTrack"  
        @onTrack="onTrack" 
        @onExplosion="onExplosion" 
        @onCloseExplosion="onCloseExplosion">
        </CarHandleTab>
        <el-dialog
        width="475px"
        top="26vh"
        margin-right='117vh'
        :title="电子联单详情"
        class="innerDialog"
        v-if="newisshow"
        :visible.sync="newisshow"
        append-to-body
        >
            <!-- <template v-if="doublenumber&&tipInfo.pointType==='3'">  -->
            <div class="address">联单编号：{{doublenumber.serial||'无'}}</div>
            <div class="address">排放状态：{{doublenumber.Discharge||'无'}}</div>
            <div class="address">车辆申报：{{doublenumber.Vehiclecar||'无'}}</div>
            <div
                class="address"
            >联单状态：{{doublenumber.doublestate||'无'}}</div>
            <div
                class="address"
            >工地名称：{{doublenumber.sitename||'无'}}</div>
            <div class="address"> 消纳场所: {{doublenumber.gicenplace||'0'}}</div>
            <div class="address"> 生成时间: {{doublenumber.generatetime||'0'}}</div>
            <div class="address"> 出场时间: {{doublenumber.cometime||'0'}}</div>
            <div class="address"> 完成时间: {{doublenumber.completiontime||'无'}}</div>
            <div class="address"> 签认时间: {{doublenumber.signtime||'0'}}</div>
            <!-- </template> -->
        </el-dialog>
        <!-- 示范页面点击泥头车里的详情 -->
       
    </CarInfoDialog>
    <!-- <haikanPlayer style="position:absolute;z-index:999;right:20px;bottom:20px;" :width="300" :height="180" :cameraIndexCode="'44031253001320003037'"></haikanPlayer> -->
    <!-- <haikanPlayer style="position:absolute;z-index:999;left:20px;top:20px;" :width="300" :height="180" :cameraIndexCode="'44031253001320002768'"></haikanPlayer> -->
</div>
</template>

<script>
import axios from 'axios'
import {
    getMapVideoPoint,
    getTrafficRank,
    getMainRoadRank,
    getSZLCameras
} from '@/api/dumpTruck'
import MapDialog from '@/components/common/MapDialog'
import DangerDialog from '@/components/common/DangerDialog'
import RtmpLive from "@/components/common/RtmpLive.vue"
import HlsLive from "@/components/common/HlsLive.vue"
import TipDialog from '@/views/components/TipDialog/index'
import haikanPlayer from '@/components/common/haikanPlayer/index'
import CarInfoDialog from '@/views/components/carInfoDialog/index.vue'
import CarHandleTab from '@/views/components/CarHandleTab.vue'
import { carInteractive } from '@/views/mixins/carInteractive.js'
import mapInteractive from '@/views/mixins/mapInteractive.js'
import vehicle from '@/views/mixins/vehicle'
import drawMapMixins from '@/views/mixins/drawMap.js'
import electriFenceMixin from '@/views/mixins/electriFence.js'
import {getHotMapBeachList, getHotmappercentlist} from '@/api/beach'
import {
    startWebsocket,
    stopWebsocket,
    delPushCrossingIndexCode
} from '@/api/websocket'
import {
    getLiveUrl
} from '@/api/video'
import {
    parseTime, getVehicleRolesName, getDangerousChemicalsRolesName, getMudTruckRolesName, getBusCapacityRolesName, getStreetName
} from '@/utils/util'
import { difference } from 'lodash' 
import {
    getTimeDistribution
} from '@/api/dumpTruck'
import MapHandle from './components/mapHandle/index.vue'

import dicData from '@/mixins/dicData'
import emitter from '@/mixins/emitter.js'
import voice from '@/views/mixins/vioce.js'
import VehicleDialog from '././././DemonstrationSection/popup/vehicleDialog'
import SlakedDialog from '././././DemonstrationSection/popup/slakedDialog.vue'
let dangerCarLayer = null;
let mudTruckLayer = null;
let headLayer = null;
window.maplayers = {
    video: null,
    dangerGoodsEnterprise: null,
    gasSite: null,
    road: null,
    constructionSite: null,
    entrance: null,
    '10': null,
    '20': null,
    '30': null,
    '40': null,
    videoBeachPark: null,
    beach: null,
    servic:null, //新增服务网点
    machine:null,//新增一体机
    voic:null,//新增语音
    beachPark: null,
    dangerGoodsVihecle: false,
    dangerGoodsguiji:false,
    dumpTrucksVihecle:false,
    dumpTrucksguiji:false
}

window.map = {};

// window.vehicleMarkerLayers = {
//     carGps: null, //泥头车布点对象
//     truckGps: null, //危化品布点对象
//     '公交车': null, //公交车图层
//     '出租车': null //出租车图层
// }

export default {
    name: 'views',
    components: {
        MapDialog,
        RtmpLive,
        HlsLive,
        DangerDialog,
        TipDialog,
        MapHandle,
        haikanPlayer,
        CarInfoDialog,
        CarHandleTab,
        VehicleDialog,
        SlakedDialog
    },
    mixins: [dicData, emitter, carInteractive(), vehicle, drawMapMixins(), electriFenceMixin(), voice],
    provide() {
        return {
            app: this
        }
    },
    data() {
        return {
            doublenumber:null,
            nownewlist:[
                        {
                            serial:'20220101920121339',
                            Discharge:'有排放',
                            Vehiclecar:'已申报',
                            doublestate:'已完成',
                            sitename:'比亚迪深圳汽车生产园区(二期)项目研发宿舍',
                            gicenplace:'深圳市沙鱼涌码头',
                            generatetime:'2022-09-25 04:45:28',
                            cometime:'2022-09-25 04:56:58',
                            completiontime:'2022-09-25 05:31:04',
                            signtime:'2022-09-25 05:31:04'
                        },
                        {
                            serial:'20220200640111532',
                            Discharge:'有排放',
                            Vehiclecar:'未申报',
                            doublestate:'未到申报收纳场排放',
                            sitename:'深惠城际大鹏支线工程施工总承包土建五工区前期工程及围护结构工程',
                            gicenplace:'深圳市沙鱼涌码头',
                            generatetime:'2022-09-25 04:02:24',
                            cometime:'2022-09-25 04:04:11',
                            completiontime:'2022-09-25 04:10:46',
                            signtime:'2022-09-25 04:10:46'
                        },
                        {
                            serial:'20220101500118180',
                            Discharge:'有排放',
                            Vehiclecar:'未申报',
                            doublestate:'未到申报收纳场排放',
                            sitename:'河套深港科技创新合作区东翼-1项目土石方和基坑支护工程',
                            gicenplace:'月亮湾码头南泊位',
                            generatetime:'2022-09-25 03:40:00',
                            cometime:'2022-09-25 03:41:30',
                            completiontime:'2022-09-25 04:31:38',
                            signtime:'2022-09-25 04:31:38'
                        },
                        {
                            serial:'20220101920121316',
                            Discharge:'有排放',
                            Vehiclecar:'已申报',
                            doublestate:'已完成',
                            sitename:'比亚迪深圳汽车生产园区(二期)项目研发宿舍',
                            gicenplace:'深圳市沙鱼涌码头',
                            generatetime:'2022-09-25 03:18:00',
                            cometime:'2022-09-25 03:37:08',
                            completiontime:'2022-09-25 04:10:46',
                            signtime:'2022-09-25 04:10:46'
                        },
                        {
                            serial:'20220101500118157',
                            Discharge:'有排放',
                            Vehiclecar:'未申报',
                            doublestate:'已完成',
                            sitename:'河套深港科技创新合作区东翼-1项目土石方和基坑支护工程',
                            gicenplace:'妈湾0号泊位（B区）',
                            generatetime:'2022-09-25 02:18:36',
                            cometime:'2022-09-25 02:21:06',
                            completiontime:'2022-09-25 03:19:39',
                            signtime:'2022-09-25 03:19:39'
                        },
                        {
                            serial:'20210103320154807',
                            Discharge:'有排放',
                            Vehiclecar:'未申报',
                            doublestate:'未到申报收纳场排放',
                            sitename:'新皇岗口岸联检大楼土石方、基坑支护和桩基专业承包工程',
                            gicenplace:'月亮湾码头南泊位',
                            generatetime:'2022-09-25 01:39:27',
                            cometime:'2022-09-25 03:39:23',
                            completiontime:'2022-09-25 04:31:28',
                            signtime:'2022-09-25 04:31:28'
                        },
                        {
                            serial:'20210103320154650',
                            Discharge:'有排放',
                            Vehiclecar:'已申报',
                            doublestate:'已完成',
                            sitename:'新皇岗口岸联检大楼土石方、基坑支护和桩基专业承包工程',
                            gicenplace:'妈湾0号泊位（B区）',
                            generatetime:'2022-09-25 01:15:06',
                            cometime:'2022-09-25 02:18:06',
                            completiontime:'2022-09-25 03:19:39',
                            signtime:'2022-09-25 03:19:39'
                        },
                        {
                            serial:'20211200780110143',
                            Discharge:'未排放',
                            Vehiclecar:'已申报',
                            doublestate:'未到申报收纳场排放',
                            sitename:'坪山大道综合改造工程（中段）',
                            gicenplace:'深圳市沙鱼涌码头',
                            generatetime:'2022-09-24 23:41:16',
                            cometime:'2022-09-24 23:43:16',
                            completiontime:'2022-09-25 00:17:59',
                            signtime:'2022-09-25 00:17:59'
                        },
                        {
                            serial:'20220101500118122',
                            Discharge:'有排放',
                            Vehiclecar:'已申报',
                            doublestate:'已完成',
                            sitename:'河套深港科技创新合作区东翼-1项目土石方和基坑支护工程',
                            gicenplace:'月亮湾码头南泊位',
                            generatetime:'2022-09-24 23:08:54',
                            cometime:'2022-09-24 23:10:54',
                            completiontime:'2022-09-25 00:09:39',
                            signtime:'2022-09-25 00:09:39'
                        },
            ],
            newisshow:false,
            video: require("@/assets/images/video.png"),
            entranceIcon: require("@/assets/images/entrance-icon.png"),
            gasIcon: require("@/assets/images/gas-icon.png"),
            roadSectionIcon: require("@/assets/images/road-section-icon.png"),
            contructionSiteIcon: require("@/assets/images/contruction-site-icon.png"),
            dangerousComIcon: require("@/assets/images/dangerous-com-icon.png"),
            polymerizationIcon: require('@/assets/images/map/polymerization.png'),
            videoIcon: require('@/assets/images/map/video.png'),
            videoFusionIcon: require('@/assets/images/map/video-fusion-icon.png'),
            startIcon: require('@/assets/images/map/start-icon.png'),
            endIcon: require('@/assets/images/map/end-icon.png'),
            sdGasLibIcon: require('@/assets/images/map/sd-gas-lib.png'),
            twoD: require('@/assets/images/handleIcon/2d.png'),
            threeD: require('@/assets/images/handleIcon/3d.png'),
            level10BlueIcon: require('@/assets/images/level-blue-icon.png'),
            level20YellowIcon: require('@/assets/images/level-yellow-icon.png'),
            level30OrangeIcon: require('@/assets/images/level-orange-icon.png'),
            level40RedIcon: require('@/assets/images/level-red-icon.png'),
            busStationIcon: require('@/assets/images/bus-station-icon.png'),
            busStationAlarmIcon: require('@/assets/images/bus-station-icon-alarm.png'),
            beachIcon: require('@/assets/images/beach-icon.png'),
            beachAlarmIcon: require('@/assets/images/beach-alarm-icon.png'),
            servicIcon: require('@/assets/images/service.png'),//服务网点
            servicIcon2:require('@/assets/images/service2.png'),//行政网点
            servicIcon3:require('@/assets/images/service3.png'),//行政网点
            servicIcon4:require('@/assets/images/service4.png'),//婚姻登记处
            servicIcon5:require('@/assets/images/service5.png'),//办证大厅
            mainchine:require('@/assets/images/machine-icon.png'),//一体机分布
            // voicnicone:require(),
            videoAnalysisBeachIcon: require('@/assets/images/video-beach-icon.png'),
            videoBeachIcon: require('@/assets/images/videoBeach.png'),
            videoBeachParkIcon: require('@/assets/images/video-beach-park-icon.png'),
            videoParkIcon: require('@/assets/images/video-park-icon.png'),
            beachParkIcon: require('@/assets/images/beach-park-icon.png'),
            garbageIcon: require('@/assets/images/xiaona.png'),
 
            givenIcon:require('@/assets/images/example/givenicon.png'), // 消纳场落图

            isWayLeave: false,
            isMapHandle: true,
            visible: {
                isShow: false
            },
            dangerImgVisible: {
                isShow: false,
                name: ''
            },
            tipDialog: {
                isShow: false
            },
            liveUrl: '',
            mapDialogTitle: '',
            videoId: '',
            currentVideoCode: '',
            currentVideoTitle: '',
            // dangerCarLayer: null,
            // mudTruckLayer: null,
            // carGps: null, //泥头车布点对象
            // truckGps:null, //危化品布点对象？
            videoFrame: [],
            carType: '',
            checkFeatures: [],
            videoList: [], //视频列表
            dangerGoodsEnterpriseList: [], //危化品企业列表
            gasList: [], //加油站
            roadList: [], //重要路段
            entranceList: [], //出入口
            constructionSiteList: [], //工地
            beachVideoAnalysisList: [], //沙滩视频分析点
            videoBeachList: [], //沙滩视频点
            beachList: [], //沙滩列表
            servicList:[], //服务网点列表 新增
            machinelist:[],//一体机分布
            videoBeachParkList: [], //沙滩停车场视频分析点列表
            videoParkList: [], //沙滩停车场视频点列表
            beachParkList: [], //沙滩停车场列表
            busStationVideoList: [], //公交站点视频点
            busStationsList: [], //公交车站列表
            // layers: {
            //     video: null,
            //     dangerGoodsEnterprise: null,
            //     gasSite: null,
            //     road: null,
            //     constructionSite: null,
            //     entrance: null,
            //     '10': null,
            //     '20': null,
            //     '30': null,
            //     '40': null
            // },
            roadStatus: {}, //路段状态，对应路上是否已经渲染
            tipInfo: {},
            dangerInfo: {},
            currentCrossingIndexCode: '',
            pointTypeDisabledConvert: ['0', 'level10', 'level20', 'level30','level40', 'videoAnalysisBeach','videoBeach', 'videoBeachPark', 'beachPark', 'videoPark', 'cameraVideo'],  //不需要转换坐标的坐标点类型
            isSelect3DModel: false,  //是否选中3d模型
            videoLiveDialog: false, //监控视频播放
            handleTabType: '', //车辆信息弹框类型
            combinationIconList: ['4','5','videoBus','busStations'],  //需要设置图标和文字结合的类型  
            videoDataType: '',  //dangerCar -- 所有  dumpTruck -- 泥头车  people -- 沙滩、公交站
            hotBeachlistname:[],
            showVehicle:false, // 示范页泥头车详情弹框
            vehicleData:{},
            showSlaked:false,// 示范路段消纳落点弹出
            slakedFalg:false
        }
    },
    async mounted() {
        console.log('index.vue');
        this.init();
        this.pageToggle(this.$route)

        await this.setMapUrlTab()
        this.adaptationPostion()
        this.hotbeachlistname()

       
    },
    provide() {
        return {
            mapPageVm: this
        }
    },
    computed:{
        showHandleTabTail(){
            return (this.handleTabType === 'carGps' || this.handleTabType === '出租车' || this.handleTabType === '公交车'  || this.handleTabType === 'example' )  ? false : true
        },
        showHandleTabExplosion(){
            return (this.handleTabType === 'carGps' || this.handleTabType === '出租车' || this.handleTabType === '公交车' || this.handleTabType === 'example')  ? false : true
        }
    },
    watch: {
        $route: {
            handler(newVal, oldval) {
                this.pageToggle(newVal, true)
            },
            deep: true
        }
    },
    methods: {
        init() {
            // const LongMap = window.LongMap;
            window.map = new LongMap("views");
            // addModel(map)  //添加三维
            // addGtwModel(map) //添加三维 规土委  //删除三维模型removeGtwModel(map)
            var point;
            if (this.$route.path === '/gis') {
                point= new LongMap.Point3(114.4107,22.6308,300)            
            }else {
                point= new LongMap.Point3(114.4712054185026,22.596857503259457,80000)
            }
            map.move(point);
            // this.moveMap(114.58248247659488, 22.41591504303919, 53917.090368500685, false)
            const drawLayer = new LongMap.Layer()
            map.addLayer(drawLayer);

            //暂时、地图底图
//              dpGzjDt = map.addZDMap({
//                 type: 'DP2019'
//             });
            // map.setBackground(new LongMap.Color('#264248'))

            this.renderMap("http://t0.tianditu.gov.cn/img_w/wmts", 'img') //地图底图
            this.renderMap("http://t0.tianditu.gov.cn/cia_w/wmts", 'cia') //影像图路网
            // addTianDiRoad(map) //添加规土委路网
            this.renderMap("http://t0.tianditu.gov.cn/cva_w/wmts", 'cva') //地图标记
            this.onListernerMapClick() //监听地图点击事

            initModel(map)  //初始化三维模型

            compassReset(map) //指北针复位 
            if (this.$route.path === '/gis') {    
                addGtwModel(map) //添加规土委模型
                addTianDiRoad(map) //添加规土委路网
                this.addMapModelPoints() //添加模型点位
            }
           
        },
        moveMap(lng, lat, height, isConverts=true) {
            const point = isConverts ? this.bd09towgs84(lng,lat, height) : new LongMap.Point3(Number(lng), Number(lat), height)
            
            map.move(point);
            // map.reset({
            //     position: point,
            //     height,
            //     pitch: -72.29699942147904,
            //     roll: 0.043074936933690855,
            //     heading: 348.93813566783757,
            // })
        },
        adaptationPostion() {
            this.$nextTick(() => {
                let offetTop = this.$refs.mapHandle.offsetTop - this.$refs.mapHandle.offsetHeight / 2 - 40
                $('.map-tab').css('top', offetTop)
                window.onresize = () => {
                    let offetTop = this.$refs.mapHandle.offsetTop - this.$refs.mapHandle.offsetHeight / 2 - 40
                    $('.map-tab').css('top', offetTop)
                }
            })
        },
        setMapUrlTab() {
            return new Promise((resolve) => {
                this.$nextTick(() => {
                    setTimeout(() => {
                        let offetTop = this.$refs.mapHandle.offsetTop - this.$refs.mapHandle.offsetHeight / 2 - 40
                        mapUrlTab({ //2、3D底图切换
                            image: this.threeD,
                            imageActive: this.twoD,
                            imageWidth: 50,
                            imageHeight: 50,
                            imageTop: offetTop,
                            imageLeft: 1470
                        })
                        $('.map-handle-wrap').prepend($('.map-tab'))
                        $('.icon-map-image').append($('#threeDModel'))
                        $('.icon-map-image').hover(() => {
                            $('#threeDModel').show()
                        },() => {
                            $('#threeDModel').hide()
                        })
                        $('#threeDModel').click((event) =>{
                            if(this.isSelect3DModel){
                                removeGtwModel(map)
                                removeTianDiRoad()
                                this.removeMapModelPoints()
                            }else {
                                addGtwModel(map) //添加规土委模型
                                addTianDiRoad(map) //添加规土委路网
                                this.addMapModelPoints() //添加模型点位
                            }
                            this.isSelect3DModel = !this.isSelect3DModel
                            event.stopPropagation();
                        })
                        $('.icon-map-erwei').hover(() => {
                            removeGtwModel(map)
                            removeTianDiRoad()
                            this.removeMapModelPoints()
                            this.isSelect3DModel = false
                        })
                        resolve()
                    },100)
                })
            })
        },
        addMapModelPoints(){
            addModelPoints({
                map:map,
                icon: this.sdGasLibIcon, //点位图标
                points: {
                //点位经纬度
                lon: 114.38527392259918,
                lat: 22.618754219764796
                },
                height: 200 //线段长度
            })
        },
        removeMapModelPoints(){
            removeModelPoints(map)
        },
        pageToggle(route, watch = false) { //匹配切换页面路由
            this.isWayLeave = false;
            this.isMapHandle = false
            this.slakedFalg = false
            this.removePoints('slaked')
            this.adaptationPostion()
            switch (route.path) {
                case '/gis':
                    this.isMapHandle = true;
                    break;
                //   智慧经服  
                case '/wisdomSutraService':
                    this.isMapHandle = false;
                    break;
                // 疫情防控(数字看板, 疫情防控)    
                case '/digitalSignage':
                    this.isMapHandle = false;
                    break;   
                case '/epidemicMap':
                    this.isMapHandle = false;
                    break;  
                // 数字孪生 
                case '/threeDMap':
                    this.isMapHandle = false;
                    break;  
                case '/DangerousChemicals':
                    this.DangerousChemicals()
                    this.carType = 'dangerCar'
                    this.isMapHandle = true //显示图标操作栏
                    if (!watch) return
                    this.filterLayer(['video','videoPoint','truckGps', 'dangerGoodsEnterprise','gasSite','road','entrance', 'electricFenceDangerCar'])
                    this.checkFeatures.includes('truckGps') && this.handlecarGps(true)
                    break;
                 // 示范路段
                case '/DemonstrationSection':
                    this.DangerousChemicals()
                    this.carType = 'demonstration'
                    this.isMapHandle = true //显示图标操作栏
                    this.slakedFalg = true
                    this.givenpoint()
                    if (!watch) return
                    this.filterLayer(['video','videoPoint','truckGps', 'dangerGoodsEnterprise','gasSite','road','entrance', 'electricFenceDangerCar'])
                    this.checkFeatures.includes('truckGps') && this.handlecarGps(true)
                    break;
                // 台风防御
                case '/TyphoonDefence':
                    this.isMapHandle = false;
                    break;
                case '/MudTruck':
                    this.MudTruck()
                    this.carType = 'dumpTruck'
                    this.isMapHandle = true
                    if (!watch) return
                    this.filterLayer(['video','videoPoint','carGps', 'constructionSite','road','entrance', 'electricFenceDumpTruck'])
                    this.checkFeatures.includes('carGps') && this.handlecarGps(true)
                    break;
                case '/carVehicle':
                    this.DangerousChemicals()
                    this.MudTruck()
                    this.carType = 'monitorVihecle'
                    this.isMapHandle = true
                    if (!watch) return
                    this.filterLayer(['video','videoPoint','truckGps', 'carGps','road', 'entrance', 'bus', 'taxi'])
                    this.checkFeatures.includes('carGps') && this.handlecarGps(true)
                    this.checkFeatures.includes('truckGps') && this.handleAddtruckGps(true)
                    this.checkFeatures.includes('bus') && this.handleBus(true)
                    break;
                case '/busCapacity':
                    this.carType = 'busCapacity'
                    this.isMapHandle = true
                    this.filterLayer(['video','videoBus','busStations', 'bus','voic'])
                    this.checkFeatures.includes('bus') && this.handleBus(true)
                    break;
                case '/warningDetails':
                    this.carType = 'all';
                    this.isMapHandle = true
                    this.filterLayer(['video','10','20', '30','40','voic'])
                    break;
                    // 道路运行
                case '/WayLeave':
                    this.isWayLeave = true;
                    this.isMapHandle = false
                    break;
                    // 公交运行
                case '/Cartransit' :
                    this.isMapHandle = false
                    break;
                    // 重点车辆
                case '/Importcar' :
                    this.isMapHandle = false
                    break;
                    // 停车监测
                case '/Monitoringcar' :
                    this.isMapHandle = false
                    break;
                case '/ecotope':
                    this.isMapHandle = false
                    break;
                case '/sandBeach':
                    this.carType = 'sandBeach'
                    this.isMapHandle = true
                    this.filterLayer(['videoAnalysisBeach', 'beach','voic'])
                    break;
                case '/serviceAnalyzation':
                    this.carType = 'serviceAnalyzation'
                    this.isMapHandle = true
                    this.filterLayer(['servic','voic'])
                    break;
                case "/businessanalysis":
                    this.carType = 'businessanalysis'
                    this.isMapHandle = true
                    this.filterLayer(['servic','voic'])
                    break;
                case "/construction":
                    this.carType = 'construction'
                    this.isMapHandle = true
                    this.filterLayer(['servic', 'machine','voic'])
            }
            this.refreshEntranceAndRoadData()
        },
        onListernerMapClick() {
            map.addEventListener('click', (e) => {
                console.log('11 features', e.features)
                try {
                    if (e.features) {
                        let feature = e.features[0];
                        if (!feature) return
                        switch (feature.pointType) {
                            case '0':
                                this.videoDataType = this.carType !== 'dumpTruck' ? 'dangerCar' : 'dumpTruck'
                                this.showMapDialog(feature)
                                break;
                            case 'cameraVideo':
                                this.videoDataType = this.carType !== 'dumpTruck' ? 'dangerCar' : 'dumpTruck'
                                this.showMapDialog(feature)
                                break;
                            case '1':
                                this.dangerImgVisible.name = e.features[0].pointName
                                this.dangerImgVisible.isShow = true;
                                break;
                            case '2':
                                this.onGasSiteClick(feature)
                                break;
                            case '3': //工地
                                this.onConstructionSiteClick(feature)
                                break;
                            case '3.1':  //消纳场
                                this.onConstructionSiteClick(feature)
                                break;
                            case '4':  //出入口
                                this.onEntranceClick(feature)
                                break;
                            case '5':   //路段
                                this.onRoadClice(feature)
                                break;
                            case 'level10':
                                this.broadcast('warningDetails', 'on-click-car', feature) //广播预警页面，监听预警车辆点击事件
                                break;
                            case 'level20':
                                this.broadcast('warningDetails', 'on-click-car', feature) //广播预警页面，监听预警车辆点击事件
                                break;
                            case 'level30':
                                this.broadcast('warningDetails', 'on-click-car', feature) //广播预警页面，监听预警车辆点击事件
                                break;
                            case 'level40':
                                this.broadcast('warningDetails', 'on-click-car', feature) //广播预警页面，监听预警车辆点击事件
                                break;
                            case 'videoAnalysisBeach':
                                this.videoDataType = 'people'
                                this.showMapDialog(feature)
                                break;
                            case 'videoBeach':
                                this.showVideoOfNotStructureData(feature.videoCode, feature.videoName)
                                break;
                            case 'videoBus':
                                this.videoDataType = 'people'
                                this.showMapDialog(feature)
                                break;
                            case 'busStations':
                                this.broadcast('busCapacity', 'on-click-busStations', feature) //广播给公交运力页面，监听点击公交车站图标
                                break;
                            case 'beach':
                                this.broadcast('sandBeach', 'on-click-beach', feature) //广播给沙滩页面，监听点击公交车站图标
                                break;
                            case 'servic': //服务网点点击事件
                                this.carType == 'serviceAnalyzation' && this.broadcast('serviceAnalyzation', 'on-click-servic', feature)//广播给服务页面，监听服务网点图标
                                this.carType == 'businessanalysis' && this.broadcast('businessanalysis', 'on-click-servicbusin', feature)//广播给服务指标页面
                                this.carType == 'construction' && this.broadcast('construction', 'on-click-cityservic', feature)//广播给重点业务页面
                                break;
                            case 'machine'://一体机
                                this.carType == 'construction' && this.broadcast('construction', 'on-click-machine',feature)//广播重点业务页面
                                break;
                            case 'videoBeachPark':
                                this.videoDataType = 'dangerCar'
                                this.showMapDialog(feature)
                                break;
                            case 'videoPark':
                                this.showVideoOfNotStructureData(feature.videoCode, feature.videoName)
                                break;
                            case 'beachPark':
                                this.broadcast('sandBeach', 'on-click-beachPark', feature) //广播给沙滩页面，监听点击公交车站图标
                                break;
                            case 'slaked':
                                // this.broadcast('DemonstrationSection', 'on-click-slaked', feature) //广播示范路段页面，监听消纳场落点点击事件
                                this.slakedClick() // 示范页面消纳场的落点的弹框
                                break;
                        }
                    }
                } catch (error) {
                    console.log(`地图监听事件：${error}`)
                }
            })
        },
        slakedClick(){
          this.showSlaked = true
        },
        async showMapDialog({
            pointCode,
            pointName
        }) {
            this.videoId = pointCode
            let postData = {
                videoCode: pointCode,
                vehicleType: this.videoDataType
            }
            let res = await getLiveUrl(postData)
            this.liveUrl = res.data.data.url
            this.currentCrossingIndexCode = res.data.data.crossingIndexCode || '' //卡口编码
            this.visible.isShow = true
            this.mapDialogTitle = pointName
            await startWebsocket()
            this.$socketApi.sendSock((data) => {
                //dangMark危险品状态（unknown-未知，yes-悬挂危险品标志，no-未悬挂危险品标志）
                //vehicleType车辆类型（unknown-未知，largeBus-大型客车，truck-货车,…）
                let item = {
                    url: '',
                    plateNo: '',
                    captureTime: '',
                    vehicleColorName: '',
                    vehicleType: '',
                    dangMark: '',
                    crossingName: ''
                }
                try {
                    let mqData = JSON.parse(data)
                    if(postData.vehicleType === 'people' && mqData.camIndexCode !== postData.videoCode){
                        return
                    }
                    if(postData.vehicleType === 'dumpTruck' || postData.vehicleType === 'dangerCar'){
                        if(mqData.crossingIndexCode !== this.currentCrossingIndexCode) return
                    }
                    let {
                        plateNo,
                        targetPicUrl,
                        captureTime,
                        vehicleColorName,
                        vehicleType,
                        dangMark,
                        crossingName,
                        id,
                        vehicleTypeName,
                        snapPictureUrl, //沙滩，公交车
                        framesPeopleCountingNum, //沙滩，公交车
                        startTime //沙滩，公交车
                    } = mqData
                    item.url = targetPicUrl || snapPictureUrl
                    item.framesPeopleCountingNum = framesPeopleCountingNum
                    item.startTime = parseTime(startTime, '{y}年{m}月{d}日 {h}:{i}:{s}')
                    item.plateNo = plateNo
                    item.id = id
                    item.captureTime = parseTime(captureTime, '{y}年{m}月{d}日 {h}:{i}:{s}')
                    item.vehicleColorName = vehicleColorName
                    item.vehicleType = this.filterVehicleType(vehicleType)
                    item.vehicleTypeName = vehicleTypeName
                    item.dangMark = dangMark === 'unknown' ? '未知' : (dangMark === 'yes' ? '悬挂危险品标志' : '未悬挂危险品标志')
                    if (this.videoFrame.length !== 0) {
                        let flag = this.videoFrame.some((frame) => frame.id === id) //去重
                        if (flag) return
                    }
                    this.videoFrame.unshift(item)
                } catch (error) {

                }
            })
        },
        showVideoOfNotStructureData(videoCode, videoName){
            this.videoLiveDialog = true
            this.currentVideoCode = videoCode
            this.currentVideoTitle = videoName
        },
        //危化品添加地图图标
        async DangerousChemicals() {
            dangerCarLayer = new LongMap.Layer(); //创建图层
            map.addLayer(dangerCarLayer); //添加图层

            let params = [0, 1, 2, 4, 5]
            this.setDangerMarkers(params)
            mudTruckLayer && mudTruckLayer.removeAllFeature() //删除泥头车的所有图标
            // this.removeCarGps()
            // this.removeTruckGps()
        },
        // 泥头车添加地图图标
        async MudTruck() {
            let params = [0, 3, 4, 5]
            mudTruckLayer = new LongMap.Layer(); //创建图层
            map.addLayer(mudTruckLayer); //添加图层
            this.setDangerMarkers(params, mudTruckLayer)
            dangerCarLayer && dangerCarLayer.removeAllFeature() //删除危化品的所有图标

            // this.removeCarGps()
            // this.removeTruckGps()
        }, 
        async closeMapDialog() {
            this.videoFrame = []
            this.liveUrl = ''
            await delPushCrossingIndexCode(this.currentCrossingIndexCode)
            await stopWebsocket()
        },
        renderMap(url, layer) {
            map.addTDT({ //地图图层
                url: url,
                layer: layer,
                style: "default",
                format: "tiles",
                tileMatrixSetID: "w",
                maximumLevel: 18,
            })
        },
        onGasSiteClick(feature) {
            this.setTipInfo(feature)
        },
        onConstructionSiteClick(feature) {
            this.setTipInfo(feature)
        },
        onEntranceClick(feature) {
            this.broadcast('carVehicle', 'on-click-entrance', feature) //广播车辆监测页面，监听出入口点击事件
        },
        onRoadClice(feature, isRemove = true) {
            let {
                pointCode
            } = feature
            if (!this.roadStatus[pointCode]) {
                this.roadStatus[pointCode] = map.addImportantRoad({
                    id: pointCode,
                    color: new LongMap.Color('#31FDF6'),
                    width: 3
                });
            } else {
                if (!isRemove) return
                map.removeImportantRoad(this.roadStatus[pointCode]);
                this.roadStatus[pointCode] = null
            }
        },
        removeAllRoad(roadObj) {
            for (let key in roadObj) {
                if (roadObj.hasOwnProperty(key) && roadObj[key]) {
                    map.removeImportantRoad(roadObj[key])
                    roadObj[key] = null
                }
            }
        },
        setTipInfo({
            pointType,
            pointName,
            address,
            pointNamelist,
            pointCode,
            units,
            amount,
            residue,
            already,
            site
        }) {
            this.tipInfo.pointType = pointType
            this.tipInfo.pointName = pointName
            this.tipInfo.address = address
            this.tipInfo.units = units
            this.tipInfo.amount = amount
            this.tipInfo.residue = residue
            this.tipInfo.already = already
            this.tipInfo.site = site
            this.tipInfo.pointNamelist = pointNamelist
            this.tipInfo.pointCode = pointCode
            this.tipDialog.isShow = true    
        },
        async getEntranceVehicleNum(data){
            let carNum = 0
            let postData = {
                // dataTime: parseTime(new Date(), "{y}{m}{d}"),
                timeType: 'day',
                carType: this.carType === 'monitorVihecle' ? 'all' : this.carType, //车辆监测页面carType参数需要传all
                direction: '0', //驶入的数据
            };
            const res = await getTrafficRank(postData);
            res.data.data.forEach(item => {
                if(item.tollName === data.pointName){
                    carNum = item.flowNum
                }
            })
            return carNum
        },
         async getRoadVehicleNum(data){
            let carNum = 0
            let postData = {
                dataTime: parseTime(new Date(), "{y}{m}{d}"),
                carType: this.carType === 'monitorVihecle' ? 'all' : this.carType,  //车辆监测页面carType参数需要传all
            };
            const res = await getMainRoadRank(postData);
            res.data.data.forEach(item => {
                if(item.roadName === data.pointName){
                    carNum = item.num
                }
            })
            return carNum
        },
        async getImageText(data, icon, resolve) {
            let carNum = 0
            if(data.pointType === '4'){ //出入口
                carNum = await this.getEntranceVehicleNum(data)  
            }else if(data.pointType === '5'){ //路段
                carNum = await this.getRoadVehicleNum(data)
            }else if(data.pointType === 'busStations'){ //公交站
                data.pointName = data.busStationName
                data.pointNamber = data.peopleAlarmThreshold
                icon = data.num > data.pointNamber? this.busStationAlarmIcon : icon
                carNum = (data.num  || data.num == 0) ? data.num : 0
            }
            map.ImageText({
                bgImg: icon,
                text: `${data.pointName} ${carNum}`,
                textColor: new LongMap.Color('#ffffff'),
                fontSize: 16,
                offset: {
                    x: 120,
                    y: 70
                }
            }, function (e) {
                resolve(e)
            })
        },
        filterServiceIcon(type){
            let map = {
                0: this.servicIcon,
                1: this.servicIcon2,
                2: this.servicIcon3,
                3: this.servicIcon4,
                4: this.servicIcon5,
            }
            return map[type]
        },
        getIconByPointType(data, map) {
            return new Promise((resolve) => {
                const typeMap = {
                    0: this.video,
                    1: this.dangerousComIcon,
                    2: this.gasIcon,
                    3: this.contructionSiteIcon,
                    '3.1': this.garbageIcon, //消纳场图标
                    'level10': this.level10BlueIcon,
                    'level20': this.level20YellowIcon,
                    'level30': this.level30OrangeIcon,
                    'level40': this.level40RedIcon,
                    'videoAnalysisBeach': this.videoAnalysisBeachIcon,
                    'videoBeach': this.videoBeachIcon,
                    'beach': data.alarmObject ? this.beachAlarmIcon : this.beachIcon,
                    'servic': this.filterServiceIcon(data.area),//网点服务图标
                    'cityservic':this.filterServiceIcon(data.area),//重点业务图标
                    'servicbusin':this.filterServiceIcon(data.area),//服务指标
                    'machine': this.mainchine,//一体机分布
                    'videoBus': this.video,
                    'videoBeachPark': this.videoBeachParkIcon,
                    'videoPark': this.videoParkIcon,
                    'beachPark': this.beachParkIcon,
                    'slaked':this.givenIcon,
                    'cameraVideo': this.videoIcon
                }
                switch (data.pointType) {
                    case '4':
                        this.getImageText(data, this.entranceIcon, resolve)
                        break;
                    case '5':
                        this.getImageText(data, this.roadSectionIcon, resolve)
                        break;
                    case 'busStations':
                        this.getImageText(data, this.busStationIcon, resolve)
                        break;
                    default:
                        resolve(typeMap[data.pointType])
                }
            })
        },
        //点位类型（0-视频，1-危化品，2-加油站,3-工地数据，4-出入口，5-路段） pointType
        getDangerMapPoint(params) {
            let promiseArr = []
            params.forEach(item => {
                let promise = getMapVideoPoint({
                    pointType: item,
                    streetName: getStreetName()
                })
                promiseArr.push(promise)
            })
            return promiseArr
        },
        async setDangerMarkers(params) {
            const res = await Promise.all(this.getDangerMapPoint(params))
            res.forEach(item => {
                if (item && item.status === 200) {
                    this.filterPointsForAnyList(item.data.data)
                }
            })
        },
        // 获取热力图的点 包括数值的显示数
        async hotbeachlistname() {
         const res = await getHotmappercentlist()
         this.hotBeachlistname = res.data.data
        },
        // 右侧小图标点击
        async renderPoints(layer, data) {
            if(!data) return 
            maplayers[layer] = new LongMap.Layer(); //创建图层
            map.addLayer(maplayers[layer]);
            for (let i = 0; i < data.length; i++) {
                const marker = null
                let iconUrl = await this.getIconByPointType(data[i], map)
                if (this.combinationIconList.includes(data[i].pointType)) { //combinationIconList ：['4','5','videoBus','busStations']
                    if(data[i].pointType === 'videoBus'){
                        marker = this.combination({iconUrl, lng:data[i].longitude, lat:data[i].latitude, height:1000, scale:0.35})
                    }else {
                        marker = this.combination({iconUrl, lng:data[i].longitude, lat:data[i].latitude})
                    }
                } else {
                    if(!data[i].longitude && !data[i].lng) continue
                    let instancePoint = new LongMap.Point3(Number(data[i].longitude || data[i].lng), Number(data[i].latitude || data[i].lat), 3)
                    let instancePointConverted = data[i].pointType === '3' ?
                        this.gcj02towgs84(data[i].longitude || data[i].lng,data[i].latitude || data[i].lat, 3) :
                        this.bd09towgs84(data[i].longitude || data[i].lng,data[i].latitude || data[i].lat, 3)
                    marker = new LongMap.Sprite({
                        url: iconUrl, //图片路径
                        // position: new LongMap.Point3(data[i].longitude, data[i].latitude, 3), //位置
                        //视频分析点不需要转换坐标
                        position: this.pointTypeDisabledConvert.includes(String(data[i].pointType)) ? instancePoint : instancePointConverted,
                        scale: 0.3
                    });
                }
                Object.keys(data[i]).forEach(item => {
                    marker[item] = data[i][item]
                })
                maplayers[layer].addFeature(marker); //添加  
            }
        },

        combination({iconUrl, lng, lat, height=100, scale=0.8}) { //增加定位直线
            return new LongMap.Combination({
                url: iconUrl,
                color: new LongMap.Color('#05EBEC'),
                height,
                scale,
                width: 2,
                // position: new LongMap.Point3(lng, lat, 20),
                position: this.bd09towgs84(lng,lat, 20),
            })
        },
        bd09towgs84(longitude, latitude, height){ //百度坐标转84坐标方法
            return map.bd09towgs84(new LongMap.Point3(Number(longitude),Number(latitude),height))
        },
        gcj02towgs84(longitude, latitude, height){ //火星转84
            return map.gcj02towgs84(new LongMap.Point3(Number(longitude),Number(latitude),height))
        },
        removePoints(layer) {
            if(layer === 'video'){ //由于新增视频点没有返回图层，且神舟龙提供移除方法，所以需调用removeVideoPoint方法
                removeVideoPoint(map)
            }
            if(layer === 'truckGps'){
                removeImportRoad(map)
                this.removeTruckGps()
            }
            if(layer === 'carGps'){
                 removeImportRoad(map)
                 this.removeCarGps()
            }
            if (maplayers[layer]) {
                map.removeLayer(maplayers[layer])
                maplayers[layer] = null
            }
        },
        removeCheckFeature(index) {
            this.checkFeatures.splice(index, 1)
        },
        filterLayer(data){
            let willRemoveLayers = difference(this.checkFeatures, data)
            this.removeLayers(willRemoveLayers)  //删除图层
            this.removeCheckFeatures(willRemoveLayers) //关闭图标选中
            this.removeRoadLayers(willRemoveLayers) //删除路段图层
        },
        removeLayers(layers) { //删除图层
            layers.forEach(item => {
                this.removePoints(item)
            })
        },
        removeCheckFeatures(arr) {
            arr.forEach(item => {
                for (let i = 0; i < this.checkFeatures.length; i++) {
                    if (item === this.checkFeatures[i]) {
                        // this.checkFeatures.splice(i, 1)
                        this.removeCheckFeature(i, 1)
                    }
                }
            })
        },
        removeRoadLayers(layers){
            if(layers.includes('road')){
                this.removeAllRoad(this.roadStatus)
            }
        },
        async handleAddVideoLive(val) { //新增监控视频点
            var path = this.$route.path;
            switch(path){
                case '/carVehicle':
                    if (getVehicleRolesName() == '') {
                        // admin角色, 调用原来的(封装好的接口)
                        this.setAddVideoPointDialog(val);
                    }else {
                        // 南澳/大鹏/葵涌
                        var list = await this.getSZLCamerasData(getVehicleRolesName());
                        val ? this.renderPoints('cameraVideo', list) : this.removePoints('cameraVideo')
                    }
                    break;
                case '/DangerousChemicals':
                    if (getDangerousChemicalsRolesName() == '') {
                        // admin角色, 调用原来的(封装好的接口)
                        this.setAddVideoPointDialog(val);
                    }else {
                        // 南澳/大鹏/葵涌
                        var list = await this.getSZLCamerasData(getDangerousChemicalsRolesName());
                        val ? this.renderPoints('cameraVideo', list) : this.removePoints('cameraVideo')
                    }
                    break;
                case '/MudTruck':
                    if (getMudTruckRolesName() == '') {
                        // admin角色, 调用原来的(封装好的接口)
                        this.setAddVideoPointDialog(val);
                    }else {
                        // 南澳/大鹏/葵涌
                        var list = await this.getSZLCamerasData(getMudTruckRolesName());
                        val ? this.renderPoints('cameraVideo', list) : this.removePoints('cameraVideo')
                    }
                    break;
                case '/busCapacity':
                    if (getBusCapacityRolesName() == '') {
                        // admin角色, 调用原来的(封装好的接口)
                        this.setAddVideoPointDialog(val);
                    }else {
                        // 南澳/大鹏/葵涌
                        var list = await this.getSZLCamerasData(getBusCapacityRolesName());
                        val ? this.renderPoints('cameraVideo', list) : this.removePoints('cameraVideo')
                    }
                    break;    
                default:
                    this.setAddVideoPointDialog(val);
                    break;            
            }
        },
        async getSZLCamerasData(name) {
            var list;
            if (name == '南澳') {
                var { data } = await getSZLCameras({
                    regionIndexCode: '0959ad59790e4e47b43370b274977527'
                })
                list = data.data.data.list;
            }else if (name == '大鹏') {
                var { data } = await getSZLCameras({
                    regionIndexCode: '08c9cc86c0744d86a7460da5a0f8c872'
                })
                list = data.data.data.list;
            }else {
                // 葵涌
                var res1 = await getSZLCameras({
                    regionIndexCode: 'b87223f2cde14470a0618b84fa9d8edc'
                })
                list = res1.data.data.data.list;
                var res2 = await getSZLCameras({
                    regionIndexCode: 'aaa80f0ac1ed4ab7b694aaff88872c7f'
                })
                list = list.concat(res2.data.data.data.list);
            }
            list && list.map(item => {
                    item.pointType = 'cameraVideo';
                    item.pointCode = item.cameraIndexCode;
                    item.pointName = item.name;
                    return item;
                })
            return list;
        },
        setAddVideoPointDialog(val) {
                if (val) {
                    addVideoPointDialog({
                        map: map, //地图变量
                        // 弹窗
                        dialog: {
                            dialogWidth: 537.5, //宽度
                            dialogHeight: 329, //高度
                        },
                        // 聚合
                        polymerization: {
                            clusterUrl: this.polymerizationIcon, //图标
                            scale: 0.7, //图标大小
                            fontSize: 20, //文字大小
                            color: new LongMap.Color('#ffffff'), //颜色
                            // 文字偏移量
                            offset: {
                                x: 370,
                                y: 210,
                            }
                        },
                        // 散点
                        point: {
                            dialogPointImg: this.videoIcon, //图标
                            fusePointImg: this.videoFusionIcon,
                            scale: 0.3, //图标大小
                        },
                    }, (e) => {
                        if(e.videoCode){
                            this.showVideoOfNotStructureData(e.videoCode, e.name)
                        }
                    });
                } else {
                    removeVideoPoint(map);
                }
        },
        handleAddVideoPointDialog(val) { //新增视频点位
            val ? this.renderPoints('videoPoint', this.videoList) : this.removePoints('videoPoint')
        },
        handleDangerGoodsEnterprise(val) { //操作危化品企业
            val ? this.renderPoints('dangerGoodsEnterprise', this.dangerGoodsEnterpriseList) : this.removePoints('dangerGoodsEnterprise')
        },
        handleGasSite(val) {
            this.removePoints('gasSite')
            val && this.renderPoints('gasSite', this.gasList)
        },
        handleRoad(val) {
            this.removePoints('road') //删除点
            if (val) {
                this.renderPoints('road', this.roadList)
            } else {
                this.removeAllRoad(this.roadStatus) //删除已经渲染的所有路段
            }
        },
        handleEntrance(val) {
            this.removePoints('entrance')
            val && this.renderPoints('entrance', this.entranceList)
        },
        // hanldeElectricFence(val){
        //     val ? this.drawPlane() : this.removePlane()
        // },
        refreshEntranceAndRoadData(){ //刷新地图出口点数据
            this.checkFeatures.includes('entrance') && this.handleEntrance(true)
            this.checkFeatures.includes('road') && this.handleRoad(true)
        },
        handleConstructionSite(val) {
            val ? this.renderPoints('constructionSite', this.constructionSiteList) : this.removePoints('constructionSite')
        },
        handleAddVideoPointBus(val) { //新增公交视频点位
            val ? this.renderPoints('videoBus', this.busStationVideoList) : this.removePoints('videoBus')
        },
        handleAddVideoPointAnalysisBeach(val) { //新增沙滩视频分析点位
            val ? this.renderPoints('videoAnalysisBeach', this.beachVideoAnalysisList) : this.removePoints('videoAnalysisBeach')
        },
        handleVideoBeach(val) { //新增沙滩视频点位
            val ? this.renderPoints('videoBeach', this.videoBeachList) : this.removePoints('videoBeach')
        },
        handleBeach(val){
            val ? this.renderPoints('beach', this.beachList) : this.removePoints('beach')
             // 热力图的方法
            if(val === true){
            headLayer = new LongMap.Layer();   //创建图层
            map.addLayer(headLayer);     
            //  
            let positions = []
            let positionslist = []
            this.hotBeachlistname.forEach(item=> {
                positions.push(this.bd09towgs84(item.longitude, item.latitude, -0.006878580426974425))
                positionslist.push(item.percent)
            })
             let points = []
             for (let i = 0, j =positions.length ;  i< j; i++) {
                 points.push({
                     point: positions[i],
                     value: positionslist[i]
                 });
             };
             let heatMapMarker1 = new LongMap.HeatMap(map,{
                 points: points,
                 gradient: {
                     '0.3': 'blue',
                     '0.65': 'yellow',
                     '0.8': 'red',
                     '0.95': 'rgba(255,255,255,1)'
                 },
                 radius:200
             });
              
                headLayer.addFeature(heatMapMarker1)
              }else {
                 map.removeLayer(headLayer)
              }
        },
        
        givenpoint(){ // 示范页面消纳落点图
          let givenList=[{
               longitude:'114.501316',
               latitude:'22.644092',
               pointType:'slaked',
               pointName:'消纳场落图'
          }]
            if(this.slakedFalg){
                this.renderPoints('slaked', givenList)
            }else{
                this.removePoints('slaked')
            }
            
       
           
      
         
        },

        handleServic(val) { //新增服务网点
            val? this.renderPoints('servic', this.servicList) : this.removePoints('servic')
        },
        handlemachine(val) { //新增一体机网点
            val? this.renderPoints('machine', this.machinelist) : this.removePoints('machine')
        },
       
        handleVideoBeachPark(val){  //停车场视频分析点
            val ? this.renderPoints('videoBeachPark', this.videoBeachParkList) : this.removePoints('videoBeachPark')
        },
        handleVideoPark(val){  //停车场视频点
            val ? this.renderPoints('videoPark', this.videoParkList) : this.removePoints('videoPark')
        },
        handleBeachPark(val){
            val ? this.renderPoints('beachPark', this.beachParkList) : this.removePoints('beachPark')
        },
        handleAddBusStations(val) { //新增公交车站
            val ? this.renderPoints('busStations', this.busStationsList) : this.removePoints('busStations')
        },
        //预警页面
        handleWarnimgLevel(isShow, level){
            this.broadcast('warningDetails', 'on-show-Vehicle', {isShow, level}) //广播预警页面
        },
        closeDangerDialog() {
            this.dangerImgVisible.isShow = false;
        },
        closeTipDialog() {
            this.tipDialog.isShow = false;
        },
        isChecked(val) {
            return this.checkFeatures.includes(val)
        },
        filterPointsForAnyList(data) {
            if (data.length === 0) return
            switch (data[0].pointType) {
                case '0':
                    this.videoList = data
                    break;
                case '1':
                    this.dangerGoodsEnterpriseList = data
                    break;
                case '2':
                    this.gasList = data
                    break;
                case '3':
                    this.constructionSiteList = data
                    //手动加入消纳场
                    this.constructionSiteList.push({
                        longitude: "114.52048",
                        latitude: '22.552998',
                        pointName: '消纳场--新大社区',
                        pointNamelist:'新大社区',
                        address:'消纳场',
                        units:'深圳市大鹏新区投资控股有限公司',
                        amount:'500万方',
                        residue:'73.87万方',
                        already:'1487053方',
                        site:'深圳市大鹏新区南澳新大社区新东路',
                        pointType: '3.1'
                    },{
                        longitude: "114.414596",
                        latitude: '22.615783',
                        pointName: '消纳场--沙鱼涌',
                        pointNamelist:'沙鱼涌',
                        address:'消纳场',
                        units:'深圳市腾飞昌运实业有限公司（处置）',
                        amount:'500万方',
                        residue:'-167.53万方',
                        already:'1766610方',
                        site:'深圳市大鹏新区葵涌街道深葵路15号',
                        pointType: '3.1'
                    })
                    break;
                case '4':
                    this.entranceList = data
                    break;
                case '5':
                    this.roadList = data
                    break;
            }
        },
        filterVehicleType(val) {
            const map = {
                unknown: '未知',
                largeBus: '大型客车',
                truck: '货车'
            }
            return map[val]
        },
    }
}
</script>

<style lang="scss" scoped>
#views {
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    //  width: 1920px;
    //  height: 682px;
    width: 100%;
    height: 100%;

    .mask {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: url('../assets/images/transparent.png') no-repeat;

        background-size: 100% 100%;
        // background: white;
        // background-size: cover;
        pointer-events: none;
        z-index: 1;
    }

    .nobg {
        background-image: unset;
        pointer-events: auto;
    }
}
#threeDModel{
    display: none;
    width: 100px;
    position: absolute;
    right: 50px;
    top: 0px;
    padding: 6px 12px;
    font-size: 14px;
    color: #fff;
    z-index: 999;
    background-color: rgba(15, 75, 99, 0.7);
    border: 1px solid  rgba(15, 75, 99, 0.9);
}
.threeDModel-sel{
    color:  #45aed8!important;
}
.address {
      color: #fff;
      line-height: 30px;
    }
</style>
<style lang="scss">
.map-tab {
    position: relative;
    width: 50px !important;
    height: 50px !important;
    margin: 0 auto 8px auto;
    left: 0 !important;
    top: 0 !important;
    // right: 428px;
    background-size: cover !important;
    background-repeat: no-repeat;
    cursor: pointer;
}

.map-handle-wrap {
    position: fixed;
    right: 400px;
    top: 50%;
    transform: translateY(-45%);
    z-index: 999;
}
.map-handle-wrap-650{
    right: 650px;
}
.map-tab-676{
    right: 676px;
}

.map-fn-compass{
    width: 54px;
    height: 54px;
    z-index: 999;
    right: 600px;
    top: 70px;
    .map-fn-compass-pointer{
        width: 50px;
        height: 50px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .map-fn-compass-pointerS{
        width: 20px;
        height: 31px;
        // transform: translateY(-50%)!important;
        margin-left:-10px;
        margin-top: -15px;
    }
}
.voice{
    position: absolute;
    left: 1430px;
    top: 495px;
    z-index:9999;
    background: rgba(8,69,93,0.7);
    border: 1px solid rgba(0,183,237,1);
}
</style>
