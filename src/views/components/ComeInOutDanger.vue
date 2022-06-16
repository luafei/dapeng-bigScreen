<template>
<div class="entrance">
    <sub-title :title="TimeTitle + '出入口通行量排名'" :subTitle="TimeTitle + '出入口来源地分析'" @onToggle="handleToggle" @onComeInOut="onComeInOut" is-show-right :roadFlag="roadFlag"></sub-title>
    <div class="bar-wrap">
        <TimeRoad :hour="false" week year :timeType="timeType" @onSelectTime="selectTime" v-show="showIndex === 0" class="time-tab"></TimeRoad>
        <wu-bar v-show="showIndex === 0" @onClick="clickWuBar" v-on="$listeners" :allTime="allTime" :labels="labels" :values="list"></wu-bar>
        <div class="time-entrance" v-show="showIndex === 1">
            <TimeRoad :hour="false" week year :timeType="timeTypePie" @onSelectTime="selectTimePie" class="time-tab"></TimeRoad>
            <el-select
            class="dp-select"
            popper-class="dp-select-popper"
            v-model="entranceName"
            @change="selectEntrance"
            placeholder="请选择"
            >
            <el-option
                v-for="item in app.direactionRoadList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
            </el-select>
        </div>
        <wu-pie v-show="showIndex === 1" :key="timeChange" :labels="lables02" v-on="$listeners" @clickScatter="handlePieScatter" :values="values02" :changeDriveType="direction"></wu-pie>
        <!-- <time-road v-show="showIndex === 1" :option="app.direactionRoadList" :time-type="timeType" @onSelectTime="onSelectTime" @onRoadChange="onRoadChange" class="time-road"></time-road> -->
        <!-- <wu-bar-two v-show="showIndex === 1" @onClick="clickWuBarTwo" :labels="lables02" :values="values02"></wu-bar-two> -->
        <el-dialog
            :visible.sync="vehicleRankVisible"
            width="30%"
            :title="'危化品车辆来源地数量排名'"
            :append-to-body="true"
            :before-close="() => vehicleRankVisible = false"
            class="map-dialog-container"
            >
            <WuPieOrigin  :values="values03"></WuPieOrigin>
        </el-dialog>
    </div>
</div>
</template>

<script>
import WuBar from "@/components/echarts/WuBar";
import SubTitle from "@/components/common/SubTitle";
import WuPie from '@/components/echarts/WuPie'
import TimeRoad from "@/components/common/TimeRoad";
import WuPieOrigin from '@/components/echarts/WuPieOrigin'

import { getTrafficRank, getTimeDistribution,getOriginPlace, queryTodayVehicleSourceRanking  } from "@/api/dumpTruck";
import { parseTime, findComponentDownward, getCurrentTime,} from "@/utils/util";
import { mapGetters } from 'vuex'

export default {
    name: "comeInOut",
    components: {
        WuBar,
        SubTitle,
        WuPie,
        TimeRoad,
        WuPieOrigin
    },
    props: {
        subTitleAlign: {
            type: String,
            default: "left",
        },
        carType: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            echart: null,
            styles: "",
            list: [],
            labels: [],
            showIndex: 0,
            lables02: null,
            values02: null,
            direction: 0,
            roadFlag: 1, //（0-道路，1-出入口，2-沙鱼涌）
            // timeType: parseTime(new Date(), '{y}{m}{d}'),
            timeType: "day",
            timeTypePie: 'day',
            roadName: "all",
            subTitleCom: null,
            TimeTitle: "",
            timeChange:null,
            allTime:[],
            entranceName: 'all',
            vehicleRankVisible: false,
            values03: []
        };
    },
    computed: {
        ...mapGetters(['app'])
    },
    mounted() {
        if (this.carType === "dangerCar") {
            this.TimeTitle = "危化品"
        } else if (this.carType === "dumpTruck") {
            this.TimeTitle = "泥头车"
        } else if (this.carType === "all") {
            this.TimeTitle = "车辆监测"
        }
        if (this.roadName) {
            this.getList();
            this.getTimeDistribution();
        }
    
        this.subTitleCom = findComponentDownward(this, "subTitle");
    },
    // computed: {
    //   initRoadValue(){
    //     return this.app.direactionRoadList.length !== 0 ? '土洋出入口' : ''
    //   }
    // },
    methods: {
        // 出入口排名
        async getList() {
            let postData = {
                // dataTime: parseTime(new Date(), "{y}{m}{d}"),
                // dataTime: '20200701',
                carType: this.carType,
                direction: this.direction,
                timeType: this.timeType
            };
            const res = await getTrafficRank(postData);
            if (res) {
                this.labels = [];
                this.list = [];
                this.allTime = [];
                res.data.data.forEach((item, index) => {
                    item.value = item.flowNum;
                    this.allTime.push(item);
                    if (this.carType !== "all") {
                        this.labels.push("0" + (index + 1) + " " + item.tollName);
                    } else {
                        this.labels.push(item.tollName);
                    }
                    this.list.push(item.flowNum);
                });
            }
        },
        // 出入口来源地分析
        async getTimeDistribution() {
            let postData = {
                // dataTime: parseTime(new Date(), '{y}{m}{d}'),
                // dataTime: '20200701',
                carType:this.carType,
                direction: this.direction,
                timeType: this.timeTypePie,
                tollName: this.entranceName
            }
            const res = await getOriginPlace(postData);
            if(res.data.data){
                this.lables02 = res.data.data.otherPlace;
                this.values02 = res.data.data.nativeLocation;
            }else{
                this.lables02 = 0;
                this.values02 = 0;
            }
        },
        async handlePieScatter(){
            this.vehicleRankVisible = true
            let postData = {
                timeType: this.timeTypePie,
                tollName: 'all',
                vehicleType: 'dangerCar',
                direction: this.direction
            }
            const res = await queryTodayVehicleSourceRanking(postData);
            if(res.data.data){
                this.values03 = [];
                let values03 = res.data.data.map((item)=>{
                return {
                    name:item.vehicleSource,
                    value:item.num
                }
                });
                values03 = values03.sort((itema,itemb)=>{
                if(itema.value > itemb.value){
                    return -1;
                }else if(itema.value < itemb.value){
                    return 1;
                }else{
                    return 0;
                }
                });
                this.values03 =values03;
            }
        },
        selectEntrance(val){
            this.entranceName = val
            this.getTimeDistribution()
        },
        selectTime({type}){
            this.timeType = type
            this.getList()
        },
        selectTimePie({type}){
            this.timeTypePie = type
            this.getTimeDistribution()
        },
        handleToggle({ index }) {
            this.showIndex = index;
            this.timeChange = new Date().getTime();
            this.getCurrentEchartsData();
        },
        onComeInOut({ index }) {
            this.direction = index;
            this.getCurrentEchartsData();
        },
        getCurrentEchartsData() {
            this.showIndex === 1 ? this.getTimeDistribution() : this.getList();
        },
        clickWuBar(params) {
            let {
                beginTime,
                endTime
            } = getCurrentTime("day");
            params.beginTime = beginTime;
            params.endTime = endTime;
            params.direction = this.subTitleCom.btnIndexSel;
            this.$emit("onClickBar", params);
        },
    },
};
</script>

<style lang="scss" scoped>
.entrance {

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

    .bar-wrap {
        height: 240px;
        position: relative;
        .dp-select{
            position: absolute;
            left: 0;
            top: 8px;
            z-index: 999;
        }
    }
    .time-tab{
        position: static;
    }
    .time-entrance{
        display: flex;
        margin-top:10px;
        .dp-select{
            position: static;
        }
        .time-tab{
            margin-top: 0;
            margin-right: 20px;
        }
    }
}
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
    color:#fff;
    }
   }
</style>
