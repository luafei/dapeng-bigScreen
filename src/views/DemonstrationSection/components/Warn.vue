<template>
  <div class="Warn">
    <!-- 预警车辆列表 -->
    <sub-title title="预警车辆列表"></sub-title>
    <div class="searchbox">
      <el-input
        class="input"
        size="mini"
        v-model="vehicleNo"
        placeholder="请输入车牌号"
        clearable
      ></el-input>
      <el-button
        type="primary"
        class="btn"
        size="default"
        :disabled="falg"
        @click="btnClick"
        >查询</el-button
      >
    </div>
    <EarlyDialog :carInfo="carInfo" :show.sync="showDialog" :Dialongright="'0'" />
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="vehicleNo" label="车牌号码" width="150">
        </el-table-column>
        <el-table-column prop="companyName" label="运输公司" width="180">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import SubTitle from '@/components/common/SubTitle'
import EarlyDialog from '../popup/earlyDialog'
import { getQueryNTCAlarmList,getQueryNTCAlarmHistory } from '../../../api/example.js'
export default {
  components: {
    SubTitle,
    EarlyDialog
  },
  data () {
    return {
      showDialog: false,
      falg: true,
      vehicleNo: '',// 车牌号
      tableData: [],
      carInfo:[]
    }
  },
  watch: {
    vehicleNo (newVal) {
      if (newVal !== '') {
        this.falg = false
      } else {
        this.falg = true
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
   async btnClick () {
      this.showDialog = true
      let postData={
        vehicleNo:this.vehicleNo
      }
      const res= await getQueryNTCAlarmHistory (postData)
      this.carInfo=res.data.data
      console.log(this.carInfo);
    },
    async getList () {
      const res = await getQueryNTCAlarmList()
      // console.log(res, '预警车辆列表shuju')
      this.tableData = res.data.data
    }
  }
}
</script>
<style lang="scss" scoped>
.Warn {
  padding-top: 30px;
  .table {
    margin-top: 5px;
  }
}
</style>
<style lang="scss">
.Warn {
  position: relative;
  .searchbox {
    position: absolute;
    top: 25px;
    right: 10px;
    color: #fff;
    display: flex;
    align-items: center;
    .el-input--mini .el-input__inner {
      width: 150px;
      height: 25px;
    }
    .btn {
      width: 80px;
      height: 25px;
      line-height: 5px;
      // line-height: 2px;
      // text-align: center;
    }
  }
  .el-table,
  .el-table__expanded-cell {
    background-color: transparent;
  }
  .el-table tr,
  .el-table th {
    background-color: transparent !important;
    color: #7ef5e4;
  }
  .el-table tbody tr:hover > td {
    background-color: transparent !important;
  }
  .el-table–enable-row-transition .el-table__body td,
  .el-table .cell {
    background-color: transparent;
    height: 15px;
    line-height: 15px;
    font-size: 12px;
  }
  .el-table td,
  .el-table th.is-leaf,
  .el-table--border,
  .el-table--group {
    border-color: #3e797c;
  }
  .el-table td:nth-child(odd),
  .el-table th:nth-child(odd) {
    border-right: 1px solid #3e797c;
  }
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    background-color: #3e797c;
  }
}
</style>
