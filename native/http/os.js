var os = require("os");
var path = require("path");

console.log("返回操作系统的默认临时文件夹", os.tmpdir());
/* console.log("返回 CPU 的字节序，可能的是 BE 或 LE", os.endianness());
console.log("返回操作系统的主机名", os.hostname());
console.log("返回操作系统名", os.type());
console.log("返回编译时的操作系统名", os.platform());
console.log("返回操作系统 CPU 架构", os.arch());
console.log("返回操作系统的发行版本", os.release());
console.log("返回操作系统运行的时间，以秒为单位", os.uptime());
console.log("返回一个包含 1、5、15 分钟平均负载的数组", os.loadavg());
console.log("返回系统内存总量", os.totalmem() / 1024 / 1024 / 1024);
console.log("返回操作系统空闲内存量", os.freemem() / 1024 / 1024 / 1024);
// console.log("返回一个对象数组，包含所安装的每个 CPU/内核的信息", os.cpus());
// console.log("获得网络接口列表", os.networkInterfaces()["WLAN"]);
console.log("获得网络接口列表", os.networkInterfaces()); */

console.log(path.sep);
console.log(path.delimiter);
// 格式化路径
console.log(
  "normalization : " + path.normalize("/test/test1//2slashes/1slash/tab/..")
);

// 连接路径
console.log(
  "joint path : " + path.join("/test", "test1", "2slashes/1slash", "tab", "..")
);

// 转换为绝对路径
console.log("resolve : " + path.resolve("main.js"));
// D:\node-new\native\http\main.js

// 路径中文件的后缀名
console.log("ext name : " + path.extname("main.js"));
