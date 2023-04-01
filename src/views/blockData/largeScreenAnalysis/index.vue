<template>
  <div class="largeScreenAnalysis">
    <DpHeader :active-on="5">
      <span>大屏分析</span>
    </DpHeader>
    <div class="iframebox">
        <iframe class="isframe" :src="currentUrl" frameborder=0 Border=0 Marginwidth=0 Marginheight=0 width=100% height="100%" scrolling=auto></iframe> 
    </div>
  </div>
</template>

<script>

import DpHeader from "@/components/content/DpHeader";
import AES from '@/utils/AES';
export default {
  name: "service",
  data() {
    return {
        name: 'largeScreenAnalysis',
        currentUrl: ""
    };
  },
  components: {
      DpHeader
  },
  mounted() {
    console.log('mounted');
    this.getUserAuth();
  },
  methods: {
    getUserAuth() {
        var userName = "区指挥中心";
        var passord = "Sz#12345";
        var ts = new Date().getTime();
		    var keyStr = 'hzf';
        var aespass = AES.encryptTS(passord, keyStr, ts);
        var _that = this;
        $.get(`http://113.105.69.178:9000/dpzhzl/system/loginTemp.sys?userName=${userName}&password=${aespass}&ts=${ts}`, function(res) {
            _that.currentUrl =  "http://113.105.69.178:9000/dpzhzl/module/main.shtml?subsysid=0b75567b984746aea29617a4f56a3565";
        })
        // $.get(`http://192.168.31.70:8888/dpzhzl/system/loginTemp.sys?userName=${userName}&password=${aespass}&ts=${ts}`, function(res) {
        //     _that.currentUrl =  "http://192.168.31.70:8888/dpzhzl/module/main.shtml?subsysid=0b75567b984746aea29617a4f56a3565";
        // })
    }
  }
};
</script>

<style lang="scss" scoped>
.largeScreenAnalysis,
#largeScreenAnalysis {
  position: absolute;
  height: 100%;
  width: 100%;
}
@media screen and (max-width:1400px){
  .largeScreenAnalysis{
    height: 100%;
  }
}
.iframebox{
  position: absolute;
  height: 100%;
  width: 100%;
  top:0;
  overflow: auto;
  .isframe{
    position: absolute;
    height: 100%;
    width: 100%;
    pointer-events: auto;
  }
}
</style>