<template>
  <div class="blockData" id="blockDatablockData">
    <DpHeader :active-on="5">
      <span>块数据底板</span>
    </DpHeader>
    <div class="iframebox">
        <iframe class="isframe" src="http://172.21.108.28:8080/unifiedAddress" frameborder=0 Border=0 Marginwidth=0 Marginheight=0 width=100% height="100%" scrolling=auto></iframe> 
    </div>
  </div>
</template>

<script>

import DpHeader from "@/components/content/DpHeader";
export default {
  name: "service",
  data() {
    return {
        name: 'blockData'
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
.blockData,
#blockData {
  position: absolute;
  height: 100%;
  width: 100%;
}
@media screen and (max-width:1400px){
  .blockData{
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