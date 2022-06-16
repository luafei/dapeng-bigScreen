<template>
    <div>
        <sub-title :title="title"></sub-title>
        <div  class="pie-wrap">
            <sandbeachPie :showLegend="false" :subtext="subtext"></sandbeachPie>
            <div class="pie-right">
                <div class="right-title">{{subTitle}}</div>
                <ul class="list">
                    <li class="list-item">
                        <div class="item-left">
                            <span class="pot" :style="{background: 'red'}"></span>
                            <span class="name">大鹏</span>
                        </div>
                        <div class="item-right">
                            <span class="piece">5个</span>
                            <span class="percentage">15%</span>
                        </div>
                    </li>
                     <li class="list-item">
                        <div class="item-left">
                            <span class="pot" :style="{background: 'red'}"></span>
                            <span class="name">大鹏</span>
                        </div>
                        <div class="item-right">
                            <span class="piece">5个</span>
                            <span class="percentage">15%</span>
                        </div>
                    </li>
                    <li class="list-item">
                        <div class="item-left">
                            <span class="pot" :style="{background: 'red'}"></span>
                            <span class="name">大鹏</span>
                        </div>
                        <div class="item-right">
                            <span class="piece">5个</span>
                            <span class="percentage">15%</span>
                        </div>
                    </li>

                </ul>
            </div>
        </div>
    </div>
</template>
<script>

import SubTitle from "@/components/common/SubTitle";
import sandbeachPie from "@/components/echarts/sandbeachPie"

export default {
    components: {
        SubTitle,
        sandbeachPie
    },
    props: {
        title: {
            type: String,
            default: '各景区分布'
        },
        subTitle: {
            type: String,
            default: '各景区分布'
        },
        subtext: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            list: [1552, 513, 291, 436]
        }
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
    .pie-wrap{
        position: relative;
        overflow: hidden;
        margin-top: -5px;
        .pie-right{
            width: 150px;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            .right-title{
                color: #fff;
            }
            .list{
                color: #fff;
                .list-item{
                    display: flex;
                    justify-content: space-between;
                    line-height: 32px;
                    border-bottom: 1px solid rgba(2,255,255,0.2);
                    .item-left{
                        position: relative;
                        .pot{
                            width: 10px;
                            height: 10px;
                            border-radius: 50%;
                            position: absolute;
                            left: 0;
                            top: 50%;
                            margin-top: -5px;
                        }
                        .name{
                            margin-left: 15px;
                        }
                    }
                    .item-right{
                        .percentage{
                            margin-left: 10px;
                        }
                    }
                }
            }
        }
    }
</style>
