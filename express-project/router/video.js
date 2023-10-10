const express = require("express");
const router = express.Router();
const { verifyToken } = require("../util/jwt");
const videoController = require("../controller/videoController");
const vodController = require("../controller/vodController");
const { videoValidator } = require("../middleware/validator/videoValidator");

router
  .get("/getvod", vodController.getvod)
  .post(
    "/createvideo",
    verifyToken(),
    videoValidator,
    videoController.createvideo
  )
  .post("/videolist", verifyToken(), videoController.videolist)
  .get("/video/:videoId", verifyToken(false), videoController.video)
  .post("/comment/:videoId", verifyToken(), videoController.comment)
  .post("/commentlist/:videoId", videoController.commentlist)
  .delete(
    "/deletecomment/:videoId/:commentId",
    verifyToken(),
    videoController.deletecomment
  );

module.exports = router;
