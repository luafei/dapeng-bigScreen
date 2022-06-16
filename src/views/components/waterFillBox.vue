<template>
  <div class="wuliquid-fill">
    <el-row type="flex">
      <el-col :span="8" v-for="(item, index) in list" :key="item.title" >
        <wuliquid-fill :title="item.title" :num="item.num" :color="item.color" :id="'wuliquid-fill'+index" :key="index"></wuliquid-fill>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { queryPieChart } from '@/api/dumpTruck'
import { parseTime } from '@/utils/util'
import WuliquidFill from '@/components/echarts/WuliquidFill'
export default {
  name: "waterFillBox",
  components: {
    WuliquidFill
  },
  props: {
    carType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      list:[]
    };
  },
  mounted() {
    this.getList()
  },
  methods:{
    async getList(){
      const res = await queryPieChart({
        date:parseTime(new Date(), '{y}-{m}-{d}'),
        vehicleType: "all"
      });
      if(res.data.data){
        this.list = []
        res.data.data.forEach((item)=>{
          this.list.push({
            title:item.name,
            num: item.num
          })
        });
      }
    },
  }
};
</script>

<style lang="scss">
  .wuliquid-fill{
    position: absolute;
    left:0px;
    right:0;
    top:100px;
    margin:0 auto;
    width: 450px;
    height: 110px;
  }
</style>
