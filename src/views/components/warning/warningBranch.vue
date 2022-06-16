<template>
  <div class="entrance">
    <sub-title title="各部门预警分析" :roadFlag="roadFlag"></sub-title>
    <div class="bar-wrap">
      <WuBarRankWarning
        v-show="showIndex === 0"
        :labels="labels"
        :values="list"
      />
    </div>
  </div>
</template>

<script>
import WuBarRankWarning from "@/components/echarts/WuBarRankWarning";
import SubTitle from "@/components/common/SubTitle";
import {
alarmPartStatistics,
} from "@/api/dumpTruck";
import {  findComponentDownward } from "@/utils/util";

export default {
  name: "warningBranch",
  components: {
    SubTitle,
    WuBarRankWarning,
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
      list: [],
      labels: [],
      showIndex: 0,
      direction: 0,
      roadFlag: 1, //（0-道路，1-出入口，2-沙鱼涌）
      TimeTitle: "",
      subTitleCom: null,
    };
  },
  mounted() {
    if (this.carType === "dangerCar") {
      this.TimeTitle = "危化品";
    } else if (this.carType === "dumpTruck") {
      this.TimeTitle = "泥头车";
    } else if (this.carType === "all") {
      this.TimeTitle = "车辆监测";
    }
    this.alarmPartStatistics()
    this.subTitleCom = findComponentDownward(this, "subTitle");
  },
  methods: {
    async alarmPartStatistics(){
      const res =await alarmPartStatistics()
      this.labels = [];
      this.list = [];
      if (res) {
        res.data.data.forEach((item) => {
          this.labels.push(item.alarmParam);
          this.list.push(item.num);
        });
      }
    }
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
