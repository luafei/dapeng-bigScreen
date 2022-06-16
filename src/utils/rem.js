// 设置 rem 函数
function setRem () {
  //  PC端
  //console.log('非移动设备')
   let vW = window.innerWidth; // 当前窗口的宽度
  //let vW = 9120;
  // 非正常屏幕下的尺寸换算
  let rem = vW / 9120 * 100     ; // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应font-size值
  document.documentElement.style.fontSize =  rem + "px";
  //写的时候用图纸的px除以100即可换成rem
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
setRem()
};