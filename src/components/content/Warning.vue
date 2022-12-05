<template>
    <div class="warning">         
        <!-- <span class="warningLeft">预警：{{monitorTypeNum}}个</span> -->
        <span class="warningCenter" v-html="monitorText"></span>
        <span class="warningRight" @click="warningDetails"> 查看详情>>> </span>
    </div>
</template>

<script>
import { getWarningInfo, getBusAlarmData } from '@/api/dumpTruck'
import { getBeachAlarmData } from '@/api/beach'
import { parseTime, getBeachRolesName } from "@/utils/util"
export default {
    name:"Warning",
    props: {
        subType: {
            type: String,
            default: ''
        },
    },
    data(){
        return {
            monitorTypeNum: 0,
            monitorText: '',
            beginTime: "",
            endTime: "",
        }
    },
    mounted() {
        if(this.subType === 'busCapacity'){ //公交运力页面
            this.getBusAlarmData()
        }else if(this.subType === 'sandBeach'){ //沙滩页面
            this.getBeachAlarmData()
        }else { //危化品、泥头车、车辆检测
            this.getWarningInfo()
        }
    },
    methods: {
        async getWarningInfo(){
            var date1 = new Date(new Date(new Date().toLocaleDateString()).getTime());
            var date2 = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
            let postData = {
                subType: this.subType,
                // beginTime: parseTime(date1),
                // endTime: parseTime(date2),
            }
            const res = await getWarningInfo(postData);
            this.filterData(res.data.data)
        },
        async getBusAlarmData(){
            const res = await getBusAlarmData();
            this.filterData(res.data.data)
        },
        async getBeachAlarmData(){
            var data = getBeachRolesName();
            const res = await getBeachAlarmData(data);
            this.filterData(res.data.data)
        },
        filterData(arr){
            if(!Array.isArray(arr)) return
            let total = 0;
            let text = ''
            arr.forEach(item => {
                total += Number(item.num)
                text += `${item.warningType || item.alarmType}${item.num}个, `
            })
            this.monitorText = text.replace(/\,\s$/,'')
        },
        warningDetails(){
              this.$router.push({
                   path:'/warningDetails',
              })
        }
    },
}
</script>

<style lang="scss">
    .warning{
      width: 1275px;
      height:22px;
      line-height: 22px;
      background: url('../../assets/images/warning_background.png');
      background-size: 100% 100%;
      position: absolute;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      font-size: 12px;
      pointer-events: auto;
      .warningLeft,.warningCenter{
          color:#DFCE15; 
      }
      .warningCenter{
          margin: 0 30px;
      }
      .warningRight{
          color: #FF6F6F;
          cursor: pointer;
      }
    }
</style>
