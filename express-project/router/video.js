const express = require("express");
const { verifyToken } = require("../util/jwt");
const videoController = require("../controller/videoController");
const vodController = require("../controller/vodController");
const router = express.Router();

router.get("/getvod", vodController.getvod);

module.exports = router;
