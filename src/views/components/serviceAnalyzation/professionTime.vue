<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title title="部门业务量">
        </sub-title>
        <!-- barColors -->
        <time-road  class="time-road" :hour="false"  week  year :time-type="timeType" @onSelectTime="onSelectTime" ></time-road>
        <newbusiness
          :labels="labels" 
          :values="values" 
          :yFormatter="yFormatter" 
          :barColors="barColors" 
          :timeType="timeType" 
          @onClick="handleBar">
          </newbusiness>>
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
        <approval 
          :sblsh="sblsh"
          :visiblelis.sync="approvalshow"
        ></approval>
    </div>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward, } from "@/utils/util";
import TimeRoad from '@/components/common/TimeRoad'
import callNumPercentagePie from '@/components/echarts/callNumPercentagePie'
import WuBarRThree from "@/components/echarts/WuBarRThree";
import {getsection} from "@/api/gov"
import {getDepartment} from '@/api/service'
import newbusiness from '@/views/components/serviceAnalyzation/echarts/newbusiness'
import pagination from '@/mixins/pagination'
import VideoDialog from './common/VideoDialog.vue'
import approval from '@/views/components/serviceAnalyzation/common/approval'
export default {
  name: "professionTime",
  components: {
    SubTitle,
    TimeRoad,
    callNumPercentagePie,
    WuBarRThree,
    newbusiness,
    VideoDialog,
    approval
    
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
  mixins:[pagination],
  data() {
    return {
      echart: null,
      subTitleCom: null,
      timeType: 'year',
      labels: [],
      values: [],
      commoncod: [],
      barColors: ['rgba(187,160,44,.8)', 'rgba(187,224,59,.8)'],
      dialogVisible: false,
      show: false,
      loading: false,
      dialogTitle: '',
      list:[],
      currentTime: '',
      approvalshow:false,
      sblsh:'',
      page: {
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
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
          },
          {
            label: "承诺时间",
            prop: "promiseDate",
            type: "date",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
          },
          {
            label: "办结时间",
            prop: "resultDate",
            type: "date",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
          },
          // {
          //   label: "视频播放",
          //   prop: "video",
          //   slot: true
          // }
        ]
      }
    };
  },
  mounted() {
    this.getList()
    this.subTitleCom = findComponentDownward(this, "subTitle");
  },
  methods: {
      handlecellclick(row, column, cell, event) {
            if(column.label !== '视频播放'){
                this.approvalshow = true
                this.sblsh=row.sblsh
            }
        },   
      async getList() {
      let postData = {
        timeType: this.timeType
      }
      const res = await getsection (postData)
      console.log(res,'resddd')
       if(res) {
          this.values = []
          this.labels = []
          this.commoncod = []
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
       console.log(row,'roo')
       this.dialogVisible = true
       this.loading = true
      let code = this.filterCode(row.name)
       this.getData(code)
      },
      async getData(code) {
        let postData= {
          page: this.page.currentPage,
          pageSize: this.page.pageSize,
          timeType: this.timeType,
          queryParam:code
        }
        const res = await getDepartment(postData)
        let {total, data} = res.data.data
        this.loading = false
        this.page.total = total
        this.list= data
      },
      yFormatter(val){
        return val
      },
      onSelectTime({type}){
         this.timeType = type
         this.getList()
      },
      handlePlayer(){
        this.show = true
    }
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
.btn-video{
  margin-left: auto;
  padding: 2px 4px;
}
</style>


