var fs = require("fs");
fs.open("./a.txt", "a+", function (err, fd) {
  if (err) {
    return console.log(err);
  }
  console.log(fd);
  fs.writeFile(fd, "看看", function (err) {
    if (err) {
      console.log(err);
    }
  });
});

fs.mkdir("./tmp/test/", { recursive: true }, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log("目录创建成功。");
});
