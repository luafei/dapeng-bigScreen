<template>
  <div class="entrance">
    <sub-title title="公交车统计" :roadFlag="roadFlag"></sub-title>
    <div class="bus-wrap">
      <div class="busImg" v-for="(item,index) in queryList" :key="index" :class="[index ===0?'':(index===1?'busImg1':'busImg2')]">
        <div class="bustime">
          <p>{{item.title}}</p>
          <p>{{item.num}}辆</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward,} from "@/utils/util";

export default {
  name: "busStatistics",
  components: {
    SubTitle,
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
    runingNum: {
      type: Number,
      default: 0
    }
  },
  // inject: ["app"],
  data() {
    return {
      echart: null,
      styles: "",
      direction: 0,
      roadFlag: 1, //（0-道路，1-出入口，2-沙鱼涌）
      subTitleCom: null,
      queryList:[
        {
          title:'实时运营车辆',
          num: this.runingNum
        },
        {
          title:'公交车总辆',
          num:'358'
        },
        {
          title:'公交路线',
          num:'67'
        }
      ]
    };
  },
  mounted() {
    this.subTitleCom = findComponentDownward(this, "subTitle");
  },
  watch: {
    runingNum(newVal){
      this.queryList[0].num = newVal
    }
  },
  methods: {
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
  .bus-wrap {
    margin-top: 20px;
    height: 150px;
    // overflow-y: auto;
    // padding: 10px;
  }
}
.blockCar {
  height: 150px;
  .el-timeline-item__node--normal {
    background: red;
  }
  // overflow-y: auto;
}
.busNumbers {
  display: inline-block;
  // background: #ffffff;
  font-size: black;
}
.busImg {
  width: 33%;
  height: 150px;
  float: left;
  padding: 5px;
  box-sizing: border-box;
  background-image: url(../../../assets/images/timeCar.png);
  background-position:center;
  background-size:contain;
  background-repeat: no-repeat;
  position: relative;
  color:#fff;
  .bustime {
    position: absolute;
    font-size: 12px;
    top:33%;
    text-align: center;
    width:100%;
    line-height:20px;
  }
  .bue {
    width: 100%;
    height: 100%;
  }
}
.busImg1{
  background-image: url(../../../assets/images/totleCar.png);
}
.busImg2{
  background-image: url(../../../assets/images/lineCar.png);
}
</style>
