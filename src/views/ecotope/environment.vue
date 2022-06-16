<template>
  <div class="danger" id="MudTruck">
    <DpHeader :active-on="5">
      <span>生态</span>
    </DpHeader>
    <div class="iframebox">
      <iframe class="isframe" src="http://172.21.118.209:9999/microFE-dapeng-base//#/home" frameborder=0 Border=0 Marginwidth=0 Marginheight=0 width=100% height="100%" scrolling=auto></iframe>
    </div>
  </div>
</template>

<script>

import DpHeader from "@/components/content/DpHeader";
export default {
  name: "environment",
  components: {
    DpHeader
  }
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
