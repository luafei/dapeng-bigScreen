<template>
  <div class="danger" id="MudTruck">
    <!-- @click.native="goto" -->
    <DpHeader :active-on="6">
      <span >近海海域</span>
    </DpHeader>
    <div class="iframebox">
      <iframe class="isframe" src="http://172.21.118.209:9999/microFE-dapeng-base//#/home" frameborder=0 Border=0 Marginwidth=0 Marginheight=0 width=100% height="100%" scrolling=auto></iframe>
    </div>
  </div>
</template>

<script>

import DpHeader from "@/components/content/DpHeader";
export default {
  name: "offshore",
  components: {
    DpHeader
  },
  methods:{
      // toto(){
      //    console.log(11)
      // }
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
