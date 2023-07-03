var http = require("http");
var fs = require("fs");
var url = require("url");
var querystring = require("querystring");
var util = require("util");

// 创建服务器，获取服务器的实例对象
var server = http.createServer();
server.listen(8080, function () {
  console.log("http://127.0.0.1:8080");
});

server.on("request", function (req, res) {
  // console.log(util.inspect(url.parse(req.url, true)));
  // res.end(util.inspect(url.parse(req.url, true)));
  if (req.method === "GET") {
    if (req.url === "/") {
      fs.readFile("./index.html", "utf-8", function (err, data) {
        if (err) {
          console.log(err);
          return;
        }
        res.write(data);
        res.end();
      });
    } else if (req.url === "/1.jpg") {
      fs.readFile("./1.jpg", function (err, data) {
        res.end(data);
      });
    }
  } else if (req.method === "POST") {
    // POST 请求的内容全部的都在请求体中，http.ServerRequest 并没有一个属性内容为请求体，原因是等待请求体传输可能是一件耗时的工作。
    var data = "";
    req.on("data", function (d) {
      // console.log(d); // 是个<Buffer>
      // console.log(d.toString()); // username=fdfs&age=vxvds
      data += d;
    });
    req.on("end", function () {
      console.log(querystring.parse(data));
    });
    res.end();
  }
});
