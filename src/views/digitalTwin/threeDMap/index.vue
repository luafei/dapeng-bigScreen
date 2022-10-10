<template>
  <div class="threeDMap" id="threeDMap">
    <DpHeader :active-on="7">
      <span>三维地图</span>
    </DpHeader>
    <div class="iframebox">
        <iframe class="isframe" src="http://172.21.112.157/app03/dapeng3/pages/" frameborder=0 Border=0 Marginwidth=0 Marginheight=0 width=100% height="100%" scrolling=auto></iframe> 
    </div>
  </div>
</template>

<script>

import DpHeader from "@/components/content/DpHeader";
export default {
  name: "service",
  data() {
    return {
    };
  },
  components: {
      DpHeader
  },
  mounted() {

  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
.threeDMap,
#threeDMap {
  position: absolute;
  height: 100%;
  width: 100%;
}
@media screen and (max-width:1400px){
  .threeDMap{
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