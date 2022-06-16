<template>
  <div class="gis">
  </div>
</template>

<script>


export default {
  name: "gis",
  data() {
    return {
        name: 'edwin'
    };
  },
  mounted() {

  },
  methods: {

  },
  beforeDestroy() {
  },
  beforeRouteLeave (to, from, next) {
  }
};
</script>

<style lang="scss" scoped>
.danger {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: auto;
  z-index: 2;
}
@media screen and (max-width: 1400px) {
  .danger {
    height: 100%;
  }
}
.danger-chart {
  height: calc(100% - 70px);
  display: flex;
  justify-content: space-between;
  padding: 0 26px;
}
.danger-left {
  width: 360px;
  pointer-events: auto;
  .today-flow {
    justify-content: space-between;
    margin-bottom: 30px;
  }
  .row-bg {
    flex-direction: column;
    height: 100%;
  }
}
.danger-right {
  width: 360px;
  pointer-events: auto;
  .row-bg {
    flex-direction: column;
    height: 100%;
  }
}
.daner-left-filter,
.daner-right-filter {
  width: 400px;
  height: 100%;

  position: absolute;
  top: 0;
  backdrop-filter: brightness(100%) saturate(100%) grayscale(30%) blur(2px);
  box-shadow: 0px 150px 300px 2px rgba(0, 0, 0, 0.2);
}
.daner-left-filter {
  left: 0;
}
.daner-right-filter {
  right: 0;
}
.rankingdis{
  margin-top: 20px;
}
.com-item{
  margin-top: 20px;
}
.Dialongright{
  width: 500px;
  height: 100px;
  border:1px red   ;
}
</style>