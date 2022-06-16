<template>
  <div class="digitalSignage" id="digitalSignage">
    <DpHeader :active-on="4">
      <span>数字看板</span>
    </DpHeader>
    <div class="iframebox">
        <iframe class="isframe" src="http://172.21.13.21/dpyqscreen/#/flowModulationHome" frameborder=0 Border=0 Marginwidth=0 Marginheight=0 width=100% height="100%" scrolling=auto></iframe> 
    </div>
  </div>
</template>

<script>

import DpHeader from "@/components/content/DpHeader";
export default {
  name: "service",
  data() {
    return {
        name: 'wisdomSutraService'
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
.digitalSignage,
#digitalSignage {
  position: absolute;
  height: 100%;
  width: 100%;
}
@media screen and (max-width:1400px){
  .digitalSignage{
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