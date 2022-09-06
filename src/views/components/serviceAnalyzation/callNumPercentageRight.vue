<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title 
        title="业务来源业务量"
        subTitle="窗口业务量"
        @onToggle= "handleToggle"
        >
        </sub-title>
        <!-- barColors -->
        <div class="bar-wrap">
          <div>
            <time-road  
            v-if="showIndex === 0"
            class="time-road"
            :hour="false"
            week
              year
              :time-type="timeType" 
              @onSelectTime="onSelectTime" ></time-road>
            <Wu-bar-r-three  
            :timeType="timeType"
            v-show="showIndex === 0"  
            :labels="labels" 
            :values="values" 
            :barColors="barColors"
            @onClick='handleBar'>
            </Wu-bar-r-three>
             <el-dialog
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
                :table-loading="loading"
                @cell-click="handlecellclick"
                @size-change="sizeChange"
                @current-change="currentChange" 
                class="tab-dialog dp-avue-pagination">
                 <template slot="video" slot-scope="scope">
                  <el-button class="dp-btn-plain btn-video" @click="handlePlayer">播放视频</el-button>
                 </template>
                </avue-crud>
              </el-dialog>
              <VideoDialog :show.sync="show"></VideoDialog>
          </div>
          <div>
            <time-road  
            v-if="showIndex === 1"
            class="time-road" 
            :hour="false"  
            week  year 
            :time-type="timeType1" 
            @onSelectTime="onSelectTime1" ></time-road>
            <QinRightCenter  
            :timeType="timeType1"
            v-if="showIndex === 1"  
            :labels="labels01" 
            :values="values01"
            @onClick='proplists'></QinRightCenter>
             <el-dialog
              :title="dialogTitleone"
              :visible.sync="dialogVisibleone"
              width="60%"
              append-to-body
              :close-on-click-modal="false"
              class="tab-dialog  total-business-dialog">
              <avue-crud 
                :data="listlog" 
                :option="optionone"
                :page.sync="pageone"
                @cell-click="handlecellclick"
                @size-change="sizeChange"
                @current-change="currentChange" 
                class="tab-dialog dp-avue-pagination">
                <template slot="video" slot-scope="scope">
                  <el-button class="dp-btn-plain btn-video" @click="handlePlayerone">播放视频</el-button>
                 </template>
                 </avue-crud>
            </el-dialog>
            <VideoDialog  :show.sync="showone"></VideoDialog>
            
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
import VideoDialog from './common/VideoDialog.vue'
import approval from '@/views/components/serviceAnalyzation/common/approval'
export default {
  name: "callNumPercentageRight",
  components: {
    SubTitle,
    TimeRoad,
    callNumPercentagePie,
    WuBarRThree,
    WuLine,
    QinRightCenter,
    VideoDialog,
    approval
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
      timeType: 'year',
      timeType1:'year',
      labels: [],
      values: [],
      showone:false,
      show:false,
      loading: false,
      barColors: ['#41FFEA', '#40DCFB','#47B5FF'],
      showIndex: 0,
      labels01:[],
      values01:[],
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
          // {
          //   label: "视频播放",
          //   prop: "video",
          //   slot: true
          // }
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
  this.getList()
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
      let postData = {
        timeType : this.timeType1
      }
      const res = await getwindowservice (postData)
      if(res.data.data) {
        this.labels01 = []
        this.values01 = []
        this.commoncodtwo= []
        this.$nextTick(() => {
          res.data.data.forEach (item => {
            this.labels01.push(item.commonName)
            this.values01.push(item.num)
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
      console.log(1111)
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
      console.log(res,'res88888')
      let {total, data} = res.data.data
      this.page.total = total
      this.listlog = data
      console.log(this.listlog,'sss')
    },
    handlePlayerone() {
      this.showone= true
    },
    //业务量
    async getList() {
      let postData = {
        timeType : this.timeType
      }
      const res = await getsource (postData)
      if(res.data.data.length > 0){
        this.values = []
        this.labels = []
        this.commoncod= []
        this.$nextTick(() => {
          res.data.data.forEach(item => {
            this.labels.push(item.commonName)
            this.values.push(item.num)
             this.commoncod.push(item)
          })
        })
      }
    },
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
      this.loading = true;
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
      this.loading = false
      this.page.total = total
      this.list = data
    },
    handlePlayer() {
     this.show = true
    },
      onSelectTime({type}){
         this.timeType = type
         this.getList()
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


