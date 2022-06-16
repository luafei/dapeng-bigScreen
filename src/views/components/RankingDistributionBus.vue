<template>
  <div class="entrance">
    <sub-title
      title="公交车预警排名"
      :on-type="2"
      is-show-right
      :option="options"
      @onRoadChange="onRoadChange"
      :init-value="initVal"
    ></sub-title>
    <div class="bar-wrap">
      <Wu-Number-bus
        :labels="labels"
        v-show="showIndex === 0"
        :values="values"
        @onClick="clickWuBar"
      ></Wu-Number-bus>
    </div>
  </div>
</template>

<script>
import WuNumberBus from "@/components/echarts/WuNumberBus";
import SubTitle from "@/components/common/SubTitle";
import { getCurrentTime } from "@/utils/util";

export default {
  name: "RankingDistributionBus",
  components: {
    SubTitle,
    WuNumberBus,
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
      carTitle: "",
      styles: "",
      labels: [],
      values: [],
      showIndex: 0,
      direction: 2,
      roadFlag: 0, //（0-道路，1-出入口，2-沙鱼涌）
      roadName: "",
      initVal: "M291",
      options: [
        {
          value: "M291",
          label: "M291",
        },
        {
          value: "61",
          label: "61",
        },
         {
          value: "937",
          label: "937",
        },
         {
          value: "B981",
          label: "B981",
        },
         {
          value: "M264",
          label: "M264",
        },
      ],
      value: "",
    };
  },
  created() {
    if (this.carType === "all") {
      this.carTitle = "车辆监测";
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      setTimeout(()=>{
        this.labels = ["粤B04347D","粤B78208D","粤B30918D","粤B33459D","粤B40267D"];
        this.values = ["5个","4个","3个","2个","1个"];
      },500)
    },
    onRoadChange({ roadName }) {
      this.roadName = roadName;
      if(roadName === 'M291'){
        this.labels = ["粤B30918D","粤B33459D","粤B40267D","粤B04347D","粤B78208D"];
        this.values = ["5个","4个","4个","2个","1个"];
      }
      if(roadName === '61'){
        this.labels = ["粤B30918D","粤B33459D","粤B04347D","粤B78208D","粤B40267D"];
        this.values = ["6个","3个","3个","2个","1个"];
      }
      if(roadName === '937'){
        this.labels = ["粤B30918D","粤B04347D","粤B78208D","粤B33459D","粤B40267D",];
        this.values = ["4个","4个","3个","2个","2个"];
      }
      if(roadName === 'B981'){
        this.labels = ["粤B78208D","粤B30918D","粤B33459D","粤B04347D","粤B40267D"];
        this.values = ["7个","4个","3个","2个","1个"];
      }
      if(roadName === 'M264'){
        this.labels = ["粤B40267D","粤B04347D","粤B33459D","粤B78208D","粤B30918D"];
        this.values = ["5个","4个","3个","3个","1个"];
      }
    },
    clickWuBar(params) {
      let { beginTime, endTime } = getCurrentTime("day");
      params.beginTime = beginTime;
      params.endTime = endTime;
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
    height: 120px;
  }
}
</style>
