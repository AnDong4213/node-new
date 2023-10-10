const {
  Video,
  Videocomment,
  Videolike,
  Subscribe,
  collectModel
} = require("../model");

exports.createvideo = async (req, res) => {
  var body = req.body;
  body.user = req.user._id;

  const videoModel = new Video(body);
  try {
    var dbback = await videoModel.save();
    res.status(200).json({ dbback });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

exports.videolist = async (req, res) => {
  const { pageNum = 1, pageSize = 10 } = req.body;

  const videolist = await Video.find()
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({ creatAt: -1 })
    .populate("user", "_id username cover");

  const getvideoCount = await Video.countDocuments();
  res.status(200).json({ videolist, getvideoCount });
};

exports.video = async (req, res) => {
  const { videoId = "" } = req.params;
  var videoInfo = await Video.find({ vodvideoId: videoId }).populate(
    "user",
    "_id username cover"
  );
  res.status(200).json({ videoInfo });
};

// 评论视频
exports.comment = async (req, res) => {
  const { videoId } = req.params;
  const videoInfo = await Video.findById(videoId);

  if (!videoInfo) {
    return res.status(404).json({ err: "视频不存在" });
  }

  const comment = await new Videocomment({
    content: req.body.content,
    video: videoId,
    user: req.user._id
  }).save();

  videoInfo.commentCount++;
  await videoInfo.save();
  res.status(200).json(comment);
};

// 视频评论列表
exports.commentlist = async (req, res) => {
  const videoId = req.params.videoId;
  try {
    const { pageNum = 1, pageSize = 10 } = req.body;
    const comments = await Videocomment.find({ video: videoId })
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize)
      .populate("user", "_id username imgage");
    const commentCount = await Videocomment.countDocuments({ video: videoId });
    res.status(200).json({ comments, commentCount });
  } catch (error) {
    res.status(500).json({ err: "Error" });
  }
};

// 删除视频评论
exports.deletecomment = async (req, res) => {
  const { videoId, commentId } = req.params;
  const videoInfo = await Video.findById(videoId);
  if (!videoInfo) {
    return res.status(404).json({ err: "视频不存在" });
  }

  const comment = await Videocomment.findById(commentId);
  if (!comment) {
    return res.status(404).json({ err: "评论不存在" });
  }

  if (!comment.user.equals(req.user._id)) {
    return res.status(403).json({ err: "评论不可删除" });
  }
  await comment.deleteOne();
  videoInfo.commentCount--;
  await videoInfo.save();
  res.status(200).json({ err: "删除成功" });
};
