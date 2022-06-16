<template>
  <div class="entrance">
    <div>
      <sub-title
        :on-type="2"
        title="公交站客流变化趋势"
        is-show-right
        :option="busNameList"
        :time-type="timeType"
        @onSelectTime="onSelectTime"
        @onRoadChange="onRoadChange"
        :init-value="busStationName"
      >
      </sub-title>
    </div>
    <div class="bar-wrap">
      <busLinearGradient @onClick="clickWuBarTwo" :labels="labels02" :values="values02"></busLinearGradient>
    </div>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { queryPassengerDiagram, queryDicBusStations } from "@/api/dumpTruck";
import { findComponentDownward, getCurrentTime } from "@/utils/util";
import busLinearGradient from "@/components/echarts/LinearGradient";
export default {
  name: "busRankingDistribution",
  components: {
    SubTitle,
    busLinearGradient,
  },
  props: {
    carType: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      echart: null,
      labels02: [],
      values02: [],
      timeType: "day",
      roadName: "",
      subTitleCom: null,
      // busStationName: "新大社区",
      busStationName: "葵涌中心",
      busNameList: [],
      busSandbeach:true
    };
  },
  mounted() {
    this.queryPassengerDiagram();
    this.queryDicBusStations();
    this.subTitleCom = findComponentDownward(this, "subTitle");
  },
  methods: {
    async queryDicBusStations() {
      let postData = {
        existVideo: 1
      }
      const res = await queryDicBusStations(postData);
      this.busNameList = res.data.data.map((item) => {
        return {
          label: item.busStationName,
          value: item.busStationName,
        };
      });
    },
    async queryPassengerDiagram() {
      let postData = {
        busStationName: this.busStationName,
      };
      const res = await queryPassengerDiagram(postData);
      if (res.data.data) {
        this.labels02 = res.data.data.x;
        this.values02 = res.data.data.y;
      } else {
        this.labels02 = [];
        this.values02 = [];
      }
    },
    onSelectTime({ type }) {
      this.timeType = type;
    },
    onRoadChange({ roadName }) {
      this.busStationName = roadName;
      this.queryPassengerDiagram();
      // 下拉框数据 公交站客流变化
    },
    clickWuBarTwo(params) {
      let { beginTime, endTime } = getCurrentTime(this.timeType, params.name);
      params.beginTime = beginTime;
      params.endTime = endTime;
      this.$emit("onClickLine", params);
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
    height: 120px;
  }
}
</style>
