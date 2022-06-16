window.vehicleMarkerLayers = {
    carGps: null, //泥头车布点对象
    truckGps: null, //危化品布点对象
    '公交车': null, //公交车图层
    '出租车': null //出租车图层
}
export default {
    data() {
        return {
            dumper: require("@/assets/images/dumper.png"),
            dangerous: require("@/assets/images/dangerous.png"),
            dangerousAlarm: require("@/assets/images/dangerous-red.png"),
            dangerousMud: require("@/assets/images/dumper-red.png"),
            dangerousClusterIcon: require('@/assets/images/dangerous_cluster.png'),
            dumperClusterIcon: require('@/assets/images/dumper-cluster.png'),
            busIcon: require('@/assets/images/bus-vehicle-icon.png'),
            busAlarmIcon: require('@/assets/images/bus-vehicle-icon-alarm.png'),
            taxiIcon: require('@/assets/images/taxi-icon.png'),
            taxiAlarmIcon: require('@/assets/images/taxi-icon-alarm.png'),
            busClusterIcon: require('@/assets/images/busCluster-icon.png'),
            taxiClusterIcon: require('@/assets/images/taxiCluster-icon.png'),
        }
    },
    methods: {
        renderVehiclePoints({ type, time, imageURL, clusterUrl }, followOptions = {}) {
            try {
                if (!vehicleMarkerLayers[type]) {
                    let _this = this
                    vehicleMarkerLayers[type] = map.getPositioning({
                        cluster: {
                            clusterUrl,
                            color: new LongMap.Color('#ffffff'),
                            fontSize: 20,
                            scale: .4,
                            ImgMaxSize: 128,
                            depth: false,
                            offset: {
                                x: 125,
                                y: 65
                            }
                        },
                        scale: 0.1,
                        time, //单位秒
                        imageURL,
                        type: type,
                        // depth: false,
                        ...followOptions
                    }, (e) => {
                        type = this.tranformVihechleType(type)
                        this.$store.dispatch('GetCarNum', { type, count: e.DPCount })
                    })
                }
            } catch (error) {
                this.$store.dispatch('GetCarNum', { type, count: 0 })
            }
        },
        tranformVihechleType(type) {
            if (type === '公交车') {
                type = 'bus'
            }
            if (type === '出租车') {
                type = 'taxi'
            }
            return type
        },
        handleAddtruckGps(val) { //添加危化品车辆
            if (val) {
                let type = 'truckGps'
                this.renderVehiclePoints({
                    type: type,
                    time: 10,
                    imageURL: this.dangerous,
                    clusterUrl: this.dangerousClusterIcon
                }, {
                    alarmUrl: this.dangerousAlarm
                })
                this.onListenerCarGpsClick('add', type) //from mixins carInteractive.js
                    // this.broadcast('DangerousChemicals', 'on-click-car', 'add') //广播给危化品页面，监听危化品车辆点击事件
            } else {
                this.showCarInfo = false //关闭车辆信息弹窗
                this.removeTruckGps()
            }
        },
        handlecarGps(val) { //添加泥头车
            if (val) {
                let type = 'carGps'
                this.renderVehiclePoints({
                    type: type,
                    time: 60,
                    imageURL: this.dumper,
                    clusterUrl: this.dumperClusterIcon
                }, {
                    alarmUrl: this.dangerousMud
                })
                this.onListenerCarGpsClick('add', type) //from mixins carInteractive.js
                    // this.broadcast('DumpTruck', 'on-click-car', 'add') //广播给泥头车页面，监听泥头车车辆点击事件
            } else {
                this.removeCarGps()
            }
        },
        handleBus(val) {
            if (val) {
                let type = '公交车'
                this.renderVehiclePoints({
                    type: type,
                    time: 10,
                    imageURL: this.busIcon,
                    clusterUrl: this.busClusterIcon
                }, {
                    alarmUrl: this.busAlarmIcon,
                    alarmUrlScale: 0.4
                })
                this.onListenerCarGpsClick('add', type) //from mixins carInteractive.js
                    // this.broadcast('DumpTruck', 'on-click-car', 'add') //广播给泥头车页面，监听泥头车车辆点击事件
            } else {
                this.removeBusLayer()
            }
        },
        handleTaxi(val) {
            if (val) {
                let type = '出租车'
                this.renderVehiclePoints({
                    type: type,
                    time: 10,
                    imageURL: this.taxiIcon,
                    clusterUrl: this.taxiClusterIcon
                }, {
                    alarmUrl: this.taxiAlarmIcon,
                    alarmUrlScale: 0.4
                })
                this.onListenerCarGpsClick('add', type) //from mixins carInteractive.js
            } else {
                this.removeTaxiLayer()
            }
        },
        removeVehicleLayer(type) {
            if (!vehicleMarkerLayers[type]) return
            map.removePositioning(vehicleMarkerLayers[type]);
            vehicleMarkerLayers[type] = null;
        },
        //移除泥头车
        removeCarGps() {
            this.removeVehicleLayer('carGps')
        },
        //移除危化品车辆
        removeTruckGps() {
            this.removeVehicleLayer('truckGps')
        },
        //移除公交车
        removeBusLayer() {
            this.removeVehicleLayer('公交车')
        },
        //移除出租车
        removeTaxiLayer() {
            this.removeVehicleLayer('出租车')
        }
    }
}