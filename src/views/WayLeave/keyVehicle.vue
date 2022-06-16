<template>
  <div class="danger" id="MudTruck">
    <DpHeader :active-on="0">
      <span>重点车辆监测</span>
    </DpHeader>
    <div class="iframebox">
      <iframe class="isframe" src="http://172.21.17.87:6888/#/zhogndian-cheliang" frameborder=0 Border=0 Marginwidth=0 Marginheight=0 width=100% height="100%" scrolling=auto></iframe>
    </div>
  </div>
</template>

<script>

import DpHeader from "@/components/content/DpHeader";
export default {
  name: "WayLeave",
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
