<template>
    <div class="video-distribution">
        <sub-title title="视频分布"></sub-title>
        <div class="content">
            <ul class="list">
                <li class="item">
                    <img class="icon" src="" alt="">
                    <span class="name">葵涌</span>
                    <div class="bus">60路</div>
                </li>
                 <li class="item">
                    <img class="icon" src="" alt="">
                    <span class="name">葵涌</span>
                    <div class="bus">60路</div>
                </li>
                 <li class="item">
                    <img class="icon" src="" alt="">
                    <span class="name">葵涌</span>
                    <div class="bus">60路</div>
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
           
        }
    }
}
</script>
<style lang="scss" scoped>
    .video-distribution{
        .content{
            margin-top: 16px;
            .list{
                display: flex;
                .item{
                    position: relative;
                    width: 90px;
                    height: 80px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-right: 30px;
                    background: rgba(255,255,255,0);
                    border: 1px solid #32fdf6;
                    border-radius: 4px;
                    &:nth-last-child(1){
                        margin-right: 0
                    }
                    .icon{
                        width: 30px;
                        height: 30px;
                        margin-top:4px;
                    }
                    .name{
                        margin-top:4px;
                        font-size: 12px;
                        color: #32fdf6;
                    }
                    .bus{
                        position: absolute;
                        bottom:0;
                        left: 0;
                        width: 100%;
                        height: 20px;
                        line-height: 20px;
                        background: rgba(50,253,246,0.3);
                        color: #fff;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>