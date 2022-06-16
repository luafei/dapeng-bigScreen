// mapPageVm 是地图首页注入到各个页面的vue实例
import { findComponentsDownward, getCurrentTime } from "@/utils/util";

export default function mapInteractive() {
    // let vehicleTrack = {}
    return {
        data() {
            return {
                // vehicleTrack: {}
            }
        },
        computed: {},
        methods: {
            handleEntranceAndRoad(params) {
                let pointInfo = this._getCurrentPoint(params)
                if (!pointInfo) return
                let { longitude, latitude, pointType, pointCode } = pointInfo
                if (pointType === '4') { //分析视频点
                    maplayers['entrance'] || this.mapPageVm.handleEntrance(true) //如果有分析视频点就不再创建,否则创建
                    this.mapPageVm.moveMap(longitude, latitude, 1000);
                    !this.mapPageVm.checkFeatures.includes('entrance') && this.mapPageVm.checkFeatures.push('entrance') //点亮图标
                    return
                }
                if (pointType === '5') { //重要路段 pointType：5
                    maplayers['road'] || this.mapPageVm.handleRoad(true);
                    this.mapPageVm.moveMap(longitude, latitude, 20000);
                    let feature = { pointCode }
                    this.mapPageVm.onRoadClice(feature, false);
                    !this.mapPageVm.checkFeatures.includes('road') && this.mapPageVm.checkFeatures.push('road') //点亮图标
                    return
                }
            },
            _getCurrentPoint(params) {
                let pointName = params.value.replace(/\s|\d+/g, '')
                let roadEntranceList = [...this.mapPageVm.roadList, ...this.mapPageVm.entranceList]
                let result = null
                for (let item of roadEntranceList) {
                    if (item.pointName === pointName) {
                        result = item
                        break
                    }
                }
                return result
            },
        }
    }
}