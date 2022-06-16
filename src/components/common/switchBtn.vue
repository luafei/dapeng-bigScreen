<template>
    <div>
        <el-button-group>
            <el-button
            size="mini"
            @click="toggle(0)"
            class="btn-mini"
            :class="index === 0 && 'btn-mini-sel'"
            type="primary"
            >驶入</el-button>
            <el-button
            size="mini"
            @click="toggle(1)"
            class="btn-mini"
            :class="index === 1 && 'btn-mini-sel'"
            type="primary"
            >驶出</el-button>
        </el-button-group>
    </div>
</template>
<script>
    export default {
        props: {
            value: {
                type: Number,
                default: 0
            }
        },
        data(){
            return {
                index: 0
            }
        },
        methods: {
            toggle(val){
                this.index = val
                this.$emit('input', val)
                this.$emit('change', val)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .btn-mini {
        background: rgba(47, 234, 156, 0.06);
        border-radius: 1px 0px 0px 1px;
        width: 42px;
        height: 15px;
        line-height: 15px;
        font-size: 10px;
        border: none;
        padding: 0;
        span {
        height: 15px;
        line-height: 15px;
        }
    }
    .btn-mini--opacity {
        background: rgba(47, 234, 156, 0.06);
    }
    .btn-mini-sel {
        background: rgba(0, 242, 152, 1);
    }
</style>