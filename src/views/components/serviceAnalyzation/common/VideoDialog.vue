<template>
  <el-dialog
    title=""
    :visible.sync="show"
    width="40%"
    append-to-body
    :close-on-click-modal="false"
    class="tab-dialog  total-business-dialog"
    :before-close="handleClose">
    <video-player 
      v-if="show" 
      ref="videoPlayer" 
      class="gov-video-player"
      :options="playerOptions">
    </video-player>
  </el-dialog>
</template>

<script>
export default {
  name: '',
  components: {
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      playerOptions: {
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        muted: true,
        autoPlayer: true,
        sources: [{
          type: "video/mp4",
          src: require('@/assets/video/dp-gov.mp4')
        }],
      }
    };
  },
  computed:{
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  created(){
  },
  watch:{
    show(newVal){
      if(newVal){
        this.$nextTick(() => {
          this.$refs.videoPlayer.player.play()
        })
      }
    }
  },
  methods: {
    handleClose(){
      this.$emit('update:show')
    }
  },
};
</script>

<style lang='scss'>
  .gov-video-player{
    .video-js {
      width: auto;
      max-height: 500px;
    }
  }
</style>
