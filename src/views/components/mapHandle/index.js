import store from '@/store'

const mapHandle = {}
let vm = null;
mapHandle.getCurrentThis = function(_this) {
    vm = _this
}

function setCount(list, prop, count) {
    list.forEach(item => {
        if (item.prop === prop) {
            item.count = count
        }
    })
}

function initMapAngle(val) {
    // if (val) {
    //     vm.mapPageVm.moveMap(114.58248247659488, 22.41591504303919, 53917.090368500685, false)
    // }
}

function reSetCarNum(val, type) { //重置危化品 泥头车车辆数
    if (!val) {
        store.dispatch('GetCarNum', { type, count: '' })
    }
}

//泥头车页面
mapHandle.dumpTruck = [{
        prop: 'video',
        name: '视频点',
        icon: require('@/assets/images/handleIcon/video-icon.png'),
        iconSel: require('@/assets/images/handleIcon/video-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handleAddVideoLive(val)
        }
    },
    {
        prop: 'videoPoint',
        name: '视频分析点',
        icon: require('@/assets/images/handleIcon/video-analyze-icon.png'),
        iconSel: require('@/assets/images/handleIcon/video-analyze-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handleAddVideoPointDialog(val)
        }
    },
    {
        prop: 'carGps',
        name: '泥头车车辆',
        count: '',
        icon: require('@/assets/images/handleIcon/dumper-icon.png'),
        iconSel: require('@/assets/images/handleIcon/dumper-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            reSetCarNum(val, 'carGps')
            vm.mapPageVm.handlecarGps(val)
        }
    },
    {
        prop: 'constructionSite',
        name: '工地',
        icon: require('@/assets/images/handleIcon/construction-site-icon.png'),
        iconSel: require('@/assets/images/handleIcon/construction-site-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handleConstructionSite(val)
        }
    },
    {
        prop: 'road',
        name: '重要路段',
        icon: require('@/assets/images/handleIcon/road-icon.png'),
        iconSel: require('@/assets/images/handleIcon/road-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handleRoad(val)
        }
    },
    {
        prop: 'entrance',
        name: '出入口',
        icon: require('@/assets/images/handleIcon/entrance-icon.png'),
        iconSel: require('@/assets/images/handleIcon/entrance-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handleEntrance(val)
        }
    },
    {
        prop: 'electricFenceDumpTruck',
        name: '电子围栏',
        icon: require('@/assets/images/handleIcon/electriFence-icon.png'),
        iconSel: require('@/assets/images/handleIcon/electriFence-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.hanldeElectricFence(val)
        }
    },{
        prop:'voic',
        name:'语音',
        icon: require('@/assets/images/handleIcon/voicenone.png'),
        iconSel: require('@/assets/images/handleIcon/voiceshow.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handlevoice(val)
        }
       }

]

// 示范路段 
mapHandle.demonstration = [{
    prop: 'video',
    name: '视频点',
    icon: require('@/assets/images/handleIcon/video-icon.png'),
    iconSel: require('@/assets/images/handleIcon/video-icon-sel.png'),
    onChange: function(val) {
        initMapAngle(val)
        vm.mapPageVm.handleAddVideoLive(val)
    }
},
{
    prop: 'videoPoint',
    name: '视频分析点',
    icon: require('@/assets/images/handleIcon/video-analyze-icon.png'),
    iconSel: require('@/assets/images/handleIcon/video-analyze-icon-sel.png'),
    onChange: function(val) {
        initMapAngle(val)
        vm.mapPageVm.handleAddVideoPointDialog(val)
    }
},
{
    prop: 'road',
    name: '重要路段',
    icon: require('@/assets/images/handleIcon/road-icon.png'),
    iconSel: require('@/assets/images/handleIcon/road-icon-sel.png'),
    onChange: function(val) {
        initMapAngle(val)
        vm.mapPageVm.handleRoad(val)
    }
},
{
    prop: 'entrance',
    name: '出入口',
    icon: require('@/assets/images/handleIcon/entrance-icon.png'),
    iconSel: require('@/assets/images/handleIcon/entrance-icon-sel.png'),
    onChange: function(val) {
        initMapAngle(val)
        vm.mapPageVm.handleEntrance(val)
    }
},
{
    prop: 'carGps',
    name: '泥头车车辆',
    count: '',
    icon: require('@/assets/images/handleIcon/dumper-icon.png'),
    iconSel: require('@/assets/images/handleIcon/dumper-icon-sel.png'),
    onChange: function(val) {
        initMapAngle(val)
        reSetCarNum(val, 'carGps')
        vm.mapPageVm.handlecarGps(val)
    }
},
]

//危化品页面
mapHandle.dangerCar = [{
        prop: 'video',
        name: '视频点',
        icon: require('@/assets/images/handleIcon/video-icon.png'),
        iconSel: require('@/assets/images/handleIcon/video-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handleAddVideoLive(val)
        }
    },
    {
        prop: 'videoPoint',
        name: '视频分析点',
        icon: require('@/assets/images/handleIcon/video-analyze-icon.png'),
        iconSel: require('@/assets/images/handleIcon/video-analyze-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handleAddVideoPointDialog(val)
        }
    },
    {
        prop: 'truckGps',
        name: '危化品车辆',
        count: '',
        icon: require('@/assets/images/handleIcon/danger-car-icon.png'),
        iconSel: require('@/assets/images/handleIcon/danger-car-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            reSetCarNum(val, 'truckGps')
            vm.mapPageVm.handleAddtruckGps(val)
        }
    },
    {
        prop: 'dangerGoodsEnterprise',
        name: '危化品企业',
        icon: require('@/assets/images/handleIcon/danger-goods-enterprise-icon.png'),
        iconSel: require('@/assets/images/handleIcon/danger-goods-enterprise-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handleDangerGoodsEnterprise(val)
        }
    },
    {
        prop: 'gasSite',
        name: '加油站',
        icon: require('@/assets/images/handleIcon/gas-site-icon.png'),
        iconSel: require('@/assets/images/handleIcon/gas-site-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handleGasSite(val)
        }
    },
    {
        prop: 'road',
        name: '重要路段',
        icon: require('@/assets/images/handleIcon/road-icon.png'),
        iconSel: require('@/assets/images/handleIcon/road-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handleRoad(val)
        }
    },
    {
        prop: 'entrance',
        name: '出入口',
        icon: require('@/assets/images/handleIcon/entrance-icon.png'),
        iconSel: require('@/assets/images/handleIcon/entrance-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handleEntrance(val)
        }
    },
    {
        prop: 'electricFenceDangerCar',
        name: '电子围栏',
        icon: require('@/assets/images/handleIcon/electriFence-icon.png'),
        iconSel: require('@/assets/images/handleIcon/electriFence-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.hanldeElectricFence(val)
        }
    },
    {
        prop:'voic',
        name:'语音',
        icon: require('@/assets/images/handleIcon/voicenone.png'),
        iconSel: require('@/assets/images/handleIcon/voiceshow.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handlevoice(val)
        }
       }
]

//预警页面
mapHandle.all = [{
    prop: 'video',
    name: '视频点',
    icon: require('@/assets/images/handleIcon/video-icon.png'),
    iconSel: require('@/assets/images/handleIcon/video-icon-sel.png'),
    onChange: function(val) {
        initMapAngle(val)
        vm.mapPageVm.handleAddVideoLive(val)
    }
}, {
    prop: '10',
    name: '蓝色',
    icon: require('@/assets/images/handleIcon/blue-icon.png'),
    iconSel: require('@/assets/images/handleIcon/blue-sel-icon.png'),
    onChange: function(val) {
        initMapAngle(val)
        vm.mapPageVm.handleWarnimgLevel(val, '10')
    }
}, {
    prop: '20',
    name: '黄色',
    icon: require('@/assets/images/handleIcon/yellow-icon.png'),
    iconSel: require('@/assets/images/handleIcon/yellow-sel-icon.png'),
    onChange: function(val) {
        initMapAngle(val)
        vm.mapPageVm.handleWarnimgLevel(val, '20')
    }
}, {
    prop: '30',
    name: '橙色',
    icon: require('@/assets/images/handleIcon/orange-icon.png'),
    iconSel: require('@/assets/images/handleIcon/orange-sel-icon.png'),
    onChange: function(val) {
        initMapAngle(val)
        vm.mapPageVm.handleWarnimgLevel(val, '30')
    }
}, {
    prop: '40',
    name: '红色',
    icon: require('@/assets/images/handleIcon/red-icon.png'),
    iconSel: require('@/assets/images/handleIcon/red-sel-icon.png'),
    onChange: function(val) {
        initMapAngle(val)
        vm.mapPageVm.handleWarnimgLevel(val, '40')
    }
},
{
    prop:'voic',
    name:'语音',
    icon: require('@/assets/images/handleIcon/voicenone.png'),
    iconSel: require('@/assets/images/handleIcon/voiceshow.png'),
    onChange: function(val) {
        initMapAngle(val)
        vm.mapPageVm.handlevoice(val)
    }
   }]
//车辆检测页面侧边操作栏
mapHandle.monitorVihecle = [{
        prop: 'video',
        name: '视频点',
        icon: require('@/assets/images/handleIcon/video-icon.png'),
        iconSel: require('@/assets/images/handleIcon/video-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handleAddVideoLive(val)
        }
    },
    {
        prop: 'videoPoint',
        name: '视频分析点',
        icon: require('@/assets/images/handleIcon/video-analyze-icon.png'),
        iconSel: require('@/assets/images/handleIcon/video-analyze-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handleAddVideoPointDialog(val)
        }
    },
    {
        prop: 'truckGps',
        name: '危化品车辆',
        count: '',
        icon: require('@/assets/images/handleIcon/danger-car-icon.png'),
        iconSel: require('@/assets/images/handleIcon/danger-car-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            reSetCarNum(val, 'truckGps')
            vm.mapPageVm.handleAddtruckGps(val)
        }
    },
    {
        prop: 'carGps',
        name: '泥头车车辆',
        count: '',
        icon: require('@/assets/images/handleIcon/dumper-icon.png'),
        iconSel: require('@/assets/images/handleIcon/dumper-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            reSetCarNum(val, 'carGps')
            vm.mapPageVm.handlecarGps(val)
        }
    },
    {
        prop: 'road',
        name: '重要路段',
        icon: require('@/assets/images/handleIcon/road-icon.png'),
        iconSel: require('@/assets/images/handleIcon/road-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handleRoad(val)
        }
    },
    {
        prop: 'entrance',
        name: '出入口',
        icon: require('@/assets/images/handleIcon/entrance-icon.png'),
        iconSel: require('@/assets/images/handleIcon/entrance-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handleEntrance(val)
        }
    },
    {
        prop: 'bus',
        name: '公交车',
        icon: require('@/assets/images/handleIcon/bus-icon.png'),
        iconSel: require('@/assets/images/handleIcon/bus-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            reSetCarNum(val, 'bus')
            vm.mapPageVm.handleBus(val)
        }
    },
    {
        prop: 'taxi',
        name: '出租车',
        icon: require('@/assets/images/handleIcon/taxi-icon.png'),
        iconSel: require('@/assets/images/handleIcon/taxi-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            reSetCarNum(val, 'taxi')
            vm.mapPageVm.handleTaxi(val)
        }
    },
    {
        prop:'voic',
        name:'语音',
        icon: require('@/assets/images/handleIcon/voicenone.png'),
        iconSel: require('@/assets/images/handleIcon/voiceshow.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handlevoice(val)
        }
       }
]

//公交运力页面
mapHandle.busCapacity = [{
    prop: 'video',
    name: '视频点',
    icon: require('@/assets/images/handleIcon/video-icon.png'),
    iconSel: require('@/assets/images/handleIcon/video-icon-sel.png'),
    onChange: function(val) {
        initMapAngle(val)
        vm.mapPageVm.handleAddVideoLive(val)
    }
}, {
    prop: 'videoBus',
    name: '视频分析点',
    icon: require('@/assets/images/handleIcon/video-analyze-icon.png'),
    iconSel: require('@/assets/images/handleIcon/video-analyze-icon-sel.png'),
    onChange: function(val) {
        initMapAngle(val)
        vm.mapPageVm.handleAddVideoPointBus(val)
    }
}, {
    prop: 'busStations',
    name: '公交站',
    icon: require('@/assets/images/handleIcon/bus-station-icon.png'),
    iconSel: require('@/assets/images/handleIcon/bus-station-icon-sel.png'),
    onChange: function(val) {
        initMapAngle(val)
        vm.mapPageVm.handleAddBusStations(val)
    }
}, {
    prop: 'bus',
    name: '公交车',
    icon: require('@/assets/images/handleIcon/bus-icon.png'),
    iconSel: require('@/assets/images/handleIcon/bus-icon-sel.png'),
    onChange: function(val) {
        initMapAngle(val)
        reSetCarNum(val, 'bus')
        vm.mapPageVm.handleBus(val)
    }
},
{
    prop:'voic',
    name:'语音',
    icon: require('@/assets/images/handleIcon/voicenone.png'),
    iconSel: require('@/assets/images/handleIcon/voiceshow.png'),
    onChange: function(val) {
        initMapAngle(val)
        vm.mapPageVm.handlevoice(val)
    }
   }]

//沙滩页面
mapHandle.sandBeach = [{
        prop: 'videoAnalysisBeach',
        name: '沙滩视频分析点',
        icon: require('@/assets/images/handleIcon/video-beach-icon.png'),
        iconSel: require('@/assets/images/handleIcon/video-beach-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handleAddVideoPointAnalysisBeach(val)
        }
    },
    {
        prop: 'videoBeach',
        name: '沙滩视频点',
        icon: require('@/assets/images/handleIcon/videoBeachIcon.png'),
        iconSel: require('@/assets/images/handleIcon/videoBeachIconSel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handleVideoBeach(val)
        }
    },
    {
        prop: 'beach',
        name: '沙滩',
        icon: require('@/assets/images/handleIcon/beach-icon.png'),
        iconSel: require('@/assets/images/handleIcon/beach-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handleBeach(val)
        }
    },
    {
        prop: 'videoBeachPark',
        name: '停车场视频分析点',
        icon: require('@/assets/images/handleIcon/video-beach-park-icon.png'),
        iconSel: require('@/assets/images/handleIcon/video-beach-park-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handleVideoBeachPark(val)
        }
    },
    {
        prop: 'videoPark',
        name: '停车场视频点',
        icon: require('@/assets/images/handleIcon/video-park-icon.png'),
        iconSel: require('@/assets/images/handleIcon/video-park-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handleVideoPark(val)
        }
    },
    {
        prop: 'beachPark',
        name: '停车场',
        icon: require('@/assets/images/handleIcon/beach-park-icon.png'),
        iconSel: require('@/assets/images/handleIcon/beach-park-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handleBeachPark(val)
        }
    },
    {
        prop:'voic',
        name:'语音',
        icon: require('@/assets/images/handleIcon/voicenone.png'),
        iconSel: require('@/assets/images/handleIcon/voiceshow.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handlevoice(val)
        }
       }
]
//政务服务总体业务页面
mapHandle.serviceAnalyzation = [
//     {
//     prop: 'video',
//     name: '视频点',
//     icon: require('@/assets/images/handleIcon/video-icon.png'),
//     iconSel: require('@/assets/images/handleIcon/video-icon-sel.png'),
//     onChange: function(val) {
//         initMapAngle(val)
//         vm.mapPageVm.handleAddVideoLive(val)
//     }
// },
{
    prop:'servic',
    name:'服务网点',
    icon: require('@/assets/images/handleIcon/servic-icon.png'),
    iconSel: require('@/assets/images/handleIcon/servic-icon-sel.png'),
    onChange: function(val) {
        initMapAngle(val)
        vm.mapPageVm.handleServic(val)
    }
},
{
    prop:'voic',
    name:'语音',
    icon: require('@/assets/images/handleIcon/voicenone.png'),
    iconSel: require('@/assets/images/handleIcon/voiceshow.png'),
    onChange: function(val) {
        initMapAngle(val)
        vm.mapPageVm.handlevoice(val)
    }
   }
]
//政务服务服务指标页面
mapHandle.businessanalysis = [{
    prop: 'servic',
    name: '服务网点',
    icon: require('@/assets/images/handleIcon/servic-icon.png'),
    iconSel: require('@/assets/images/handleIcon/servic-icon-sel.png'),
    onChange: function(val) {
        initMapAngle(val)
        vm.mapPageVm.handleServic(val)
    },
},
{
    prop:'voic',
    name:'语音',
    icon: require('@/assets/images/handleIcon/voicenone.png'),
    iconSel: require('@/assets/images/handleIcon/voiceshow.png'),
    onChange: function(val) {
        initMapAngle(val)
        vm.mapPageVm.handlevoice(val)
    }
   }]
//政务服务重点业务页面
mapHandle.construction = [
    {
        prop: 'servic',
        name: '服务网点',
        icon: require('@/assets/images/handleIcon/servic-icon.png'),
        iconSel: require('@/assets/images/handleIcon/servic-icon-sel.png'),
        onChange: function(val) {
            initMapAngle(val)
            vm.mapPageVm.handleServic(val)
        }
    },
    {
    prop: 'machine',
    name:'一体机',  
    icon: require('@/assets/images/handleIcon/machinenone.png'),
    iconSel: require('@/assets/images/handleIcon/machineshow.png'),
    onChange: function(val) {
        initMapAngle(val)
        vm.mapPageVm.handlemachine(val)
    } 
    },
    {
     prop:'voic',
     name:'语音',
     icon: require('@/assets/images/handleIcon/voicenone.png'),
     iconSel: require('@/assets/images/handleIcon/voiceshow.png'),
     onChange: function(val) {
         initMapAngle(val)
         vm.mapPageVm.handlevoice(val)
     }
    }
]
export default mapHandle