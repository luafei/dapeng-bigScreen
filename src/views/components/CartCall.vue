<template>
  <div class="car-call">
      <sub-title :title="comTitle + '车辆报警分析'"></sub-title>
      <search
        v-bind="$attrs"
        @onWarningType="onWarningType"
        @onTime="selectTime"
        :warningTypeList="warningTypeAllList"
        @onSearch="onSearch"
        :init-time="initTime"
        class="search"
      ></search>
      <Wu-bar-r-three :labels="labels" :values="values" @onClick="clickBar"></Wu-bar-r-three>
  </div>
</template>
 
<script>
import SubTitle from "@/components/common/SubTitle";
// import WuBar from '@/components/echarts/WuBar'
import Search from "@/components/common/Search";
import { getAlertRank } from "@/api/dumpTruck";
import WuBarRThree from "@/components/echarts/WuBarRThree";
import { getWarnginTypeList } from "@/api/dicData";
import { mapGetters } from "vuex";

export default {
  name: "carCall",
  components: {
    SubTitle,
    // WuBar,
    Search,
    WuBarRThree,
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
      labels: [],
      values: [],
      beginTime: "",
      endTime: "",
      warningTypeAllList: [],
      warningType: this.$attrs.initSelectType,
      initTime: [
        new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate(),
        new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate(),
      ],
      comTitle: "",
    };
  },
  computed: {
    ...mapGetters(["app"]),
  },
  created() {
    this.getWarningList();
  },
  mounted() {
    if (this.carType === "dangerCar") {
      this.comTitle = "危化品";
    } else if (this.carType === "dumpTruck") {
      this.comTitle = "泥头车";
    } else if (this.carType === "all") {
      this.comTitle = "车辆监测";
    }
    this.getList();
  },
  methods: {
    async getWarningList() {
      const res = await getWarnginTypeList({
        carType: this.carType === "dangerCar" ? "危化品车辆" : "泥头车",
      });
      this.warningTypeAllList = [];
      res.data.data.forEach((item) => {
        this.warningTypeAllList.push({
          label: item,
          value: item,
        });
      });
      if(this.carType === "dangerCar"){
        this.warningTypeAllList = this.warningTypeAllList.concat([
          {
            label: '疲劳驾驶',
            value: '疲劳驾驶'
          },
          {
            label: '电子围栏',
            value: '电子围栏'
          }
        ])
      }else {
        // this.warningTypeAllList.concat({
        //     label: '超速驾驶',
        //     value: '超速驾驶'
        // })
      }
    },
    async getList() {
      let postData = {
        beginTime: this.beginTime || this.initTime[0],
        endTime: this.endTime || this.initTime[1],
        warningType: this.warningType,
        carType: this.carType,
      };
      const res = await getAlertRank(postData);
      if (res.data.data) {
        this.labels = [];
        this.values = [];
        this.$nextTick(() => {
          res.data.data.forEach((item) => {
            this.labels.push(item.plateNo);
            this.values.push(item.warningNum);
          });
        })
      }
    },
    clickBar(info){
      this.$emit('onClick', {name: info.name})
    },
    onWarningType(type) {
      this.warningType = type;
      this.getList();
    },
    selectTime(timeArr) {
      if (timeArr && timeArr.length !== 0) {
        this.beginTime = timeArr[0];
        this.endTime = timeArr[1];
      }
    },
    onSearch({ warningType, time }) {
      this.beginTime = time && time[0];
      this.beginTime = time && time[1];
      this.warningType = warningType;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.car-call {
  position: relative;
  .search {
    margin-top: 10px;
  }
}
</style>
