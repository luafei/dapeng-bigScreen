<template>
  <div class="entrance">
    <sub-title title="预警统计"></sub-title>
    <div class="bar-wrap">
      <warningPie :labels="labels" :values="list" :statisticName="'预警总数'"></warningPie>
    </div>
  </div>
</template>

<script>
// import echarts from "echarts";
import warningPie from "@/components/echarts/warningPie";
import SubTitle from "@/components/common/SubTitle";
import { alarmLevelStatistics } from "@/api/dumpTruck";
export default {
  name: "warningStatistics",
  components: {
    warningPie,
    SubTitle,
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
    this.alarmLevelStatistics();
  },
  methods: {
    async alarmLevelStatistics() {
      const res = await alarmLevelStatistics();
      this.labels = [];
      this.list = [];
      if (res) {
        res.data.data.forEach((item) => {
          switch (item.alarmParam) {
            case "10":
              item.alarmParam = "蓝色";
              break;
            case "20":
              item.alarmParam = "黄色";
              break;
            case "30":
              item.alarmParam = "橙色";
              break;
            case "40":
              item.alarmParam = "红色";
              break;
          }
          this.labels.push(item.alarmParam);
          this.list.push(parseInt(item.num));
        });
      }
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
    margin-top: 20px;
  }
  .bar-wrap {
    overflow: hidden;
    margin: 20px 0;
  }
}
</style>
