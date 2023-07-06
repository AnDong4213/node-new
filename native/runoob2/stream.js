// Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。

var fs = require("fs");
var zlib = require("zlib");

// 从流中读取数据
/* var data = "";
var readerStream = fs.createReadStream("./input.txt");
readerStream.setEncoding("UTF8");
readerStream.on("data", function (chunk) {
  data += chunk;
});
readerStream.on("end", function () {
  console.log("data==", data); // data== 菜鸟教程官网地址：www.baidu.com
});
readerStream.on("error", function (err) {
  console.log("err--", err, err.code);
  console.log("err.stack--", err.stack);
});
console.log("程序执行完毕"); */

// 写入流
/* var data = "菜鸟教程官网地址：www.runoob.com22";
var writerStream = fs.createWriteStream("output.txt");
writerStream.write(data, "UTF8");
// 标记文件末尾
writerStream.end();
// 处理流事件 --> finish、error
writerStream.on("finish", function () {
  console.log("写入完成。");
});
writerStream.on("error", function (err) {
  console.log(err.stack);
});
console.log("程序执行完毕"); */

// 创建一个可读流
/* var readerStream = fs.createReadStream("input.txt");
// 创建一个可写流
var writerStream = fs.createWriteStream("output.txt");
// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);
console.log("程序执行完毕"); */

// 用管道和链式来压缩和解压文件
/* fs.createReadStream("./input.txt")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("input.txt.gz"));
console.log("文件压缩完成。"); */

// 追加
/* var fs = require("fs");
var read = fs.createReadStream("./input.txt");
//设置第二个参数append
var write = fs.createWriteStream("./output.txt", { flags: "a" });
//管道流读写操作
read.pipe(write);
console.log("执行完毕"); */

fs.appendFile("./output.txt", "data to append", function (err) {
  if (err) {
    return console.log(err);
  } //数据被添加到文件的尾部
  console.log('The "data to append" was appended to file!');
});
