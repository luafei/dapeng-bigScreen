<template>
  <div>
    <div ref="myChart" id="qd" style="height:200px;width:100%;"></div>
  </div>
</template>
<script>
import lifeCycle from './mixins/lifecycle'
import  'echarts-liquidfill'
export default {
  name: "Qin-Top-One-Zero",
  mixins: [lifeCycle()],
  props: {
    //    soso: {
    //        type: String,
    //        default: "Qin-Right-Down"
    //    },
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
        option:null,
        chart: null,
    };
  },
  watch: {
      values: function(vals) {
          this.eData = vals;
          this.initChart();
      }

  },
  mounted() {
      this.initChart()
    // this.$nextTick(() => {
    //   this.initChart();
    //   this.chart.on("click", (params) => {
    //     this.$emit("onClick",   );
    //   });
    // });
  },
  methods: {
      initChart(){
         this.chart = this.chart || this.$echarts.init(this.$refs.myChart)
         let myChart = this.$echarts.init(this.$refs.myChart)
         myChart.setOption( {
            title: [
                {
                    text: "秒批事项业务量",
                    left: "12.5%",
                    top: "42.5%",
                    textAlign: "center",
                    textStyle: {
                        color: "rgba(100,229,251,1)",
                        fontSize: 14,
                    },
                },
                {
                    text: "秒批事项业务量占比",
                    left: "46.5%",
                    top: "42.5%",
                    textAlign: "center",
                    textStyle: {
                        color: "rgba(100,229,251,1)",
                        fontSize: 14,
                    },
                },
                {
                    text: "好差评覆盖率",
                    left: "80%",
                    top: "42.5%",
                    textAlign: "center",
                    textStyle: {
                        color: "rgba(100,229,251,1)",
                        fontSize: 14,

                    },
                },
                {
                    text: "差评率",
                    left: "10%",
                    top: "85%",
                    textAlign: "center",
                    textStyle: {
                        color: "rgba(100,229,251,1)",

                        fontSize: 14,

                    },
                },
                {
                    text: "即办件业务量",
                    left: "45.5%",
                    top: "85%",
                    textAlign: "center",
                    textStyle: {
                        color: "rgba(100,229,251,1)",

                        fontSize: 14,

                    },
                },
                {
                    text: "即办件占比",
                    left: "78%",
                    top: "85%",
                    textAlign: "center",
                    textStyle: {
                        color: "rgba(100,229,251,1)",

                        fontSize: 14,

                    },
                },
            ],
                // text: '水球图',
            // backgroundColor: '#151934',
            series: [
                {
                    type: "liquidFill",

                    radius: "30%",
                    // 水球颜色
                    color: ["rgba(100,229,251,1)"],
                    center: ["13%", "25.8%"],
                    label: {
                        normal: {
                            formatter: (val) => {
                            return val.data
                        },
                        textStyle: {
                            color: "#ffff",
                            insideColor: "#28b2b6",
                            fontSize: 20,
                        },
                        },
                    },
                backgroundStyle: {
                    color: "transparent", //图表的背景颜色
                    //borderWidth: '10',//图表的边框宽度
                    //borderColor: '#000',//图表的边框颜色
                    itemStyle: {
                        shadowBlur: 20, //设置无用
                        shadowColor: "#072F3A", //设置无用
                        opacity: 1, //设置无用
                    },
                },
                itemStyle: {
                    opacity: 0.5, //波浪的透明度
                    shadowBlur: 10, //波浪的阴影范围
                    shadowColor: "#072F3A", //阴影颜色
                },
                outline: {
                    show: true, //是否显示轮廓 布尔值
                    borderDistance: 0, //外部轮廓与图表的距离 数字
                    itemStyle: {
                        borderColor: "#28b2b6", //边框的颜色
                        borderWidth: 0, //边框的宽度
                        // shadowBlur: 50 , //外部轮廓的阴影范围 一旦设置了内外都有阴影
                        // shadowColor: '#000' //外部轮廓的阴影颜色
                    },
                },
                emphasis: {
                    itemStyle: {
                        opacity: 1, //鼠标经过波浪颜色的透明度
                    },
                },


                data: [this.values[0]],
                amplitude: 4, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
                waveLength: "50%", //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
                backgroundStyle: {
                    borderWidth: 3,
                    borderColor: "rgba(255,255,255,0.5)",
                    color: "rgba(0,0,0,0)", //9EBB29
                },
                direction: "left", //波移动的速度 两个参数  left 从右往左 right 从左往右
                waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
                animationEasing: "linear", //初始动画
                animationEasingUpdate: "quarticInOut", //数据更新的动画效果
                animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
                animationDurationUpdate: 300, //数据更新动画的时长
            },  
            {
                type: "liquidFill",

                radius: "30%",
                // 水球颜色
                color: ["rgba(14,156,255,1)"],
                center: ["46.5%", "25.8%"],
                label: {
                        normal: {
                        textStyle: {
                            color: "#ffff",
                            insideColor: "#198bdb",
                            fontSize: 20,
                        },
                    },
                },
                backgroundStyle: {
                    color: "transparent", //图表的背景颜色

                    itemStyle: {
                        shadowBlur: 20, //设置无用
                        shadowColor: "#072F3A", //设置无用
                        opacity: 1, //设置无用
                    },
                },
                itemStyle: {
                    opacity: 0.5, //波浪的透明度
                    shadowBlur: 10, //波浪的阴影范围
                    shadowColor: "#072F3A", //阴影颜色
                },
                outline: {
                    show: true, //是否显示轮廓 布尔值
                    borderDistance: 0, //外部轮廓与图表的距离 数字
                    itemStyle: {
                        borderColor: "#28b2b6", //边框的颜色
                        borderWidth: 1, //边框的宽度

                    },
                },
                emphasis: {
                    itemStyle: {
                        opacity: 1, //鼠标经过波浪颜色的透明度
                    },
                },

                data: [this.values[1]],
                amplitude: 4, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
                waveLength: "50%", //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
                backgroundStyle: {
                    borderWidth: 3,
                    borderColor: "rgba(255,255,255,0.5)",
                    color: "rgba(0,0,0,0)", //9EBB29
                },
                direction: "left", //波移动的速度 两个参数  left 从右往左 right 从左往右
                waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
                animationEasing: "linear", //初始动画
                animationEasingUpdate: "quarticInOut", //数据更新的动画效果
                animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
                animationDurationUpdate: 300, //数据更新动画的时长
            },
            {
                type: "liquidFill",

                radius: "30%",
                // 水球颜色
                color: ['rgba(251,186,16,1)'],
                center: ["80%", "25.8%"],
                label: {
                    normal: {
                        textStyle: {
                            color: "#ffff",
                            insideColor: "#26d08b",
                            fontSize: 20,
                        },
                    },
                },
                backgroundStyle: {
                    color: "transparent", //图表的背景颜色

                    itemStyle: {
                        shadowBlur: 20, //设置无用
                        shadowColor: "#072F3A", //设置无用
                        opacity: 1, //设置无用
                    },
                },
                itemStyle: {
                    opacity: 0.5, //波浪的透明度
                    shadowBlur: 10, //波浪的阴影范围
                    shadowColor: "#072F3A", //阴影颜色
                },
                outline: {
                    show: true, //是否显示轮廓 布尔值
                    borderDistance: 0, //外部轮廓与图表的距离 数字
                    itemStyle: {
                        borderColor: "#26d08b", //边框的颜色
                        borderWidth: 1, //边框的宽度

                    },
                },
                emphasis: {
                    itemStyle: {
                        opacity: 1, //鼠标经过波浪颜色的透明度
                    },
                },

                data: [this.values[2]],
                amplitude: 4, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
                waveLength: "50%", //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
                backgroundStyle: {
                    borderWidth: 3,
                    borderColor: "rgba(255,255,255,0.5)",
                    color: "rgba(0,0,0,0)", //9EBB29
                },
                direction: "left", //波移动的速度 两个参数  left 从右往左 right 从左往右
                waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
                animationEasing: "linear", //初始动画
                animationEasingUpdate: "quarticInOut", //数据更新的动画效果
                animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
                animationDurationUpdate: 300, //数据更新动画的时长
            },
            {
                type: "liquidFill",
                radius: "30%",
                // 水球颜色
                color: ["rgba(254,134,2,1)"],
                center: ["12.5%", "68%"],
                label: {
                    normal: {
                        textStyle: {
                            color: "#ffff",
                            insideColor: "#F9E341",
                            fontSize: 20,
                        },
                    },
                },
                backgroundStyle: {
                    color: "transparent", //图表的背景颜色

                    itemStyle: {
                        shadowBlur: 20, //设置无用
                        shadowColor: "#F9E341", //设置无用
                        opacity: 1, //设置无用
                    },
                },
                itemStyle: {
                    opacity: 0.5, //波浪的透明度
                    shadowBlur: 10, //波浪的阴影范围
                    shadowColor: "rgba(255,204,70,1)", //阴影颜色
                },
                outline: {
                    show: true, //是否显示轮廓 布尔值
                    borderDistance: 0, //外部轮廓与图表的距离 数字
                    itemStyle: {
                        borderColor: "#28b2b6", //边框的颜色
                        borderWidth: 1, //边框的宽度

                    },
                },
                emphasis: {
                    itemStyle: {
                        opacity: 1, //鼠标经过波浪颜色的透明度
                    },
                },

                data: [this.values[3]],
                amplitude: 4, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
                waveLength: "50%", //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
                backgroundStyle: {
                    borderWidth: 3,
                    borderColor: "rgba(255,255,255,0.5)",
                    color: "rgba(0,0,0,0)", //9EBB29
                },
                direction: "left", //波移动的速度 两个参数  left 从右往左 right 从左往右
                waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
                animationEasing: "linear", //初始动画
                animationEasingUpdate: "quarticInOut", //数据更新的动画效果
                animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
                animationDurationUpdate: 300, //数据更新动画的时长
            },
            {
                
                type: "liquidFill",
                radius: "30%",
                // 水球颜色
                color: ["rgba(189,111,255,1)"],
                center: ["46.5%", "67%"],
                label: {
                    normal: {
                        formatter: (val) => {
                            return val.data
                        },
                        textStyle: {
                            color: "#ffff",
                            insideColor: "#f3daa9",
                            fontSize: 20,
                             
                        },
                    },
                },
                backgroundStyle: {
                    color: "transparent", //图表的背景颜色

                    itemStyle: {
                        shadowBlur: 20, //设置无用
                        shadowColor: "#072F3A", //设置无用
                        opacity: 1, //设置无用
                    },
                },
                itemStyle: {
                    opacity: 0.5, //波浪的透明度
                    shadowBlur: 10, //波浪的阴影范围
                    shadowColor: "#313737", //阴影颜色
                },
                outline: {
                    show: true, //是否显示轮廓 布尔值
                    borderDistance: 0, //外部轮廓与图表的距离 数字
                    itemStyle: {
                        borderColor: "#28b2b6", //边框的颜色
                        borderWidth: 1, //边框的宽度

                    },
                },
                emphasis: {
                    itemStyle: {
                        opacity: 1, //鼠标经过波浪颜色的透明度
                    },
                },

                data: [this.values[4]],
                amplitude: 4, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
                waveLength: "50%", //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
                backgroundStyle: {
                    borderWidth: 3,
                    borderColor: "rgba(255,255,255,0.5)",
                    color: "rgba(0,0,0,0)", //9EBB29
                },
                direction: "left", //波移动的速度 两个参数  left 从右往左 right 从左往右
                waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
                animationEasing: "linear", //初始动画
                animationEasingUpdate: "quarticInOut", //数据更新的动画效果
                animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
                animationDurationUpdate: 300, //数据更新动画的时长
            },
            {
                type: "liquidFill",


                radius: "30%",
                // 水球颜色
                color: ["#34FEB2"],
                center: ["80%", "67%"],
                label: {
                    normal: {
                        textStyle: {
                            color: "#ffff",
                            insideColor: "#8ab8c3",
                            fontSize: 20,
                        },
                    },
                },
                backgroundStyle: {
                    color: "transparent", //图表的背景颜色

                    itemStyle: {
                        shadowBlur: 20, //设置无用
                        shadowColor: "#072F3A", //设置无用
                        opacity: 1, //设置无用
                    },
                },
                itemStyle: {
                    opacity: 0.5, //波浪的透明度
                    shadowBlur: 10, //波浪的阴影范围
                    shadowColor: "#1C303D", //阴影颜色
                },
                outline: {
                    show: true, //是否显示轮廓 布尔值
                    borderDistance: 0, //外部轮廓与图表的距离 数字
                    itemStyle: {
                        borderColor: "#8ab8c3", //边框的颜色
                        borderWidth: 1, //边框的宽度

                    },
                },
                emphasis: {
                    itemStyle: {
                        opacity: 1, //鼠标经过波浪颜色的透明度
                    },
                },

                data: [this.values[5]],
                amplitude: 4, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
                waveLength: "50%", //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
                backgroundStyle: {
                    borderWidth: 3,
                    borderColor: "rgba(255,255,255,0.5)",
                    color: "rgba(0,0,0,0)", //9EBB29
                },
                direction: "left", //波移动的速度 两个参数  left 从右往左 right 从左往右
                waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
                animationEasing: "linear", //初始动画
                animationEasingUpdate: "quarticInOut", //数据更新的动画效果
                animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
                animationDurationUpdate: 300, //数据更新动画的时长
            },
            ]
        });
      }
    }
};
</script>
<style lang="scss" scoped>
#qd {
    height: 300px!important;
    width: 380px!important;
}
</style>