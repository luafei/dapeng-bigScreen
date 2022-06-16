<template>
<div class="entrance">
    <sub-title :title="TimeTitle + '出入口通行量排名'" :subTitle="TimeTitle + '沙鱼涌监测'" @onToggle="handleToggle" @onComeInOut="onComeInOut" is-show-right :roadFlag="roadFlag"></sub-title>
    <div class="bar-wrap">
        <wu-bar v-show="showIndex === 0" @onClick="clickWuBar" v-on="$listeners" :allTime="allTime" :labels="labels" :values="list"></wu-bar>
        <shark-road-monitor
            v-show="showIndex === 1"
            :car-type="carType"
            @onClickLine="onClickLine"
            :key="timeChange"
            class="shark-road-monitor"
        ></shark-road-monitor>
    </div>
</div>
</template>

<script>
import WuBar from "@/components/echarts/WuBar";
import SubTitle from "@/components/common/SubTitle";
import SharkRoadMonitor from "../MudTruck/components/SharkRoadMonitor";
import { getTrafficRank } from "@/api/dumpTruck";
import { parseTime, findComponentDownward, getCurrentTime,} from "@/utils/util";
import { mapGetters } from 'vuex'

export default {
    name: "comeInOut",
    components: {
        WuBar,
        SubTitle,
        SharkRoadMonitor
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
            roadName: "all",
            subTitleCom: null,
            TimeTitle: "",
            timeChange:null,
            allTime:[]
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
        }
    
        this.subTitleCom = findComponentDownward(this, "subTitle");
    },
    methods: {
        // 出入口排名
        async getList() {
            let postData = {
                // dataTime: parseTime(new Date(), "{y}{m}{d}"),
                // dataTime: '20200701',
                carType: this.carType,
                direction: this.direction,
                timeType: 'day'
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
        handleToggle({ index }) {
            this.showIndex = index;
            if(this.showIndex != 0){
                this.timeChange = new Date().getTime();
            }else{
                this.getList();
            }
        },
        onComeInOut({ index }) {
            this.direction = index;
            if(this.showIndex != 0){
                this.timeChange = new Date().getTime();
            }else{
                this.getList();
            }
        },
        onClickLine(params){
            this.$emit("onClickLine",params)
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
        // height: 240px;
        margin-bottom:10px;
    }
}
</style>
