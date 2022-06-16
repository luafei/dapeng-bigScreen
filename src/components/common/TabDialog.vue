<template>
  <div class="vehicle-inquiry">
    <div class="dialogConnect">
      <el-dialog
        :visible.sync="show"
        width
        :append-to-body="true"
        :close-on-click-modal="false"
        :before-close="onClose"
        class="tab-dialog"
        :title="diaTitle"
      >
        <div class="dialog-header">
          <el-row type="flex" style="width:100%;">
            <el-col :span="5" class="licenseConnect">
              <span class="license-plate">车牌 :</span>
              <el-input v-model="plateNo" placeholder="请输入车牌" class="input-width"></el-input>
            </el-col>
            <el-col :span="8" class="door">
              <span class="doorConnect">出入口/主要路段 :</span>
              <el-select v-model="roadName" clearable placeholder="请选择" class="door-type">
                <el-option
                  v-for="item in roadSelectList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="6" class="carConnect">
              <span class="dialog-car-type">车型 ：</span>
              <el-select v-model="vehicleType" clearalbe placeholder="请选择" class="check-type">
                <el-option
                  v-for="item in vehicleTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="dialog-dier">
              <span>方向 :</span>
              <el-select v-model="direction" placeholder="请选择" class="check-type input-width">
                <el-option
                  v-for="item in directionList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
        <div class="dialog-video">
          <div class="time-box">
            <span>时间 :</span>
            <el-date-picker
              v-model="beginTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
              class="check-timeone"
            ></el-date-picker>
            <span class="date-to">
              <div class="date-connect"></div>
            </span>
            <el-date-picker
              v-model="endTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
              class="check-time"
            ></el-date-picker>
          </div>
          <div class="video-select">
            <span>视频 :</span>
            <el-select
              v-model="videoName"
              placeholder="请选择"
              class="check-type input-width-l videoselect"
            >
              <el-option
                v-for="item in videoNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <el-button size="small" class="search-btn" @click="handleSearch" type="primary">查询</el-button>
        </div>
        <avue-crud
          class="dp-avue-del-menu dp-avue-pagination tabdialogform"
          :data="list"
          :table-loading="tableloading"
          :page.sync="page"
          @size-change="sizeChange"
          @current-change="currentChange"
          @cell-click="cellClick"
          :option="option"
        >
          <template slot="direction" slot-scope="scope">
            <span v-if="scope.row.direction==='0'">驶入</span>
            <span v-if="scope.row.direction==='1'">驶出</span>
          </template>
          <template slot="nativeLocation" slot-scope="scope">
            <span v-if="scope.row.nativeLocation ==='0'">本地</span>
            <span v-if="scope.row.nativeLocation ==='1'">异地</span>
          </template>
          <template slot="videoName" slot-scope="scope">
            <span style="cursor: pointer;" v-html="scope.row.videoName" @click="lookVideo(scope.row)"></span>
          </template>
          <template slot="imagePath" slot-scope="scope">
            <el-image 
              style="width: 80px;"
              :src="scope.row.imagePath" 
              :preview-src-list="currentListImgs">
            </el-image>
          </template>
        </avue-crud>
        <el-dialog
          width="670px"
          :title="videoDialogTitle"
          top="15vh"
          class="innerDialog"
          v-if="innerVisible"
          :visible.sync="innerVisible"
          :before-close="beforeCloseVideo"
          append-to-body
        >
          <!-- <HlsLive v-if="videoUrl" :src="videoUrl"></HlsLive> -->
          <haikanPlayer :width="800" :height="480"  :cameraIndexCode="cameraIndexCode"></haikanPlayer>
        </el-dialog>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import pagination from "@/mixins/pagination";
// import HlsLive from "@/components/common/HlsLive.vue";
import { getDetailLiveUrl } from "@/api/video";
import { mapGetters } from 'vuex'
import { directionList, vihecleTypeList,originList} from "@/const/dicData";
import { getVideoNameList, getTrafficDetails,} from "@/api/dumpTruck";
import haikanPlayer from '@/components/common/haikanPlayer/index'

export default {
  mixins: [pagination],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    initParams: {
      type: Object,
      default: () => {},
    },
    carType: {
      type: String,
      default: ''
    },
  },
  components: {
    // HlsLive,
    haikanPlayer
  },
  data() {
    return {
      diaTitle: "详情单",
      plateNo: "",
      tableloading: true,
      innerVisible: false,
      videoDialogTitle: null,
      videoUrl: "",
      beginTime: "",
      endTime: "",
      direction: undefined,
      roadName: undefined, //出入口
      vehicleType: "all",
      vehicleTypeList: [],
      videoName: undefined,
      tollName: "",
      roadFlag: undefined,
      nativeLocation: undefined,
      directionList: directionList,
      vihecleTypeList: vihecleTypeList,
      originList: originList,
      nativeLocation: 2,
      locationName:'',
      roadList: [],
      videoNameList: [],
      cameraIndexCode: '',
      currentListImgs: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 5,
        pageSizes: [5,10,20,30],
        background: true,
      },
      option: {
        index: true,
        indexLabel: "序号",
        border: false,
        align: "center",
        menuAlign: "center",
        addBtn: false,
        refreshBtn: false,
        columnBtn: false,
        menu: false,
        maxHeight: "300px",
        column: [
          {
            label: "时间",
            prop: "captureTime",
            minWidth: 110,
          },
          {
            label: "图片",
            prop: "imagePath",
            minWidth: 100,
            type: "img",
            slot: true
          },
          {
            label: "视频",
            slot: true,
            prop: "videoName",
            minWidth: 100,
          },
          {
            label: "出入口/路段",
            slot: true,
            prop: "tollName",
            minWidth: 80,
          }
        ],
      },
      list: [],
      roadSelectList: [],
    };
  },
  computed:{
    ...mapGetters(['app'])
  },
  created() {
    if (this.$route.path === "/MudTruck") {
      this.vehicleType = "dumpTruck";
      this.vehicleTypeList = [
        {
          value: "dumpTruck",
          label: "泥头车",
        },
      ];
    } else if (this.$route.path === "/DangerousChemicals") {
      this.vehicleType = "dangerCar";
      this.vehicleTypeList = [
        {
          value: "dangerCar",
          label: "危化品",
        },
      ];
    }else if(this.$route.path === "/carVehicle"){
      this.vehicleType = "all";
      this.vehicleTypeList = [
        {
          value: "all",
          label: "车辆监测",
        },
      ];
    }
    this.getVideoNameList();
  },
  watch: {
    show(newVal) {
      newVal && (this.list = []);
      this.page.total = 0;
      this.page.currentPage = 1;
      this.tableloading = true;
    },
    initParams: {
      handler(newVal) {
        let list = [...this.app.roadList];
        list.forEach((item) => {
          item.value = item.label;
        });
        this.roadSelectList = [{ value: "", label: "全部" }, ...list];
        if(this.$route.path === "/carVehicle"){
          this.vehicleTypeList = [...this.app.vehicleTypeList];
        }
        let {
          plateNo,
          beginTime,
          endTime,
          direction,
          roadName,
          vehicleType,
          videoName,
          nativeLocation,
          roadFlag,
          tollName,
          dialogTitleName,
          columnType,
          locationName
        } = newVal;
        this.plateNo = plateNo;
        this.beginTime = beginTime;
        this.endTime = endTime;
        this.roadFlag = roadFlag;
        this.direction = String(direction);
        this.roadName = roadName;
        this.tollName = tollName;
        this.vehicleType = vehicleType||this.vehicleType||'';
        this.videoName = videoName;
        this.nativeLocation = nativeLocation;
        this.locationName = locationName;
        this.diaTitle = dialogTitleName || "详情单";
        // 默认： 时间、图片、视频点名称、出入口、路段			
        // columnType 1 ：时间、车辆颜色、图片、视频点名称、出入口、路段、来源地			
        // columnType 2 ：时间、车辆颜色、图片、视频点名称、出入口		
        // columnType 3 ：时间、车辆颜色、图片、视频点名称、路段
        // columnType 4 ：时间、车辆颜色、图片、视频点名称、出入口、车辆来源地
        if(columnType === 1){
          this.option.column = [
          {
            label: "时间",
            prop: "captureTime",
            minWidth: 110,
          },
          {
            label: "图片",
            prop: "imagePath",
            minWidth: 100,
            type: "img",
            slot: true
          },
          {
            label: "视频",
            slot: true,
            prop: "videoName",
            minWidth: 100,
          },
          {
            label: "出入口",
            prop: "tollName",
            minWidth: 80,
          },
          {
            label: "路段",
            prop: "roadName",
            minWidth: 80,
          },{
            label: "来源地",
            slot:true,
            prop: "nativeLocation",
            minWidth: 50
          }];
        }else if(columnType === 2){
          this.option.column = [
          {
            label: "时间",
            prop: "captureTime",
            minWidth: 110,
          },
          {
            label: "图片",
            prop: "imagePath",
            minWidth: 100,
            type: "img",
            slot: true
          },
          {
            label: "视频",
            slot: true,
            prop: "videoName",
            minWidth: 100,
          },
          {
            label: "出入口",
            prop: "tollName",
            minWidth: 80,
          }];
        }else if(columnType === 3){
          this.option.column = [
          {
            label: "时间",
            prop: "captureTime",
            minWidth: 110,
          },
          {
            label: "图片",
            prop: "imagePath",
            minWidth: 100,
            type: "img",
            slot: true
          },
          {
            label: "视频",
            slot: true,
            prop: "videoName",
            minWidth: 100,
          },
          {
            label: "路段",
            prop: "roadName",
            minWidth: 80,
          }];
        }else if(columnType === 4){
          this.option.column = [
          {
            label: "时间",
            prop: "captureTime",
            minWidth: 110,
          },
          {
            label: "图片",
            prop: "imagePath",
            minWidth: 100,
            type: "img",
            slot: true
          },
          {
            label: "视频",
            slot: true,
            prop: "videoName",
            minWidth: 100,
          },
          {
            label: "出入口",
            prop: "tollName",
            minWidth: 80,
          },
          {
            label: "车辆来源地",
            prop: "roadFlag",
            minWidth: 80,
          }];
        }else{
          this.showDefaultHeader()
        }
        this.getList();
      },
      deep: true,
    },
  },
  methods: {
    async getList() {
      this.tableloading = true;
      let postData = {
        page: this.page.currentPage, // i1页
        pageSize: this.page.pageSize, // 10
        beginTime: this.beginTime, // 2020-08-05 00:00:00
        endTime: this.endTime, // 12号以后才有数据
        vehicleType: this.vehicleType, // 危化品 danger
        plateNo: this.plateNo, // 空
        direction: this.direction,
        roadName: this.roadName,
        roadFlag: this.roadFlag,
        tollName: this.tollName,
        nativeLocation: this.nativeLocation,
        videoName: this.videoName || "",
        locationName:this.locationName||''
      };
      try{
        const res = await getTrafficDetails(postData);
        let { total, data } = res.data.data;
        this.page.total = total;
        this.currentListImgs = []
        data.forEach((item) => {
          const realVehicle = this.app.vehicleTypeList.filter((it) => {
            return it.value === item.vehicleType;
          });
          if (realVehicle.length > 0) {
            item.vehicleTypeName = realVehicle[0].label;
          } else {
            item.vehicleTypeName = item.vehicleType;
          }
          this.currentListImgs.push(item.imagePath)
        });
        // data.forEach(item => {
        //   item.imgs = tempImgs.join()
        // })

        this.list = data;
        this.tableloading = false;
      }catch(e){
        this.list = [];
        this.tableloading = false;
      }
    },
    cellClick(row, column, cell, event){
      // if(column.property === 'imagePath'){
      //   this.$nextTick(() => {
      //     row.imagePath = this.currentListImgs.join()
      //   })
      // }
      // console.log(row,'row')
      // console.log(column,'column')
      // console.log(cell,'cell')
      // console.log(event,'event')
    },
    async getVideoNameList() {
      let postData = { pointType: 0 };

      this.videoNameList = [
        {
          label: "全部",
          value: "",
        },
      ];
      const res = await getVideoNameList(postData);

      res.data.data.forEach((item) => {
        this.videoNameList.push({
          label: item.pointName,
          value: item.pointName,
        });
      });
    },
    handleSearch() {
      this.getList();
    },
    onClose() {
      this.$emit("onClose", false);
    },
    async lookVideo(row) {
      const res = await getDetailLiveUrl({
        crossingIndexCode: row.crossingIndexCode,
      });
      
      this.videoDialogTitle = row.videoName + "监控播放";
      this.videoUrl = res.data.data.url;
      this.cameraIndexCode = res.data.data.videoCode
      this.innerVisible = true;
    },
    showMoreAllHeader(event){
      this.option.column = [
        {
          label: "时间",
          prop: "captureTime",
          minWidth: 110,
        },
        {
          label: "图片",
          prop: "imagePath",
          minWidth: 100,
          // type: "img",
          slot: true
        },
        {
          label: "视频",
          slot: true,
          prop: "videoName",
          minWidth: 100,
        },
        {
          label: "出入口",
          prop: "tollName",
          minWidth: 80,
        },
        {
          label: "路段",
          prop: "roadName",
          minWidth: 80,
        },
        {
          label: "来源地",
          prop: "nativeLocation",
          minWidth: 80,
          dicData: originList
        },
        {
          label: "车辆颜色",
          prop: "vehicleColor",
          minWidth: 80,
        },
        {
          label: "品牌",
          prop: "brandName",
          minWidth: 80,
        },
        {
          label: "车牌",
          prop: "plateNo",
          minWidth: 80,
        },
        {
          label: "车型",
          prop: "vehicleTypeName",
          minWidth: 80,
        },
        {
          label: "方向",
          prop: "direction",
          minWidth: 80,
          dicData: directionList
        },
        {
          label: "<<",
          prop: '',
          slot: true,
          width: 40,
          renderHeader: (h, { column, $index }) => {
            return h('div',[
              h('span', {
                domProps: {
                  innerHTML: '<<'
                },
                on: {
                  click: this.showDefaultHeader
                },
                style: {
                  cursor: "pointer",
                },
              }),
            ])
          },
      }];
    },
    showDefaultHeader(){
      this.defaultHeader()
    },
    defaultHeader(){
      this.option.column = [
        {
          label: "时间",
          prop: "captureTime",
          minWidth: 110,
        },
        {
          label: "图片",
          prop: "imagePath",
          minWidth: 100,
          type: "img",
          slot: true
        },
        {
          label: "视频",
          slot: true,
          prop: "videoName",
          minWidth: 100,
        },
        {
          label: "出入口",
          prop: "tollName",
          minWidth: 80,
        },
        {
          label: "路段",
          prop: "roadName",
          minWidth: 80,
        },
        {
          label: ">>",
          prop: '',
          slot: true,
          showColumn: this.carType === 'all' || this.carType === 'dumpTruck' || this.carType === 'dangerCar',
          width: 40,
          renderHeader: (h, { column, $index }) => {
            return h('div',[
              h('span', {
                domProps: {
                  innerHTML: '>>'
                },
                on: {
                  click: this.carType === 'all' ? this.showMoreAllHeader : this.showMoreDumpTruckHeader
                },
                style: {
                  cursor: "pointer",
                },
              }),
            ])
          },
        }
      ];
    },
    showMoreDumpTruckHeader(){
      this.option.column = [
        {
          label: "时间",
          prop: "captureTime",
          minWidth: 110,
        },
        {
          label: "图片",
          prop: "imagePath",
          minWidth: 100,
          type: "img",
          slot: true
        },
        {
          label: "视频",
          slot: true,
          prop: "videoName",
          minWidth: 100,
        },
        {
          label: "出入口",
          prop: "tollName",
          minWidth: 80,
        },
        {
          label: "路段",
          prop: "roadName",
          minWidth: 80,
        },
        {
          label: "车牌",
          prop: "plateNo",
          minWidth: 80
        },
        {
          label: "方向",
          prop: "direction",
          minWidth: 80,
          dicData: directionList
        },
        {
          label: "车型",
          prop: "vehicleTypeName",
          minWidth: 80,
        },
        {
          label: "<<",
          prop: '',
          slot: true,
          width: 40,
          renderHeader: (h, { column, $index }) => {
            return h('div',[
              h('span', {
                domProps: {
                  innerHTML: '<<'
                },
                on: {
                  click: this.showDefaultHeader
                },
                style: {
                  cursor: "pointer",
                },
              }),
            ])
          },
      }];
    },
    beforeCloseVideo(){
      this.innerVisible = false;
    },
    reset() {
      this.plateNo = "";
      this.beginTime = "";
      this.endTime = "";
      this.direction = "all";
      this.roadName = "all";
      this.vehicleType = "all";
      this.videoName = "all";
    },
  },
};
</script>
<style lang="scss">
.tab-dialog {
  @media screen and (min-width: 6000px) {
    .el-dialog {
      width: 1300px;
    }
  }
  @media screen and (max-width: 6000px) {
    .el-dialog {
      width: 55%;
    }
  }
  .el-dialog__header {
    width: 100%;
    position: relative;
    height: 40px;
    background: rgba(15, 75, 99, 0.7);
    .el-dialog__headerbtn .el-dialog__close {
      color: #fffefe;
      line-height: 40px;
    }
    .el-dialog__headerbtn {
      line-height: 40px;
      position: absolute;
      top: 0;
      right: 10px;
    }
  }
  .el-dialog__title {
    background: rgba(15, 75, 99, 0.7);
    color: #fffefe;
    position: absolute;
    top: 0;
    left: 50px;
    text-align: center;
    line-height: 40px;
    height: 40px;
  }
  .el-button .search-btn .el-button--primary .el-button--small {
    background: #0e98c6;
    border: 2px solid #43d4ff;
    color: #ffffff;
    font-size: 12px;
  }

  .el-input__inner {
    height: 30px;
    width: 100%;
    background: #0d455c;
    color: #06b4e6;
    border: 2px solid #0ab8eb;
    opacity: 0.5;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #212e3e;
    background: red;
  }
  .el-dialog {
    background: rgba(13, 69, 92, 0.7);
    border: 1px solid rgba(10, 184, 235, 1);
    color: #fff;
    .el-table {
      background: transparent;
      border-color: #0ab8eb;
      border-width: 1px;
      border-style: solid;
      th.is-leaf {
        border-bottom-color: transparent;
      }
      .avue-empty__desc {
        color: #fff;
      }
    }
    .el-table__fixed::before {
      height: 0px;
    }
    .el-dialog__body {
      padding: 30px 60px;
      width: 100%;
      box-sizing: border-box;
    }
  }
  .el-table__body tr.hover-row.current-row > td,
  .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
  .el-table__body tr.hover-row.el-table__row--striped > td,
  .el-table__body tr.hover-row > td {
    background: rgba(13, 69, 92, 1);
  }
  .el-loading-mask {
    background: rgba(255, 255, 255, 0.3);
  }
  .el-input__icon {
    height: 100%;
    line-height: 0;
    color: #fff;
  }
  .el-table tr {
    background: transparent;
  }
  .el-table td,
  .el-table th {
    text-align: center;
    background: transparent;
    border-bottom: 0px;
    color: #fff;
  }

  .el-table--border::after,
  .el-table--group::after {
    right: 1px;
  }

  .el-button--mini,
  .el-button--mini.is-round {
    padding: 2px 6px;
  }
  .el-table {
    font-size: 12px;
    background: transparent;
    border: 1px solid rgba(10, 184, 235, 1);
    .avue-empty__desc {
      color: #fff;
    }
    &::before {
      height: 0px;
    }
  }
  .el-table td {
    padding: 2px;
  }
  .el-date-editor.el-input {
    width: 46%;
    margin-left: 10px;
  }
  .el-table__body-wrapper .is-scrolling-right {
    background: red;
    color: #0d455c;
  }
  .el-card{
    background-color: transparent;
  }
  .avue-crud__card .el-card{
    background-color: transparent;
  }
}
.tabdialogform{
  .avue-crud__img{
    cursor: pointer;
  }
}
</style>
<style lang="scss" scoped>
.vehicle-inquiry {
  position: absolute;
  left: 0;
  top: 0;
  color: #fff;
  pointer-events: auto;
}
.time-box {
  width: 48%;
  position: relative;
  clear: both;
  .date-to {
    vertical-align: top;
    margin-left: 10px !important;
    .date-connect {
      width: 9px;
      display: inline-block;
      border-bottom: 2px solid #0ab8eb;
      opacity: 0.5;
      top: 135px;
      left: 290px;
    }
  }
}
// .tab-dialog .el-date-editor.check-time{
//   margin-left: 48px!important;
// }
.page {
  color: #fff;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  align-items: center;
  padding: 0 17px;
  .jump-page {
    width: 50px;
  }
}
.dialog-video {
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #fff;
  .origin-car {
    margin-left: 25px;
  }
  .time-box {
    margin-right: 25px;
  }
  .video-select {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-select {
      flex: 1;
      margin-left: 10px;
    }
  }
}
.search-btn {
  width: 80px;
  float: right;
  margin-left: 25px;
}
.dialog-dier {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  box-sizing: border-box;
  margin-left: 10px;
  .check-type {
    flex: 1;
    width: 176px;
    margin-left: 6px;
  }
}
.input-width {
  width: 160px !important;
  margin-left: 5px;
}
.input-width-l {
  width: 90%;
}
.videoselect {
  .el-input__inner {
    width: 100%;
  }
}
.dialog-header {
  padding-right: 2px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  width: 100%;
  color: #fff;
  .car-ipt {
    width: 170px;
  }
}
.dialog-table {
  padding: 0 17px;
  height: 250px;
  overflow: auto;
}
.carConnect {
  margin-left: 10px;
}
.door {
  margin-left: 10px;
  .door-type {
    margin-left: 10px;
  }
}
</style>
<style lang="scss">
.innerDialog {
  .el-dialog{
    background: transparent;
  }
  .el-dialog__header {
    font-size: 0px;
    height: 40px;
    background: rgba(15, 75, 99, 0.7);
  }
  .el-dialog__body {
    padding: 0;
    background: rgba(13, 69, 92, 0.7);
  }
  .el-dialog__title {
    color: #fff;
    color: #fffefe;
    position: absolute;
    top: 0;
    left: 20px;
    text-align: center;
    line-height: 40px;
    height: 40px;
  }
  .el-dialog__headerbtn{
    line-height: 40px;
    position: absolute;
    top: 0;
    right: 10px;
    .el-dialog__close {
      color: #ffffff;
    }
  }
}
</style>
