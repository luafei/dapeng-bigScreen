<template>
    <div>
        <div class="search-wrap">
        <el-select class="dp-select" popper-class="dp-select-popper" v-if="isShowWarningType" v-model="warningType" @change="selectWarnType" placeholder="请选择">
            <el-option
            v-for="item in warningTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <slot></slot>
        <el-button v-if="isHaveSlot" @click="handleSearch" :disabled="!plateNo || time.length===0" class="dp-btn-plain">查询</el-button>
        <el-button v-else @click="handleSearch" :disabled="warningTypeList.length === 0 || time.length===0" class="dp-btn-plain">查询</el-button>
        <el-button @click="handleRoadSearch" :disabled="!plateNo || time.length===0"  class="dp-btn-plain dp-road-btn">轨迹查询</el-button>
    </div>
    <div class="search-date-box">
        <el-date-picker
            v-model="time"
            class="dp-date-picker dp-date-picker2"
            type="daterange"
            align="center"
            unlink-panels
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd hh:mm:ss"
            popper-class="dp-picker-popper"
            @change="selectTime"
            :picker-options="pickerOptions">
        </el-date-picker>
    </div>
    </div>
</template>
<script>
import { getPickerOption } from '@/utils/util'
// import { warningTypeList } from '@/const/dicData' 
import { getCurrentTime } from "@/utils/util";

export default {
    name: 'search2',
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
        }
    },
    data() {
        return {
            warningType: '',
            // time:[new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()],
            time: [getCurrentTime("day").beginTime,getCurrentTime("day").endTime],
            pickerOptions: getPickerOption()
        }
    },
    mounted() {
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
        },
        handleRoadSearch(){
            this.$emit('onTrack', {time:this.time})
        }
    },
}
</script>
<style lang="scss" scoped>
    .search-wrap{
       display: flex;
       align-items: center;
       justify-content: space-between;
       line-height: 4px;
       .dp-select{
           border-radius: none!important;
       }
       .dp-date-picker{
           margin: 0 4px;
       }
       .dp-input{
           flex-grow: 1;
           margin-right:10px;
       }
       .dp-road-btn{
           width: 60px;
           color:#C0C4CC;
       }
    }
    .search-date-box{
        width:100%;
        margin-top:4px;
        .dp-date-picker2{
            width: 100% !important;
        }
    }
</style>