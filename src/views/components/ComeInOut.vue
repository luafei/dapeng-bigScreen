<template>
<div class="entrance">
    <sub-title 
    :title="TimeTitle + '出入口通行量排名'" 
    :subTitle="TimeTitle + '出入口通行量时间分布'"
     @onToggle="handleToggle"
      @onComeInOut="onComeInOut" 
      is-show-right 
      :roadFlag="roadFlag"></sub-title>
    <div class="bar-wrap">
        <wu-bar 
        v-show="showIndex === 0" 
        @onClick="clickWuBar" 
        v-on="$listeners" 
        :labels="labels" 
        :values="list">
        </wu-bar>
        <time-road 
        v-show="showIndex === 1" 
        :option="app.direactionRoadList" 
        :time-type="timeType"
         @onSelectTime="onSelectTime"
          @onRoadChange="onRoadChange" 
          class="time-road"></time-road>
        <wu-bar-two 
        v-show="showIndex === 1" 
        @onClick="clickWuBarTwo" 
        :labels="lables02" 
        :values="values02"></wu-bar-two>
        
    </div>
</div>
</template>

<script>
import WuBar from "@/components/echarts/WuBar";
import WuBarTwo from "@/components/echarts/WuBarTwo";
import SubTitle from "@/components/common/SubTitle";
import TimeRoad from "@/components/common/TimeRoad";
import { getTrafficRank, getTimeDistribution } from "@/api/dumpTruck";
import { parseTime, findComponentDownward, getCurrentTime,} from "@/utils/util";
import { mapGetters } from 'vuex'

export default {
    name: "comeInOut",
    components: {
        WuBar,
        SubTitle,
        WuBarTwo,
        TimeRoad,
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
            lables02: [],
            values02: [],
            direction: 0,
            roadFlag: 1, //（0-道路，1-出入口，2-沙鱼涌）
            // timeType: parseTime(new Date(), '{y}{m}{d}'),
            timeType: "day",
            roadName: "all",
            subTitleCom: null,
            TimeTitle: "",
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
                dataTime: parseTime(new Date(), "{y}{m}{d}"),
                // dataTime: '20200701',
                carType: this.carType,
                direction: this.direction,
            };
            const res = await getTrafficRank(postData);
            if (res) {
                this.labels = [];
                this.list = [];
                res.data.data.forEach((item, index) => {
                    if (this.carType !== "all") {
                        this.labels.push("0" + (index + 1) + " " + item.tollName);
                    } else {
                        this.labels.push(item.tollName);
                    }
                    this.list.push(item.flowNum);
                });
            }
        },
        // 出入口时间分布
        async getTimeDistribution() {
            let postData = {
                timeType: this.timeType,
                carType: this.carType,
                direction: this.direction,
                roadName: this.roadName,
                roadFlag: this.roadFlag,
            };
            const res = await getTimeDistribution(postData);
            if (res.data.data.length > 0) {
                this.lables02 = res.data.data[0].x;
                this.values02 = res.data.data;
            }
        },
        handleToggle({ index }) {
            this.showIndex = index;
            this.getCurrentEchartsData();
        },
        onComeInOut({ index }) {
            this.direction = index;
            this.getCurrentEchartsData();
        },
        getCurrentEchartsData() {
            this.showIndex === 1 ? this.getTimeDistribution() : this.getList();
        },
        onSelectTime({ type }) {
            if (this.carType !== "all") {
                this.timeType = type;
                this.getTimeDistribution();
            }
        },
        onRoadChange({ roadName }) {
            if (this.carType !== "all") {
                this.roadName = roadName;
                this.getTimeDistribution();
            }
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
        clickWuBarTwo(params) {
            let {
                beginTime,
                endTime
            } = getCurrentTime(this.timeType, params.name);
            params.beginTime = beginTime;
            params.endTime = endTime;
            params.direction = this.subTitleCom.btnIndexSel;
            params.tollName = this.roadName;
            this.$emit("onClickBarTwo", params);
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
        height: 200px;
    }
}
</style>
