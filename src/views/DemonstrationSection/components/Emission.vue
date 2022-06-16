<template>
  <div class="Emission">
    <!--  -->
    <sub-title title="各工地排放情况"></sub-title>
    <Discharge :labels="labels" :values="values" @onClick="clickBar" />
  </div>
</template>
<script>
import SubTitle from '@/components/common/SubTitle'
import Discharge from '../echarts/discharge.vue'
import { getQueryNTCSiteDischarge } from '../../../api/example.js'
export default {
  components: {
    SubTitle,
    Discharge
  },
  data () {
    return {
      labels: [],
      values: [],
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
   async getList(){
     const res =await getQueryNTCSiteDischarge()
      if (res.data.data) {
        this.labels = [];
        this.values = [];
        this.$nextTick(() => {
          res.data.data.forEach((item) => {
            this.labels.push(item.siteName);
            this.values.push(item.dischargeNum);
          });
        })
      }
    },
    clickBar (info) {
      this.$emit('onClick', { name: info.name })
    }
  }
}
</script>
<style lang="scss" scoped>
.Emission {
  width: 100%;
  //   margin-top: 30px;
  padding-top: 30px;
}
</style>
