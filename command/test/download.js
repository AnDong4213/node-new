var download = require("download-git-repo");

download("github:koajs/koa.git", "./koa", { clone: true }, (err) => {
  console.log(err);
});
