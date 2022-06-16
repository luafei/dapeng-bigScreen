<template>
  <div class="time-road">
    <div class="time" v-if="isShowLeft">
      <el-button-group class="time-btn-group">
        <el-button
          v-if="hour"
          @click="selectTime('hour')"
          type="primary"
          class="time-btn"
          :class="timeType === 'hour' && 'time-btn-sel'"
          size="mini"
        >时</el-button>
        <el-button
          v-if="day"
          @click="selectTime('day')"
          type="primary"
          class="time-btn"
          :class="timeType === 'day' && 'time-btn-sel'"
          size="mini"
        >日</el-button>
        <el-button
          v-if="week"
          @click="selectTime('week')"
          type="primary"
          class="time-btn"
          :class="timeType === 'week' && 'time-btn-sel'"
          size="mini"
        >周</el-button>
        <el-button
          v-if="month"
          @click="selectTime('month')"
          type="primary"
          class="time-btn"
          :class="timeType === 'month' && 'time-btn-sel'"
          size="mini"
        >月</el-button>
         <el-button
          v-if="year"
          @click="selectTime('year')"
          type="primary"
          class="time-btn"
          :class="timeType === 'year' && 'time-btn-sel'"
          size="mini"
        >年</el-button>
      </el-button-group>
    </div>
    <slot name="tips"></slot>
  </div>
</template>
<script>
// import { getSiteName } from "@/api/dumpTruck";
export default {
  name: "timeRoad",
  props: {
    isShowLeft: {
      type: Boolean,
      default: true,
    },
    isShowRight: {
      type: Boolean,
      default: false,
    },
    hour: {
      type: Boolean,
      default: true,
    },
    day: {
      type: Boolean,
      default: true,
    },
    week: {
      type: Boolean,
      default: false,
    },
    month: {
      type: Boolean,
      default: true,
    },
    year: {
      type: Boolean,
      default: false
    },
    option: {
      type: Array,
      default: () => [],
    },
    timeType: {
      type: String,
      default: "hour",
    },
    initValue: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      initValueChild: "",
    };
  },
  watch: {
    initValue(val) {
      this.initValueChild = val;
      this.$emit("onRoadChange", { roadName: val });
    },
    option: {
      handler(val) {
        if (val.length > 0) {
          this.initValueChild = this.initValue;
          this.$emit("onRoadChange", { roadName: this.initValueChild });
        }
      },
    },
  },
  mounted() {

  },
  methods: {
    selectTime(type) {
      this.$emit("onSelectTime", { type });
    },
    handleChange(val) {
      this.$emit("onRoadChange", { roadName: val });
    },
  },
};
</script>
<style lang="scss" scoped>
.time-road {
  position: absolute;
  display: flex;
  justify-content: space-between;
  justify-items: center;
  width: auto;
  font-size: 16px;
  height: 30px;
  line-height: 3px;
  z-index: 10000;
  .time-btn-group {
    border-radius: 1px;
  }
  .time {
    font-size: 0;
    .time-btn {
      width: 32px;
      height: 20px;
      padding: 0;
      border: 1px solid rgba(50, 253, 246, 1);
      background: none;
      font-size: 10px;
    }
    .time-btn-sel {
      background: #32fdf6;
      color: #000;
    }
  }
}
</style>