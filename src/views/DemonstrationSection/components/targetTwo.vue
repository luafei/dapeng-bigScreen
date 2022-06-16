<template>
  <div class="target">
    <!-- 指标 -->
    <sub-title title="消纳场总体指标"></sub-title>
    <div class="target-box">
      <div class="t-item">
        <div class="imge"><img src="../../../assets/images/example/xiaona.png" alt="" /></div>
        <div class="txt">
          <div class="txt-h">{{getInfo.digestionRecords}}</div>
          备案消纳量(万方)
        </div>
      </div>
      <div class="t-item">
        <div class="imge"><img src="../../../assets/images/example/beishanbao.png" alt="" /></div>
        <div  class="txt">
          <div class="txt-h">{{getInfo.digestionResource}}</div>
           消纳物来源
        </div>
      </div>
      <div class="t-item">
        <div class="imge"><img src="../../../assets/images/example/jianceixiaona.png" alt="" /></div>
        <div  class="txt">
          <div class="txt-h">{{getInfo.surplusDischarge}}</div>
          剩余排放量(方)
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SubTitle from '@/components/common/SubTitle'
import {getQueryNTCTotalIndex} from '../../../api/example.js'
export default {
  name: 'target',
  components: {
    SubTitle
  },
   data() {
    return {
      getInfo:{}
    }
  },
  mounted() {
    this.getData()
  },
   methods: {
   async getData(){
     const res = await getQueryNTCTotalIndex()
     this.getInfo=res.data.data
    }
  },
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
          font-size: 12px;
          // transform: scale(0.8); //缩放0.8倍
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
