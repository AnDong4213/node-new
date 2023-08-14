const { User } = require("../model");

// 用户注册
exports.register = async (req, res) => {
  const userModel = new User(req.body);
  const dbBack = await userModel.save();
  res.status(200).json(dbBack);
};
