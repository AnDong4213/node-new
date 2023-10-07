// 函数封装返回年月日时分秒
module.exports.getTimer = (type = "all") => {
  // 对象实例化
  var time = new Date();

  var year = time.getFullYear();
  // 1月到12月(0-11)
  var month = time.getMonth() + 1;
  var dates = time.getDate();
  dates = dates < 10 ? "0" + dates : dates;

  // 周日-周六(0-6) 刚好对应数字下标
  var day = time.getDay();
  var arr = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  var hours = time.getHours();
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();
  // 小于10分钟前面补零
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  if (type === "all") {
    return (
      year +
      "-" +
      month +
      "-" +
      dates +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds +
      " " +
      arr[day]
    );
  } else if (type === "date") {
    return year + "-" + month + "-" + dates;
  }
};
