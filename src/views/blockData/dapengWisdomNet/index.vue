<template>
  <div class="dapengWisdomNet">
    <DpHeader :active-on="5">
      <span>大鹏智网</span>
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
        name: 'dapengWisdomNet',
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
            _that.currentUrl =  "http://113.105.69.178:9000/dpzhzl/module/main.shtml";
        })
        // $.get(`http://192.168.31.70:8888/dpzhzl/system/loginTemp.sys?userName=${userName}&password=${aespass}&ts=${ts}`, function(res) {
        //     _that.currentUrl =  "http://192.168.31.70:8888/dpzhzl/module/main.shtml";
        // })
    }
  }
};
</script>

<style lang="scss" scoped>
.dapengWisdomNet,
#dapengWisdomNet {
  position: absolute;
  height: 100%;
  width: 100%;
}
@media screen and (max-width:1400px){
  .dapengWisdomNet{
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