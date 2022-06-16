<template>
    <div>
        <div class="tab-bar">
            <span v-if="showTail && !isShowTail" @click="onTail">车辆跟踪</span>
            <span v-if="showTail && isShowTail" @click="onCloseTail">关闭跟踪</span>
            <span v-if="showTail && showTrack">|</span>
            <span v-if="showTrack && !isShowTrack" @click="onTrack">车辆轨迹</span>
            <span v-if="showTrack && isShowTrack" @click="onCloseTrack">关闭轨迹</span>
            <!-- <span v-if="showTrack && showExplosion">|</span>
            <span v-if="showExplosion && !isShowExplosion" @click="onExplosion">爆炸模拟</span>
            <span v-if="showExplosion && isShowExplosion" @click="onCloseExplosion">关闭爆炸模拟</span> -->
        </div>
        <div class="popover-box" v-if="showExplosion">
            <el-popover
                placement="bottom"
                width="200"
                trigger="click"
                popper-class="car-popper"
                class="el-popover-wrap">
                <i slot="reference" class="el-icon-arrow-down"></i>
                <span class="explosion-btn" v-if="showExplosion && !isShowExplosion" @click="onExplosion">爆炸模拟</span>
                <span class="explosion-btn" v-if="showExplosion && isShowExplosion" @click="onCloseExplosion">关闭爆炸模拟</span>
            </el-popover>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        carInfo: {
            type: Object,
            default: function(){
                return {carCode: ''}
            }
        },
        show: {
            type: Boolean,
            default: false
        },
        showTail: {
            type: Boolean,
            default: true
        },
        showTrack: {
            type: Boolean,
            default: true
        },
        showExplosion: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isShowTail: false,
            isShowTrack: false,
            isShowExplosion: false,
            flagTrack: false
        };
    },
    computed: {
        trackText(){
            return this.isShowTrack ? '关闭轨迹' : '车辆轨迹'
        },
        tailText(){
            return this.isShowTail ? '关闭跟踪' : '车辆跟踪'
        },
        explosionText(){
            return this.isShowExplosion ? '关闭爆炸模拟' : '爆炸模拟'
        }
    },
    watch: {
        'carInfo': {
            handler(newVal, oldVal){
                if(newVal.carCode !== oldVal.carCode){
                    this.flagTrack = false
                    this.resetHandleTab("carInfo")
                }
            }
        },
        show(newVal){
            if(!newVal){
                this.resetHandleTab('show')
            }
        }
    },
    inject: ['mapPageVm'],
    methods: {
        onTail(){
            this.isShowTail = true
            // this.flagTrack = this.isShowTail ? true : false
            this.$emit('onTail', {code:this.carInfo.carCode || this.carInfo.vehicleno, show: this.isShowTail, vehicleType:this.carInfo.GPSType})
        },
        onCloseTail(){
            this.isShowTail = false
            this.$emit('onCloseTail', {code:this.carInfo.carCode || this.carInfo.vehicleno, show: this.isShowTail, vehicleType:this.carInfo.GPSType})
        },
        onTrack(){
            this.isShowTrack = true
            this.$emit('onTrack', {code:this.carInfo.carCode || this.carInfo.vehicleno, show: this.isShowTrack, vehicleType:this.carInfo.GPSType})
        },
        onCloseTrack(){
            this.isShowTrack = false
            this.$emit('onCloseTrack', {code:this.carInfo.carCode || this.carInfo.vehicleno, show: this.isShowTrack,vehicleType:this.carInfo.GPSType})
        },
        onExplosion(){
            this.isShowExplosion = true
            this.$emit('onExplosion', {code:this.carInfo.carCode || this.carInfo.vehicleno, show: this.isShowExplosion})
        },
        onCloseExplosion(){
            this.isShowExplosion = false
            this.$emit('onCloseExplosion', {code:this.carInfo.carCode || this.carInfo.vehicleno, show: this.isShowExplosion})
        },
        resetHandleTab(type){
            this.isShowTail = false
            this.isShowTrack = false
            this.isShowExplosion = false

            this.$emit('onResetHandleTab',{type})
        }
    },
}
</script>
<style lang='scss' scoped>
.tab-bar{
    pointer-events: auto;
    display: flex;
    justify-content: center;
    margin-top: 0.26rem;
    padding: 12px 0 6px 0;
    color: #fff;
    border-top: 1px solid rgba(10,184,235,.5);
    span{
        cursor: pointer;
        margin: 0 8px;
    }
}
.el-popover-wrap{
    margin: 0 auto;
    pointer-events: auto;
    cursor: pointer;
    color: #fff;
}
.popover-box{
    margin-bottom: -10px;
    text-align: center;
}

</style>
<style lang="scss">
.car-popper{
    width: 160px!important;
    background: none;
    padding: 8px 12px;
    text-align: center;
    color: #fff;
    border: 1px solid #0ab8eb;
    background: rgba(15, 75, 99, 0.7);
    border-radius: 1px;
    .popper__arrow{
            display: none!important;
    }
    .explosion-btn{
        cursor: pointer;
    }
}
</style>