<template>
  <div class="target">
    <!-- 指标 -->
    <sub-title title="车辆总体指标"></sub-title>
    <div class="target-box">
      <div class="t-item">
        <div class="imge"><img src="../../../assets/images/example/cheling.png" alt="" /></div>
        <div class="txt">
          <div class="txt-h">{{vehicleObj.todayVehicle}}<span>辆</span></div>
          今日车辆
        </div>
      </div>
      <div class="t-item">
        <div class="imge"><img src="../../../assets/images/example/weibeian.png" alt="" /></div>
        <div  class="txt">
          <div class="txt-h">{{vehicleObj.unCheck}}<span>辆</span></div>
          未备案 车辆
        </div>
      </div>
      <div class="t-item">
        <div class="imge"><img src="../../../assets/images/example/beian.png" alt="" /></div>
        <div  class="txt">
          <div class="txt-h">{{vehicleObj.checkPre}}%</div>
          备案率
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SubTitle from '@/components/common/SubTitle'
import { getQueryNTCVehicleTotalIndex } from '../../../api/example.js'
export default {
  name: 'target',
  components: {
    SubTitle
  },
  data() {
    return {
      vehicleObj: {}
    }
  },
  created() {
    this.getNTCVehicleTotalList();
  },
  methods: {
    async getNTCVehicleTotalList() {
      let res = await getQueryNTCVehicleTotalIndex();
      this.vehicleObj = res.data.data;
    }
  }
}
</script>
<style lang="scss" scoped>
.target {
  width: 100%;
  .target-box {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 18px;
    color: #fff;
    .t-item{
        display: flex;
        align-items: center;
        width: 33.33%;
        margin-right: 5px;
      .imge{
          width: 35px;
          height: 35px;
          border: 1px solid #7cf9f5;
          border-radius: 50%;
          margin-right: 5px;
          img{
            width: 100%;
            height: 100%;
          }
      }
      .txt{
          flex: 1;
          font-size: 10px;
          .txt-h{
              font-weight: 700;
              font-size: 20px;
              span{
                  font-size: 10px;
              }
          }
      }
    }
  }
}
</style>
