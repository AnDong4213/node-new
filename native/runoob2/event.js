var fs = require("fs");

fs.readFile("input.txt", function (err, data) {
  if (err) return console.error(err);
  console.log("--", data.toString());
});
console.log("程序执行结束!");

// 引入 events 模块
var events = require("events");
// 创建 eventEmitter 对象
// EventEmitter 的核心就是事件触发与事件监听器功能的封装。
var eventEmitter = new events.EventEmitter();

// 创建事件处理程序
var connectHandler = function connected() {
  console.log("连接成功。");

  // 触发 data_received 事件
  eventEmitter.emit("data_received");
};

// 绑定 connection 事件处理程序
eventEmitter.on("connection", connectHandler);

// 使用匿名函数绑定 data_received 事件
eventEmitter.on("data_received", function () {
  console.log("数据接收成功。");
});

// 触发 connection 事件
eventEmitter.emit("connection");
console.log("程序执行完毕。");
