const { User } = require("../model");
const { createToken } = require("../util/jwt");

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
  var id = req.user.userinfo._id;
  var dbBack = await User.findByIdAndUpdate(id, req.body, { new: true });
  // console.log(updateData);
  res.status(202).json({ user: dbBack });
};

// 用户列表
exports.list = async (req, res) => {
  res.status(200).json({ id: req.url });
};
