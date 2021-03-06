export  function subStringFormatter(params){
                             
  var newParamsName = "";// 最终拼接成的字符串
  var paramsNameNumber = params.length;// 实际标签的个数
  var provideNumber = 2;// 每行能显示的字的个数
  var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
  /**
   * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
   */
  // 条件等同于rowNumber>1
  if (paramsNameNumber > provideNumber) {
      /** 循环每一行,p表示行 */
      for (var index = 0;  index < rowNumber; index++) {
          var tempStr = "";// 表示每一次截取的字符串
          var start = index * provideNumber;// 开始截取的位置
          var end = start + provideNumber;// 结束截取的位置
          // 此处特殊处理最后一行的索引值
          if (index == rowNumber - 1) {
              // 最后一次不换行
              tempStr = params.substring(start, paramsNameNumber);
          } else {
              // 每一次拼接字符串并换行
              tempStr = params.substring(start, end) + "\n";
          }
          newParamsName += tempStr;// 最终拼成的字符串
          if(index >= 1) {
              return newParamsName.length > 1 ? `${newParamsName.substring(0,3)}...` : newParamsName
          }
      }

  } else {
      // 将旧标签的值赋给新标签
      newParamsName = params;
  }
  //将最终的字符串返回
  return newParamsName
}
