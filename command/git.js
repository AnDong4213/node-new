var child_process = require("child_process");

const { spawn } = child_process;

var g = spawn("git", [
  "clone",
  "https://gitee.com/beiyaoyaoyao/egg-template.git",
  "koa"
]);
g.stdout.on("data", function (s) {
  console.log("g stdout: " + s);
});

g.stderr.on("data", function (data) {
  console.log("g stderr: " + data);
});

g.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});

console.log(9999999);
