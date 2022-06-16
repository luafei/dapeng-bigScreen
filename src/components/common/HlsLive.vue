<template>
  <div>
    <video-player class="vjs-custom-skin"
      ref="videoPlayer"
      :options="playerOptions"
      @ready="playerReadied">
    </video-player>
  </div>
</template>

<script>
import 'videojs-contrib-hls'

export default {
  name: 'hls-live',
  props: {
    src: {
      type: String,
      default: 'http://117.14.55.74:10810/nvc/huaan/hls/stream_3/stream_3_live.m3u8'
    }
  },
  data () {
    return {
      playerOptions: {
        sources: [{
          withCredentials: false,
          type: "application/x-mpegURL",
          src: this.src
        }],
        controlBar: {
          timeDivider: false,
          durationDisplay: false
        },
        flash: { hls: { withCredentials: false }},
        html5: { hls: { withCredentials: false }},
        autoplay: true, // 自动播放
        // controls: true, // 控制条
        fluid: true, // 按比例缩放适应容器
        // preload: 'auto', // 预加载
        // muted: true, // 消除所有音频
        // loop: false, // 循环播放
        aspectRatio: "16:9",
        // poster: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-9.jpg' //首屏图片
      }
    }
  },
  watch:{
    src(newVal){
      if(newVal){
        this.playerOptions.sources[0].src = newVal
      }
    }
  },
  methods: {
    playerReadied(player, options) {
      var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
      player.tech_.hls.xhr.beforeRequest = function(options) {
        return options
      }
    }
  },
}
</script>