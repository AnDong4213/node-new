var child_process = require("child_process");
const { resolve } = require("path");

const { spawn } = child_process;

const downloadGitRepo = function (url, project) {
  var g = spawn("git", ["clone", url, project]);

  g.stdout.on("data", function (s) {
    console.log("stdout: " + s);
  });

  g.stderr.on("data", function (data) {
    console.log("stderr: " + data);
  });

  return new Promise((resolve, reject) => {
    g.on("close", (code) => {
      if (code == "0") {
        resolve(code);
      } else {
        reject("代码下载失败");
      }
    });
  });
};

module.exports = downloadGitRepo;