<template>
  <div class="track-query">
    <sub-title :title="carTitle + '车辆轨迹特征查询'"></sub-title>
    <CarTrajectoryDialog :info="info" :show="showDialog" @update="updateShow" :dialogTitle="dialogTitle"></CarTrajectoryDialog>
    <search class="search" ref="search" @onSearch="handleSearch" @onTrack="onTrack" :plate-no="plateNo" is-have-slot :is-show-warning-type="false">
        <!-- <el-input v-model="plateNo" placeholder="请输入车牌号" clearable class="dp-input"></el-input> -->
        <el-autocomplete
        class="dp-input "
          v-model="plateNo"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入车牌号"
          @select="handleSelect"
          @trigger-on-focus="false"
        ></el-autocomplete>
    </search>
  </div>
</template>

<script>
import SubTitle from '@/components/common/SubTitle'
import Search from '@/components/common/Search2'
import CarTrajectoryDialog from '@/components/common/CarTrajectoryDialog'
import { getTrailQuery , getTrailQueryplate } from '@/api/dumpTruck'
import { getCurrentTime } from "@/utils/util";
import request from '@/utils/request'

export default {
  components:{
    SubTitle,
    Search,
    CarTrajectoryDialog
  },
  props: {
    carType: {
      type: String,
      default: ""
    },
    carCode: { //车牌号
      type: String,
      default: ''
    }
  },
  data(){
    return {
      plateNo: '',
      showDialog: false,
      info: {},
      carTitle:"",
      source: null,
      dialogTitle: '',
      restaurantlist: [],
      timeout:  null
    }
  },
  mounted() {
   if(this.carType === "dangerCar"){
      this.carTitle = "危化品"
    }else if(this.carType === "dumpTruck"){
      this.carTitle = "泥头车"
    }else if(this.carType === "all"){
      this.carTitle = "车辆监测"
    }
    this.$refs.search.time =  [getCurrentTime("day").beginTime,getCurrentTime("day").endTime]
    // this.restaurantlist = this.loadAll();
  },
  watch: {
    plateNo(newVal){
      if(!newVal){
        this.$emit('removeTrack', 'trackQuery')
      }
    },
     carCode(newVal){
     this.plateNo = newVal
    },
  },
  methods: {
    async handleSearch(obj){
      this.source = request.CancelToken.source()
      this.showDialog = true
      let { time } = obj
      this.dialogTitle = this.plateNo
      let postData = {
        beginTime: time[0], 
        endTime: time[1], 
        carType: this.carType, 
        plateNo: this.plateNo,
      }
      let cancelToken = this.source.token
      const res = await getTrailQuery(postData, cancelToken);
      // const res = await getTrailQueryplate(postData)
      if(res){
        this.restaurants = res.data.data
        this.info = this.restaurants
      } 
      
    },
    onTrack(params){
      this.$emit('onTrack', {plateNo:this.plateNo,...params, type: this.carType, typeLayer: 'trackQuery'})
    },
    updateShow(){
      this.showDialog = false;
      this.source.cancel('取消请求')
    },
    // 模糊查询
    async querySearchAsync(queryString, cb) {
      if (queryString.length < 3) {
        return
      }
      let  time  =  this.$refs.search.time      
      let postData = {
        beginTime: time[0], 
        endTime: time[1], 
        carType: this.carType, 
        plateNo: queryString,
      }
      let restaurantlist = await getTrailQueryplate(postData);
      let transRestaurantlist = [];
      
      restaurantlist.data.data.map((item, index) => {
        transRestaurantlist.push({'value': item});
      })
      cb(transRestaurantlist);
    },

    handleSelect(item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss">
  .track-query{
    position: relative;
    font-size: 16px;
    .search{
      margin-top: 10px;
    }
  }
</style>
