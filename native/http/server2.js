var http = require("http");

// 创建服务器，获取服务器的实例对象
var server = http.createServer();
server.listen(8080, function () {
  console.log("http://127.0.0.1:8080");
});

server.on("request", function (req, res) {
  // res.setHeader("Content-Type", "text/plain;charset=utf-8");
  // res.setHeader("Content-Type", "text/html;charset=utf-8");
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  // res.write("你好");
  res.write("<h2>你好2</h2>");
  res.end();
});
