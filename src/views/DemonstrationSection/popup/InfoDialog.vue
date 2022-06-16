<template>
  <div class="car-info">
    <el-dialog
      title="提示"
      :style="{ pointerEvents: isUsePenetrator ? 'none' : 'auto' }"
      class="car-info-dialog"
      :class="[{ dialogrightcolor: Dialongright == '1' }]"
      :visible.sync="visibleDailog"
      :close-on-click-modal="false"
      :top="'30vh'"
      :modal="modal"
      :lock-scroll="lockScroll"
      :append-to-body="appendToBody"
      @closed="closed"
      :width="width"
    >
      <!-- <p v-for="item in carInfo" :key="item.id" @click="item.onClick ? item.onClick(item) : clickItem(item)" class="info-item" :style="item.style">
                <i class="left-icon" v-if="item.icon" :class="item.icon"></i>
                <span v-if="!item.hide">{{item.label}}{{item.value}}</span>
            </p> -->
      <i class="el-icon-close close-btn" @click="handleClose"></i>
      <!-- <slot></slot> -->
      <div class="table">
        <el-table :data="carInfo" height="500px" style="width: 100%">
         <el-table-column prop="companyName" label="企业名称" width="180">
          </el-table-column>
          <el-table-column prop="vehicleNo" label="车牌号" width="150">
          </el-table-column>
          <el-table-column prop="driverName" label="司机" width="150">
          </el-table-column>
         <el-table-column prop="tel" label="手机号" width="150">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CarInfoDialog',
  components: {},
  // [{Dialongright:activeindex == '1'},
  props: {
    show: {
      type: Boolean,
      default: false
    },
    Dialongright: {
      type: String,
      default: '1'
    },
    className: {
      type: String,
      default: '1'
    },
    carInfo: {
      type: Array,
      default: () => []
    },
    width: {
      type: String,
      default: '655px'
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    modal: {
      type: Boolean,
      default: false
    },
    lockScroll: {
      type: Boolean,
      default: false
    },
    isUsePenetrator: {
      //穿透
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visibleDailog: this.show,
      info: {},
      // Dialongright: {
      //     Dialongright : '1',
      //     Dialongright : 'dialogrightcolor'
      // },
        tableData: [
        // {
        //   companyName: '粤B37890D',
        //   vehicleNo: '深圳市亚迪建设实业有限公司',
        //   driverName:"罗方群",
        //   tel:"15243516529"
        // },
        //  {
        //   companyName: '粤B37890D',
        //   vehicleNo: '深圳市亚迪建设实业有限公司',
        //   driverName:"罗方群",
        //   tel:"15243516529"
        // },
        //  {
        //   companyName: '粤B37890D',
        //   vehicleNo: '深圳市亚迪建设实业有限公司',
        //   driverName:"罗方群",
        //   tel:"15243516529"
        // }  
      ]
    }
  },
  computed: {},
  created () {},
  watch: {
    show (newVal) {
      this.visibleDailog = newVal
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:show', false)
    },
    clickItem (item) {
      this.$emit('onClick', item)
    },
    closed () {
      this.handleClose()
    }
  }
}
</script>
<style lang="scss">
.car-info-dialog {
  .el-dialog {
    margin-left: 430px;
    background: transparent;
  }
  .el-dialog__header {
    display: none;
    font-size: 0;
    background: rgba(15, 75, 99, 1);
    padding-bottom: 20px;
    .el-dialog__title {
      color: #fff;
    }
  }
  .el-dialog__body {
    padding: 18px 10px 10px 10px;
    background: rgba(15, 75, 99, 0.7);
    border: 1px solid #0ab8eb;
    overflow: hidden;
  .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 16px;
      color: #fff;
      pointer-events: auto;
      cursor: pointer;
    }
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .info-item {
    padding: 5px 10px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    pointer-events: auto;
  }
  .left-icon {
    margin-right: 3px;
  }
  .el-table,
  .el-table__expanded-cell {
    background-color: transparent;
  }
  .el-table tr,
  .el-table th {
    background-color: transparent !important;
    color: #fff;
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
    text-align: center;
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
.dialogrightcolor {
  position: absolute;
  left: 40px;
  top: 340px;
}
</style>