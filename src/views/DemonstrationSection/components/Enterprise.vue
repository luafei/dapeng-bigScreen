<template>
    <div class="Enterprise">
        <!-- 备案车辆企业 -->
    <sub-title title="备案车辆企业"></sub-title>
    <Record :labels="labels" :values="values" @onClick="clickBar" />
    </div>
</template>
<script>
import SubTitle from '@/components/common/SubTitle'
import Record from "../echarts/record"
import {getQueryNTCRecordsCompanyList} from '../../../api/example.js'
export default {
 components: {
    SubTitle,
    Record
  },
  data() {
    return {
       labels: [],
       values: [],
    }
  },
  mounted(){
    this.getList()
  },
  methods: {
    async getList(){
      const res = await getQueryNTCRecordsCompanyList()
      // console.log(res,'备案车辆数据');
      if(res.data.data){
         this.labels= [];
         this.values=[];
         this.$nextTick(()=>{
          res.data.data.forEach((item) => {
            this.labels.push(item.keyName);
            this.values.push(item.valueNum);
          });
         })
      }
    },
    clickBar(info){
      this.$emit('onClick', {name: info.name})
      // console.log(info,'是啥');
    },
  },
}
</script>
<style lang="scss" scoped>
    .Enterprise{
      width: 100%;
    }
</style>