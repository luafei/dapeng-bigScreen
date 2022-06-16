import {
    getVehicleList
} from '@/api/dicData'
import {
    parseTime
} from "@/utils/util";
import { vehicleAlarmType } from '@/const/dicData'
import { getVehicleAlarmByPlateNo, getVehicleAlarmAnalyseDetail, getBusLineName } from '@/api/vehicle'
import { getQueryNTCAlarmMap,getQueryNTCDetailInfo } from '../../api/example'

export const carInteractive = function(type) {
    let vehicleTail = null
    let vehicleTrack = {}
    return {
        data() {
            return {
                carInfo: [],
                originCarInfo: {},
                showCarInfo: false,
                vehicleList: [],
                jiayouzhan: require('@/assets/images/jiayou.png'),
            }
        },
        methods: {
            onListenerCarGpsClick(handleType, vehicleType) {
                if (handleType === 'add') {
                    vehicleMarkerLayers[vehicleType].layer.addEventListener('click', this.handleCarInfo)
                } else {
                    vehicleMarkerLayers[vehicleType].layer.removeEventListener('click', this.handleCarInfo)
                }
            },
            async handleCarInfo({ features }) {
                // console.log(features,'99他是什么');
                if (features.length === 1 && (features[0].info.carCode || features[0].info.vehicleno)) {
                    this.originCarInfo = features[0].info
                    this.dealWithCarInfo(features[0].info)
                    this.handleTabType = features[0].info.GPSType
                    if (this.$route.path === '/DemonstrationSection') {
                        this.showVehicle=true
                        this.showCarInfo = false
                        this.vehicleClick(features[0].info.vehicleno)
                    }else{
                        this.showCarInfo = true
                    }
                }
            },
            async dealWithCarInfo(info) {
                this.carInfo = []
                // console.log(this.$route.path,'99是什么路由');
                // console.log(info,'info参数是神什么样子');
                let {
                    carCode,
                    speed,
                    huowu,
                    GPSType,
                    alarm,
                    lat,
                    Lon
                } = info
                switch (GPSType) {
                    case 'truckGps':
                        this.carInfo.push({
                                id: 1,
                                label: '车牌号：',
                                value: carCode
                            }, {
                                id: 2,
                                label: '车速：',
                                value: speed + 'km/h'
                            }, {
                                id: 3,
                                label: '运输货物：',
                                value: this._filterHuowu(huowu)
                            })
                            // let businessName = await this.getBusinessNameByVehicleNo(carCode)
                        let businessName = await this.getVehicleAlarmAnalyseDetail(carCode)
                        this.carInfo.push({
                            id: 4,
                            label: '所属运输企业：',
                            value: businessName
                        })
                        let alarmInfo = await this.getVehicleAlarmByPlateNo(carCode)
                        this.carInfo.push({
                            id: 5,
                            label: '车辆预警信息：',
                            value: alarmInfo
                        })
                        break;
                    case 'carGps':
                        // this.carInfo = []
                        let carGpsbusinessName = await this.getVehicleAlarmAnalyseDetail(info.vehicleno)
                        this.carInfo.push({
                            id: 1,
                            label: '车牌号：',
                            value: info.vehicleno
                        }, 
                        {
                            id: 2,
                            label: `所属运输企业：`,
                            value: carGpsbusinessName
                        },
                        {
                            id: 3,
                            label: '是否预警：',
                            value: this._filterIsAlarm(alarm)
                        }, {
                            id: 4,
                            label: '报警类型：',
                            value: this._filterAlarm(alarm)
                        },
                        {
                            id: 5,
                            label: '电子联单详情',
                            style: 'width: 53%; border: 1px solid #0ab8eb; float:left;margin-right:1.5rem;',
                            onClick: (item) => {
                                this.showdianzi()
                              }
                        }
                        )
                        // let carGpsbusinessName = await this.getVehicleAlarmAnalyseDetail(info.vehicleno)
                        // this.carInfo.splice(1, 0, {
                        //     id: 2,
                        //     label: `所属运输企业：`,
                        //     value: carGpsbusinessName
                        // })
                        break;
                //    case 'example':
                //          this.carInfo = []
                //          let exampleInfo= await this.getQueryNTCAlarmMap(info.vehicleno)
                //          this.carInfo.push({
                //                 id: 1,
                //                 label: '车牌号：',
                //                 value: info.vehicleno
                //             }, 
                //             {
                //                 id: 2,
                //                 label: '驾驶员：',
                //                 value: ''
                //             }, 
                //             {
                //                 id: 3,
                //                 label: '所属企业：',
                //                 value: exampleInfo.companyName
                //             }, 
                //             // {
                //             //     id: 4,
                //             //     label: '报警类型：',
                //             //     value: this._filterAlarm(alarm)
                //             // },
                //             {
                //                 id: 4,
                //                 label: '电子联单详情',
                //                 style: 'width: 53%; border: 1px solid #0ab8eb; float:left;margin-right:1.5rem;',
                //                 onClick: (item) => {
                //                     this.vehicleClick(info.vehicleno)
                //                   }
                //             }
                //             )
                //             // let examplebusinessName = await this.getVehicleAlarmAnalyseDetail(info.vehicleno)
                //             // this.carInfo.splice(2, 0, {
                //             //     id: 3,
                //             //     label: `所属企业：`,
                //             //     value: examplebusinessName
                //             // })
                //             break;    
                    case '出租车':
                        this.carInfo.push({
                            id: 1,
                            label: '车牌号：',
                            value: info.vehicleno
                        }, {
                            id: 2,
                            label: '所属运输企业：',
                            value: ''
                        }, {
                            id: 3,
                            label: '是否预警：',
                            value: this._filterIsAlarm(alarm)
                        }, {
                            id: 4,
                            label: '报警类型：',
                            value: this._filterAlarm(alarm)
                        })
                        break;
                    case '公交车':
                        this.carInfo.push({
                            id: 1,
                            label: '车牌号：',
                            value: info.vehicleno
                        }, {
                            id: 3,
                            label: '是否预警：',
                            value: this._filterIsAlarm(alarm)
                        }, {
                            id: 4,
                            label: '报警类型：',
                            value: this._filterAlarm(alarm)
                        })
                        let busLine = await this.getBusLineName(info.vehicleno)
                        this.carInfo.splice(1,0,{
                            id: 2,
                            label: '公交线路：',
                            value: busLine
                        })
                }
            },
            showdianzi() {
                this.newisshow=true
                this.doublenumber = null 
                let newlist = this.nownewlist[Math.floor(Math.random() * this.nownewlist.length)]
                this.doublenumber = newlist
            },
           async vehicleClick(info){
                // console.log(info,'you我数据');
                this.showVehicle=true
                let postData={
                    vehicleNo:info
                }
                const res = await getQueryNTCDetailInfo(postData)
                 this.vehicleData=res.data.data
            },
            _filterHuowu(val) {
                return val === 'null' ? '暂无货物' : val
            },
            _filterIsAlarm(val) {
                return val > 0 ? '是' : '否'
            },
            _filterAlarm(val) {
                let res = vehicleAlarmType.excute(val)
                return res ? res : val
            },
            onTail({ show, code, vehicleType }) {
                if (show) {
                    this.handleTail(vehicleType, code, this.dealWithCarInfo) //from mixins carInteractive
                    if (vehicleType === 'truckGps') {
                        this.removeTruckGps() //移除危化品车辆
                    } else if (vehicleType === '出租车') {
                        this.removeTaxiLayer() //移除出租车
                    }
                }
            },
            onCloseTail({ show, code, vehicleType }) {
                this.handleRemoveTail() //from mixins carInteractive
                if (vehicleType === 'truckGps') {
                    this.handleAddtruckGps(true) //添加危化品车辆
                } else if (vehicleType === '出租车') {
                    this.handleTaxi(true) //添加出租车
                }
            },
            // 轨迹点击事件
            onTrack({ show, code , vehicleType}) {
                console.log(show, code , vehicleType,'show, code , vehicleType')
                if (show) {
                    if(vehicleType === 'truckGps'){
                        this.removeTruckGps() //移除危化品车辆
                    }
                    let postData = {
                            typeLayer: 'dialogTabTrack',
                            plateNo: code,
                            type: this.carType,
                            vehicleType:'truckGps',
                            time: [parseTime(new Date().getTime() - 1000 * 60 * 60 * 6,'{y}/{m}/{d} {h}:{i}:{s}'), parseTime(new Date().getTime(),'{y}/{m}/{d} {h}:{i}:{s}')] //获取当前时间到两小时前的轨迹
                        }
                        this.getTrackByPlateNo(postData)
                        
                        // console.log(this.getTrackByPlateNo, 'getTrackByPlateNo')
                }
            },
            onCloseTrack({ show, code , vehicleType}) {
                if(vehicleType === 'truckGps'){
                    this.handleAddtruckGps(true) //添加危化品车辆
                }
                this.handleRemoveTrack('dialogTabTrack') // from mixins mapInteractive
            },
            onExplosion({ show, code }) {
                if (show) {
                    let whpData = {
                        map, // map地图对象
                        carCode: code, // 车牌号
                        startTime: parseTime(new Date().getTime() - 1000 * 60 * 60 * 6, '{y}/{m}/{d} {h}:{i}:{s}'), //开始时间
                        endTime: parseTime(new Date().getTime(), '{y}/{m}/{d} {h}:{i}:{s}') // 结束时间
                    }
                    whpOpen(whpData);
                    this.removeTruckGps() //移除危化品车辆
                }
            },
            onCloseExplosion() {
                whpClose();
                this.handleAddtruckGps(true) //添加危化品车辆
            },
            onResetHandleTab({ type }) {
                this.handleRemoveTail() //from mixins carInteractive
                this.handleRemoveTrack('dialogTabTrack') // from mixins mapInteractive
                if (type === 'show') {
                    whpClose();
                }
                if (!vehicleMarkerLayers.truckGps && this.checkFeatures.includes('truckGps')) { //地图上没有该图层且右侧危化品车辆图标被点亮是才渲染该图层
                    this.handleAddtruckGps(true)
                }
            },
            async getBusinessNameByVehicleNo(vehicleNo) {
                let result = ''
                if (this.vehicleList.length === 0) {
                    const res = await getVehicleList()
                    this.vehicleList = res.data.data
                }
                this.vehicleList.some(item => {
                    if (item.vehicleNo === vehicleNo) {
                        result = item.bussinessName
                        return true
                    }
                })
                return result
            },
            async getVehicleAlarmAnalyseDetail(plateNo) {
                let postData = {
                    plateNo: plateNo
                }
                const res = await getVehicleAlarmAnalyseDetail(postData);
                return res.data.data ? res.data.data.businessName : ''
            },
            async getQueryNTCAlarmMap(vehicleNo){
                let postData = {
                    vehicleNo
                } 
                 const res =await getQueryNTCAlarmMap(postData)
                 return res.data.data[0]

            },

            async getBusLineName(plateNo){
                const res = await getBusLineName(plateNo);
                return res.data.data || ''
            },
            handleTail(vehicleType, code, getCarInfoAllTheTime) {
                vehicleTail = map.addVehicleTracking({
                    type: vehicleType,
                    code: code,
                    //危化品车辆模型地址
                    modelUrl: 'http://172.21.112.113:9018/page/YGC/YGC.gltf',
                    //危化品车辆模型缩放倍数
                    modelScale: 2,
                    //危化品车辆模型初始旋转角度
                    modelAngle: 90,
                    //视野跟随时的视野高度
                    cameraHeight: 800,
                    //视野跟随是的视野角度
                    cameraAngle: 45,
                    //多少秒跟新一次数据,默认10秒
                    time: 10,
                }, function(e) {
                    //返回更新的车辆信息 
                    e.GPSType = vehicleType
                    getCarInfoAllTheTime(e)
                });
            },
            handleRemoveTail() {
                if (vehicleTail && vehicleTail.timer) {
                    map.removeVehicleTracking(vehicleTail);
                }
            },
            getTrackByPlateNo({ plateNo, time, type, typeLayer }) {
                console.log('getTrackByPlateNo', plateNo)
                type = type === 'dangerCar' ? 'truckGps' : 'carGps';
                console.log(type,'type')
                let startTime = ''
                let endTime = ''
                    // startTime = time[1]
                    // endTime = time[0]
                if (time[0].split(' ').length === 1) { //兼容时间没有带时分秒的情况
                     startTime = time[0] + ' 00:00:00'
                     endTime = time[1] + ' 23:59:59'
                } else {
                     startTime = time[0]
                     endTime = time[1]
                }
                // this.removeVehicleTrack(typeLayer);
                // 设置车辆轨迹查询
                console.log(startTime,'startTime')
                let data = {
                    map,
                    //车辆车牌
                    carCode: plateNo, // "粤B43950D" "粤SD2341", "粤B97831D"  plateNo 粤BHN443
                    //起始时间
                    startTime: startTime, //new Date(startTime) 2020/12/22 08:10:10 
                    //终止时间
                    endTime: endTime, //new Date(endTime) 2020/12/22 10:00:10
                    //轨迹颜色#24C2FD
                    color: new LongMap.Color('#1ed8ad'),
                    // 半
                    radius:500,
                    //轨迹粗线
                    width: 3,
                    //轨迹是否贴地 （true:贴地,height无效,false:不贴地,height有效）
                    ground: true,
                    //危化品车辆
                    type,
                    // 加油站图标
                    stationImage: {
                        // 图标地址
                        url: this.jiayouzhan,
                        // 图标缩放倍数
                        scale: 0.5,
                        // 线颜色,没传url时也是图标的颜色
                        color: new LongMap.Color('#ff00ff'),
                        // 线的高度
                        height: 200,
                        // 线的宽度
                        linewidth: 2
                    },
                    // 泥头车
                    // type:'carGps',
                    startImage: {
                        //图标地址
                        url: this.startIcon,
                        //线颜色，没传url时也是图标的颜色
                        color: new LongMap.Color('#ff00ff'),
                        //图标缩放倍数
                        scale: 0.5,
                        //线的高度
                        height: 500,
                        //线的宽度
                        lineWidth: 2,
                        // 泥头车车辆
                        // type:'carGps',
                    },
                    endImage: {
                        //图标地址
                        url: this.endIcon,
                        //线颜色，没传url时也是图标的颜色
                        color: new LongMap.Color('#ffff00'),
                        //图标缩放倍数
                        scale: 0.5,
                        //线的高度
                        height: 500,
                        //线的宽度
                        lineWidth: 5
                    }
                };

                // map.vehicleTrajectory(data,fn)
                // data:参数,
                // fn:点击轨迹回调函数
                // vehicleTrack[typeLayer] = map.vehicleTrajectory(data, (e) => {

                // });
                vehicleTrack[typeLayer] = addClGuiJi(data, (e) => {
   
                });
                // console.log(vehicleTrack[typeLayer],'vehicleTrack[typeLayer]')
            },
            removeVehicleTrack(typeLayer) {
                removeClGuiJi(map)
                if (vehicleTrack[typeLayer]) {
                    // map.removeVehicleTrajectory(vehicleTrack[typeLayer]);
                    vehicleTrack[typeLayer] = null;
                }
            },
            handleRemoveTrack(typeLayer) {
                this.removeVehicleTrack(typeLayer)
            },
            async getVehicleAlarmByPlateNo(plateNo) {
                let postData = {
                    plateNo
                }
                const res = await getVehicleAlarmByPlateNo(postData);
                const data = res.data.data
                if (data && data.length > 0) {
                    return data.join('，')
                } else {
                    return '无'
                }
            },
        },
    }
}