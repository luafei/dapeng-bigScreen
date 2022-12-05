<template>
  <div class="entrance">
    <sub-title title="沙滩统计" ></sub-title>
    <sandbeach-Pie :labels="labels" :values="values" :typeName="typeName" @clickPie="handleBar"></sandbeach-Pie>
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
        @size-change="sizeChange"
        @current-change="currentChange" 
        class="tab-dialog dp-avue-pagination">
          <!-- <template slot="video" slot-scope="scope">
            <el-button class="dp-btn-plain btn-video" @click="handlePlayer">播放视频</el-button>
          </template> -->
        </avue-crud>
    </el-dialog>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward, getBeachRolesName } from "@/utils/util";
import sandbeachPie from "@/components/echarts/sandbeachPie"
import pagination from "@/mixins/pagination";
import { getBeachStatistics,getBeachdialog } from '@/api/beach'

export default {
  name: "sandBeachStatistics",
  components: {
    SubTitle,
    sandbeachPie
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
      labels: [],
      values: [],
      typeName:[],
      dialogTitle:'',
      dialogVisible:false,
      list:[],
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
            label:'沙滩名称',
            prop:'beachName'
          },
          {
            label:'沙滩位置',
            prop:'manager'
          },
          {
            label:'类别',
            prop:'type'
          }
        ]
      },
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10,20,30,50],
        background: true,
      },
      manager:''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData(){
      var data = getBeachRolesName();
      const res = await getBeachStatistics(data);
      
      if(res.data.data){
        this.labels = []
        this.values = []
        this.typename= []
        res.data.data.forEach(item => {
          this.labels.push(`${item.type}`)
          this.values.push(item.num)
          this.typeName.push(item.typeName)
        })
      }
    },
    handleBar(row) {
      let { name } = row
      let newname = name.slice(0,2)
      this.dialogVisible=true
      this.dialogTitle = newname
      this.currentTime = name
      this.getList()
     },
    async getList() {
      var stmp = this.currentTime
      let postData = {
        type:stmp.slice(0,2),
        page:this.page.currentPage,
      }
      const res = await getBeachdialog(postData)
      let{total , data} = res.data.data
      this.page.total = total
      this.list = data
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
