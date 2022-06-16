<template>
    <div class="overview">
        <sub-title :title="title" @onToggle="handleTitle"></sub-title>
        <div class="pie-wrap">
            <el-row type="flex">
                <el-col :span="6" v-for="(item, index) in list" :key="item.title" >
                    <wuliquid-fill :title="item.title" :num="item.num" :color="item.color" :sourceOp="sourceOp " :id="'wuliquid-fill'+index" :key="item.id"></wuliquid-fill>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>

import SubTitle from "@/components/common/SubTitle";
import WuliquidFill from '@/components/echarts/WuliquidFill'

export default {
    components: {
        SubTitle,
        WuliquidFill
    },
    props: {
        title: {
            type: String,
            default: '客流量变化同比'
        }
    },
    data(){
        return {
            list: [
                {
                    id: 1,
                    num: 4464,
                    title: "南澳"
                },
                 {
                    id: 2,
                    num: 4464,
                    title: "大鹏"
                },
                 {
                    id: 3,
                    num: 4464,
                    title: "葵涌"
                },
                {
                    id: 4,
                    num: 4464,
                    title: "xxx"
                }
            ],
            sourceOp:{
                series: [
                    {
                        radius: '80%'
                    },
                    {
                        radius:["85%", "85.5%"],
                    }
                ]
            }
        }
    },
    methods: {
        handleTitle(){
            this.$emit('onHandleTitle')
        }
    }
}
</script>
<style lang="scss" scoped>
    .overview{
        .pie-wrap{
            // display: flex;
            overflow: hidden;
            margin: 15px 0;
        }
    }
</style>
