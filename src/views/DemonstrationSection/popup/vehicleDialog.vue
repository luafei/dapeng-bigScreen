<template>
  <!-- 点击泥头车弹出的车辆详情 -->
      <div class="block">
        <el-timeline>
          <el-timeline-item color="#7cfaf6" timestamp="1.联单信息：" placement="top">
            <div class="txt">
              <p>工地名称： {{vehicleData.siteName}}</p>
              <p>车牌号：{{vehicleData.vehicleNo}} 驾驶员：{{vehicleData.driverName}} 所属企业：{{vehicleData.companyName}}</p>
              <p>联单编号： {{vehicleData.ebillNo}}</p>
            </div>
          </el-timeline-item>
          <el-timeline-item color="#7cfaf6"  timestamp="2.车辆状态：" placement="top">
            <div class="txt">
             {{vehicleData.isApply}}
            </div>
          </el-timeline-item>
          <el-timeline-item color="#7cfaf6"  timestamp="3.出场时间：" placement="top">
            <div class="txt">
              {{vehicleData.exitSiteTime}}
            </div>
          </el-timeline-item>
          <el-timeline-item color="#7cfaf6"  timestamp="4.联单状态：" placement="top">
            <div class="txt">
            {{vehicleData.listStatus}}
            </div>
          </el-timeline-item>
          <el-timeline-item color="#7cfaf6"  timestamp="5.签单状态：" placement="top">
            <div class="txt">
               {{vehicleData.signStatus}}
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
</template>
<script>
export default {
  name: 'CarInfoDialog',
  components: {},
  // [{Dialongright:activeindex == '1'},
  props: {
    // show: {
    //   type: Boolean,
    //   default: false
    // },
    // Dialongright: {
    //   type: String,
    //   default: '1'
    // },
     vehicleData: {
        type: Object,
        default: () => {}
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
      tableData: []
    }
  },
  computed: {},
//   created () {},
//   watch: {
//     show (newVal) {
//       this.visibleDailog = newVal
//     }
//   },
//   methods: {
//     handleClose () {
//       this.$emit('update:show', false)
//     },
//     clickItem (item) {
//       this.$emit('onClick', item)
//     },
//     closed () {
//       this.handleClose()
//     }
//   }
}
</script>
<style lang="scss">
.block{
    padding: 20px 30px;
    .txt{
        color: #fff;
        padding-right: 50px;
    }
}
</style>
