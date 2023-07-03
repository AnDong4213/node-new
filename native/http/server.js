var http = require("http");
var fs = require("fs");
var url = require("url");
var querystring = require("querystring");

// 创建服务器，获取服务器的实例对象
var server = http.createServer();
server.listen(8080, function () {
  console.log("http://127.0.0.1:8080");
});

server.on("request", function (req, res) {
  console.log(req.url);
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
