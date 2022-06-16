<template>
  <div id="life">
      <div class="lifetop">
        <ul >
          <li  class="lifepictop">
            <!-- <img src="@/assets/images/lifeone.png" style='width:50px;height:23px' alt=""> -->
            <div>
              <div class="xian"></div>
              <div class="lifepicone vessel gague"></div>
              <div class="lifepicdown">
                <p @click="newname(labels[0].commonName)">{{labels[0].commonName?labels[0].commonName:''}}:<span>{{labels[0].num}}件</span></p>
              </div>
            </div>
            <div >
              <div class="xian"></div>
              <div class="lifepictwo vessel"></div>
              <div class="lifepicdown">
                <p @click="newname(labels[1].commonName)">{{labels[1].commonName?labels[1].commonName:''}}:<span>{{labels[1].num}}件</span></p>
              </div>
            </div>
            <div >
              <div class="rightxian"></div>
              <div class="lifepicthree vessel"></div>
              <div class="lifepicdown">
                <p @click="newname(labels[2].commonName)">{{labels[2].commonName?labels[2].commonName:''}}:<span>{{labels[2].num}}件</span></p>
              </div>
            </div>
          </li>
          <li class="lifepictop">
            <div >
              <div class="xian"></div>
              <div class="lifepicfore vessel gague"></div>
              <div class="lifepicdown">
                <p @click="newname(labels[3].commonName)">{{labels[3].commonName?labels[3].commonName:''}}:<span>{{labels[3].num}}件</span></p>
              </div>
            </div>
            <div >
              <div class="xian"></div>
              <div class="lifepicfive vessel"></div>
              <div class="lifepicdown">
                <p @click="newname(labels[4].commonName)">{{labels[4].commonName?labels[4].commonName:''}}:<span>{{labels[4].num}}件</span></p>
              </div>
            </div>
            <div >
              <div class="lifepicsix vessel"></div>
              <div class="lifepicdown">
                <p @click="newname(labels[5].commonName)">{{labels[5].commonName?labels[5].commonName:''}}:<span>{{labels[5].num}}件</span></p>
              </div>
            </div>
          </li>
          <li class="lifepictop">
            <div >
              <div class="leftxian"></div>
              <div class="xian"></div>
              <div class="lifepicseven vessel gague"></div>
              <div class="lifepicdown">
                <p @click="newname(labels[6].commonName)">{{labels[6].commonName?labels[6].commonName:''}}:<span>{{labels[6].num}}件</span></p>
              </div>
            </div>
            <div >
              <div class="xian"></div>
              <div class="lifepiceight vessel"></div>
              <div class="lifepicdown">
                <p @click="newname(labels[7].commonName)">{{labels[7].commonName?labels[7].commonName:''}}:<span>{{labels[7].num}}件</span></p>
              </div>
            </div>
            <div >
              <div class="lefttxian"></div>
              <div class="lifepicnine vessel"></div>
              <div class="lifepicright">
                <p @click="newname(labels[8].commonName)">{{labels[8].commonName?labels[8].commonName:''}}:<span>{{labels[8].num}}件</span></p>
              </div>
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  name:'personallife',
  props:{
     labels: {
          type: Array,
          default: () => []
        },
     values: {
          type: Array,
          default: () => []
     },
  },
  data() {
    return {
      personlist:{
        labels:{}
      },
      imagelist:[],
    }
  },
  mounted() {
  },
  methods: {
    newname(val) {
      this.$emit('onClick', val)
    }
  }
}
</script>

<style lang='scss' scoped>
 #life{
   height: 185px;
   margin-top: 10px;
   display: flex;
   flex-direction: column;
    
 }
 .lifepictop{
   display: flex;
   flex-direction: row;
   height: 65px;
   .vessel{
    width: 65px;
    height: 45px;
    margin-left: 45px;
   }
   .gague{
    //  margin-left: 0;
   }
   .lifepicone{
    background: url(../../../../assets/images/lifeone.png) no-repeat;
    background-size: 75%;
    }  
    .lifepictwo{
      background:url(../../../../assets/images/lifetwo.png) no-repeat;
      background-size: 75%;
    }
    .lifepicthree{
      background: url(../../../../assets/images/lifethree.png) no-repeat;
      background-size: 75%;
    }
    .lifepicfore{
      background: url(../../../../assets/images/lifefore.png) no-repeat;
      background-size: 75%;
    }
    .lifepicfive{
      background: url(../../../../assets/images/lifefive.png) no-repeat;
      background-size: 75%;
    }
    .lifepicsix{
      background: url(../../../../assets/images/lifesix.png) no-repeat;
      background-size: 75%;
    }
    .lifepicseven{
      background: url(../../../../assets/images/lifeseven.png) no-repeat;
      background-size: 75%;
    }
    .lifepiceight{
      background: url(../../../../assets/images/lifeeight.png) no-repeat;
      background-size: 75%;
    }
    .lifepicnine{
      background: url(../../../../assets/images/lifenine.png) no-repeat;
      background-size: 75%;
    }
    .lifepicdown{
      cursor: pointer;
      border: 1px solid rgba(27,187,163,1);
      background: rgba(27,187,163,1);
      position: relative;
      top: -14px;
      left: 35px;
      width: 78px;
      height: 20px;
      text-align: center;
      align-content: center;
      p{
        font-size: 8px;
        line-height: 16px;
        color: #fff;
      }
     
    }
     .lifepicright{
       cursor: pointer;
      border: 1px solid rgba(27,187,163,1);
      background: rgba(27,187,163,1);
      position: relative;
      top: -14px;
      left: 10px;
      // width: 130px;
      height: 20px;
      text-align: center;
      align-content: center;
        p{
          font-size: 8px;
          line-height: 16px;
          color: #fff;
        }
      }
      .xian{
        border: 0.5px solid rgba(27,187,163,1);
        position: relative;
        background: rgba(27,187,163,1);
        top: 25px;
        left: 93px;
        width: 63px;
      }
      .rightxian{
        width: 3px;
        height: 20px;
        position: absolute;
        background: rgba(27,187,163,1);
        top: 90px;
        left: 288px;
      }
      .lefttxian{
        width: 3.5px;
        height: 20px;
        position: absolute;
        background: rgba(27,187,163,1);
        top: 158px;
        left: 67px;
      }
 }

</style>