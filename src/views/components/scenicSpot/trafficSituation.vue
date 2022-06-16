<template>
    <div class="traffic-situation">
        <sub-title title="景区交通状况"></sub-title>
        <div class="content">
            <ul class="list">
                <li class="item">
                    <img :src="congestion01" alt="">
                </li>
                 <li class="item">
                    <img :src="congestion02" alt="">
                </li>
                <li class="item">
                    <img :src="congestion03" alt="">
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import SubTitle from "@/components/common/SubTitle";
export default {
    components: {
        SubTitle
    },
    data(){
        return {
            congestion01: require('@/assets/images/congestion01.png'),
            congestion02: require('@/assets/images/congestion02.png'),
            congestion03: require('@/assets/images/congestion03.png')
        }
    }
}
</script>
<style lang="scss" scoped>
    .traffic-situation{
        .content{
            width: 100%;
            height: 120px;
            margin: 20px 0 30px 0;
            .list{
                display: flex;
                .item{
                    img{
                        height: 120px;
                    }
                    margin-right: 50px;
                }
            }
        }
    }
</style>