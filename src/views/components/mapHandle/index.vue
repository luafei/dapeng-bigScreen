<template>
    <div class="map-handle">
        <el-checkbox-group ref="checkboxGroup"  v-model="mapPageVm.checkFeatures" size="mini" class="handle-group" >
            <el-checkbox-button v-for="(item, index) in list" :key="index" :label="item.prop" :name="item.prop" @change="item.onChange" class="handle-group-item">
                <!--  表格总宽度:width="tableWidth" -->
                <el-popover
                    v-if="isShowPopver(item.prop)"
                    placement="left"
                    
                    :popper-class="'handle-popover'"
                    @show="togglePopover(item.prop)"
                    trigger="hover">
                        <!-- 危化品企业、加油站 -->
                        <el-table  :fit='true' v-if="item.prop === 'dangerGoodsEnterprise' || item.prop === 'gasSite'" :show-header="showHeader" :data="tableList" class="popover-table"  @row-click="rowClick">
                            <el-table-column :fit='true' :width="400" property="pointName"></el-table-column>
                        </el-table>
                        <!-- 电子围栏 -->
                        <el-table v-if="item.prop === 'electricFenceDangerCar' || item.prop === 'electricFenceDumpTruck'" :data="tableList" class="popover-table">
                            <el-table-column :width="230" label="围栏名称">
                                <template slot-scope="scope" >
                                    <el-input v-model="scope.row.name" v-if="scope.row.showInput" size="mini" clearable placeholder="请输入围栏名称"></el-input>
                                    <span v-else>{{scope.row.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  label="操作">
                                <template slot-scope="scope">
                                    <el-button @click="selectElectricFence(scope.row, scope.$index)" :disabled="scope.row.showInput" style="color:#fff; margin-right:6px " type="text" size="small">{{scope.row.show ? '关闭' : '查看'}}</el-button>
                                    <!-- <el-button @click="updateElecticFence(scope.row)" type="text" :disabled="scope.row.showInput" style="color:#fff;" size="small">修改</el-button> -->
                                    <el-button @click="delElecticFence(scope.row.name)" type="text" :disabled="scope.row.showInput" style="color:#fff; margin-left:0;" size="small">删除</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                width="100px"
                                >
                                <template slot="header"  slot-scope="scope">
                                    <el-button type="primary" @click="addElectriFence" size="mini">{{mapPageVm.isAddElectriFence ? '取消' : '新增围栏'}}</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 危化品车辆-->
                        <el-table  :show-header="showHeader"  v-if="item.prop === 'truckGps' || item.prop === 'carGps'"  :data="tableData" class="popover-table "  @row-click='(row,column,e)=>creatRoad(row,column,e,item)'>
                            <label :for="item.prop">
                                <el-table-column   prop="name"  label="">
                                    <!-- 危化品车辆数量显示 -->
                                    <!-- <template  slot-scope="scope"> -->
                                        <!-- {{scope.row.name === '车辆' ? `${scope.row.name} ${carNumObj.truckGps }` : scope.row.name }} -->
                                        <!-- {{scope.row.name === '车辆' ? ` ${carNumObj.carGps}` : '' }} -->
                                    <!-- </template> -->
                                    <!-- 泥头车车辆数量显示 -->
                                    <!-- <template  slot-scope="scope">
                                        {{scope.row.name === '车辆' ? `${scope.row.name} ${carNumObj.carGps}` : scope.row.name }}
                                    </template> -->
                                </el-table-column>
                            </label>
                        </el-table>
                        
                        <img slot="reference" v-if="isChecked(item.prop)" :src="item.iconSel" class="icon" :alt="item.name">
                            <img slot="reference" v-else :src="item.icon" class="icon" :alt="item.name">
                </el-popover>
                <div v-else>
                    <img slot="reference" v-if="isChecked(item.prop)" :src="item.iconSel" class="icon" :alt="item.name">
                    <img slot="reference" v-else :src="item.icon" class="icon" :alt="item.name">
                </div>
                <!-- 这个是那个显示数字的 -->
                <div v-if="isShowRedTips(item.prop)" class="count-tips">
                    <!-- <span v-if="item.count !== '' && item.count >= 0">
                        {{item.count}}
                    </span> -->
                    <!-- 下面这个是数量 -->
                    <span v-if="carNumObj[item.prop] !== '' && carNumObj[item.prop] >= 0">
                        {{carNumObj[item.prop]}}
                    </span>
                    <i v-else class="el-icon-loading"></i>
                </div>
            </el-checkbox-button>
        </el-checkbox-group>
    </div>
</template>

<script>
import  mapHandle from './index.js'
import { mapGetters } from 'vuex'
import vehicle from '@/views/mixins/vehicle'
import { carInteractive } from '@/views/mixins/carInteractive.js'
export default {
    props: {
        typePage: {
            type: String,
            default: ''
        }
    },
    mixins:[vehicle, carInteractive()],
    components: {},
    inject: ['mapPageVm'],
    data() {
        return {
            checkFeatures: [],
            list: mapHandle[this.typePage],
            tableList: [],
            // tableWidth: 300,
            showHeader: false,
            tableData:[{
                name:'车辆'
            },{
                name:'轨迹'
            }],
            itemsHasPopover: ['dangerGoodsEnterprise', 'gasSite', 'electricFenceDangerCar', 'electricFenceDumpTruck','truckGps','carGps'],
            
        };
    },
    computed: {
        // columnWidth(){
            // return this.tableWidth - 30
        // },
        // wolaisuan(){
            // return this.tableWidth + 1500    
        // },
        ...mapGetters(['carNumObj']),
    },
    created() {
    },

    watch: {

        typePage(newVal){
            this.list = mapHandle[newVal]
        },
        carNumObj: {
            handler(newVal){
                for(let key in newVal){
                    this.list.forEach((item) => {
                        if(item.prop === key){
                            item.count = newVal[key]
                        }
                    })
                }
            },
            deep: true
        }
    },
    mounted() {
        mapHandle.getCurrentThis(this)
    },
    methods: {
        handleChange(){
        },
        isChecked(val){
            return this.mapPageVm.checkFeatures.includes(val)
        },
        isShowRedTips(val){
            let prop = [ 'bus','truckGps','carGps' ,'taxi'].includes(val)
            if(this.isChecked(val) && prop){
                return true
            }
        },
        togglePopover(type){  //鼠标经过危化品企业图标、加油站图标时展示侧边栏
            switch(type){
                case 'dangerGoodsEnterprise':
                    this.tableList = this.mapPageVm.dangerGoodsEnterpriseList
                    break;
                case 'gasSite':
                    this.tableList = this.mapPageVm.gasList
                    break;
                case 'electricFenceDumpTruck':
                    this.tableList = this.mapPageVm.electriFanceList //mixin electriFence.js
                    break;
                case 'electricFenceDangerCar':
                    this.tableList = this.mapPageVm.electriFanceList //mixin electriFence.js
                    break;
                // case 'truckGps':
                //     this.tableList = this.mapPageVm.truckGpsList
                //     break; 
            }
        },
        rowClick(row, column, event){
            let {latitude, longitude, pointCode, pointName, pointType} = row
            
            this.mapPageVm.moveMap(longitude, latitude, 20000)
             if(pointType === '1'){
                 
                maplayers['dangerGoodsEnterprise'] || this.mapPageVm.handleDangerGoodsEnterprise(true)
                !this.mapPageVm.checkFeatures.includes('dangerGoodsEnterprise') && this.mapPageVm.checkFeatures.push('dangerGoodsEnterprise')
                return
            }
            if(pointType === '2'){
                maplayers['gasSite'] || this.mapPageVm.handleGasSite(true)
                !this.mapPageVm.checkFeatures.includes('gasSite') && this.mapPageVm.checkFeatures.push('gasSite')
                return
            }
        },
        addElectriFence(){
            this.mapPageVm.isAddElectriFence = !this.mapPageVm.isAddElectriFence
            if(this.mapPageVm.isAddElectriFence){
                this.mapPageVm.drawPlane()
                this.mapPageVm.electriFanceList.unshift({
                    showInput: true,
                    name: '',
                    point3s: []
                })
            }else {
                this.mapPageVm.electriFanceList.shift()
                this.mapPageVm.cancelDraw()
            }
        },
        selectElectricFence(row, index){
            if(row.show){
                row.show = false
                this.$set(this.mapPageVm.electriFanceList, index, row)
                this.mapPageVm.removeSingleElectriFence(row, index)
            }else {
                row.show = true
                this.$set(this.mapPageVm.electriFanceList, index, row)
                this.mapPageVm.showPlane(row)
            }
        },
        // updateElecticFence(row){
        //     this.mapPageVm.updateElectronicFence(row)
        // },
        delElecticFence(name){
            this.mapPageVm.delElectronicFence(name)
        },
        isShowPopver(prop){
            if(this.itemsHasPopover.includes(prop)) return true
        },
        showTip(prop){
            
            if(this.mapPageVm[prop]){
                if(this.mapPageVm[prop].count || this.mapPageVm[prop].count === 0){
                    return true
                }
            }
            return false
        },
        // 危化品,泥头车点击事件 这个是车辆点击事件
        creatRoad(row ,cloumn ,event, item){
            if(item.prop  === 'truckGps'){
                // removeImportRoad(map)
                if(row.name === '车辆'){
                    if(maplayers["dangerGoodsVihecle"]){
                        // this.$store.dispatch('GetCarNum', { type: 'truckGps', count: '' })
                        this.mapPageVm.handleAddtruckGps(false)
                    }else {
                        this.mapPageVm.handleAddtruckGps(true)
                    }
                    maplayers["dangerGoodsVihecle"] = !maplayers["dangerGoodsVihecle"]
                }else if(row.name === '轨迹'){
                    if(maplayers["dangerGoodsguiji"]){
                        removeImportRoad(map)
                    }else {
                        addImportRoad({
                            map,
                            type:'whpCar',
                            width:6
                        }) 
                    }
                   maplayers["dangerGoodsguiji"] = !maplayers["dangerGoodsguiji"]
                }
                
                if(!maplayers["dangerGoodsVihecle"] && !maplayers["dangerGoodsguiji"]){
                    this.mapPageVm.checkFeatures = this.mapPageVm.checkFeatures.filter((item, index) => {
                            return item !== 'truckGps'
                    })
                } else {
                    if (!this.mapPageVm.checkFeatures.includes('truckGps')) {
                         this.mapPageVm.checkFeatures.push('truckGps') 
                    }
                }
            }else if(item.prop === 'carGps'){
                if(row.name === '车辆'){
                    if(maplayers["dumpTrucksVihecle"] ){
                        // this.$store.dispatch('GetCarNum', { type: 'carGps', count: '' })
                        this.mapPageVm.handlecarGps(false)
                    }else {
                        this.mapPageVm.handlecarGps(true)
                    }
                    maplayers["dumpTrucksVihecle"] = !maplayers["dumpTrucksVihecle"]
                }else if(row.name === '轨迹'){
                    if(maplayers["dumpTrucksguiji"]){
                        removeImportRoad(map)
                    } else {
                        addImportRoad({
                            map,
                            type:'ntcCar',
                            width:6
                        })
                    } 
                      maplayers["dumpTrucksguiji"] = !maplayers["dumpTrucksguiji"]
                }
                if(!maplayers["dumpTrucksVihecle"] && !maplayers["dumpTrucksguiji"]){
                            this.mapPageVm.checkFeatures = this.mapPageVm.checkFeatures.filter((item, index) => {
                               return item !== 'carGps'
                        })
                } else {
                            if (!this.mapPageVm.checkFeatures.includes('carGps')) {
                                 this.mapPageVm.checkFeatures.push('carGps') 
                        }
                }
            }
        }
    }
}
</script>
<style lang='scss'>
    .map-handle{
        .handle-group {
            display: flex;
            flex-direction: column;
            .handle-group-item{
            .el-checkbox-button__inner{
                    width: 100px!important;
                    border: none!important;
                    background: none;
                    box-shadow: none;
                    .icon{
                        height: 48px;
                    }
                }
            }
        }
    }
    .handle-popover{
        background-color: rgba(15, 75, 99, 0.7);
        border-color:rgba(15, 75, 99, 0.9); 
        .popover-table{
            max-height: 300px;
            overflow-y: scroll;
            &::before{
                background-color:transparent!important;
            }
            .el-table__body-wrapper{
                overflow-x: hidden;
                .el-table__body{
                    background-color: rgba(15, 75, 99, 0.7);
                    .el-table__row{
                        background-color: rgba(15, 75, 99, 0.7);
                        &:hover > td{
                            background-color: rgba(15, 75, 99, 0.9);
                            color: #fff;
                        }
                        td{
                            color: #fff;
                            border-color:rgba(15, 75, 99, 0.9); 
                        }
                    }
                }
            }
            .el-table__header-wrapper{
                .el-table__header{
                    .has-gutter{
                        tr, th{
                            background-color: rgba(15, 75, 99, 0.7)!important;
                            color: #fff;
                        }
                    }
                }
            }
        }
        .popper__arrow{
            // border-left-color:rgba(15, 75, 99, 0.9)!important; 
            &::after{
                // border-color:rgba(15, 75, 99, 0.7)!important; 
                border-left-color: none!important;
            }
        }
    }
    .count-tips{
        width:auto;
        position:absolute;
        top:0;
        left:50px;
        padding:2px 4px; 
        color:#fff; 
        border-radius: 20%;
        background-color: red;
    }
</style>