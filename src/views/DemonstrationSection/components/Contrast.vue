<template>
    <div class="Contrast">
    <!-- 工地电子联表分析 -->
    <sub-title title="工地电子联单分析"></sub-title>
    <Source :labels="labels" :values="values" :values2='values2' />
    </div>
</template>
<script>
import SubTitle from '@/components/common/SubTitle'
import Source from "../echarts/source.vue"
import {getQueryNTCSiteEbillInfo} from '../../../api/example.js'
export default {
 components: {
    SubTitle,
    Source
  },
   data() {
    return {
       labels: [],
       values: [],
       values2: [],
    }
  },
  mounted(){
    this.getList()
  },
  methods: {
    async getList(){
      const res = await getQueryNTCSiteEbillInfo()
      // console.log(res,'工地电子联单发现数据');
      if(res.data.data){
         this.labels= [];
         this.values=[];
         this.$nextTick(()=>{
          res.data.data.forEach((item) => {
            this.labels.push(item.siteName);
            this.values.push(item.ebillNum);
            this.values2.push(item.noApply)
          });
         })
      }
    }
  },
}
</script>
<style lang="scss" scoped>
    .Contrast{
      width: 100%;
      padding-top: 30px;
    }
</style>