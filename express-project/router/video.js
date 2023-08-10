const express = require("express");
const videoController = require("../controller/videoController");
const router = express.Router();

router.get("/list", (req, res) => {
  res.send("video-list");
});

module.exports = router;
