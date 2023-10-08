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
  .get("/video/:videoId", verifyToken(false), videoController.video);

module.exports = router;
