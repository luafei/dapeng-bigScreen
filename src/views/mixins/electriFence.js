import { getElectronicFence, addElectronicFence, delElectronicFence } from '@/api/electricFence'

export default function() {
    let draw = null
    let planeMap = {}
    let eletricFenceLayerMap = {}
    return {
        data() {
            return {
                point3s: [],
                electriFanceList: [],
                isAddElectriFence: false,
                vehicleTypeOfElectriFence: 'dangerCar'
            }
        },
        mounted() {
            // this.getElectriFanceList() //获取电子围栏列表
        },
        watch: {
            carType(newVal) {
                this.removeAllPlane()
                    // if (newVal !== 'dangerCar') {
                    // }
            }
        },
        methods: {
            hanldeElectricFence(val) {
                val ? this.showAllPlane() : this.removeAllPlane()
            },
            async getElectriFanceList(type) {
                this.vehicleTypeOfElectriFence = type
                this.electriFanceList = []
                const res = await getElectronicFence({ vehicleType: this.vehicleTypeOfElectriFence })
                let data = res.data.data
                if (data.length !== 0) {
                    data.reverse().forEach((item) => {
                        this.electriFanceList.push(item)
                    })
                }
            },
            showAllPlane() {
                this.removeAllPlane()
                if (this.electriFanceList.length !== 0) {
                    this.electriFanceList.forEach((item, index) => {
                        this.showPlane(item)
                        item.show = true
                        this.$set(this.electriFanceList, index, item)
                    })
                }
            },
            removeAllPlane() {
                this.electriFanceList.forEach((item, index) => {
                    this.removeSingleElectriFence(item, index)
                })
            },
            removeSingleElectriFence(item, index) {
                if (eletricFenceLayerMap[item.name]) {
                    map.removeLayer(eletricFenceLayerMap[item.name]);
                }
                item.show = false
                this.$set(this.electriFanceList, index, item)
            },
            showPlane({ name, point3s }) {
                let listPoint = []
                point3s.forEach(({ lng, lat, height }) => {
                    listPoint.push(
                        new LongMap.Point3(lng, lat, height)
                    )
                })
                planeMap[name] = new LongMap.Plane({
                    points: listPoint,
                    fillColor: new LongMap.Color("#0587F6", 0.4),
                    borderColor: new LongMap.Color("#0587F6"),
                    // extrudedHeight: 100,
                    depth: !1, //控制是否贴合规土委模型
                })
                eletricFenceLayerMap[name] = new LongMap.Layer()
                eletricFenceLayerMap[name].addFeature(planeMap[name]);
                map.addLayer(eletricFenceLayerMap[name]);
            },
            drawPlane() {
                draw = new LongMap.Draw({ //创建对象
                    type: "Plane", //绘制的种类
                    fillColor: new LongMap.Color("#0587F6", 0.4),
                    lineWidth: 3, //线宽
                    scale: 0.3,
                    // url
                    borderColor: new LongMap.Color("#0587F6"),
                })
                map.addIntercation(draw); //添加	
                draw.on("drawed", (e) => { //绘制完成调用 e.vertexs 绘制的顶点
                    this.addElectronicFence(e.vertexs)
                    this.isAddElectriFence = false
                });
            },
            cancelDraw() {
                map.removeIntercation(draw)
            },
            async addElectronicFence(list) { //新增电子围栏
                let fenceName = this.electriFanceList[0].name
                if (fenceName) {
                    let point3s = []
                    list.forEach(({ lon, lat, z }) => {
                        point3s.push({
                            lng: lon,
                            lat,
                            height: z
                        })
                    })
                    let postData = {
                        name: fenceName,
                        point3s,
                        vehicleType: this.vehicleTypeOfElectriFence
                    }
                    console.log(postData,'postData')
                    const res = await addElectronicFence(postData)
                    if (res.data.status === 0) {
                        this.$message({
                            message: '新增成功',
                            type: 'success'
                        });

                        this.electriFanceList[0].showInput = false
                        this.electriFanceList[0].show = true
                        this.electriFanceList[0].point3s = point3s
                        this.electriFanceList[0].vehicleType = this.vehicleTypeOfElectriFence
                        map.removeIntercation(draw) //关闭当前plane
                        this.showPlane(postData) //打开当前画好的plane图层
                    }
                } else {
                    this.$message.error('新增失败，请先输入围栏名称！');
                    this.cancelDraw(); //清除围栏
                    this.electriFanceList.shift() //请求电子围栏列表第一项
                }
            },
            // async updateElectronicFence(row) {
            //     console.log(row, 'sdjfasdlj')
            // },
            async delElectronicFence(fenceName) {
                const res = await delElectronicFence({ name: fenceName, vehicleType: this.vehicleTypeOfElectriFence })
                if (res.data.status === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.electriFanceList.forEach(({ name }, index) => {
                        if (fenceName === name) {
                            this.electriFanceList.splice(index, 1) //删除对应列表数据
                            map.removeLayer(eletricFenceLayerMap[name]); //删除对应图层
                        }
                    })
                } else {
                    this.$message.error('操作失败');
                }
            }
        }
    }
}