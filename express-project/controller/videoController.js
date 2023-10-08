const { Video } = require("../model");

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
