<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import echartsRem from '@/mixins/echartsRem'
// import dicData from '@/mixins/dicData'
// import { startWebsocket, stopWebsocket } from '@/api/websocket'
export default {
  name:'app',
  // mixins: [dicData],
  // provide () {
  //   return {
  //     app: this
  //   }
  // },
  data(){
    return {

    }
  },
  created() {
    // console.log(process.env.NODE_ENV === 'development','process.env.VUE_APP_BASE_API')
    // console.log(document.documentElement.style = "zoom:;",'000')
    // this.$socketApi.sendSock(async (data) => {
    //   console.log(data,'data');
    //   await startWebsocket()
    // })
  },
  mounted() {
  },
  methods: {
    
  },
}
</script>

<style>
  #app{
    height: 100%;
  }
</style>
