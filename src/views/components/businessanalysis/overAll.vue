<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title title="总体情况"
         :on-type="2"
         is-show-right
         :option="options"
         @onRoadChange="onRoadChange"
         :init-value="initVal">
        </sub-title>
        <!-- <time-road  class="time-road" :hour="false"  week year :time-type="timeType" @onSelectTime="onSelectTime" ></time-road> -->
        <!-- <Qinbusine :labels="labels" :values="values" :allTime="allTime" ></Qinbusine>> -->
        <div class="Allone">
          <span>收件量:<i>{{AlloneList[0]}}件</i></span>
        </div>
        <div class="Alltwo">
           <span class="spanone">已办结:<i>{{AlloneList[1]}}件</i></span>
           <span>办结率:<i>{{AlloneList[2]}}%</i></span><br/>
           <span>退单量:<i>{{AlloneList[3]}}件</i></span>
           <span>退单率:<i>{{AlloneList[4]}}%</i></span>
        </div>
    </div>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import businData from "@/utils/businData.js";
export default {
  name:'overAll',
  components: {
    SubTitle
  },
  props: {
     subTitleAlign: {
      type: String,
      default: "left",
    },
  },
  data() {
    return {
      AlloneList:[],
      initVal: "第一季度",
      options:[
        {
          value: "第一季度",
          label: "第一季度",
        },
        {
          value: "第二季度",
          label: "第二季度",
        },
        {
          value: "第三季度",
          label: "第三季度",
        },
        {
          value: "第四季度",
          label: "第四季度",
        }
      ]
    };
  },
  mounted() {
    this.AlloneList=businData.quarterOne.type6
  },
  methods: {
      onRoadChange(val) {
         switch(val.roadName) {
          case '第一季度':
            this.AlloneList=businData.quarterOne.type6
          break;
          case '第二季度':
           this.AlloneList=businData.quarterTwo.type6
          break;
          case '第三季度':
            this.AlloneList=businData.quarterThree.type6
          break;
          case '第四季度':
            this.AlloneList=businData.quarterFour.type6
          break;
         }
          
      }
  }
}
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
.title-time{
    position: relative;
    .time-road{
        position: absolute;
        right: 0;
        top: 0;
        margin-top:0;
    }
}
.Allone{
  margin-top: 10px;
  span{
    color: #fff;
  }
}
.Alltwo{
  font-size: 8px;
  span{
    color: #fff;
    display: inline-block;
    width: 50%;
    margin-top: 2px;
  }
}
</style>