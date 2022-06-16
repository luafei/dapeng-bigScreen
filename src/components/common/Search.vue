<template>
  <div class="search-wrap">
    <el-select
      class="dp-select"
      popper-class="dp-select-popper"
      v-if="isShowWarningType"
      v-model="warningType"
      @change="selectWarnType"
      placeholder="请选择"
    >
      <el-option
        v-for="item in warningTypeList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <slot></slot>
    <el-date-picker
      v-model="time"
      class="dp-date-picker"
      type="daterange"
      align="center"
      unlink-panels
      range-separator="~"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd"
      popper-class="dp-picker-popper"
      @change="selectTime"
      :picker-options="pickerOptions"
    ></el-date-picker>
    <!-- <el-button v-if="isHaveSlot" @click="handleSearch" :disabled="!plateNo || time.length===0" class="dp-btn-plain">查询</el-button>
    <el-button v-else @click="handleSearch" :disabled="warningTypeList.length === 0 || time.length===0" class="dp-btn-plain">查询</el-button>-->
    <el-button v-if="isHaveSlot" @click="handleSearch" :disabled="!plateNo" class="dp-btn-plain">{{title?title:'查询'}}</el-button>
    <el-button
      v-else
      @click="handleSearch"
      :disabled="warningTypeList.length === 0"
      class="dp-btn-plain"
    >{{title?title:'查询'}}</el-button>
  </div>
</template>
<script>
import { getPickerOption } from '@/utils/util'
// import { warningTypeList } from '@/const/dicData' 
export default {
    name: 'search',
    props: {
        isShowWarningType: {
            type: Boolean,
            default: true
        },
        warningTypeList: {
            type: Array,
            default: () => []
        },
        plateNo: {
            type: String,
            default: ''
        },
        isHaveSlot: {
            type: Boolean,
            default: false
        },
        initTime: {
          type: Array,
          default: () => []
        },
        title:{
          type:String,
          default:""
        }
    },
    data() {
        return {
            warningType: this.$attrs.initSelectType,
            // warningType:index,
            time: this.initTime,
            pickerOptions: getPickerOption()

        }
    },
    watch:{
        warningTypeList:{
            handler(val){
                if(val.length> 0){
                    this.warningType = val[0].label;
                    this.selectTime(this.time);
                    this.selectWarnType(this.warningType)
                }
            }
        }
    },
    mounted() {
      if(this.warningTypeList.length > 0){
        this.warningType = this.warningTypeList[0].label;
        this.selectTime(this.time);
        this.selectWarnType(this.warningType)
      }
    },
    methods: {
        selectWarnType(val){
            this.$emit('onWarningType', val)
        },
        selectTime(timeArr){
            this.$emit('onTime', timeArr)
        },
        handleSearch(){
            this.$emit('onSearch',{warningType: this.warningType, time:this.time})
        }
    },
}
</script>
<style lang="scss" scoped>
.search-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 4px;
  .dp-select {
    border-radius: none !important;
  }
  .dp-date-picker {
    margin: 0 4px;
  }
}
</style>