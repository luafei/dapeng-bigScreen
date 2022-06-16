<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title 
        title="一体机部门业务统计分析"
        @onToggle= "handleToggle"
        >
        </sub-title>
        <!-- barColors -->
        <div class="bar-wrap">
          <div>
            <!-- 时间显示 -->
            <!-- <time-road  
            v-if="showIndex === 0"
            class="time-road"
            :hour="false"
            week
              year
              :time-type="timeType" 
              @onSelectTime="onSelectTime" ></time-road> -->
              <!-- :selectItem="initVal"  :tiplist="options"-->
            <Businesstwoecharts
              ref="qintoptow"
              :values="values002"  
              :labels="labels002"
              >
            </Businesstwoecharts>
             <!-- <el-dialog
              :title="dialogTitle"
              :visible.sync="dialogVisible"
              width="60%"
              append-to-body
              :close-on-click-modal="false"
              class="tab-dialog  total-business-dialog">
              <avue-crud 
                :data="list" 
                :option="option"
                :page.sync="page"
                @cell-click="handlecellclick"
                @size-change="sizeChange"
                @current-change="currentChange" 
                class="tab-dialog dp-avue-pagination">
                 <template slot="video" slot-scope="scope">
                  <el-button class="dp-btn-plain btn-video" @click="handlePlayer">播放视频</el-button>
                 </template>
                </avue-crud>
              </el-dialog> -->
          </div>
            <approval 
              :sblsh="sblsh"
              :visiblelis.sync="approvalshow"
            ></approval>
      </div>
    </div>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward, } from "@/utils/util";
import TimeRoad from '@/components/common/TimeRoad'
import callNumPercentagePie from '@/components/echarts/callNumPercentagePie'
import WuLine from '@/components/echarts/WuLine'
import QinRightCenter from "@/components/echarts/QinRightCenter";
import WuBarRThree from "@/components/echarts/WuBarRThree";
import {getsource , getwindowservice} from "@/api/gov"
import pagination from "@/mixins/pagination"
import {getSourceList, getWindowservice} from '@/api/service'
import approval from '@/views/components/serviceAnalyzation/common/approval'
import {getDepbusiness} from '@/api/citynew'
import Businesstwoecharts from './echarts/Businesstwoecharts'
export default {
  name: "Businesstwo",
  components: {
    SubTitle,
    TimeRoad,
    callNumPercentagePie,
    WuBarRThree,
    WuLine,
    QinRightCenter,
    approval,
    Businesstwoecharts
  },
  mixins:[pagination],
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
      subTitleCom: null,
      timeType: 'day',
      timeType1:'day',
      labels: [],
      values: [],
      showone:false,
      show:false,
      barColors: ['#41FFEA', '#40DCFB','#47B5FF'],
      showIndex: 0,
      labels002:[],
      values002:[],
      dialogTitle:'',
      dialogTitleone:'',
      dialogVisible:false,
      dialogVisibleone:false,
      list:[],
      listlog:[],
      commoncod:[],
      commoncodtwo:[],
      sblsh:'',
      approvalshow:false,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10,20,30,50],
        background: true,
      },
      pageone: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10,20,30,50],
        background: true,
      },
      option: {
        index: true,
        indexLabel: "序号",
        border: false,
        align: "center",
        menuAlign: "center",
        addBtn: false,
        refreshBtn: false,
        columnBtn: false,
        menu: false,
        maxHeight: "300px",
        column:[
            {
            label:'事项名称',
            prop:'taskName'
          },
          {
            label:'受理部门',
            prop:'orgName'
          },
          {
            label:'秒批事项',
            prop:'specialType',
            formatter: (val) => {
              return val.specialType === '2' ? '是' : '否'
            }
          },
          {
            label: "受理时间",
            prop: "acceptDate",
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
          },
          {
            label: "承诺时间",
            prop: "promiseDate",
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
          },
          {
            label: "办结时间",
            prop: "resultDate",
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
          },
          {
            label: "视频播放",
            prop: "video",
            slot: true
          }
        ]
      },
      optionone: {
        index: true,
        indexLabel: "序号",
        border: false,
        align: "center",
        menuAlign: "center",
        addBtn: false,
        refreshBtn: false,
        columnBtn: false,
        menu: false,
        maxHeight: "300px",
        column:[
            {
            label:'事项名称',
            prop:'taskName'
          },
          {
            label:'受理部门',
            prop:'orgName'
          },
          {
            label:'秒批事项',
            prop:'specialType',
            formatter: (val) => {
              return val.specialType === '2' ? '是' : '否'
            }
          },
          {
            label: "受理时间",
            prop: "acceptDate",
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
          },
          {
            label: "承诺时间",
            prop: "promiseDate",
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
          },
          {
            label: "办结时间",
            prop: "resultDate",
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
          },
          {
            label: "视频播放",
            prop: "video",
            slot: true
          }
        ]
      }
    };
  },
  mounted() {
  //   this.values = [4, 6, 9, 14, 11],
  //   this.labels01 = [0,3,6,9,12],
  //   this.values01 = [520,420,500,1400,400],
   this.subTitleCom = findComponentDownward(this, "subTitle");
  
  this.getData()
  },
  methods: { 
    handlecellclick(row, column, cell, event) {
            if(column.label !== '视频播放'){
                this.approvalshow = true
                this.sblsh=row.sblsh
            }
    },  
    //窗口业务
    async getData () {
      const res = await getDepbusiness ()
      if(res.data.data) {
        this.labels = []
        this.values = []
        this.commoncodtwo= []
        this.$nextTick(() => {
          res.data.data.forEach (item => {
            this.labels002.push(item.commonName)
            this.values002.push(item.num)
            this.commoncodtwo.push(item)
          })
        })
      }
    },
    foloCode(name) {
        let result = ''
       this.commoncodtwo.forEach(item => {
          if(name == item.commonName) {
            result = item.commonCode
          }
       })
       return result
      },
     proplists(row) {
      this.dialogVisibleone =true
      let sad =  this.foloCode(row.name)
      this.getLablelog(sad)
    },
    async getLablelog(sad) {
      let postData = {
        page:this.page.currentPage,
        pageSize:this.page.pageSize,
        timeType: this.timeType1,
        queryParam:sad
      }
      const res = await getWindowservice(postData)
      let {total, data} = res.data.data
      this.page.total = total
      this.listlog = data
    },
    handlePlayerone() {
      this.showone= true
    },
    //业务量
    filterCode(name) {
        let result = ''
       this.commoncod.forEach(item => {
          if(name == item.commonName) {
            result = item.commonCode
          }
       })
       return result
      },
    handleBar(row) {
      this.dialogVisible = true
      let code = this.filterCode(row.name)
      this.getLable(code)
    },
    async getLable(code) {
      let postData = {
         page: this.page.currentPage,
         pageSize: this.page.pageSize,
         timeType: this.timeType,
         queryParam:code,
      }
      const res = await getSourceList(postData)
      let {total, data} = res.data.data
      this.page.total = total
      this.list = data
    },
    handlePlayer() {
     this.show = true
    },
      onSelectTime({type}){
         this.timeType = type
      },
      onSelectTime1({type}){
        this.timeType1 = type
        this.getData()
      },
     handleToggle({ index }) {
      this.showIndex = index;
      if (index == 1) {
        this.$nextTick(() => {
          // this.$refs.qincenter.initChart();
        })
      // this.getCurrentEchartsData();
     }
  },
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
}
.title-time{
    position: relative;
    .time-road{
        position: absolute;
        right: 0;
        top: 0;
        margin-top:0;
    }
    .bar-wrap{
      height: 140px;
      margin-top: 10px;
    }
}
.btn-video{
  margin-left: auto;
  padding: 2px 3px;
}
</style>


