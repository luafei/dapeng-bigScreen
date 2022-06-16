<template>
  <div class="entrance">
    <sub-title title="公交车调度" :roadFlag="roadFlag"></sub-title>
      <el-row>
          <el-button @click="buttonup" class="buttonshow" >刷新</el-button>
      </el-row>
    <div class="bus-wrap">
      <div class="busText">
        
        <ul class="busTextUl">
          <li v-for="(item,index) in busTexts" :key="index" @click="dialogVisibleBus(item)">{{item.text}}</li>
        </ul>
        <el-dialog class="entradialog" :visible.sync="dialogVisible" width="30%" :modal="false" :close-on-click-modal="false">
          <div class="blockBus">
            <el-timeline>
              <el-timeline-item>
                <p class="timeMsg">1.预警转发：{{activities.alarmTime}}</p>
                <p class="timeMsg">{{activities.alarmObject}}</p>
              </el-timeline-item>
              <el-timeline-item>
                <p class="timeMsg">2.预警确认：{{activities.cleanTime}}</p>
                <p class="timeMsg">{{activities.roleName}}{{activities.userName}}{{activities.mobileNum}}，预警已确认</p>
              </el-timeline-item>
              <el-timeline-item>
                <p class="timeMsg">3.预警处理：{{activities.cleanTime}}</p>
                <p class="timeMsg">{{activities.roleName}}{{activities.userName}}{{activities.mobileNum}}，{{activities.cleanType}}{{activities.cleanContent}}</p>
              </el-timeline-item>
              <!-- <el-timeline-item
                v-for="(activity, index) in activities.orderFeedBacks"
                :key="index"
              >
                <p class="timeMsg">{{index+4}}.调度回执：{{activity.operateTime}}</p>
                <p class="timeMsg">{{activity.roleName}}{{activity.userName}}{{activity.mobileNum}}，{{activity.remark}}，{{activity.extend}}</p>
              </el-timeline-item>             -->
          </el-timeline>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import SubTitle from "@/components/common/SubTitle";
import { queryOrderIssueList , queryBusOrderIssueDetail } from "@/api/dumpTruck";
import { findComponentDownward } from "@/utils/util";
export default {
  name: "busDispatch",
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
  },
  data() {
    return {
      echart: null,
      roadFlag: 1, //（0-道路，1-出入口，2-沙鱼涌）
      subTitleCom: null,
      busTexts: [],
      busVisible: {
        isShow: false,
      },
      dialogVisible: false,
      activities:{},
      timer: null,
    };
  },
  mounted() {
    this.subTitleCom = findComponentDownward(this, "subTitle");
    // this.queryOrderIssueList()
    this.polling()
  },
  methods: {
    async queryOrderIssueList(){
        const res = await queryOrderIssueList()
        this.busTexts = res.data.data.map((item)=>{
          return{
            text: item.alarmObject + "，" + item.cleanType,
            ...item
          }
        })
    },
    closebusDialog() {
      this.busVisible.isShow = false;
    },
    async dialogVisibleBus(item) {
      const res = await queryBusOrderIssueDetail({id:item.id})
      this.activities = res.data.data;
      this.dialogVisible = true;
    },
    buttonup() {
      this.$nextTick(() => {
        this.queryOrderIssueList()
      })
    },
    polling(){
      this.queryOrderIssueList()
      clearTimeout(this.timer)
      this.timer = setTimeout(this.polling, 5000)
    },
  },
  beforeDestroy(){
    clearTimeout(this.timer)
  }
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
  .buttonshow{
        width: 100px;
        height: 25px;
        text-align: center;
        line-height: 5px;
        position: absolute;
        bottom: 5px;
        left:250px;
        background:rgba(50,253,246,0.22);
        // border: 2px solid rgba(50,253,246,1);
        color: #fff;
      }
  .bus-wrap {
    height: 150px;
    overflow-y: auto;
    .busText {
      float: left;
      font-size: 12px;
      width: 100%;
      text-align: center;
      color: white;
      margin-top: 15px;
      
      .busTextUl {
        width: 100%;
        li {
          width: 98%;
          margin:1%;
          background:rgba(50,253,246,0.22);
          display: inline-block;
          border: 2px solid rgba(50,253,246,1);
          line-height: 25px;
            cursor:pointer;
            border-radius: 6px;
        }
      }
    }
  }
}
.blockCar {
  height: 150px;
  .el-timeline-item__node--normal {
    background: red;
  }
}
</style>
<style lang="scss">
.entradialog{
  .el-dialog{
    max-height: 550px;
    overflow-y: scroll;
    background:rgba(13,69,92,0.7);
    border:2px solid rgba(10,184,235,1);
  }
  .timeMsg{
    text-align:left;color:#fff;
    margin-bottom:10px;
    line-height:16px;
  }
}
</style>
