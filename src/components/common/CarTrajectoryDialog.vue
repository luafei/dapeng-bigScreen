<template>
    <el-dialog
      :visible.sync="show"
      width="40%"
      :title="dialogTitle"
      :before-close="onClose"
      :append-to-body="true"
      class="query-dialog">
      <el-table
        :data="tableData"
        v-loading="loading"
        element-loading-text="加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%">
        <el-table-column
          prop="key"
          label="分析内容"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.key | filterKey}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="value"
          label="分析结果"
          align="center"
          >
        </el-table-column>
      </el-table>
    </el-dialog>
</template>
<script>
export default {
    name:'CarTrajectoryDialog',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      info: {
        type: Object,
        default: () => {}
      },
      dialogTitle:{
        type:String,
        default:'标题'
      }
    },
    data() {
      return {
        dialogShow: this.show,
        tableData: [],
        loading: false
      }
    },
    watch:{
      show(newVal){
        if(newVal) {
          this.loading = true
          this.tableData = []
        }
      },
      info(newVal){
        this.loading = false
        if(JSON.stringify(newVal) !== '{}'){
          let { source, putIn, pullOut, driveRoad, illegalPark, offset, speeding} = newVal
          this.tableData = [{
            key: 'source',
            value: source || '无'
          },{
            key: 'putIn',
            value: putIn || '无'
          },{
            key: 'pullOut',
            value: pullOut || '无'
          },{
            key: 'driveRoad',
            value: driveRoad || '无'
          },{
            key: 'alarmInfo',
            value: (illegalPark || offset || speeding) ?  `违章停车:${illegalPark || 0}，超速驾驶:${speeding || 0}，偏离路线:${offset || 0}` : '无'
          }]
          // for(let key in newVal){
          //   this.tableData.push({
          //     key,
          //     value: newVal[key]
          //   })
          // }
        }
      }
    },
    methods: {
      onClose(){
        this.$emit('update')
      }
    },
    filters: {
      filterKey(val){
        const keyMap = {
          source: '来源地',
          putIn: '驶入口',
          pullOut: '驶出口',
          driveRoad: '主要行驶路段',
          alarmInfo: '预警信息'
          // illegalPark: '违章停车',
          // offset: '偏离路线',
          // speeding: '超速驾驶',
        }
        return keyMap[val]
      }
    }
  };
</script>

<style lang="scss" scoped>
  .trajectory-warp{
  font-size: 12px;
  position: absolute;
  left: 100px;
  top: 50px;
  color: #fff;
  pointer-events:auto;
} 
</style>
<style lang="scss">
 .query-dialog{
    .el-dialog{
      background:rgba(13,69,92,0.7);
      color: #fff;
      border:1px solid rgba(10,184,235,1);
    }
    .el-dialog__header{
      font-size: 0;
      background: rgba(15,75,99,0.7);
      padding-bottom:20px;
      .el-dialog__title{
        color:#fff;
      }
    }
    .el-table{
      background:transparent;
      border:1px solid rgba(10,184,235,1);
      th,tr{
        background: transparent;
      }
      &::before{
        height: 0;
      }
    }
    .el-dialog__body {
      padding-top: 20px;
      background:transparent;
    }
     .el-table--enable-row-hover .el-table__body tr:hover>td{
      background-color: rgba(15,75,99,0.7);
    }
    thead{
      background: rgba(17,78,106,0.7);
      th{
        border-bottom-width:0;
      }
    }
    .el-table td, .el-table th {
      text-align: center;
      border-bottom-width:0;
      color: #fff;
    }
    .el-dialog__headerbtn .el-dialog__close {
        color:#fff;
    }
    .el-table th {
      text-align: center;
      color: #fff;
      font-size:18px;
    }
    .el-table__empty-text{
      color:#fff;
    }
 }
</style>
