<template>
  <div class="danger" id="MudTruck">
    <DpHeader :active-on="3">
      <span>大厅运行监测</span>
    </DpHeader>
    <div class="iframebox">
      <iframe class="isframe" src="https://172.21.17.68/web_vue/dist/?user-token=cf8z9e#/single-page/1220?backPath=true&playMode=f%3Apc&hideDisplayTypeSwitch=true&_v=1618299026892" frameborder=0 Border=0 Marginwidth=0 Marginheight=0 width=100% height="100%" scrolling=auto></iframe>
    </div>
  </div>
</template>

<script>

import DpHeader from "@/components/content/DpHeader";
export default {
  name: "operation",
  components: {
    DpHeader
  },
  data() {
    return {
    }
  },
};
</script>

<style lang="scss">
.danger,
#MudTruck {
  position: absolute;
  height: 100%;
  width: 100%;
}
@media screen and (max-width:1400px){
  .danger{
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
