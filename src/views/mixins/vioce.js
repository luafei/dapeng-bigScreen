import {
  startWebsocket,
  stopWebsocket,
} from '@/api/websocket'

export default {
  data() {
    return {
      voiefang:require("@/assets/images/voicefang.png"),
      voicebiao:require('@/assets/images/voice.png'),
      name:''
    }
  },
  mounted() {
    // setTimeout(() => {
    //    this.newdata()
    // }) 
  },
  methods: {
    // showVideoOfNotStructureData(videoCode,videoName) {
    //   this.videoLiveDialog= true
    //   this.currentVideoCode = videoCode
    //   // this.currentVideoTitle = videoName
    // },
    handlevoice(val) {//新增语音
      if(val) {
        this.linstenVoice()
      }else {
          this.stoplistnVoice()
          removeVoiceSearch(map)
          map.reset()
      }    
  },
  // 开启websocket
    async linstenVoice() {
      await startWebsocket()
      this.$socketApi.sendSock((data) => {
        if(data.indexOf('word') !== -1) {
          this.name = data.split('=')[1]
         this.getVoice()
        }
      })
      
    },
    // 关闭websocket
    async stoplistnVoice() {
      await stopWebsocket()
    },
    getVoice( ) {
      let val = {
        map,
        addressImg:this.voiefang,//搜索结果落图
        name:this.name,//语音识别关键字
        radius:200,//周边查询半径
        radiusColor:'#05EBEC',//周边查询范围颜色
        type:'camera',//周边查询类型 暂时只㓟camera
        typeImg:this.voicebiao,//查询结果落图
        fontColor:'rgba(255,255,255,1)',// 文字默认颜色
        fontColorActive:'#05EBEC'//文字选中颜色
      }  
      addVoiceSearch(val, (e) => {
         
         if(!e.result[0].adcode ) {
          this.showVideoOfNotStructureData(e.result[0])
      }
      })
    },
  }
}