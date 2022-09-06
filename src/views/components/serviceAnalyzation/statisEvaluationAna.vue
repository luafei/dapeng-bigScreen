<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title :title="`总体业务量（${sum}）件`">
        </sub-title>
        <time-road  class="time-road" :hour="false" week year :time-type="timeType" @onSelectTime="onSelectTime" ></time-road>
    </div>
    <QinVehicleThree :labels="lables02" :values="values02" :timeType="timeType" @onClick="handleBar"></QinVehicleThree>
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
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward} from "@/utils/util";
import QinVehicleThree from "@/components/echarts/QinVehicleThree";
import TimeRoad from '@/components/common/TimeRoad'
import { getoverall, getBusinessList } from '@/api/service'
import pagination from "@/mixins/pagination";
import VideoDialog from './common/VideoDialog.vue'
import approval from '@/views/components/serviceAnalyzation/common/approval'
export default {
  name: "statisEvaluationAna",
  components: {
    SubTitle,
    QinVehicleThree,
    TimeRoad,
    VideoDialog,
    approval,
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
  mixins: [pagination],
  data() {
    return {
      echart: null,
      subTitleCom: null,
      timeType: 'month',
      lables02:[],
      values02:[],
      dialogVisible: false,
      dialogTitle: '',
      show: false,
      loading: false,
      sblsh:'',
      approvalshow:false,
      list: [],
      sum: 0,
      currentTime: '',
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
      }
    };
  },
  mounted() {
    this.subTitleCom = findComponentDownward(this, "subTitle");
    this.getData();
  },
  methods: {
    // appclose() {
    //   this.approvalshow=false
      
    // },
    handlecellclick(row, column, cell, event) {
      if(column.label !== '视频播放'){
        this.approvalshow = true
        this.sblsh=row.sblsh
      }
    },
    async getData(){
      let postData = {
        timeType: this.timeType
      }
      const res = await getoverall(postData);
      let allList = res.data.data
      if(allList) {
        let labList = []
        let valsList = []
        let { x, y, total } = allList
        labList = x
        valsList = y
        this.sum = total
        // y.reduce((cal, item) => {
        //   return cal+=item
        // },0)
        this.$nextTick(() => {
          this.lables02 = labList;
          this.values02 = valsList;
        })
      }
    },
    onSelectTime({type}){
        this.timeType = type
        this.getData();
    },
    handleBar(row){
      let { name } = row
      this.dialogVisible = true
      this.loading =true;
      this.dialogTitle = name
      this.currentTime = name
      this.getList()
    },
    async getList(){
      let postData = {
        page: this.page.currentPage, 
        pageSize: this.page.pageSize,
        timeType: this.timeType,
        date: this.currentTime
      }
      const res = await getBusinessList(postData)
      let { total, data } = res.data.data;
      this.loading =false;
      this.page.total = total;
      this.list = data
      console.log( res.data.data ,'list')
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
.car-info-dialog .el-dialog{
  margin-left: auto;
}
.btn-video{
  width: auto;
  padding: 5px 4px;
}
</style>
<style lang="scss">
.total-business-dialog{
  .el-dialog__body{
    padding: 0 20px!important;
  }
  .avue-crud__menu{
    display: none;
  }
  .el-table{
    margin-top: 25px;
  }
}
</style>

