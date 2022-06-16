<template>
  <div class="today-flow-wrap">
    <sub-title :title="TodayTitle + '车流量统计'"></sub-title>
    <TimeRoad
      :hour="false"
      week
      year
      :timeType="timeType"
      @onSelectTime="selectTime"
      v-if="timeTab"
      class="time-tab"
    ></TimeRoad>
    <div class="todayFlow" v-if="TodayDanger" :TodayDanger="TodayDanger">
      <ul class="carType">
        <li
          v-for="(item, index) in list"
          @click="handleItem(item)"
          :key="index"
          class="carItem"
        >
          <div class="carIcon">
            <img :src="item.icon" alt />
          </div>
          <div class="carText">
            <p class="topText">{{ item.name }}</p>
            <p class="bottonText">
              <count-to
                :start-val="0"
                :end-val="item.value"
                :duration="1500"
                class="card-panel-num"
              />
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="todayFlowCar" v-show="TodayCar">
      <ul class="carType">
        <li
          v-for="(item, index) in listCar"
          @click="handleItem(item)"
          :key="index"
          class="carItem"
        >
          <div class="carIcon">
            <img :src="item.icon" alt />
          </div>
          <div class="carText">
            <p class="topText">{{ item.name }}</p>
            <p class="bottonText">
              {{ item.value }} -->
              <count-to
                :start-val="0"
                :end-val="item.value"
                :duration="1500"
                class="card-panel-num"
              />
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import TimeRoad from "@/components/common/TimeRoad";
import { getTrafficFlow } from "@/api/dumpTruck";
import { carFlowTypeDic } from "@/const/dicData";
import CountTo from "vue-count-to";
import { parseTime, deepClone, getCurrentTime } from "@/utils/util";

export default {
  name: "todayFlow",
  components: {
    SubTitle,
    CountTo,
    TimeRoad,
  },
  props: {
    carType: {
      type: String,
      default: "dangerCar",
    },
    timeTab: {
      type: Boolean,
      default: false,
    },
    isAutoAmination: {
      type: Boolean,
      default: true,
    },
    time: {
      type: Number,
      default: 1000 * 60,
    },
  },
  data() {
    return {
      list: [
        {
          prop: "carIn",
          value: 0,
          name: carFlowTypeDic["carIn"],
          icon: require("@/assets/images/entry-vehicle.png"),
        },
        {
          prop: "carOut",
          value: 0,
          name: carFlowTypeDic["carOut"],
          icon: require("@/assets/images/out-vehicle.png"),
        },
        {
          prop: "carNetinflow",
          value: 0,
          name: carFlowTypeDic["carNetinflow"],
          icon: require("@/assets/images/net-inflow.png"),
        },
        {
          prop: "nativeLocation",
          value: 0,
          name: carFlowTypeDic["nativeLocation"],
          icon: require("@/assets/images/local-car.png"),
        },
        {
          prop: "otherPlace",
          value: 0,
          name: carFlowTypeDic["otherPlace"],
          icon: require("@/assets/images/off.png"),
        },
        {
          prop: "total",
          value: 0,
          name: carFlowTypeDic["total"],
          icon: require("@/assets/images/all-car.png"),
        },
      ],
      listCar: [
        {
          prop: "carIn",
          value: 0,
          name: carFlowTypeDic["carIn"],
          icon: require("@/assets/images/entry-vehicle.png"),
        },
        {
          prop: "carOut",
          value: 0,
          name: carFlowTypeDic["carOut"],
          icon: require("@/assets/images/out-vehicle.png"),
        },
        {
          prop: "carNetinflow",
          value: 0,
          name: carFlowTypeDic["carNetinflow"],
          icon: require("@/assets/images/net-inflow.png"),
        },
      ],
      timer: null,
      TodayTitle: "",
      TodayDanger: true,
      TodayCar: "",
      timeType: "day",
    };
  },
  async mounted() {
    if (this.carType === "dangerCar") {
      this.TodayTitle = "危化品";
    } else if (this.carType === "dumpTruck") {
      this.TodayTitle = "泥头车";
    } else if (this.carType === "all") {
      this.TodayTitle = "车辆监测";
    }
    this.getTrafficFlow();
    this.polling();
  },
  methods: {
    selectTime({ type }) {
      this.timeType = type;
      this.getTrafficFlow();
    },
    async getTrafficFlow() {
      let postData = {
        // dataTime: parseTime(new Date(), "{y}{m}{d}"),
        carType: this.carType,
        timeType: this.timeType,
      };
      if (this.carType === "all") this.list = this.list.slice(0, 3);
      const res = await getTrafficFlow(postData);
      let { carIn, carOut, carNetinflow, nativeLocation, otherPlace, total } =
        res.data.data;
      this.list[0].value = carIn;
      this.list[1].value = carOut;
      this.list[2].value = carNetinflow;
      if (this.carType !== "all") {
        this.list[3].value = nativeLocation;
        this.list[4].value = otherPlace;
        this.list[5].value = total;
      } else {
        this.list.length = 3;
      }
    },
    polling() {
      this.timer = setInterval(() => {
        let tempArr = deepClone(this.list);
        this.list.forEach((item) => {
          item.value = 0;
        });
        this.$nextTick(() => {
          this.list = tempArr;
        });
      }, this.time);
    },
    handleItem(item) {
      if (item.name === "净流入车辆") return false;

      let { beginTime, endTime } = getCurrentTime("day");

      switch (this.timeType) {
        case "day":
          beginTime = getCurrentTime("day").beginTime;
          endTime = getCurrentTime("day").endTime;
          break;
        case "week":
          beginTime = getCurrentTime("week").beginTime;
          endTime = getCurrentTime("week").endTime;
          break;
        case "month":
          beginTime = getCurrentTime("month").beginTime;
          endTime = getCurrentTime("month").endTime;
          break;
        case "year":
          beginTime = getCurrentTime("year").beginTime;
          endTime = getCurrentTime("year").endTime;
          break;
      }

      let { prop } = item;
      let params = {};
      params.beginTime = beginTime;
      (params.endTime = endTime),
        (params.nativeLocation =
          prop === "nativeLocation" ? 0 : prop === "otherPlace" ? 1 : 2);
      params.direction = prop === "carIn" ? 0 : prop === "carOut" ? 1 : 2;

      params.seriesName = item.name;
      this.$emit("handleTodayFlow", params);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  TodayDanger() {
    if (this.carType === "all") {
      return (this.TodayDanger = false);
    } else {
      return (this.TodayDanger = true);
    }
  },
};
</script>

<style lang="scss" scoped>
.today-flow-wrap {
  position: relative;
  .time-tab {
    position: absolute;
    right: 10px;
    top: 0;
  }
}
.todayFlow {
  position: relative;
  font-size: 16px;
  margin-top: 16px;
  .carType {
    display: flex;
    flex-wrap: wrap;
    .carItem {
      width: 33.3%;
      display: flex;
      cursor: pointer;
      .carIcon {
        width: 36px;
        height: 36px;
        margin-right: 6.5px;
        position: relative;
        top: 5px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .topText {
        font-size: 12px;
        color: #ffffff;
      }
      .bottonText {
        font-size: 18px;
        color: #41ffea;
      }
    }
    .carItem:nth-of-type(1) {
      margin-bottom: 23px;
    }
  }
}
.todayFlowCar {
  position: relative;
  font-size: 16px;
  margin-top: 16px;
  .carType {
    display: flex;
    // width: 452px;
    flex-wrap: wrap;
    .carItem {
      width: 33.3%;
      display: flex;
      cursor: pointer;
      .carIcon {
        width: 36px;
        height: 36px;
        margin-right: 6.5px;
        position: relative;
        top: 5px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .topText {
        font-size: 12px;
        color: #ffffff;
      }
      .bottonText {
        font-size: 18px;
        color: #41ffea;
      }
    }
    .carItem:nth-of-type(1) {
      margin-bottom: 23px;
    }
  }
}
</style>
