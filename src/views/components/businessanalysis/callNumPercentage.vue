<template>
<div class="entrance">
    <div class="title-time">
        <sub-title title="事项业务排名"> </sub-title>
        <time-road class="time-road" :hour="false" week year :time-type="timeType" @onSelectTime="onSelectTime"></time-road>
        <!-- <callNumPercentagePie :list="list"></callNumPercentagePie> -->
        <!-- 写死5个框 -->
        <div class="affairs-center-one">
            <ul >
                <li class="affairs-center-li">
                    <span style="color:#fff;">1、保障性住房(公租)轮后申请</span> <i  style="color:#fff; font-style:normal">14件</i>
                </li>
                <li class="affairs-center-li">
                    <span style="color:#fff;">2、保障性住房(安居)轮后申请</span> <i  style="color:#fff; font-style:normal">5件</i>
                </li>
                <li class="affairs-center-li">
                    <span style="color:#fff;">3、深圳市新引进人才租房和生活补贴</span> <i  style="color:#fff; font-style:normal">4件</i>
                </li>
                <li class="affairs-center-li">
                    <span style="color:#fff;">4、在职人才引入</span> <i  style="color:#fff; font-style:normal">3件</i>
                </li>
                <li class="affairs-center-li">
                    <span style="color:#fff;">5、政府投资项目审批(初步设计概算)</span> <i  style="color:#fff; font-style:normal">2件</i>
                </li>
            </ul>
        </div>
        
    </div>
</div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import {
    findComponentDownward
} from "@/utils/util";
import TimeRoad from "@/components/common/TimeRoad";
import callNumPercentagePie from "@/components/echarts/callNumPercentagePie";
import {
    getCallTypeProportion
} from "@/api/gov";

export default {
    name: "callNumPercentage",
    components: {
        SubTitle,
        TimeRoad,
        callNumPercentagePie,
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
            subTitleCom: null,
            timeType: "day",
            list: []
        };
    },
    mounted() {
        this.subTitleCom = findComponentDownward(this, "subTitle");
        this.getData();
    },
    methods: {
        async getData() {
            let postData = {
                timeType: this.timeType
            }
            const res = await getCallTypeProportion(postData);
            this.list = []
            res.data.data.forEach(item => {
              this.list.push({
                value: item.num, 
                name: item.taskName, 
                percent: item.proportion
              })
            })
        },
        onSelectTime({
            type
        }) {
            this.timeType = type;
            this.getData();
        },
    },
};
</script>

<style lang="scss" scoped>
.entrance {
    position: relative;

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
}

.title-time {
    position: relative;

    .time-road {
        position: absolute;
        right: 0;
        top: 0;
        margin-top: 0;
    }
    // 这是写死的中间部分样式
    .affairs-center-one{
        margin-top: 10px;
        height: 150px;
        width: 312px;
        .affairs-center-li{
            border: 1px solid #32FDF6;
            margin-top: 4px;
            span{
                display: inline-block;
                width: 255px;
                margin: 0;
            }
            i{
                display: inline-block;
                width: 45px;
                text-align: right;
            }
        }
    }
}
</style>
