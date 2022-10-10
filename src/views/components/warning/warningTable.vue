<template>
  <div class="entrance">
    <div class="warningTitle">
      <div class="warning-one">
        <div class="title-one">
          <el-row type="flex" class="warningtable">
            <el-col :span="9">
              <span
                class="warningtime-early"
                style="font-size: 12px; margin: 0 5px"
                >预警时间</span
              >
              <el-date-picker
                v-model="time"
                class="dp-picker"
                type="daterange"
                align="center"
                unlink-panels
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                popper-class="dp-picker-popper"
              ></el-date-picker>
            </el-col>
            <el-col :span="8">
              <span class="warningtime" style="font-size: 12px; margin: 0 5px"
                >预警分类</span
              >
              <template>
                <el-select
                  v-model="alarmType"
                  class="dp-selects"
                  popper-class="dp-select-poppers"
                >
                  <el-option
                    v-for="item in alarmTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </el-col>
            <el-col :span="8">
              <span class="warningtime" style="font-size: 12px; margin: 0 5px"
                >预警级别</span
              >
              <template>
                <el-select
                  v-model="alarmLevel"
                  class="dp-selects"
                  popper-class="dp-select-poppers"
                >
                  <el-option
                    v-for="item in alarmLevelOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </el-col>
          </el-row>
        </div>
        <div class="title-two">
          <el-row>
            <el-col :span="10">
              <span
                class="warningtimeNum"
                style="font-size: 12px; margin: 0 5px"
                >预警部门</span
              >
              <template>
                <el-select
                  v-model="alarmPart"
                  class="dp-selectsT"
                  popper-class="dp-select-poppers"
                >
                  <el-option
                    v-for="item in alarmPartOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </el-col>
            <el-col :span="7">
              <span
                class="warningtimeNum"
                style="font-size: 12px; margin: 0 5px"
                >预警状态</span
              >
              <template>
                <el-select
                  v-model="alarmStat"
                  class="dp-selectsT"
                  popper-class="dp-select-poppers"
                >
                  <el-option
                    v-for="item in alarmStatOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </el-col>
            <el-col :span="3">
              <el-button class="reset-one" @click="queryAlarmPages">查询</el-button>
            </el-col>
            <el-col :span="3">
              <el-button class="reset" @click="reset">重置</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="warningTable" ref="warningTable">
        <template>
          <el-table
            :data="tableData"
            style="width: 100%"
            :height="warningTableHeight"
            v-loading="loading"
            element-loading-text="加载中..."
            element-loading-background="rgba(0, 0, 0, 0.4)"
            :row-class-name="tableRowClassName"
            @cell-click="warningClick"
          >
            <el-table-column
              prop="alarmtitle"
              label="预警标题"
              :min-width="90"
            ></el-table-column>
            <el-table-column
              prop="alarmtime"
              label="预警时间"
              :min-width="140"
            ></el-table-column>
            <el-table-column
              prop="alarmlevel"
              label="预警级别"
              :min-width="90"
            >
              <template slot-scope="scope">
                <template v-if="scope.row.alarmlevel == 10">
                  <span style="color:blue">蓝色</span>
                </template>
                <template v-if="scope.row.alarmlevel == 20">
                  <span  style="color:#FDCC1E">黄色</span>
                </template>
                <template v-if="scope.row.alarmlevel == 30">
                  <span style="color:#FF9901">橙色</span>
                </template>
                <template v-if="scope.row.alarmlevel == 40">
                  <span  style="color:#F13535">红色</span>
                </template>
              </template>
            </el-table-column>
            <el-table-column
              prop="alarmobject"
              label="预警源"
              :min-width="130"
            ></el-table-column>
            <el-table-column :min-width="150" prop="alarmpart" label="部门"></el-table-column>
            <el-table-column prop="icon" label="处理" show-overflow-tooltip>
              <i class="el-icon-s-order" style="font-size: 18px"></i>
            </el-table-column>
            <el-table-column label="操作" :min-width="200">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="confirmWaring(scope.row)" class="waring-btn">预警确认</el-button>
                <el-button type="primary" size="mini" @click="pushWaring(scope.row)" class="waring-btn">预警推送</el-button>
                <el-button :type="scope.row.path ? 'primary' : 'info'" :disabled="!scope.row.path" size="mini" @click="handleWaringStatistic(scope.row)" class="waring-btn">预警分析</el-button>
                <el-button :type="scope.row.link ? 'primary' : 'info'" :disabled="!scope.row.link" size="mini" @click="toWarpLink(scope.row)" class="waring-btn">预警集成</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <div class="pageWarning">
        <span class="paginationslot"
          >{{ currentPage1 }}/{{ Math.ceil(total / pageSize) }}页，共{{
            total
          }}条记录</span
        >
        <el-pagination
          background
          small
          layout="prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          prev-text="上一页"
          next-text="下一页"
          :page-size="pageSize"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      class="warningDialog"
      :visible.sync="dialogObj.dialogVisible"
      width="30%"
      :modal="false"
      :close-on-click-modal="false"
      :title="dialogObj.type === 1?'处理':'列表'"
    >
      <div>
        <div class="blockBus">
          <el-form ref="form" :model="dialogObj.data" label-width="80px">
            <el-form-item label="预警流水号">
              <el-input v-model="dialogObj.data.id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="预警时间">
              <el-input v-model="dialogObj.data.alarmtime" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="预警标题">
              <el-input v-model="dialogObj.data.alarmtitle" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="预警源">
              <el-input v-model="dialogObj.data.alarmobject" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="预警级别" v-if="dialogObj.type == 2">
              <!-- <el-input :value="yujtext" :disabled="true">123</el-input> -->
              <template v-if="dialogObj.data.alarmlevel == 10" :value="蓝色"  :disabled="true">
                </template>
                <template v-if="dialogObj.data.alarmlevel == 20" :value="黄色"  :disabled="true">
                </template>
                <template v-if="dialogObj.data.alarmlevel == 30" :value="橙色"  :disabled="true">
                </template>
                <template v-if="dialogObj.data.alarmlevel == 40" :value="红色"  :disabled="true">
                </template>
            </el-form-item>
            <el-form-item label="经度" v-if="dialogObj.type == 2">
              <el-input v-model="dialogObj.data.lng" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="纬度" v-if="dialogObj.type == 2">
              <el-input v-model="dialogObj.data.lat" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="预警类型" v-if="dialogObj.type == 1">
              <el-select v-model="dialogObj.data.cleanType" :disabled="dialogObj.type == 2">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="处理原因" :disabled="dialogObj.type == 2">
              <el-input type="textarea" resize="none" v-model="dialogObj.data.cleanContent" :disabled="dialogObj.type == 2"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="cancel" v-if="dialogObj.type == 1">
        <el-button @click="cancelWarning">取消</el-button>
        <el-button @click="affirmWarning">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { parseTime,getCurrentTime } from "@/utils/util";
import {queryAlarmPages,queryAlarmTypeList,queryAlarmPartList,updateAlarmCleanInfo,queryAlarmDetailById } from '@/api/dumpTruck'
import { affirmAlarm, pushAlarm } from '@/api/alarm'
export default {
  name: "busComeInOut",
  components: {},
  props: {
    carType: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      echart: null,
      alarmType:"",
      alarmTypeOptions: [
        {
          value: "",
          label: "全部",
        }
      ],
      alarmLevel:"",
      alarmLevelOptions: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "10",
          label: "蓝色",
        },
        {
          value: "20",
          label: "黄色",
        },
        {
          value: "30",
          label: "橙色",
        },
         {
          value: "40",
          label: "红色",
        },
      ],
      alarmPart:'',
      alarmPartOptions:[
        {
          value: "",
          label: "全部",
        }
      ],
      alarmStat: 0,
      alarmStatOptions:[
        {
          value: 0,
          label: "未处理",
        },
        {
          value: 10,
          label: "已处理",
        }
      ],
      typeOptions:[
        {
          value:1,
          label: "预警已过期",
        },
        {
          value: 2,
          label: "数据已恢复",
        },
        {
          value: 3,
          label: "其他",
        },
      ],
      tableData:[],
      newtabledata: [
        // {
        // addTime: null,
        // alarmaddress: null,
        // alarmclass: null,
        // alarmcontent: null,
        // alarmlevel: 40,
        // alarmnumber: null,
        // alarmobject: " 粤 BHR505",
        // alarmpart: "住房建设局",
        // alarmregion: null,
        // alarmstat: null,
        // alarmtime: '2021-05-06 06:20:25',
        // alarmtitle: "车辆未到备案消纳场排放",
        // alarmtype: '环境',
        // cleanContent: null,
        // cleanTime: null,
        // cleanType: null,
        // id: null,
        // img: null,
        // lat: null,
        // lng: null,
        // subtype: null,
        // },
        // {
        // addTime: null,
        // alarmaddress: null,
        // alarmclass: null,
        // alarmcontent: null,
        // alarmlevel: 20,
        // alarmnumber: null,
        // alarmobject: "大鹏新区西涌防风林景观改造工程",
        // alarmpart: "住房建设局",
        // alarmregion: null,
        // alarmstat: null,
        // alarmtime: '2021-05-06 04:08:13',
        // alarmtitle: "消纳场剩余消纳量低于5%",
        // alarmtype: '环境',
        // cleanContent: null,
        // cleanTime: null,
        // cleanType: null,
        // id: null,
        // img: null,
        // lat: null,
        // lng: null,
        // subtype: null,
        // },
      ],
      currentPage1: 1,
      total: 104,
      pageSize: 20,
      warningTableHeight: null,
      time: [],
      dialogObj:{
        data:{},
        type:1,
        dialogVisible: false,
      },
      loading: false,
      jumpMap: [
        //   {
        //   alarmtype: '环境',
        //   path: '',    //生态环保页面暂未开发
        // },
        {
          alarmtype: '危化品车辆',
          path: '/DangerousChemicals'
        },{
          alarmtype: '泥头车',
          path: '/MudTruck'
        },{
          alarmtype: '公交站客流',
          path: 'busCapacity'
        },{
          alarmtype: '公交车',
          path: 'busCapacity'
        },{
          alarmtype: '沙滩',
          // path: '/sandBeach'
        }
      ],
      linkMap: [{
        alarmtype: '环境',
        path: 'http://172.21.118.30:8080/jointos/app/sso/login'
      },{
        alarmtype: '气象',
        path: 'http://data.121.com.cn/wdn/view/alarmForecast/alarm.jsp'
      },{
        alarmtype: '危化品车辆',
        path: 'http://113.105.69.185:6868/dist/#/loginzfByZHZX'
      }]
    };
  },
  // 计算属性获取预警级别的文字
  computed: {
    yujtext:function() {
      switch (this.dialogObj.data.alarmlevel) {
          case 10 :
            return `蓝色 ${this.new_levelStandard}`
            break
          case 20 :
            return `黄色 ${this.new_levelStandard}`
            break
          case 30 :
            return `橙色 ${this.new_levelStandard}`
            break
          case 40 :
            return `红色 ${this.new_levelStandard}`
            break
          default:
            return ''
        }
    },
    new_levelStandard () {
      return this.dialogObj.data.levelStandard === null ? this.dialogObj.data.levelStandard : ''
    }
  },
  mounted() {
    this.queryAlarmTypeList();
    this.queryAlarmPartList();
    this.queryAlarmPages();
    this.$nextTick(() => {
      this.warningTableHeight = this.$refs.warningTable.clientHeight;
      // console.log(this.warningTableHeight,'this.warningTableHeight');
    })
  },
  methods: {
    async queryAlarmTypeList(){
      const res = await queryAlarmTypeList();
      let list = [{
          value: "",
          label: "全部",
      }];
      res.data.data.forEach((item)=>{
        list.push({
          value:item,
          label:item
        })
      });
      this.alarmTypeOptions = list;
    },
    async queryAlarmPartList(){
      const res = await queryAlarmPartList();
      let list = [{
          value: "",
          label: "全部",
      }];
      res.data.data.forEach((item)=>{
        list.push({
          value:item,
          label:item
        })
      });
      this.alarmPartOptions = list;
      
    },
    async queryAlarmPages(){
      const postData = {
        page:this.currentPage1,
        pageSize:this.pageSize,
        beginTime:this.time[0] && this.time[0].split(' ')[0]+' 00:00:00',
        endTime:this.time[1] && this.time[1].split(' ')[0]+' 23:59:59',
        alarmType:this.alarmType,
        alarmLevel:this.alarmLevel,
        alarmPart:this.alarmPart,
        alarmStat: this.alarmStat
      }
      this.loading = true
      const res = await queryAlarmPages(postData)
      this.loading = false
      res.data.data.data.forEach(element => {
        element.alarmtime = parseTime(element.alarmtime)
        //预警分析
        let findItem = this.jumpMap.find(item => item.alarmtype === element.alarmtype || item.alarmtype === element.subtype)
        if(findItem){
          element.path = findItem.path
        }
        
        //预警集成
        let findItem02 = this.linkMap.find(item => item.alarmtype === element.alarmtype || item.alarmtype === element.subtype)
         if(findItem02){
           element.link = findItem02.path
         }
      });
      this.total = res.data.data.total;
      // res.data.data.data.forEach(item=> {
      //   this.newtabledata.push(item)
      // })
      this.tableData = res.data.data.data;
      
      this.tableData.unshift(...this.newtabledata)

      console.log(this.tableData)
      this.$emit('onTableData',this.tableData)
    },
    reset(){
      this.currentPage1 = 1;
      this.pageSize = 20;
      this.time = [];
      this.alarmType = "";
      this.alarmLevel = "";
      this.alarmPart = "";
      this.alarmStat = 0
      this.queryAlarmPages();
    },
    handleSizeChange(val) {
      this.queryAlarmPages()
    },
    handleCurrentChange(val) {
      this.queryAlarmPages()
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    affirmWarning() {
      if(!this.dialogObj.data.cleanType){
        return this.$message({
          message: '请选择预警类型',
          type: 'warning'
        });
      }
      this.updateAlarmCleanInfo();
    },
    cancelWarning() {
      this.dialogObj.data = {};
      this.dialogObj.type = null;
      this.dialogObj.dialogVisible = false;
    },
    warningClick(row, column) {
      if (column.label === "处理") {
        this.dialogObj.type = 1;
        this.queryAlarmDetailById(row.id);
      } else {
        // this.dialogObj.type = 2;
        this.$emit('onCellClick',row,column)
      }
    },
    async updateAlarmCleanInfo(){
      const res = await updateAlarmCleanInfo({
        // 流水号
        id:this.dialogObj.data.id,
        cleanType:this.dialogObj.data.cleanType,
        cleanContent:this.dialogObj.data.cleanContent
      });
      this.dialogObj.dialogVisible = false;
    },
    async queryAlarmDetailById(id){
      const res = await queryAlarmDetailById({id:id});
      this.dialogObj.data = res.data.data;
      this.dialogObj.dialogVisible = true;
    },
    handleWaringStatistic(row){
      this.$router.push({
        path: row.path
      })
    },
    toWarpLink(row){
      window.open(row.link)
    },
    async confirmWaring(row){
      const res = await affirmAlarm(row.id)
      if(res.data.status !== 100){
        this.$message({
          message: res.data.msg,
          type: 'success'
        });
      }else {
        this.$message.error(res.data.msg)
      }
    },
    async pushWaring(row){
      const res = await pushAlarm(row.id)
      if(res.data.status !== 100){
        this.$message({
          message: res.data.msg,
          type: 'success'
        });
      }else {
        this.$message.error(res.data.msg)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.entrance {
  width: 100%;
  .warningTitle {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .warning-one {
      height: 120px;
      font-size: 0;
      color: white;
      box-sizing: border-box;
      padding: 10px 2px;
      .title-one {
        padding: 0 0 10px 0;
        .dp-picker {
          // width: 120px !important;
          height: 30px;
          line-height: 30px;
          border: 1px solid rgba(27, 241, 170, 0.6);
          opacity: 1;
          background: none !important;
          padding: 4px !important;
          .el-input__inner {
            font-size: 12px;
            padding: 2px;
            height: 22px;
            color: #fff;
            background: transparent !important;
          }
          .el-range-input {
            font-size: 12px;
            line-height: 18px;
            background: transparent !important;
            color: #fff;
          }
          .el-range-separator {
            font-size: 12px;
            line-height: 10px;
            color: #fff;
          }
          .el-range__icon {
            line-height: 12px!important;
          }
          .el-range__close-icon {
            line-height: 12px;
          }
          &.is-active,
          &.is-active:hover {
            border-color: rgba(50, 253, 246, 0.6);
          }
        }
      }
    }
  }
}
.warningTable {
  // height: 500px;
  height: 100%;
  flex: 1;
  .el-table {
    background: transparent;
    .el-table__body-wrapper {
      // overflow-x: hidden;
    }
  }
}
.warningtable{
  margin-bottom: 4px;
  .el-col{
    display: flex;
    align-items: center;
    .warningtime-early,.warningtime{
      flex-shrink: 0;
    }
    .dp-picker{
      width: 95%;
    }
  }
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  margin-left: 5px;
  background: transparent;
  border: 1px solid #1bf1aa;
  opacity: 0.2;
}
.reset,.reset-one{
  height: 30px;
  line-height: .5;
  border: 1px solid rgba(27, 241, 170, 0.6);
  color: #fffefe;
  background: transparent;
}
.reset {
  margin: 0 5px;
}

.pageWarning {
  height: 50px;
  right: 0;
  width: 100%;
  .paginationslot {
    color: #fff;
    font-size: 16px;
    height: 20px;
    line-height: 30px;
    float: left;
  }
  .el-pagination {
    float: right;
    height: 50px;
  }
}

.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
.waring-btn{
  margin-bottom: 6px;
  &:nth-child(2){
    margin-left: 0px;
  }
   &:nth-child(3){
    margin-left: 0px;
  }
   &:nth-child(4){
    margin-left: 0px;
  }
}
</style>
<style lang="scss">
.warning-one {
  .el-input__inner {
    background: transparent;
    color: #fff;
  }
  input {
    color: #fff;
    font-size: 14px;
    background: transparent;
  }
  .el-date-editor .el-range-input {
    color: #fff;
  }
  .title-one{
    .el-date-editor{
      .el-range__icon,.el-input__icon{
        height: auto;
      }
    }
  }
}
.warningTable {
  .el-table {
    &::before {
      height: 0;
    }
    .el-table__body-wrapper {
      // overflow-x: hidden;
    }
    tr {
      background: transparent;
      color: #fff;
    }
    tr:nth-child(odd) {
      background: transparent;
    }
    tr:nth-child(even) {
      background: rgba(27, 241, 170, 0.1);
    }
    tr:hover {
      td {
        background: transparent;
      }
    }
    td {
      border-bottom-width: 0;
    }
    th {
      background: rgba(27, 241, 170, 0.2);
      border-bottom-width: 0;
    }
  }
}
.pageWarning {
  .el-pagination .btn-prev,
  .btn-next {
    padding: 0 8px !important;
    color: #fff !important;
    outline: 2px solid #1bf1aa;
    background: rgba(27, 241, 170, 0.1) !important;
  }
  .el-pager {
    .number,.more  {
      color: #fff !important;
      outline: 2px solid #1bf1aa;
      background: rgba(27, 241, 170, 0.1) !important;
    }
    .number.active {
      background: rgba(27, 241, 170, 0.62) !important;
    }
  }
}
.dp-select-poppers {
  margin-top: 4px !important;
  background: rgba(11, 18, 30, 0.9);
  border: 1px solid rgba(54, 179, 178, 1);
  .el-select-dropdown__list {
    .el-select-dropdown__item {
      color: rgba(255, 255, 255, 0.3);
    }
    .el-select-dropdown__item.hover {
      background: none;
      color: #fff;
    }
  }
  .popper__arrow {
    display: none;
  }
}
.dp-selects {
  // width: 91px;
  // height: 40px;
  border-radius: 0px !important;
  background: none;
  .el-input {
    .el-input__inner {
      height: 30px;
      // width: 91px;
      width: 95%;
      background: none;
      color: #fff;
      font-size: 10px;
      border: 1px solid rgba(27, 241, 170, 0.6);
    }
    .el-input__suffix {
      .el-input__icon {
        line-height: 30px;
      }
    }
  }
  .is-focus {
    .el-input__inner {
      border-color: #36b3b2 !important;
    }
  }
  .el-select {
    margin-left: 10px;
    border: 1px solid rgba(27, 241, 170, 0.6);
    color: #fff;
    background: transparent;
    width: 91px;
  }
}
.dp-selectsT {
  color: #fff;
  width: calc(100% - 85px);
  height: 40px;
  border-radius: 0px !important;
  background: none;
  .el-input {
    .el-input__inner {
      height: 30px;
      width: 100%;
      background: none;
      color: #fff;
      font-size: 10px;
      border: 1px solid rgba(27, 241, 170, 0.6);
    }
    .el-input__suffix {
      .el-input__icon {
        line-height: 30px;
      }
    }
  }
  .is-focus {
    .el-input__inner {
      border-color: #36b3b2 !important;
    }
  }
  .el-select {
    margin-left: 10px;
    border: 1px solid rgba(27, 241, 170, 0.6);
    color: #fff;
    background: transparent;
    width: 91px;
  }
}
.warningDialog {
  .el-dialog {
    background: rgba(13, 69, 92, 0.7);
    border: 2px solid rgba(10, 184, 235, 1);
  }
  .blockBus {
    margin: 8px;
    .el-select{
      width:100%;
    }
    .el-form-item__label{
      color:#fff;
    }
    .el-input__inner,.el-textarea__inner{
      background: #0D455C;
      border-radius: 0;
      border-color:#0AB8EB;
      color:#fff;
    }
  }
  .warningMsg {
    color: #fff;
    margin-bottom: 10px;
    line-height: 40px;
    margin-right: 10px;
  }
  .warningText {
    display: inline-block;
    text-align: left;
    width: 402px;
    height: 40px;
    line-height: 40px;
    background: #0d455c;
    border: 2px solid #0ab8eb;
    color: #f8fdff;
  }
  .cancel {
    text-align: right;
    .el-button {
      background: #0f4b63;
      border: 3px solid #0f4b63;
      color: #ffffff;
    }
    .el-button :hover {
      background: #0f4b63;
      color: #ffffff;
    }
  }
  .el-dialog__header {
    font-size: 12px;
    background: #0F4B63;
    line-height: 30px;
  }
  .el-dialog__title {
    color: #f8fdff;
    line-height: 30px;
  }
}
</style>