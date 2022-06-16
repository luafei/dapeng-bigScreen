<template>
 <div class="three-nav-container">
    <!-- <div class="undeline-container">
      <img src="../../assets/images/undeline.png" alt="">
    </div> -->
    <div class="three-nav">    
      <div class="nav-left"  @click="preTab"><img src="../../assets/images/three_nav_left.png" alt=""></div>
      <div class="nav-wrapper" ref="slide">
        <ul class="nav">
          <li 
            class="navItem"
            @click="selectTab(index)"
            v-for="(item, index) in navList"
            :ref="'tab'+index"
            :key="index"
            :class="{'navItem-sel': currentTabIndex === index}">
            <span>{{item}}</span>
          </li>
        </ul>
      </div>
      <div class="nav-right" @click="nextTab"><img src="../../assets/images/three_nav_right.png" alt=""></div>
     </div>
 </div>
</template>

<script>
export default {
  data(){
    return {
      slide: null,
      currentTabIndex: 0,
      navList: [
        '三级导航栏1',
        '三级导航栏2',
        '三级导航栏3',
        '三级导航栏4',
        '三级导航栏5',
        '三级导航栏6',
        '三级导航栏7',
        '三级导航栏8',
        '三级导航栏9',
        '三级导航栏10',
        '三级导航栏11',
        '三级导航栏12',
        '三级导航栏13',
        '三级导航栏13',
        '三级导航栏14',
        '三级导航栏15',
        '三级导航栏16',
      ]
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.slide.destroy()
  },
  methods: {
    init(){
      this.slide = new this.$BScroll(this.$refs.slide,{
        scrollX: true,
        scrollY: false,
        slide: {
          loop: true,
          threshold: 100
        },
        useTransition: false,
        momentum: false,
        bounce: false,
        stopPropagation: true,
        mouseWheel: {
          speed: 2,
          invert: false,
          easeTime: 300
        }
      })
      // this.slide.on('scrollEnd', this._onScrollEnd)
    },
    nextTab() {
      let len = this.navList.length - 9  //9设计稿展示的个数
      if(this.currentTabIndex >= len) return
      let index = ++this.currentTabIndex
      let dom = this.$refs['tab'+index][0]
      if(dom){
        this.slide.scrollToElement(dom, 300, 6)
      }
    },
    preTab() {
      if(this.currentTabIndex <= 0) return
      let index = --this.currentTabIndex
      let dom = this.$refs['tab'+index][0]
      if(dom){
        this.slide.scrollToElement(dom, 300, 6)
      }
    },
    _onScrollEnd() {
      let pageIndex = this.slide.getCurrentPage().pageX
      this.currentTabIndex = pageIndex
    },
    selectTab(index){
      this.currentTabIndex = index
    }
  }
}
</script>

<style lang="scss">
.three-nav-container{
  height: 65px;
  padding: 0 60px;
  position: absolute;
  bottom:0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  pointer-events: auto;
  background: url('../../assets/images/undeline.png') no-repeat top center;
  background-size: 140%;
}
.undeline-container{
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  img{
    width: 100%;
    height: 100%;
  }
}
.three-nav{
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 65px;
  padding-top: 15px;
  .nav-left,.nav-right {
    width: 15px;
    height: 15px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .nav-left{
    margin-right: 10px;
  }
  .nav-right{
    margin-left: 10px;
  }
  .nav-wrapper{
    width: 950px;
    height: 26px;
    overflow: hidden;
    position: relative;
  }
  ul {
    width: auto;
    height: 26px;
    position: absolute;
    left: 0;
    bottom: 0;
    white-space: nowrap;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 10px;
  }
  .navItem {
    // float: left;
    font-size: 12px;
    padding: 5px 13px;
    margin: 0 6px;
    background:rgba(50,253,246,0.3);
    box-shadow:0px 0px 5px 0px rgba(50,253,246,1);
    border-radius:3px;
    flex-shrink: 0;
    cursor: pointer;
    span{
      color: #ffffff;
    }
  }
  .navItem-sel{
    background:linear-gradient(180deg,rgba(0,231,223,1),rgba(0,176,192,1));
  }
}
</style>
