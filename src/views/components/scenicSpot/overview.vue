<template>
    <div class="overview">
        <sub-title :title="title" @onToggle="handleTitle"></sub-title>
        <div  class="pie-wrap">
            <warningPie :values="list" :statisticName="'景区数'" :title="subTitle" showPercentage></warningPie>
        </div>
    </div>
</template>
<script>
import warningPie from "@/components/echarts/warningPie";
import SubTitle from "@/components/common/SubTitle";

export default {
    components: {
        warningPie,
        SubTitle
    },
    props: {
        title: {
            type: String,
            default: '各景区分布'
        },
        subTitle: {
            type: String,
            default: '各景区分布'
        }
    },
    data(){
        return {
            list: [1552, 513, 291, 436]
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
            overflow: hidden;
            margin: 15px 0;
        }
    }
</style>
