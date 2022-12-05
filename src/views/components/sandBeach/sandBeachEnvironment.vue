<template>
  <div class="entrance">
    <sub-title title="沙滩实时环境" :subTitle="subTitle" @onToggle="handleToggle">
    </sub-title>
    <sandBeachtubiao v-show="showIndex === 0" :lables02="lables02" :values02="values02" :sourceOp="sourceOp"></sandBeachtubiao>

    <time-road class="time-road" v-show="showIndex === 1 && showPark" :is--right="false" :time-type="timeType"  @onSelectTime="onSelectTime">
        <el-date-picker
          slot="tips"
          v-show="timeType === 'hour'"
          v-model="timeHour"
          @change="changeDatePicker"
          type="date"
          class="dp-date"
          value-format="yyyyMMddHH"
          popper-class="dp-picker-popper"
          placeholder="请选择日期">
        </el-date-picker>
        <el-date-picker
          slot="tips"
          v-show="timeType === 'day'"
          v-model="timeDay"
          @change="changeDatePicker"
          value-format="yyyyMMdd"
          type="daterange"
          class="dp-date-picker"
          popper-class="dp-picker-popper"
          start-placeholder="开始日期"
          range-separator="~"
          end-placeholder="结束日期"
          >
        </el-date-picker>
        <el-date-picker
          slot="tips"
          v-show="timeType === 'month'"
          v-model="timeMonth"
          @change="changeDatePicker"
          value-format="yyyyMM"
          type="monthrange"
          class="dp-date-picker"
          popper-class="dp-picker-popper"
           start-placeholder="开始月份"
          range-separator="~"
          end-placeholder="结束月份">
        </el-date-picker>
      </time-road> 
      <busLinearGradient style="margin-top:40px;" v-show="showIndex === 1 && showPark" :labels="labels" :values="values" @onClick="handleWuLine" :option="parkList"></busLinearGradient>
  </div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import { findComponentDownward, getBeachRolesName} from "@/utils/util";
import TimeRoad from '@/components/common/TimeRoad'
import sandBeachtubiao from "@/views/components/sandBeach/sandBeachtubiao";
import { getBeachCurrentEnvironment, getParkFlowDistribution } from '@/api/beach'
import busLinearGradient from "@/components/echarts/LinearGradient";

export default {
  name: "busComeInOut",
  components: {
    SubTitle,
    sandBeachtubiao,
    busLinearGradient,
    TimeRoad
  },
  props: {
    subTitleAlign: {
      type: String,
      default: "left",
    },
    carType: {
      type: String,
      default: "",
    },
    parkList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      echart: null,
      lables02: [],
      values02: [],
      subTitleCom: null,
      sourceOp: {
        xAxis: {
          data: ['较场尾','官湖', '杨梅坑', '西涌']
        },
        series: []
      },
      showIndex: 0,
      direction: 0,
      labels: [],
      values: [],
      time: [],
      maxCar: 0,
      timeType: 'hour',
      timeHour: '',
      timeDay: [],
      timeMonth: [],
      parkName: "",
      showPark: true,
      subTitle: '停车场流量'
    };
  },
  mounted() {
    console.log('sandBeachEnvironment', this.showPark)
    var data = getBeachRolesName();
    if (!data.name == '') {
      this.subTitle = '';
      this.showPark = false;
    }
    this.subTitleCom = findComponentDownward(this, "subTitle");
    this.getData()
  },
  watch: {
    parkList(newVal){
      if(newVal.length > 0){
        this.parkName = this.parkList[0].value
        this.getList()
      }
    }
  },
  methods: {
    handleToggle({ index }){
      this.showIndex = index
      if (!this.showPark) {
        return;
      }
      if(index === 0){
        this.getData()
      }else{
        this.getList()
      }
    },
    onSelectTime({type}){
      this.timeType = type;
      this.getList(null,type)
    },
    getTime(){
      let result = []
      if(this.timeType === 'hour'){
        result[0] = this.timeHour || ''
        result[1] = this.timeHour ? this.timeHour.replace(/00$/,'23') : ''
      }else if(this.timeType === 'day'){
        result = this.timeDay || []
      }else {
        result = this.timeMonth || []
      }
      return result
    },
    async getList(){
      let postData = {
        park: this.parkName,
        timeType: this.timeType,
        direction: this.direction,
        beginTime: this.getTime()[0] || '',
        endTime: this.getTime()[1] || '',
        useTime: this.getTime()[0] ? true : false
      }
      const res = await getParkFlowDistribution(postData);
      if(res.data.data){
        let {maxNum, name, x, y} = res.data.data
        this.labels = x;
        this.values = y;
        this.maxCar = maxNum;
      }else{
        this.labels = []
        this.values = []
        this.maxCar= 0;
      }
    },
    handleWuLine(params){
      let { beginTime, endTime} = getCurrentTime(this.timeType, params.name)
      params.beginTime = beginTime
      params.endTime = endTime
      params.direction = this.subTitleCom.btnIndexSel 
      this.$emit('onClickLine', params)
    },
    changeDatePicker(time){
      this.getList()
    },

    async getData(){
      var val = getBeachRolesName();
      let colors = ['#14FEF7', '#5397FF', '#FBBA10']
      const res = await getBeachCurrentEnvironment(val);
      let data = res.data.data
      if(data){
        let labels = []
        let seriesData = [{
          name: '空气',
          data: [],
        },{
          name: '噪音',
          data: [],
        },{
          name: '负氧离子',
          data: [],
        }]
        data.forEach(item => {
          labels.push(item.beach)
          seriesData[0].data.push(item.air)
          seriesData[1].data.push(item.noise)
          seriesData[2].data.push(item.oxygen)
        })
        seriesData = seriesData.map((item, index) => {
          if (index == 2) {
            return {
              ...item,
              type: "line",
              smooth: true,
              symbol: "circle",
              yAxisIndex: 1,
              symbolSize: 0,
              lineStyle: {
                normal: {
                  width: 1,
                  shadowColor: "rgba(155, 18, 184, .4)",
                  shadowBlur: 5,
                  shadowOffsetY: 40,
                  shadowOffsetX: 0,
                  color: colors[index],
                },
              },
              
              itemStyle: {
                color: colors[index],
                borderColor: "#fff",
                borderWidth: 2,
              },
            }
          } else {
              return {
              ...item,
              type: "line",
              smooth: true,
              symbol: "circle",
              yAxisIndex: 0,
              symbolSize: 0,
              lineStyle: {
                normal: {
                  width: 1,
                  shadowColor: "rgba(155, 18, 184, .4)",
                  shadowBlur: 5,
                  shadowOffsetY: 40,
                  shadowOffsetX: 0,
                  color: colors[index],
                },
              },
              
              itemStyle: {
                color: colors[index],
                borderColor: "#fff",
                borderWidth: 2,
              },
            }
          }
        }),
        this.sourceOp.series = seriesData
        this.sourceOp.xAxis.data = labels
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.entrance {
  position: relative;
  .sub-title-left,
  .sub-title-right {
    display: inline-block;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
  }
  .sub-title-left {
    margin-right: 18px;
  }
  .sub-title-right {
    margin-left: 18px;
  }
  .time-road {
    width: 100%;
    margin-top: 12px;
  }
}
</style>


