import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BScroll from 'better-scroll'
import './assets/style/reset.css'
// import '@/utils/rem'
import ElementUI from 'element-ui';
Vue.use(ElementUI)
    // import '@/config/elementUI.js'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/index.scss'
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
Vue.use(Avue);
// import echarts from 'echarts';
import echarts from './config/echarts';

// import "echarts-liquidfill"
import store from './store'
import './permission'

import * as socketApi from './utils/websocket'
// 视频播放 vue-video-player
import VueVideoPlayer from 'vue-video-player'
// require videojs style
import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'

Vue.use(VueVideoPlayer
/* {
  options: global default options,
  events: global videojs events
} */
)
Vue.prototype.$socketApi = socketApi

// import './mock/index'
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$BScroll = BScroll

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')