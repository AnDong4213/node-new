const fs = require("fs");
const { promisify } = require("util");
const { User } = require("../model");
const { createToken } = require("../util/jwt");
const rename = promisify(fs.rename);

// 用户注册
exports.register = async (req, res) => {
  const userModel = new User(req.body);
  const dbBack = await userModel.save();
  const user = dbBack.toJSON();
  delete user.password;
  res.status(200).json(user);
};

// 用户登录
exports.login = async (req, res) => {
  // 客户端数据验证
  // 链接数据库查询
  var dbBack = await User.findOne(req.body);
  if (!dbBack) {
    res.status(402).json({ error: "邮箱或者密码不正确" });
  }

  dbBack = dbBack.toJSON();
  dbBack.token = await createToken(dbBack);
  res.status(200).json(dbBack);
};

// 用户修改
exports.update = async (req, res) => {
  var id = req.user._id;
  // mongoose自带的方法，{new: true}返回新的数据
  var dbBack = await User.findByIdAndUpdate(id, req.body, { new: true });
  // console.log(dbBack);
  res.status(200).json({ user: dbBack });
};

// 用户头像上传
exports.headimg = async (req, res) => {
  console.log("req.file--", req.file);
  const { originalname, filename } = req.file;
  const fileNames = originalname.split(".");
  const fileType = fileNames[fileNames.length - 1];

  try {
    await rename(`./public/${filename}`, `./public/${filename}.${fileType}`);
    res.status(200).json({ filepath: `${filename}.${fileType}` });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

// 用户列表
exports.list = async (req, res) => {
  res.status(200).json({ id: req.url });
};
