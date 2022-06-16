<template>
   <div class="danger-down">
           <div class="down-one">
              <div class="down-stb" @click="addtionclick(1)" :class="{down_stb_active:activeindex == '1'}">总体业务</div>
              <div class="down-stb" @click="addtionclick(2)" :class="{down_stb_active:activeindex == '2'}">服务指标</div>
           </div>
    </div>
</template>

<script>

export default {
  props: {
    activeindex: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
     
    };
  },
  created() {
    
  },

  methods: {
    addtionclick(index) {
        if(index == 1){
          this.$router.push('/serviceAnalyzation')
        }else if(index == 2) {
           this.$router.push('/businessanalysis')
        }
      }
  },
};
</script>

<style lang="scss" scoped>
.danger-down{
  width: 100%;
  height: 65px;
  pointer-events: auto;
  // background: red;
  position: fixed;
  bottom: 0px;
  right: 0px;
  .down-one{
  width: 100%;
  height: 60px;
  text-align: center;
  background-size: 100% 60px!important;
  background: url(../../assets/images/undeline.png) no-repeat;
  }
  .down-stb{
    display: inline-block;
    margin:12px;
    width: 86px;
    height: 26px;
    background: rgba(50,253,246,0.3);
    color:#fff;
    line-height: 26px;
    cursor: pointer;
  }
  .down_stb_active{ 
    background:rgba(50,253,246,1)
  }
}
</style>
