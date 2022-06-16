<template>
  <div class="entrance">
    <div class="title-time">
        <sub-title 
         title="个人生命周期"
         subTitle="企业全生命周期分析"
         @onToggle="handleToggle"
         >
        </sub-title>
        <div class="bar-wrap">
          <div>
            <time-road  
              class="time-road"
              :hour="false"
              week year 
              :time-type="timeType" 
              v-show="showIndex === 1" 
              @onSelectTime="onSelectTime" >
            </time-road>
            <QinTop
            ref="qintoptow"  
            v-show="showIndex === 1" 
            :values="values001"  
            :labels="lables001"
            @onClick="Abblist">
            </QinTop>
         </div>
         <div>
          <time-road  
          class="time-road"
           :hour="false"
            week year 
            :time-type="timeType2" 
            v-show="showIndex === 0" 
            @onSelectTime="onSelectTime2" ></time-road>
         <Personallife
          v-show="showIndex === 0" 
          :values="values002"  
          :labels="lables002"
          @onClick="handleBar">
         </Personallife>
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
    </div>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward, } from "@/utils/util";
// import EvaluationAnalyzeLine from "@/components/echarts/EvaluationAnalyzeLine";
import QinTop from '@/components/echarts/QinTop'
import QinTopTwo from '@/components/echarts/QinTopTwo'
import TimeRoad from '@/components/common/TimeRoad'
import { getculture, getpersonage } from '@/api/gov'
import {getPersonal} from '@/api/service'
import pagination from "@/mixins/pagination"
import VideoDialog from './common/VideoDialog.vue'
import approval from '@/views/components/serviceAnalyzation/common/approval'
import Personallife from './echarts/personallife'
export default {
  name: "statisEvaluationAnaTwo",
  components: {
    SubTitle,
    // EvaluationAnalyzeLine,
    TimeRoad,
    QinTop,
    QinTopTwo,
    VideoDialog,
    approval,
    Personallife
  },
  mixins:[pagination],
  props: {
      subTitleAlign: {
      type: String,
      default: 'left'
    },
    carType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      echart: null,
      timeType: 'year',
      timeType2:'year',
      values001:[],
      lables001:[],
      values002:[],
      lables002:[],
      list:[],
      show:false,
      currenList:'',
      showIndex:0,
      dialogVisible: false,
      dialogTitle: '',
      list:[],
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
        show: false,
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
    // this.values001 = [8,6,5],
    // this.lables001 = ['企业注册数','企业变数量','企业注册数'];
    // this.values002 = [8,6,5,4,2],
    // this.lables002 = ['在职人才引进','二孩生育登记','开具死亡证明','人才安居租房补贴','申领机动车登记证书']
    // this.getCurrentEchartsData();
    this.getList()
    this.getData()
  //  this.subTitleCom = findComponentDownward(this, "subTitle");
  },
  methods: {
    handlecellclick(row, column, cell, event) {
            if(column.label !== '视频播放'){
                this.approvalshow = true
                this.sblsh=row.sblsh
            }
        }, 
    async getList() {
      let postData ={
        timeType:this.timeType
      }
      const res = await  getculture(postData)
      console.log(res,'res')
      // if(res) {
        this.values001 = []
        this.lables001 = []
        this.$nextTick(() => {
          res.data.data.forEach(item => {
            this.lables001.push(item.commonName)
            this.values001.push(item.num)
          })
        })
      // }
    },
    Abblist(){
     console.log(1111)
    },
    async getData() {
      let postData ={
        timeType:this.timeType2
      }
      const res = await  getpersonage(postData)
      console.log(res,'this..')
      if(res) {
        this.values002 = []
        this.lables002 = []
        this.$nextTick(() => {
          res.data.data.forEach(item => {
            this.lables002.push(item)
            console.log(this.lables002,'002')
            this.values002.push(item.num)
          })
        })
      }
    },
    handleBar(row){
      console.log(111)
      this.dialogVisible =true
      this.currenList = row
      this.getLable()
    },
    async getLable() {
      let postData = {
        page: this.page.currentPage,
        pageSize: this.page.pageSize,
        timeType: this.timeType2,
        queryParam:this.currenList
      }
      const res = await getPersonal(postData)
      console.log(res,'resss')
      let {total, data} = res.data.data
      this.page.total = total;
      this.list= data
      console.log(this.list,'list')
    },
    onSelectTime({type}){
      this.timeType = type
      this.getList()
    },
    onSelectTime2({type}) {
      this.timeType2 = type
      this.getData()
    },
    handleToggle({ index }) {
      this.showIndex = index;
      if (index == 1) {
        this.$nextTick(() => {
          this.$refs.qintoptow.initChart();
        })
      } 
      // this.getCurrentEchartsData();
    },
    // onComeInOut({ index }) {
    //   this.direction = index;
    //   this.getCurrentEchartsData();
    // }
    handlePlayer(){
      this.show =true
    }
  },
};
</script>

<style lang="scss" scoped>
.entrance {
  color: red;
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
  padding: 2px 3px;
}
</style>


