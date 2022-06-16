<template>
<div class="entrance">
    <div class="title-time">
        <sub-title title="事项业务排名"> </sub-title>
        <!-- @onSelectTime="onSelectTime -->
        <time-road class="time-road" :hour="false" week year :time-type="timeType" @onSelectTime="onSelectTime" ></time-road>
        <!-- <callNumPercentagePie :list="list"></callNumPercentagePie> -->
        <!-- 写死5个框 -->
        <div class="affairs-center-one">
            <ul >
                <li class="affairs-center-li" 
                v-for="(item, i) in itemList" 
                :key= i 
                :timeType ='timeType'
                @click="handleBar(i)" >
                    <span style="color:#fff;">{{item.commonName}}</span> <i  style="color:#fff; font-style:normal">{{item.num}}件</i>
                </li>
                <!-- <li class="affairs-center-li">
                    <span style="color:#fff;">2、保障性住房(安居)轮后申请</span> <i  style="color:#fff; font-style:normal">5件</i>
                </li>
                <li class="affairs-center-li">
                    <span style="color:#fff;">3、深圳市新引进人才租房和生活补贴</span> <i  style="color:#fff; font-style:normal">4件</i>
                </li>
                <li class="affairs-center-li">
                    <span style="color:#fff;">4、在职人才引入</span> <i  style="color:#fff; font-style:normal">3件</i>
                </li>
                <li class="affairs-center-li">
                    <span style="color:#fff;">5、政府投资项目审批(初步设计概算)</span> <i  style="color:#fff; font-style:normal">2件</i>
                </li> -->
            </ul>
            <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            width="60%"
            append-to-body
            :close-on-click-modal="false"
            class="tab-dialog  total-business-dialog">
            >
            <avue-crud
              :data="list"
              :option="option"
              :page.sync="page"
              @cell-click="handlecellclick"
              @size-change="sizeChange"
              @current-change="currentChange"
              class="tab-dialog dp-avue-pagination">
              <template slot="video" slot-scope="scope">
                <el-button class="dp-btn-plain btn-video" @click="handlePlayer">播放视频</el-button>
              </template>
            </avue-crud>
            </el-dialog>
            <VideoDialog :show.sync="show"></VideoDialog>
            <approval 
            :sblsh="sblsh"
            :visiblelis.sync="approvalshow"
            ></approval>
        </div>
        
    </div>
</div>
</template>

<script>
import SubTitle from "@/components/common/SubTitle";
import {
    findComponentDownward
} from "@/utils/util";
import TimeRoad from "@/components/common/TimeRoad";
import callNumPercentagePie from "@/components/echarts/callNumPercentagePie";
import {
    getCallTypeProportion
} from "@/api/gov";
import {getmatters, getItemnumber} from '@/api/service'
import pagination from "@/mixins/pagination"
import VideoDialog from './common/VideoDialog.vue'
import approval from '@/views/components/serviceAnalyzation/common/approval'
export default {
    name: "callNumPercentage",
    components: {
        SubTitle,
        TimeRoad,
        callNumPercentagePie,
        VideoDialog,
        approval
        
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
    },
    mixins:[pagination],
    data() {
        return {
            echart: null,
            subTitleCom: null,
            timeType: "year",
            itemList: [],
            list: [],
            show:false,
            numList: [],
            dialogVisible:false,
            dialogTitle:'事项业务',
            list:[],
            listname:[],
            approvalshow:false,
            sblsh:'',
            page:{
                total: 0,
                pageSize: 10,
                pageSizes: [10,20,30,50],
                background: true,
            },
            option: {
                index: true,
                indexLabel: "序号",
                border: false,
                align: "center",
                menuAlign: "center",
                addBth: false,
                refreshBtn: false,
                columnBtn: false,
                menu: false,
                maxHeight: "300px",
                column: [
                    {
                        label:'事项名称',
                        prop: 'taskName'
                    },
                    {
                        label:'受理部门',
                        prop:'orgName'
                    },
                    {
                        label:'秒批事件',
                        prop: 'specialType',
                        formatter: (val) => {
                            return val.specialType === '2' ? '是' : '否'
                        }
                    },
                    {
                        label: "受理时间",
                        prop: "acceptDate",
                        type: "date",
                        format: "yyyy-MM-dd hh:mm:ss",
                        valueFormat: "yyyy-MM-dd hh:mm:ss",
                    },
                    {
                        label:"承诺时间",
                        prop:"promiseDate",
                        type:"date",
                        format:"yyyy-MM-dd hh:mm:ss",
                        valueFormat:"yyyy-MM-dd hh:mm:ss",
                    },
                    {
                        label:"办结时间",
                        prop:"resultDate",
                        type:"date",
                        format:"yyyy-MM-dd hh:mm:ss",
                        valueFormat:"yyyy-MM-dd hh:mm:ss"
                    },
                    {
                        label: "视频播放",
                        prop: "video",
                        slot: true
                    }
                ]
            }
        };
    },
    mounted() {
        this.subTitleCom = findComponentDownward(this, "subTitle");
        this.getData();
    },
    methods: {
        handlecellclick(row, column, cell, event) {
            if(column.label !== '视频播放'){
                this.approvalshow = true
                this.sblsh=row.sblsh
            }
        },
        async getData() {
            let postData = {
                timeType: this.timeType
            }
            const res = await getmatters(postData);
            console.log(res,'res.dd')
            this.itemList = res.data.data
            
            this.listname = []
            // this.numList = []
            this.itemList.forEach(item => {
              this.listname.push(item.commonName)
            
            })
        },
        handleBar(i) {
         this.dialogVisible = true
        //  this.dialogTitle = true
         this.currenList = this.listname[i]
         console.log(this.currenList,'curren')
         console.log(i,'iiii')
         this.getList()
        },
        async getList() {
          let postData = {
              page:this.page.currentPage,
              pageSize: this.page.pageSize,
              timeType: this.timeType,
              queryParam:this.currenList
          }
          const res = await getItemnumber(postData)
          let {total, data} = res.data.data
          this.page.total = total;
          this.list = data
          console.log(res,'list88')
        },
        onSelectTime({type}) {
            this.timeType = type;
            this.getData();
        },
        handlePlayer() {
            this.show =true
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
        margin-top: 12px;
    }
}
.title-time {
    position: relative;

    .time-road {
        position: absolute;
        right: 0;
        top: 0;
        margin-top: 0;
    }
    // 这是写死的中间部分样式
    .affairs-center-one{
        margin-top: 10px;
        // height: 150px;
        width: 360px;
        .affairs-center-li{
            border-radius: 2px;
            border: 1px solid rgba(50,253,246,0.3);
            background: rgba(50,253,246,0.1);
            margin-top: 4px;
            padding: 3px 6px;
            display: flex;
            justify-content: space-between;
            span{
                display: inline-block;
                margin: 0;
            }
            i{
                display: inline-block;
                width: 80px;
                text-align: right;
            }
        }
    }
}
.btn-video{
  margin-left: auto;
  padding: 2px 3px;
}
</style>
