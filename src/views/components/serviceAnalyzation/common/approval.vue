<template>
<div class="entrance">
    <div class="title-time">
       <el-dialog
      :visible.sync="visiblelis"
      width="60%"
      append-to-body
      
      :close-on-click-modal="false"
      class="tab-dialog  total-business-dialog"
       :before-close="handleClose">
      <div class="centerPop" v-if="list.length !== 0">
          <div class="centerPopleft" v-if="list[0]">
             <span>{{list[0].eventEndTime | filterTime}}</span ><i class="icss">承办</i>
             <div class="yuan"></div>   
             <div class="xian"></div>   
             <div class="sanjiao"></div>    
             <div class="centerPopleft01">
                 <ul>
                     <li>审核序号: <i>01</i></li>
                     <li>办理部门: {{list[0].orgName}}</li>
                     <li>开始时间: {{list[0].eventStartTime }}</li>
                     <li>结束时间: {{list[0].eventEndTime}} </li>
                     <li>意见: {{list[0].handleExplain}}</li>
                 </ul>
            </div>
          </div>
          <div class="centerPopcenter" v-if="list[1]">
              <span>{{list[1].eventEndTime | filterTime}}</span ><i class="icss1">审核</i>
              <div class="yuan"></div>   
             <div class="xian"></div>   
             <div class="sanjiao"></div>
            <div class="centerPopcenter01">
                <ul>
                     <li>审核序号: <i>02</i></li>
                     <li>办理部门: {{list[1].orgName}}</li>
                     <li>开始时间: {{list[1].eventStartTime}}</li>
                     <li>结束时间: {{list[1].eventEndTime}}</li>
                     <li>意见:  {{list[1].handleExplain}}</li>
                 </ul>
            </div>   
          </div>
          <div class="centerPopright" v-if="list[2]">
              <span>{{list[2].eventEndTime | filterTime}}</span><i class="icss2">批准</i>
              <div class="yuan"></div>   
              <div class="xian"></div>   
              <div class="sanjiao"></div>
            <div class="centerPopright01">
                <ul>
                     <li>审核序号: <i>03</i></li>
                     <li>办理部门: {{list[2].orgName}}</li>
                     <li>开始时间: {{list[2].eventStartTime}}</li>
                     <li>结束时间: {{list[2].eventEndTime}} </li>
                     <li>意见: {{list[2].handleExplain}}</li>
                 </ul>
            </div>   
          </div>
      </div>
      <div v-else class="centerPop empty">
         暂无数据
      </div>
    </el-dialog>
    </div>
</div>
</template>

<script>
import {gettwoBusinessList} from '@/api/service'
import {parseTime} from '@/utils/util'
export default {
    name: "approval",
    components: {
       
    },
    props: {
        visiblelis: {
            type: Boolean,
            default: false
        },
        sblsh: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
         list:[],
        //  timeLate:parseTime(new Data())
        }
    },
    watch: {
        sblsh(value){
            this.sblsh = value
            this.getData()
          console.log(this.sblsh,'sss')
        },
    },
    mounted() {
        
    },
    methods: {
         timelate() {
          this.parseTime(new Data())
         },
         handleClose(){
            this.$emit('update:visiblelis')
            },
        async getData() {
          let postData = {
             sblsh:this.sblsh
          }
          console.log(postData,'postada')
          const res = await gettwoBusinessList (postData)
          console.log(res,'res.dada')
        //   this.timeLate = []
          if(res) {
              this.list = res.data.data
          }
          console.log(this.list,'list')
        },
    },
    filters: {
        filterTime(val){
            return parseTime(val, '{y}-{m}-{d}')
        }
    }
};
</script>

<style lang="scss" scoped>
// .title-time{
//   position: relative;
// }
 .centerPop{
     width: 100%;
     height: 380px;
     position: relative;
    //  top: 12px;
    .centerPopleft{
        float: left;
        width: 33%;
        height: 100%;
        position: relative;
        //  bottom : 20px;
         .yuan{
             width: 14px;
             height: 14px;
             border: solid #ffff;
             border-radius: 14px;
             position: absolute;
             top: 50px;
             left: 0;
         }
         .xian{
             width: 100%;
             height: 1px;
             border: 1px solid rgba(26,101,126,1);
              margin-top:30px;
            //  position: absolute;
            //  top:55px;
            //  left:15px;
         }
         .sanjiao{
             border: 8px solid #0000;
             border-left-color: rgba(26,101,126,1);
             position: absolute;
             top: 48px;
             right: 0px;
         }
         span{
             color: #ffff;
             font-size: 20px;
            //  position: absolute;
            //  top: 10px;
         }
             .icss{
             color: #ffff;
             font-size: 3px!important;
            //  position: absolute;
            //  left: 130px;
            //  top: 15px;
             margin-left: 15px;
             text-align: center;
             border: 1px solid rgba(34,179,220,.5);
             width: 40px;
             height: 20px;
         }
        .centerPopleft01{
            width: 90%;
            // height: 90%;
            border: solid 3px rgba(34,179,220,.5);
            margin-top: 50px;
            padding: 10px ;
            // position: absolute;
            // bottom: 80px;
            // left: 50px;
            ul{
                li{
                    color: #ffff;
                    padding-bottom: 5px;
                    padding-top: 3px;
                    padding-left: 10px;
                }
            }
        }
    }
    .centerPopcenter{
           width: 33%;
            height: 100%;
            float: left;
        position: relative;
        // bottom : 20px;
        .yuan{
             width: 14px;
             height: 14px;
             border: solid #ffff;
             border-radius: 14px;
             position: absolute;
             top: 50px;
             left: 0px;
         }
         .xian{
             width: 100%;
             height: 1px;
             border: 1px solid rgba(26,101,126,1);
             margin-top:30px;
            //  position: absolute;
            //  top:55px;
            //  left:380px;
         }
         .sanjiao{
             border: 8px solid #0000;
             border-left-color: rgba(26,101,126,1);
             position: absolute;
             top: 48px;
             right: 0;
         }
         span{
             color: #ffff;
             font-size: 20px;
            //  position: absolute;
            //  top: 10px;
            //  left: 400px;
         }
            .icss1{
             color: #ffff;
             font-size: 3px!important;
              margin-left: 15px;
            //  position: absolute;
            //  left: 525px;
            //  top: 15px;
             text-align: center;
             border: 1px solid rgba(34,179,220,.5);
             width: 40px;
             height: 20px;
         }
         .centerPopcenter01{
            width: 90%;
            // height: 200px;
            border: solid 3px rgba(34,179,220,.5);
            margin-top: 50px;
            padding: 10px;
            // position: absolute;
            // bottom: 80px;
            // left: 375px;
            ul{
                li{
                    color: #ffff;
                    padding-bottom: 5px;
                    padding-top: 3px;
                    padding-left: 10px;
                }
            }
        }
    }
    .centerPopright{
        width: 33%;
        height: 100%;
        float: left ;
        position: relative;
        .yuan{
             width: 14px;
             height: 14px;
             border: solid #ffff;
             border-radius: 14px;
             position: absolute;
             top: 50px;
             left: 0px;
         }
         .xian{
             width: 100%;
             height: 1px;
             border: 1px solid rgba(26,101,126,1);
             margin-top:30px;
            //  position: absolute;
            //  top:55px;
            //  left:750px;
         }
         .sanjiao{
            width: 14px;
            height: 14px;
            border: solid #ffff;
            border-radius: 14px;
            position: absolute;
            top: 48px;
            right: 0;
         }
         span{
             color: #ffff;
             font-size: 20px;
            //  position: absolute;
            //  top: 10px;
            //  left: 800px;
         }
          .icss2{
             color: #ffff;
             font-size: 3px!important;
              margin-left: 15px;
            //  position: absolute;
            //  left: 930px;
            //  top: 15px;
             text-align: center;
             border: 1px solid rgba(34,179,220,.5);
             width: 40px;
             height: 20px;
         }
         .centerPopright01{
            width: 90%;
            // height: 200px;
            border: solid 3px rgba(34,179,220,.5);
            margin-top: 50px;
            padding: 10px;
            // position: absolute;
            // bottom: 80px;
            // left: 750px;
            ul{
                li{
                    color: #ffff;
                    padding-bottom: 5px;
                    padding-top: 3px;
                    padding-left: 10px;
                }
            }
        }

    }
 }
 .empty {
     text-align: center;
     line-height: 380px;
     color: #ffff;
     font-size: 16px;
 }

</style>
