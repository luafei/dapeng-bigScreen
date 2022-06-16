<template>
    <div class="overview">
        <sub-title :title="title" @onToggle="handleTitle"></sub-title>
        <div  class="pie-wrap">
            <sandbeach-Pie :subtext="'客流量总数'" :sourceOp="sourceOp"></sandbeach-Pie>
        </div>
    </div>
</template>
<script>

import SubTitle from "@/components/common/SubTitle";
import sandbeachPie from "@/components/echarts/sandbeachPie"

export default {
    components: {
        sandbeachPie,
        SubTitle
    },
    props: {
        title: {
            type: String,
            default: '客流量统计'
        },
        subTitle: {
            type: String,
            default: '各景区分布'
        }
    },
    data(){
        return {
            list: [1552, 513, 291, 436],
            sourceOp: {
                title: {
                    text: '123'
                },
                legend: {
                    data: [{
                        name: '一日客流量：6362',
                    },{
                        name: '过夜游客：7362',
                    }]
                }
            }
        }
    },
    mounted(){
        this.getData();
    },
    methods: {
        getData(){
           
        },
        handleTitle(){
            this.$emit('onHandleTitle')
        }
    }
}
</script>
<style lang="scss" scoped>
    .overview{
        .pie-wrap{
            overflow: hidden;
            margin: 15px 0;
        }
    }
</style>
