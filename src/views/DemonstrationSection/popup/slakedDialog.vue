<template>
  <el-dialog
    title="提示"
    :style="{ pointerEvents: isUsePenetrator ? 'none' : 'auto' }"
    class="car-slaked-dialog"
    :class="[{ dialogrightcolor: Dialongright == '1' }]"
    :visible.sync="visibleDailog"
    :close-on-click-modal="false"
    :top="'10vh'"
    :modal="modal"
    :lock-scroll="lockScroll"
    :append-to-body="appendToBody"
    @open="openClick"
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
      <ul>
        <li><span>名称: </span> {{ tableData.name }}</li>
        <li><span>地址：</span> {{ tableData.address }}</li>
        <li><span>经营单位：</span> {{ tableData.companyName }}</li>
        <li><span>备案量：</span> {{ tableData.totalCapacity }}（万方）</li>
        <li>
          <span>剩余备案量：</span> {{ tableData.residualCapacity }} (万方)
        </li>
        <li><span>备案车辆数量：</span> {{ tableData.vehicleNum }}</li>
      </ul>
    </div>
  </el-dialog>
</template>

<script>
import { getQueryNTCDisposeMapDetail } from '../../../api/example.js'
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
      default: '350px'
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
      tableData: {}
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
    async openClick () {
      const res = await getQueryNTCDisposeMapDetail()
      this.tableData = res.data.data[0]
    },
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
.car-slaked-dialog {
    margin-left: 500px;
  .el-dialog {
    margin-left: 200px;
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
}
.dialogrightcolor {
  position: absolute;
  left: 40px;
  top: 340px;
}
.table {
  color: #fff;
  ul {
    li {
      color: #fff;
      span {
        font-weight: 700;
      }
    }
  }
}
</style>
