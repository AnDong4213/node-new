const fs = require("fs");
const { promisify } = require("util");
const { User, Subscribe } = require("../model");
const { createToken } = require("../util/jwt");
const rename = promisify(fs.rename);
const lodash = require("lodash");

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

// 用户订阅频道
exports.subscribe = async (req, res) => {
  const userId = req.user._id;
  const channelId = req.params.userId;
  if (userId === channelId) {
    return res.status(401).json({ err: "不能关注自己" });
  }

  const record = await Subscribe.findOne({
    user: userId,
    channel: channelId
  });

  if (!record) {
    await new Subscribe({
      user: userId,
      channel: channelId
    }).save();

    const user = await User.findById(channelId);
    user.subscribeCount++;
    await user.save();
    res.status(200).json({ msg: "关注成功" });
  } else {
    res.status(401).json({ err: "已经订阅了此频道" });
  }
};

// 用户取消订阅频道
exports.unsubscribe = async (req, res) => {
  const userId = req.user._id;
  const channelId = req.params.userId;
  if (userId === channelId) {
    return res.status(401).json({ err: "不能取消关注自己" });
  }

  const record = await Subscribe.findOne({
    user: userId,
    channel: channelId
  });

  if (record) {
    await record.deleteOne();

    const user = await User.findById(channelId);
    user.subscribeCount--;
    await user.save();
    res.status(200).json(user);
  } else {
    res.status(401).json({ err: "没有订阅了此频道" });
  }
};

exports.getuser = async (req, res) => {
  var isSubscribe = false;

  if (req.user) {
    const record = await Subscribe.findOne({
      channel: req.params.userId,
      user: req.user._id
    });
    if (record) {
      isSubscribe = true;
    }
  }

  const user = await User.findById(req.params.userId);
  res.status(200).json({
    ...lodash.pick(user, [
      "_id",
      "username",
      "image",
      "subscribeCount",
      "cover",
      "channeldes"
    ]),
    isSubscribe
  });
};
